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
            modifiedResult = result.filter((instrument) => {
              if (Array.isArray(instrument['__data'][relation])) {
                return instrument['__data'][relation].length !== 0;
              } else {
                return Object.keys(instrument['__data']).includes(relation);
              }
            });
          });
          ctx.result = modifiedResult;
        }
      }
    }
  });
};
