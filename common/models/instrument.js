'use strict';

module.exports = function (Instrument) {
  Instrument.afterRemote('**', async (ctx, result) => {
    let modifiedResult;
    if (ctx.args.filter) {
      const {filter} = ctx.args;
      if (filter.include) {
        const relations = filter.include.map(({relation}) => relation);

        if (Array.isArray(result)) {
          relations.forEach((relation) => {
            modifiedResult = result.filter((dataset) => {
              if (Array.isArray(dataset['__data'][relation])) {
                return dataset['__data'][relation].length !== 0;
              } else {
                return Object.keys(dataset['__data']).includes(relation);
              }
            });
          });
          ctx.result = modifiedResult;
        }
      }
    }
  });
};
