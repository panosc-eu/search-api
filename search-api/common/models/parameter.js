'use strict';

module.exports = function(Parameter) {
  Parameter.disableRemoteMethodByName('get');
  Parameter.disableRemoteMethodByName('findById');
  Parameter.disableRemoteMethodByName('findOne');
  Parameter.disableRemoteMethodByName('exists');
  Parameter.disableRemoteMethodByName('create');
  Parameter.disableRemoteMethodByName('upsert');
  Parameter.disableRemoteMethodByName('deleteById');
  Parameter.disableRemoteMethodByName('updateAll');
  Parameter.disableRemoteMethodByName('updateAttributes');
  Parameter.disableRemoteMethodByName('createChangeStream');
  Parameter.disableRemoteMethodByName('replace');
  Parameter.disableRemoteMethodByName('replaceById');
  Parameter.disableRemoteMethodByName('upsertWithWhere');
  Parameter.disableRemoteMethodByName('replaceOrCreate');
  Parameter.disableRemoteMethodByName('prototype.patchAttributes');

  Parameter.disableRemoteMethodByName('prototype.__get__dataset');
  Parameter.disableRemoteMethodByName('prototype.__create__dataset');
  Parameter.disableRemoteMethodByName('prototype.__delete__dataset');
  Parameter.disableRemoteMethodByName('prototype.__updateById__dataset');
  Parameter.disableRemoteMethodByName('prototype.__findById__dataset');
  Parameter.disableRemoteMethodByName('prototype.__destroyById__dataset');
  Parameter.disableRemoteMethodByName('prototype.__count__dataset');
  Parameter.disableRemoteMethodByName('prototype.__exists__dataset');
  Parameter.disableRemoteMethodByName('prototype.__link__dataset');
  Parameter.disableRemoteMethodByName('prototype.__unlink__dataset');

  Parameter.disableRemoteMethodByName('prototype.__get__document');
  Parameter.disableRemoteMethodByName('prototype.__create__document');
  Parameter.disableRemoteMethodByName('prototype.__delete__document');
  Parameter.disableRemoteMethodByName('prototype.__updateById__document');
  Parameter.disableRemoteMethodByName('prototype.__findById__document');
  Parameter.disableRemoteMethodByName('prototype.__destroyById__document');
  Parameter.disableRemoteMethodByName('prototype.__count__document');
  Parameter.disableRemoteMethodByName('prototype.__exists__document');
  Parameter.disableRemoteMethodByName('prototype.__link__document');
  Parameter.disableRemoteMethodByName('prototype.__unlink__document');

  Parameter.status = function(cb) {
    cb(null, {});
  };
  Parameter.remoteMethod(
    'statistics', {
      http: {
        path: '/statistics',
        verb: 'get'
      },
      returns: {
        arg: 'parameters',
        type: 'Object'
      }
    }
  );
};
