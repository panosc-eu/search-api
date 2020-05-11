'use strict';

module.exports = function (Dataset) {
  // Disable endpoints for related models
  Dataset.disableRemoteMethodByName('prototype.__get__parameters');
  Dataset.disableRemoteMethodByName('prototype.__create__parameters');
  Dataset.disableRemoteMethodByName('prototype.__delete__parameters');
  Dataset.disableRemoteMethodByName('prototype.__updateById__parameters');
  Dataset.disableRemoteMethodByName('prototype.__findById__parameters');
  Dataset.disableRemoteMethodByName('prototype.__destroyById__parameters');
  Dataset.disableRemoteMethodByName('prototype.__count__parameters');

  Dataset.disableRemoteMethodByName('prototype.__create__files');
  Dataset.disableRemoteMethodByName('prototype.__delete__files');
  Dataset.disableRemoteMethodByName('prototype.__updateById__files');
  Dataset.disableRemoteMethodByName('prototype.__findById__files');
  Dataset.disableRemoteMethodByName('prototype.__destroyById__files');
  Dataset.disableRemoteMethodByName('prototype.__count__files');

  Dataset.disableRemoteMethodByName('prototype.__get__samples');
  Dataset.disableRemoteMethodByName('prototype.__create__samples');
  Dataset.disableRemoteMethodByName('prototype.__delete__samples');
  Dataset.disableRemoteMethodByName('prototype.__updateById__samples');
  Dataset.disableRemoteMethodByName('prototype.__findById__samples');
  Dataset.disableRemoteMethodByName('prototype.__destroyById__samples');
  Dataset.disableRemoteMethodByName('prototype.__count__samples');
  Dataset.disableRemoteMethodByName('prototype.__exists__samples');
  Dataset.disableRemoteMethodByName('prototype.__link__samples');
  Dataset.disableRemoteMethodByName('prototype.__unlink__samples');

  Dataset.disableRemoteMethodByName('prototype.__get__techniques');
  Dataset.disableRemoteMethodByName('prototype.__create__techniques');
  Dataset.disableRemoteMethodByName('prototype.__delete__techniques');
  Dataset.disableRemoteMethodByName('prototype.__updateById__techniques');
  Dataset.disableRemoteMethodByName('prototype.__findById__techniques');
  Dataset.disableRemoteMethodByName('prototype.__destroyById__techniques');
  Dataset.disableRemoteMethodByName('prototype.__count__techniques');
  Dataset.disableRemoteMethodByName('prototype.__exists__techniques');
  Dataset.disableRemoteMethodByName('prototype.__link__techniques');
  Dataset.disableRemoteMethodByName('prototype.__unlink__techniques');
};
