module.exports = CustomAdapter;

function CustomAdapter(settings) {
  console.log('CustomAdapter: ' + JSON.stringify(settings));
}

CustomAdapter.prototype.connect = function(callback) {
  process.nextTick(callback);
};

/**
 * Check if a model instance exists by id
 * @param {String} modelName The model name
 * @param {*} id The id value
 * @param {Function} [callback] The callback function. Parameters: (error or null, boolean {true if the model instance exists}).
 *
 */
CustomAdapter.prototype.exists = function exists(model, id, callback) {
  console.log('CustomAdapter exists: ' + model + ' ' + id);
  process.nextTick(function() { callback(null, false); }.bind(this));
};

/**
 * Find a model instance by id
 * @param {String} modelName The model name
 * @param {*} id The id value
 * @param {Function} [callback] The callback function. Parameters: (error or null, model instance if it exists otherwise null).
 */
CustomAdapter.prototype.find = function find(model, id, callback) {
  console.log('CustomAdapter find: ' + model + ' ' + id);
  process.nextTick(function() { callback(null, null); }.bind(this));
};

/**
 * Find matching model instances by the filter
 *
 * @param {String} modelName The model name
 * @param {Object} filter The filter
 * @param {Function} [callback] The callback function. Parameters: (error or null, Array of model instances).
 */
CustomAdapter.prototype.all = function all(model, filter, callback) {
  console.log('CustomAdapter all: ' + model + ' ' + JSON.stringify(filter));
  process.nextTick(function() { callback(null, []); });
};

/**
 * Count the number of instances for the given model
 *
 * @param {String} modelName The model name
 * @param {Object} filter The filter for where
 * @param {Function} [callback] The callback function. Parameters: (error or null, count).
 *
 */
CustomAdapter.prototype.count = function count(model, where, callback) {
  console.log('CustomAdapter count: ' + model + ' ' + JSON.stringify(where));
  process.nextTick(function() { callback(null, 0); });
};
