'use strict';

module.exports = function (Dataset) {
  Dataset.disableRemoteMethodByName('prototype.__get__parameters');
  Dataset.disableRemoteMethodByName('prototype.__create__parameters');
  Dataset.disableRemoteMethodByName('prototype.__delete__parameters');
  Dataset.disableRemoteMethodByName('prototype.__updateById__parameters');
  Dataset.disableRemoteMethodByName('prototype.__findById__parameters');
  Dataset.disableRemoteMethodByName('prototype.__destroyById__parameters');
  Dataset.disableRemoteMethodByName('prototype.__count__parameters');

  Dataset.disableRemoteMethodByName('prototype.__get__files');
  Dataset.disableRemoteMethodByName('prototype.__create__files');
  Dataset.disableRemoteMethodByName('prototype.__delete__files');
  Dataset.disableRemoteMethodByName('prototype.__updateById__files');
  Dataset.disableRemoteMethodByName('prototype.__findById__files');
  Dataset.disableRemoteMethodByName('prototype.__destroyById__files');
  Dataset.disableRemoteMethodByName('prototype.__count__files');
};
