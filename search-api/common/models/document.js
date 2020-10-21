'use strict';

module.exports = function (Document) {
  Document.disableRemoteMethodByName('findOne', true);
  Document.disableRemoteMethodByName('exists', true);
  Document.disableRemoteMethodByName('create', true);
  Document.disableRemoteMethodByName('upsert', true);
  Document.disableRemoteMethodByName('deleteById', true);
  Document.disableRemoteMethodByName('updateAll', true);
  Document.disableRemoteMethodByName('updateAttributes', false);
  Document.disableRemoteMethodByName('createChangeStream', true);
  Document.disableRemoteMethodByName('replace', true);
  Document.disableRemoteMethodByName('replaceById', true);
  Document.disableRemoteMethodByName('upsertWithWhere', true);
  Document.disableRemoteMethodByName('replaceOrCreate', true);
  Document.disableRemoteMethodByName('prototype.patchAttributes', true);

  // Disable endpoints for related models
  Document.disableRemoteMethodByName('prototype.__get__members');
  Document.disableRemoteMethodByName('prototype.__create__members');
  Document.disableRemoteMethodByName('prototype.__delete__members');
  Document.disableRemoteMethodByName('prototype.__updateById__members');
  Document.disableRemoteMethodByName('prototype.__findById__members');
  Document.disableRemoteMethodByName('prototype.__destroyById__members');
  Document.disableRemoteMethodByName('prototype.__count__members');

  Document.disableRemoteMethodByName('prototype.__get__datasets');
  Document.disableRemoteMethodByName('prototype.__create__datasets');
  Document.disableRemoteMethodByName('prototype.__delete__datasets');
  Document.disableRemoteMethodByName('prototype.__updateById__datasets');
  Document.disableRemoteMethodByName('prototype.__findById__datasets');
  Document.disableRemoteMethodByName('prototype.__destroyById__datasets');
  Document.disableRemoteMethodByName('prototype.__count__datasets');

  Document.disableRemoteMethodByName('prototype.__get__parameters');
  Document.disableRemoteMethodByName('prototype.__create__parameters');
  Document.disableRemoteMethodByName('prototype.__delete__parameters');
  Document.disableRemoteMethodByName('prototype.__updateById__parameters');
  Document.disableRemoteMethodByName('prototype.__findById__parameters');
  Document.disableRemoteMethodByName('prototype.__destroyById__parameters');
  Document.disableRemoteMethodByName('prototype.__count__parameters');
};
