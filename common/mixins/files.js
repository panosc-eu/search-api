/**
 * Rather than storing files in the database, they are instantiated dynamically and added
 * to the response data.
 */
module.exports = (Model, options) => {

  Model.afterRemote('find', (ctx, result, next) => {
    result.forEach(model => {

      if (Model.modelName === 'Document') {
        const documentData = model.__data;

        const datasets = documentData.datasets;
        datasets.forEach(dataset => {
          const datasetData = dataset.__data;

          injectFiles(datasetData);
        });

      } else if (Model.modelName === 'Dataset') {
        const datasetData = model.__data;

        injectFiles(datasetData);
      }

    });
    next();
  });

};

function injectFiles(dataset) {
  const files = dataset.files;
  if (files && files.length === 0) {
    const starPosition = dataset.path.lastIndexOf('*');
    const path = dataset.path.substring(0, starPosition);
    const extension = (starPosition + 1) === dataset.path.length ? null : dataset.path.substr(starPosition + 1);

    for (let numor = dataset.firstFileNumor; numor <= dataset.lastFileNumor; numor++) {
      files.push({
        name: extension ? `${numor}${extension}`: `${numor}`,
        path: path,
        datasetId: dataset.id
      });
    }
  }

}
