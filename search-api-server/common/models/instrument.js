'use strict';

module.exports = function (Instrument) {
  Instrument.disableRemoteMethodByName('findOne', true);
  Instrument.disableRemoteMethodByName('exists', true);
  Instrument.disableRemoteMethodByName('create', true);
  Instrument.disableRemoteMethodByName('upsert', true);
  Instrument.disableRemoteMethodByName('deleteById', true);
  Instrument.disableRemoteMethodByName('updateAll', true);
  Instrument.disableRemoteMethodByName('updateAttributes', false);
  Instrument.disableRemoteMethodByName('createChangeStream', true);
  Instrument.disableRemoteMethodByName('replace', true);
  Instrument.disableRemoteMethodByName('replaceById', true);
  Instrument.disableRemoteMethodByName('upsertWithWhere', true);
  Instrument.disableRemoteMethodByName('replaceOrCreate', true);
  Instrument.disableRemoteMethodByName('prototype.patchAttributes', true);

  Instrument.disableRemoteMethodByName('prototype.__get__datasets');
  Instrument.disableRemoteMethodByName('prototype.__create__datasets');
  Instrument.disableRemoteMethodByName('prototype.__delete__datasets');
  Instrument.disableRemoteMethodByName('prototype.__updateById__datasets');
  Instrument.disableRemoteMethodByName('prototype.__findById__datasets');
  Instrument.disableRemoteMethodByName('prototype.__destroyById__datasets');
  Instrument.disableRemoteMethodByName('prototype.__count__datasets');
};
