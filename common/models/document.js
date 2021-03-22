'use strict';

module.exports = function (Document) {
  // Disable endpoints for related models
  Document.disableRemoteMethodByName('prototype.__get__members');
  Document.disableRemoteMethodByName('prototype.__create__members');
  Document.disableRemoteMethodByName('prototype.__delete__members');
  Document.disableRemoteMethodByName('prototype.__updateById__members');
  Document.disableRemoteMethodByName('prototype.__findById__members');
  Document.disableRemoteMethodByName('prototype.__destroyById__members');
  Document.disableRemoteMethodByName('prototype.__count__members');

  Document.disableRemoteMethodByName('prototype.__get__parameters');
  Document.disableRemoteMethodByName('prototype.__create__parameters');
  Document.disableRemoteMethodByName('prototype.__delete__parameters');
  Document.disableRemoteMethodByName('prototype.__updateById__parameters');
  Document.disableRemoteMethodByName('prototype.__findById__parameters');
  Document.disableRemoteMethodByName('prototype.__destroyById__parameters');
  Document.disableRemoteMethodByName('prototype.__count__parameters');


  // v1) Modify request to get authorised documents
  Document.observe('access', function(ctx, next) {
    const userId = ctx.options && ctx.options.userId;

    // modify where clause to filter on member.personId for private data
    if (userId) {
      // public and private data
    } else {
      // public only
    }

    next();
  });

  // v2) Modify returned results, filter only authorised documents
  Document.observe('loaded', function(ctx, next) {
    const userId = ctx.options && ctx.options.userId;

    // Modify results by filtering on member.personId or public data
    // pb: returned results may not have members included

    next();
  });
};
