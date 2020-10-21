module.exports = function (app, options) {
  const applySearch = function (ctx, next) {
    options.models.forEach((model) => {
      if (this.name === model.name && model.fields) {
        const fields = ctx.args.filter;
        const query = fields && fields.where;
        const primaryIncludes = fields && fields.include;

        if (query && query.text) {
          fields.where = parseAndAppend(model, fields.where);
        }

        if (primaryIncludes) {
          primaryIncludes.forEach((primary) => {
            const primaryFields = primary.scope;
            const primaryQuery = primaryFields && primaryFields.where;
            const secondaryIncludes = primaryFields && primaryFields.include;
            if (primaryQuery && primaryQuery.text) {
              const primaryModel = getModelFromRelation(primary.relation);
              if (primaryModel && primaryModel.fields) {
                primary.scope.where = parseAndAppend(
                  primaryModel,
                  primaryQuery,
                );
              }
            }

            if (secondaryIncludes) {
              secondaryIncludes.forEach((secondary) => {
                const secondaryFields = secondary.scope;
                const secondaryQuery = secondaryFields && secondaryFields.where;
                if (secondaryQuery && secondaryQuery.text) {
                  const secondaryModel = getModelFromRelation(
                    secondary.relation,
                  );
                  if (secondaryModel && secondaryModel.fields) {
                    secondary.scope.where = parseAndAppend(
                      secondaryModel,
                      secondaryQuery,
                    );
                  }
                }
              });
            }
          });
        }
      }
    });
    next();
  };

  const getModelFromRelation = (relation) =>
    options.models.find((model) => relation.includes(model.name.toLowerCase()));

  const parseTextInput = (model, query) =>
    model.fields.length === 1
      ? {[model.fields[0]]: {ilike: `%${query.text}%`}}
      : {
          or: model.fields.map((field) => ({
            [field]: {ilike: `%${query.text}%`},
          })),
        };

  const appendSearchToQuery = (search, where) =>
    Object.keys(where).length !== 0
      ? (search = {and: [search, where]})
      : search;

  const parseAndAppend = (model, where) => {
    const search = parseTextInput(model, where);
    delete where.text;
    return appendSearchToQuery(search, where);
  };

  const remotes = app.remotes();
  const patterns = options.remoteMethods;
  patterns.forEach((pattern) => remotes.before(pattern, applySearch));
};
