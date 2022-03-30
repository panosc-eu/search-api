
const PSSService = require("../pss-service");
const pssScoreService = new PSSService.Score();
const pssScoreEnabled = process.env.PSS_ENABLE || false;
const modelsWithScore = ["Dataset","Document"];

module.exports = (Model, options) => {
  // Set score property
  Model.afterRemote('find', (ctx, result, next) => {
    // check if we received a query
    const query = (
      ( Object.keys(ctx.args).includes('filter') && Object.keys(ctx.args.filter).includes('query') )
      ? ctx.args.filter.query
      : None
    );
    // check if we are working with Datasets and Documents
    const requestedModel = ctx.methodString.split('.')[0];
    const operation = ctx.methodString.split('.')[1];
    let modelWithScore=false
    if (modelsWithScore.includes(requestedModel)) {
      modelWithScore=true
    }
    else {
      requestModel="Other"
    }

    // check scoring is enabled and we are working with Datasets and Documents
    if (query && pssScoreEnabled && modelWithScore && operation === 'find') {
      // we need to score the results
      // extract the ids of the dataset returned by SciCat
      const datasetsIds = ctx.result.map((i) => i.pid);
      const scores = pssScoreService.score(query, datasetsIds, requestedModel);

    }
    else {
      ctx.result.forEach((instance) => {
        instance.score = 0;
      });
    }
    next();
  });
};
