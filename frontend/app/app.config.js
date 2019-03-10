'use strict';

angular.
  module('agentApp').
  config(['$routeProvider',
    function config($routeProvider) {
      $routeProvider.
        when('/agents', {
          template: '<agent-list></agent-list>'
        }).
        when('/agents/:agentId', {
          template: '<agent-detail></agent-detail>'
        }).
        otherwise('/agents');
    }
  ]);
