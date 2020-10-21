'use strict';

module.exports = function(Sample) {
  Sample.disableRemoteMethodByName('findOne', true);
  Sample.disableRemoteMethodByName('exists', true);
  Sample.disableRemoteMethodByName('create', true);
  Sample.disableRemoteMethodByName('upsert', true);
  Sample.disableRemoteMethodByName('deleteById', true);
  Sample.disableRemoteMethodByName('updateAll', true);
  Sample.disableRemoteMethodByName('updateAttributes', false);
  Sample.disableRemoteMethodByName('createChangeStream', true);
  Sample.disableRemoteMethodByName('replace', true);
  Sample.disableRemoteMethodByName('replaceById', true);
  Sample.disableRemoteMethodByName('upsertWithWhere', true);
  Sample.disableRemoteMethodByName('replaceOrCreate', true);
  Sample.disableRemoteMethodByName('prototype.patchAttributes', true);
};
