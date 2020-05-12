module.exports = (Model, options) => {
  // Sanitize results to simulate INNER JOIN
  Model.afterRemote('find', (ctx, result, next) => {
    const filter = ctx.args.filter ? ctx.args.filter : {};
    const primaryRelations = getPrimaryRelations(filter);
    const secondaryRelations = getSecondaryRelations(primaryRelations, filter);

    if (primaryRelations.length > 0) {
      primaryRelations.forEach((primary) => {
        if (
          secondaryRelations[primary] &&
          secondaryRelations[primary].length > 0
        ) {
          secondaryRelations[primary].forEach((secondary) => {
            ctx.result = filterOnSecondary(result, primary, secondary);
          });
        } else {
          ctx.result = filterOnPrimary(result, primary);
        }
      });
    }
    next();
  });
};

/**
 * Get primary relations from filter
 * @param {string} filter LoopBack filter object
 * @returns {string[]} Array of primary relations
 */
function getPrimaryRelations(filter) {
  return filter.include ? filter.include.map(({relation}) => relation) : [];
}

/**
 * Get secondary relations from filter
 * @param {string[]} primaryRelations Array of primary relations
 * @param {string} filter LoopBack filter object
 * @returns {object} Object with primary relation as key and and an array of secondary relations as value
 */
function getSecondaryRelations(primaryRelations, filter) {
  return primaryRelations.length > 0 &&
    filter.include.filter(
      (inclusion) => inclusion.scope && inclusion.scope.include,
    ).length > 0
    ? Object.assign(
        ...primaryRelations.map((primary) => ({
          [primary]: [].concat.apply(
            [],
            filter.include.map((inclusion) =>
              inclusion.relation === primary && inclusion.scope
                ? inclusion.scope.include.map(({relation}) => relation)
                : [],
            ),
          ),
        })),
      )
    : {};
}

/**
 * Filter result on primary relation
 * @param {object[]} result The result from the LoopBack query
 * @param {string} primary Name of the primary relation
 * @returns {object[]} Sanitized result
 */
function filterOnPrimary(result, primary) {
  return result.filter((item) =>
    Array.isArray(item['__data'][primary])
      ? item['__data'][primary].length > 0
      : Object.keys(item['__data']).includes(primary),
  );
}

/**
 * Filter result on secondary relation
 * @param {object[]} result The result from the LoopBack query
 * @param {string} primary Name of the primary relation
 * @param {string} secondary Name of the secondary relation
 * @returns {object[]} Sanitized result
 */
function filterOnSecondary(result, primary, secondary) {
  return result.filter((item) =>
    Array.isArray(item['__data'][primary])
      ? (item['__data'][primary] =
          item['__data'][primary].filter((child) =>
            Array.isArray(child['__data'][secondary])
              ? child['__data'][secondary].length > 0
              : Object.keys(child['__data']).includes(secondary),
          ).length > 0
            ? item['__data'][primary].filter((child) =>
                Array.isArray(child['__data'][secondary])
                  ? child['__data'][secondary].length > 0
                  : Object.keys(child['__data']).includes(secondary),
              )
            : null)
      : Object.keys(item['__data']).includes(primary) &&
        item['__data'][primary].filter((child) =>
          Array.isArray(child['__data'][secondary])
            ? child['__data'][secondary].length > 0
            : Object.keys(child['__data']).includes(secondary),
        ).length > 0,
  );
}
