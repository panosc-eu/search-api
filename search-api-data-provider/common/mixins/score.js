module.exports = (Model, options) => {
  // Set score property
  Model.afterRemote('find', (ctx, result, next) => {
    // ctx.req.query contains the filter expression with parameters.
    // console.log(ctx.req.query)

    // test implementation which assigns the position of object in the list as score/rank.
    score = 0;
    ctx.result.forEach((instance) => {
      instance.score = score;
      score += 1;
    });
    next();
  });
};
