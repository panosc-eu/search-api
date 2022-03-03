'use strict';

module.exports = function(Technique) {
  Technique.disableRemoteMethodByName('get');
  Technique.disableRemoteMethodByName('findById');

};
