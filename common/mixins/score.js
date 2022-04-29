
const PSSService = require("../pss-service");
const modelsWithScore = ["Dataset","Document"];

module.exports = (Model, options) => {

  const pssScoreService = new PSSService.Score();
  const pssScoreEnabled = process.env.PSS_ENABLE || false;

  // Set score property
  Model.afterRemote('find', async (ctx, result, next) => {
    // check if we received a query
    console.log("Filter : " + JSON.stringify(ctx.args));
    const query = (
      ( Object.keys(ctx.args).includes('filter')
        && typeof(ctx.args.filter) === 'object'
        && Object.keys(ctx.args.filter).includes('query') )
      ? ctx.args.filter.query
      : null
    );
    console.log("Requested query : " + query);
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
    //console.log(pssScoreEnabled);
    //console.log(modelWithScore);
    //console.log(operation);
    // check scoring is enabled and we are working with Datasets and Documents
    if (query && pssScoreEnabled && modelWithScore && operation === 'find') {
      console.log("Requested query : " + query);
      // we need to score the results
      // extract the ids of the dataset returned by SciCat
      const datasetsIds = ctx.result.map((i) => i.pid);
      const scores = await pssScoreService.score(query, datasetsIds, requestedModel);
      const assignScore = (instance) => {
        instance.score = scores[instance.pid];
      }
      ctx.result.forEach(assignScore);
    }
    else {
      ctx.result.forEach((instance) => {
        instance.score = 0;
      });
    }
    //next();
  });
};
