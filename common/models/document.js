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
  Document.afterRemote('find', (ctx, result, next) => {
    const filter = ctx.args.filter ? ctx.args.filter : {};
    const primaryRelations = filter.include
      ? filter.include.map(({relation}) => relation)
      : [];

    const secondaryRelations =
      primaryRelations.length > 0 &&
      filter.include.filter(
        (inclusion) => inclusion.scope && inclusion.scope.include,
      ).length > 0
        ? primaryRelations
            .map((primary) => ({
              [primary]: [].concat.apply(
                [],
                filter.include.map((inclusion) =>
                  inclusion.scope
                    ? inclusion.scope.include.map(({relation}) => relation)
                    : [],
                ),
              ),
            }))
            .pop()
        : {};

    if (primaryRelations.length > 0) {
      let sanitizedResult;
      primaryRelations.forEach((primary) => {
        if (
          secondaryRelations[primary] &&
          secondaryRelations[primary].length > 0
        ) {
          secondaryRelations[primary].forEach((secondary) => {
            sanitizedResult = result.filter((item) =>
              Array.isArray(item['__data'][primary])
                ? item['__data'][primary].filter((child) => {
                    return Array.isArray(child['__data'][secondary])
                      ? child['__data'][secondary].length > 0
                      : Object.keys(child['__data']).includes(secondary);
                  }).length > 0
                : Object.keys(item['__data']).includes(primary) &&
                  item['__data'][primary].filter((child) =>
                    Array.isArray(child['__data'][secondary])
                      ? child['__data'][secondary].length > 0
                      : Object.keys(child['__data']).includes(secondary),
                  ).length > 0,
            );
          });
        } else {
          sanitizedResult = result.filter((item) =>
            Array.isArray(item['__data'][primary])
              ? item['__data'][primary].length > 0
              : Object.keys(item['__data']).includes(primary),
          );
        }
      });
      ctx.result = sanitizedResult;
    }
    next();
  });
};
