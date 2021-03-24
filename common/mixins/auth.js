/**
 * Manage authorization to models using authenticated user and ACLs on the model
 */
module.exports = (Model, options) => {

  // Modify request to get authorised document and datasets based on ACLs
  Model.observe('access', function(ctx, next) {
    const user = ctx.options && ctx.options.user;

    // modify where clause to filter on acls of the model
    let aclClause = {};
    if (user) {
      // public and private data
      aclClause = {
        or: [
          {acls: {contains: [user.id]}},
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
    const userString = user ? `User ${user.username} (${user.id})` : '<anonymous>';
    const scope = ctx.query.where ? JSON.stringify(ctx.query.where) : '<all records>';
    console.log('%s: %s accessed %s: %s', new Date().toISOString(), userString, ctx.Model.modelName, scope);

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
