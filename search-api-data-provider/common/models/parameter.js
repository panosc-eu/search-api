'use strict';

module.exports = function(Parameter) {
  Parameter.disableRemoteMethodByName('get');
  Parameter.disableRemoteMethodByName('findById');
  Parameter.statistics = function(cb) {
    Parameter.find({}, function(err, parameters) {
      var statistic = {};
      for (let parameter of parameters) {
        if (statistic[parameter.name] === undefined) {
          statistic[parameter.name] = [{'value': parameter.value, 'unit': parameter.unit, 'count': 1}];
        } else {
          var availableParameter = undefined;
          for (let statParameter of statistic[parameter.name]) {
            if (statParameter.value === parameter.value && statParameter.unit === parameter.unit) {
              availableParameter = statParameter;
            }
          }
          if (availableParameter !== undefined) {
            availableParameter.count += 1
          } else {
            statistic[parameter.name].push({'value': parameter.value, 'unit': parameter.unit, 'count': 1})
          }
        }
      }

      cb(null, statistic);
    });
  };
  Parameter.remoteMethod(
    'statistics', {
      http: {
        path: '/statistics',
        verb: 'get'
      },
      returns: {
        arg: 'parameters',
        type: 'Object'
      }
    }
  );
};
