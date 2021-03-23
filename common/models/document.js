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
    let aclClause = {};
    if (userId) {
      // public and private data
      aclClause = {
        or: [
          {acls: {contains: [userId]}},
          {isPublic: true}
        ]
      };

    } else {
      // public only
      aclClause = {
        isPublic: true
      };
    }

    ctx.query = ctx.query || {};

    // Log request
    const user = userId ? 'user ' + userId : '<anonymous>';
    const scope = ctx.query.where ? JSON.stringify(ctx.query.where) : '<all records>';
    console.log('%s: %s accessed %s: %s', new Date(), user, ctx.Model.modelName, scope);

    // Add clause to existing where or create new
    if (ctx.query.where) {
      if (ctx.query.where.and) {
        ctx.query.where.and.push(aclClause);

      } else {
        var tmpWhere = ctx.query.where;
        ctx.query.where = {};
        ctx.query.where.and = [tmpWhere, aclClause];
      }
    } else {
      ctx.query.where = aclClause;
    }


    next();
  });
};
