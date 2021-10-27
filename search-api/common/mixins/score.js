module.exports = (Model, options) => {
  // Set score property if not present
  Model.afterRemote('find', (ctx, result, next) => {
    ctx.result.forEach((instance) => {
      //console.log("Model:afterRemote:instance : " + JSON.stringify(instance));
      //console.log("Model:afterRemote:keys : " + JSON.stringify(Object.keys(instance)));
      //console.log("Model:afterRemote:test : " + !('score' in instance));
      if (!('score' in instance) || typeof (instance.score) != 'number' || instance.score < 0 || instance.score >= 1) {
        //console.log("Model:afterRemote setting score to 0");
        instance.score = 0;
      }
    });
    next();
  });
};
