'use strict';

const g = require('strong-globalize')();
const util = require('util');
const Connector = require('loopback-connector').Connector;
const crypto = require('crypto');

/**
 * Initialize the SearchAPI Adapter connector against the given data source
 *
 * @param {DataSource} dataSource The loopback-datasource-juggler dataSource
 * @param {Function} [callback] The callback function
 */
exports.initialize = function initializeDataSource(dataSource, callback) {
  dataSource.connector = new SearchAPIAdapter(null, dataSource.settings);
  dataSource.connector.connect(callback);
};

exports.SearchAPIAdapter = SearchAPIAdapter;

function SearchAPIAdapter(m, settings) {
  settings = settings || {};
  if (typeof settings.generateId === 'function') {
    this.generateId = settings.generateId.bind(this);
  }
  this.defaultIdType = settings.defaultIdType || String;
  const Adapter = require(settings.adapter);
  this.adapter = new Adapter(settings);
  if (m instanceof SearchAPIAdapter) {
    this.isTransaction = true;
    this.constructor.super_.call(this, 'transient', settings);
    this._models = m._models;
  } else {
    this.isTransaction = false;
    this.constructor.super_.call(this, 'transient', settings);
  }
}

util.inherits(SearchAPIAdapter, Connector);

SearchAPIAdapter.prototype.getDefaultIdType = function() {
  return this.defaultIdType;
};

SearchAPIAdapter.prototype.getTypes = function() {
  return ['db', 'nosql', 'transient'];
};

SearchAPIAdapter.prototype.connect = function(callback) {
  if (this.isTransaction) {
    this.onTransactionExec = callback;
  } else {
    this.adapter.connect(callback);
  }
};

SearchAPIAdapter.prototype.generateId = function(model, data, idName) {
  let idType;
  const props = this._models[model].properties;
  if (idName) idType = props[idName] && props[idName].type;
  idType = idType || this.getDefaultIdType();
  if (idType === Number) {
    return Math.floor(Math.random() * 10000); // max. 4 digits
  } else {
    return crypto.randomBytes(Math.ceil(24 / 2))
      .toString('hex') // convert to hexadecimal format
      .slice(0, 24); // return required number of characters
  }
};

SearchAPIAdapter.prototype.exists = function exists(model, id, callback) {
  this.adapter.exists(model, id, callback);
};

SearchAPIAdapter.prototype.find = function find(model, id, callback) {
  this.adapter.find(model, id, callback);
};

SearchAPIAdapter.prototype.all = function all(model, filter, callback) {
  this.adapter.all(model, filter, callback);
};

SearchAPIAdapter.prototype.count = function count(model, callback, where) {
  this.adapter.count(model, where, callback);
};

SearchAPIAdapter.prototype.create = function create(model, data, callback) {
  const props = this._models[model].properties;
  const idName = this.idName(model);
  let id = undefined;
  if (idName && props[idName]) {
    id = this.getIdValue(model, data) || this.generateId(model, data, idName);
    id = (props[idName] && props[idName].type && props[idName].type(id)) || id;
    this.setIdValue(model, data, id);
  }
  this.flush('create', id, callback);
};

SearchAPIAdapter.prototype.save = function save(model, data, callback) {
  this.flush('save', data, callback);
};

SearchAPIAdapter.prototype.update =
  SearchAPIAdapter.prototype.updateAll = function updateAll(model, where, data, cb) {
    const count = 0;
    this.flush('update', {count: count}, cb);
  };

SearchAPIAdapter.prototype.updateAttributes = function updateAttributes(model, id, data, cb) {
  if (!id) {
    const err = new Error(g.f('You must provide an {{id}} when updating attributes!'));
    if (cb) {
      return cb(err);
    } else {
      throw err;
    }
  }

  this.setIdValue(model, data, id);
  this.save(model, data, cb);
};

SearchAPIAdapter.prototype.destroy = function destroy(model, id, callback) {
  this.flush('destroy', null, callback);
};

SearchAPIAdapter.prototype.destroyAll = function destroyAll(model, where, callback) {
  if (!callback && 'function' === typeof where) {
    callback = where;
    where = undefined;
  }
  this.flush('destroyAll', null, callback);
};

/*!
 * Flush the cache - noop.
 * @param {Function} callback
 */
SearchAPIAdapter.prototype.flush = function(action, result, callback) {
  process.nextTick(function() { callback && callback(null, result); });
};

SearchAPIAdapter.prototype.transaction = function() {
  return new SearchAPIAdapter(this);
};

SearchAPIAdapter.prototype.exec = function(callback) {
  this.onTransactionExec();
  setTimeout(callback, 50);
};
