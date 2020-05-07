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

  // Remove empty results to simulate INNER JOIN
  Document.afterRemote('**', async (ctx, result) => {
    let modifiedResult;
    if (ctx.args.filter) {
      const {filter} = ctx.args;
      if (filter.include) {
        const relations = filter.include.map(({relation}) => relation);

        if (Array.isArray(result)) {
          relations.forEach((relation) => {
            modifiedResult = result.filter((document) => {
              if (Array.isArray(document['__data'][relation])) {
                return document['__data'][relation].length !== 0;
              } else {
                return Object.keys(document['__data']).includes(relation);
              }
            });
          });
          ctx.result = modifiedResult;
        }
      }
    }
  });
};
