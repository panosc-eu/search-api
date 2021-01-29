'use strict';

module.exports = function(Technique) {
  Technique.disableRemoteMethodByName('get');
  Technique.disableRemoteMethodByName('findById');
  Technique.disableRemoteMethodByName('findOne');
  Technique.disableRemoteMethodByName('exists');
  Technique.disableRemoteMethodByName('create');
  Technique.disableRemoteMethodByName('upsert');
  Technique.disableRemoteMethodByName('deleteById');
  Technique.disableRemoteMethodByName('updateAll');
  Technique.disableRemoteMethodByName('updateAttributes');
  Technique.disableRemoteMethodByName('createChangeStream');
  Technique.disableRemoteMethodByName('replace');
  Technique.disableRemoteMethodByName('replaceById');
  Technique.disableRemoteMethodByName('upsertWithWhere');
  Technique.disableRemoteMethodByName('replaceOrCreate');
  Technique.disableRemoteMethodByName('prototype.patchAttributes');

};
