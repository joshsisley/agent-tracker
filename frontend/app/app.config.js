'use strict';

angular.
  module('agentApp').
  config(['$routeProvider',
    function config($routeProvider) {
      $routeProvider.
        when('/agents', {
          template: '<agent-list></agent-list>'
        }).
        otherwise('/agents');
    }
  ]);
