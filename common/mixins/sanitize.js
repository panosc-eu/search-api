module.exports = (Model, options) => {
  // Sanitize results to simulate INNER JOIN
  Model.afterRemote('find', (ctx, result, next) => {
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
