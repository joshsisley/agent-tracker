'use strict';

angular.
  module('core.agent').
  factory('Agent', ['$http',
    function ($http) {
      this.agentList;
      return {
        // Get all agents from the database
        getAllAgents: function () {
          return $http.get('http://localhost:3000/agents')
            .then(function (response) {
              return response.data;
            }, function (error) {
              console.log('Error getting agents', error);
            })
        },
        // Add a new agent
        addNewAgent: function (agent) {
          agent.grossCommission = this.calculateCommission(agent);
          return $http.post("http://localhost:3000/agents", { params: agent })
            .then(function (response) {
              agent.id = response.data.id;
              return agent;
            }, function (err) {
              console.log('Error adding new agent', error);
            })
        },
        // Delete the selected agent
        removeAgent: function (agent) {
          return $http.delete(`http://localhost:3000/agents/${agent.id}`)
            .then(function (response) {
              return agent;
            }, function (error) {
              console.log('Error deleting the agent', error);
            })
        },
        // Update the selected agent
        updateAgent: function (agent) {
          agent.grossCommission = this.calculateCommission(agent);
          return $http.put(`http://localhost:3000/agents/${agent.id}`, { params: agent })
            .then(function (response) {
              return agent;
            }, function (err) {
              console.log('Error updating the agent', error);
            })
        },
        // Called when a user enters search term
        search: function (searchTerm) {
          return $http.get('http://localhost:3000/agents', { params: { searchTerm: searchTerm } })
            .then(function (response) {
              return response.data;
            })
        },
        calculateCommission: function (agent) {
          // Assumes a 60/40 split for now
          let grossCommission = ((agent.totalSales * 0.03) * 0.6).toFixed(2);
          return grossCommission;
        }
      };
    }
  ]);
