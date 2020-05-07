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

  // Remove empty results to simulate INNER JOIN
  Dataset.afterRemote('find', (ctx, result, next) => {
    const filter = ctx.args.filter ? ctx.args.filter : {};
    const primaryRelations = filter.include
      ? filter.include.map(({relation}) => relation)
      : [];

    if (primaryRelations.length > 0) {
      let modifiedResult;
      primaryRelations.forEach((relation) => {
        modifiedResult = ctx.result.filter((dataset) =>
          Array.isArray(dataset['__data'][relation])
            ? dataset['__data'][relation].length > 0
            : Object.keys(dataset['__data']).includes(relation),
        );
      });
      ctx.result = modifiedResult;
    }
    next();
  });
};
