'use strict';

/**
 * Dependencies.
 */

const assert = require('assert');
const remoting = require('strong-remoting');
const utils = require('loopback-datasource-juggler/lib/utils');
const jutil = require('loopback-datasource-juggler/lib/jutil');
const RelationMixin = require('./relations');
const InclusionMixin = require('loopback-datasource-juggler/lib/include');
const Aggregator = require('../aggregator');

const findMethodNames = ['findById', 'findOne'];

module.exports = DistributedConnector;

/**
 * Create an instance of the connector with the given `settings`.
 */

function DistributedConnector(settings) {
  assert(typeof settings ===
    'object',
  'cannot initialize DistributedConnector without a settings object');
  this.client = settings.client;
  this.adapter = settings.adapter || 'rest';
  this.protocol = settings.protocol || 'http';
  this.root = settings.root || '';
  this.host = settings.host || 'localhost';
  this.port = settings.port || 3000;
  this.name = 'distributed-connector';
  this.remotes = new Array();

  if (settings.urls) {
    this.urls = settings.urls;
  } else {
    this.urls = [this.protocol + '://' + this.host + ':' + this.port + this.root];
  }
  for (let url of this.urls) {
      this.remotes.push({'url': url, 'remote': remoting.create(settings.options)});
  }

  // handle mixins in the define() method
  const DAO = this.DataAccessObject = function() {
  };
}

DistributedConnector.prototype.connect = function() {
  for (let remoteData of this.remotes) {
    remoteData['remote'].connect(remoteData['url'], this.adapter);
  }
};

DistributedConnector.initialize = function(dataSource, callback) {
  const connector = dataSource.connector =
    new DistributedConnector(dataSource.settings);
  connector.connect();
  process.nextTick(callback);
};

DistributedConnector.prototype.define = function(definition) {
  const Model = definition.model;
  const remotes = this.remotes;

  assert(Model.sharedClass,
    'cannot attach ' +
      Model.modelName +
      ' to a remote connector without a Model.sharedClass');

  jutil.mixin(Model, RelationMixin);
  jutil.mixin(Model, InclusionMixin);
  for (let remoteData of remotes) {
    remoteData['remote'].addClass(Model.sharedClass);
  }
  this.resolve(Model);
  this.setupRemotingTypeFor(Model);
};

DistributedConnector.prototype.resolve = function(Model) {
  const remotes = this.remotes;

  Model.sharedClass.methods().forEach(function(remoteMethod) {
    if (remoteMethod.name !== 'Change' && remoteMethod.name !== 'Checkpoint') {
      createProxyMethod(Model, remotes, remoteMethod);
    }
  });
};

DistributedConnector.prototype.setupRemotingTypeFor = function(Model) {
  const remotes = this.remotes;

  // setup a remoting type converter for this model
  for (let remoteData of remotes) {
    remoteData['remote'].defineObjectType(Model.modelName, function(data) {
      const model = new Model(data);

      // process cached relations
      if (model.__cachedRelations) {
        for (const relation in model.__cachedRelations) {
          const relatedModel = model.__cachedRelations[relation];
          model.__data[relation] = relatedModel;
        }
      }

      return model;
    });
  }
};

function createProxyMethod(Model, remotes, remoteMethod) {
  const scope = remoteMethod.isStatic ? Model : Model.prototype;
  const original = scope[remoteMethod.name];

  function remoteMethodProxy() {
    const args = Array.prototype.slice.call(arguments);
    const lastArgIsFunc = typeof args[args.length - 1] === 'function';
    let callback;
    if (lastArgIsFunc) {
      callback = args.pop();
    } else {
      callback = utils.createPromiseCallback();
    }
    const callbackPromise = callback.promise;

    if (findMethodNames.includes(remoteMethod.name)) {
      callback = proxy404toNull(callback);
    }
    let data = new Array();
    if (remoteMethod.isStatic) {
      data = remotes.map(async remote => {
        let remoteArgs = Array.prototype.slice.call(arguments);
        const lastArgIsFunc = typeof args[args.length - 1] === 'function';
        if (lastArgIsFunc) {
          remoteArgs.pop();
        }
        remoteArgs = remoteArgs.map(r => { return (typeof r == 'string') ? encodeURIComponent(r) : r});
        return await new Promise((resolve, reject) => {
            remote['remote'].invoke(remoteMethod.stringName, remoteArgs, function (err, result){resolve(result);});
        });
      });
    } else {
      data = remotes.map(async remote => {
        const ctorArgs = [encodeURIComponent(this.id)];
        const remoteArgs = Array.prototype.slice.call(arguments);
        const lastArgIsFunc = typeof args[args.length - 1] === 'function';
        if (lastArgIsFunc) {
          remoteArgs.pop();
        }
        return await new Promise((resolve, reject) => {
            remote['remote'].invoke(remoteMethod.stringName, ctorArgs, remoteArgs, function (err, result){resolve(result);});
        });
      });
    }
    Promise.all(data).then(function (results) {
      Aggregator(results, remoteMethod.name, callback);
    });

    return callbackPromise;
  }

  function proxy404toNull(cb) {
    return function(err, data) {
      if (err && err.code === 'MODEL_NOT_FOUND') {
        cb(null, null);
        return;
      }
      cb(err, data);
    };
  }

  scope[remoteMethod.name] = remoteMethodProxy;
  remoteMethod.aliases.forEach(function(alias) {
    scope[alias] = remoteMethodProxy;
  });
}

function noop() {
}
