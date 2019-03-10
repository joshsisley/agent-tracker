'use strict';

// Register `agentList` component, along with its associated controller and template
angular.
  module('agentList').
  component('agentList', {
    templateUrl: 'agent-list/agent-list.template.html',
    controller: ['Agent', '$uibModal',
      function AgentListController(Agent, $uibModal) {
        this.orderProp = 'lastName';
        this.reverseSort = false;
        this.items = ['item1', 'item2', 'item3'];
        this.animationsEnabled = true;
        this.isEdit = false;
        this.selectedId = -1;
        let $ctrl = this;

        Agent.getAllAgents().then((agents) => {
          this.agents = agents;
        });

        this.open = function (agent) {
          let modalInstance = $uibModal.open({
            component: 'agentPopup',
            resolve: {
              agent: function () {
                return agent;
              }
            }
          });
          modalInstance.result.then(function (response) {
            if (response.status === 'update') {
              let index = $ctrl.agents.findIndex(a => a.id === response.agent.id);
              $ctrl.agents.splice(index, 1, response.agent);
            } else {
              $ctrl.agents.push(response.agent);
            }
          }, function () {
            console.log('Modal dismissed at: ' + new Date());
          });
        }

        this.editAgent = function (agent) {
          this.open(agent);
        }

        this.removeAgent = function (agent) {
          Agent.removeAgent(agent).then((agent) => {
            let index = $ctrl.agents.findIndex(a => a.id === agent.id);
            $ctrl.agents.splice(index, 1);
          })
        }

        this.searchAgents = function () {
          Agent.search($ctrl.searchTerm).then((agents) => {
            $ctrl.agents = agents;
          })
        }
      }
    ]
  });
