module.exports = (Model, options) => {

  /**
   * trying to address the following include filter
   * {
   *  "include" : [
   *   {
   *    "relation":"parameters",
   *    "scope": {
   *     "where":{
   *      "and": [
   *       {"name":"chemical_formula"},
   *       {"value":"Cu"}
   *      ]
   *     }
   *    }
   *   },
   *   {
   *    "relation":"parameters",
   *    "scope": {
   *     "where":{
   *      "and": [
   *       {"name":"sample_state"},
   *       {"value":"solid"}
   *      ]
   *     }
   *    }
   *   }
   *  ]
   * }
   *
   * one liner
   * {"include":[{"relation":"parameters","scope":{"where":{"and": [{"name":"chemical_formula"},{"value":"Cu"}]}}},{"relation":"parameters","scope":{"where":{"and": [{"name":"sample_state"},{"value":"solid"}]}}}]}
   */

  // we intercept the find command to check the filter on parameters
  Model.beforeRemote('find', (ctx, unused, next) => {

    const filter = ctx.args.filter ? ctx.args.filter : {};
    const [parametersRelations, newFilter] = getParametersRelations(filter);

    // we change filter and save the parameters relations
    // only if we have found parameters relations
    if (parametersRelations) {
      dSet(ctx, "data.relations.parameters", parametersRelations);
      ctx.args.filter = newFilter;
    }

    next();
  });

  // we intercept the find command to check the filter on parameters
  Model.afterRemote('find', (ctx, result, next) => {

    const parametersFilters = ctx.data.relations.parameters ? ctx.data.relations.parameters : [];

    if (parametersFilters) {
      ctx.result = filterOnParameters(ctx.result, parametersFilters);
    }

    next();
  });

};

/**
 * extract parameters relations and modify filter to extract all parameters
 * @param {object} filter LoopBack filter object
 * @returns {array} Parameters relations array
 * @returns {object} Modified LoopBack object filter
 */
const getParametersRelations = (filter) => {

  // remove filter on parameter
  const newFilter = JSON.parse(JSON.stringify(filter));
  newFilter.include = filter.include
    ? filter.include
      .filter(
        (primary) => (primary.relation != "parameters")
      )
    : [];

  // extract filter on parameter
  const parametersRelations = filter.include
    ? filter.include
      .filter(
        (primary) => (primary.relation == "parameters")
      )
    : [];
  // if we have a filter on parameter
  // adds the relation with parameter, so we can retrieve all of them
  if (parametersRelations) {
    newFilter.include.push({ "relation": "parameters" });

  }
  return [
    parametersRelations.map((item) => {
      const simpleItem = {};
      item.scope.where.and.forEach((condition) => {
        if ('name' in condition) {
          simpleItem['name'] = condition.name;
        } else if ('value' in condition) {
          simpleItem['value'] = condition.value;
        }
      })
      return simpleItem;
    }),
    newFilter];
}

/**
 * extract results that matches all the parameters filters
 * @param {object} filter LoopBack filter object
 * @returns {array} Parameters relations array
 * @returns {object} Modified LoopBack object filter
 */
const filterOnParameters = (result, parametersFilter) => {

  const filteredResults = result.filter((item) => {
    // we check if each item match all the conditions
    return parametersFilter.every(
      f => item['__data']['parameters'].some(
        p => Object.keys(f).every(
          k => p[k] == f[k])))
  })

  return filteredResults;
}

/**
 * Dynamically sets a deeply nested value in an object.
 * @function
 * @param {!object} obj  - The object which contains the value you want to change/set.
 * @param {!array|string} path  - Array or string representation of path to the value you want to change/set.
 * @param {!mixed} value - The value you want to set it to.
 * @param {boolean} setrecursively - If true, will set value of non-existing path as well.
 */
function dSet(obj, inPath, value, setrecursively = true) {
  const path =
    Array.isArray(inPath)
      ? inPath
      : (
        (typeof inPath === 'string' || inPath instanceof String)
          ? inPath.split(".")
          : []);
  return path.reduce(
    (a, b, level) => {
      if (setrecursively && typeof a[b] === "undefined" && level !== (path.length - 1)) {
        a[b] = {};
      }

      if (level === (path.length - 1)) {
        a[b] = value;
        return value;
      }
      return a[b];
    },
    obj
  );
}
