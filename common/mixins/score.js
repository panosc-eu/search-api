module.exports = (Model, options) => {
  // Set score property
  Model.afterRemote('find', (ctx, result, next) => {
    ctx.result.forEach((instance) => {
      instance.score = 0;
    });
    next();
  });
};
