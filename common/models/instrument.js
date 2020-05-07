'use strict';

module.exports = function (Instrument) {
  // Remove empty results to simulate INNER JOIN
  Instrument.afterRemote('find', (ctx, result, next) => {
    const filter = ctx.args.filter ? ctx.args.filter : {};
    const primaryRelations = filter.include
      ? filter.include.map(({relation}) => relation)
      : [];

    if (primaryRelations.length > 0) {
      let modifiedResult;
      primaryRelations.forEach((relation) => {
        modifiedResult = ctx.result.filter((instrument) =>
          Array.isArray(instrument['__data'][relation])
            ? instrument['__data'][relation].length > 0
            : Object.keys(instrument['__data']).includes(relation),
        );
      });
      ctx.result = modifiedResult;
    }
    next();
  });
};
