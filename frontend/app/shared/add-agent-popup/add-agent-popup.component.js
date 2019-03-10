'use strict';

// Register `agentDetail` component, along with its associated controller and template
angular.
  module('shared').
  component('agentPopup', {
    templateUrl: 'shared/add-agent-popup/add-agent-popup.template.html',
    bindings: {
      modalInstance: "<",
      resolve: "<"
    },
    controller: ['Agent', function (Agent) {
      let $ctrl = this;
      this.isNew = false;
      this.$onInit = function () {
        $ctrl.statusList = ['Active', 'Inactive', 'Revoked']
        // Check if agent is passed in to be edited
        if (this.resolve.agent) {
          this.agent = this.resolve.agent;
        } else {
          this.isNew = true;
          this.agent = this.initAgent();
        }
      }
      this.handleClose = function () {
        console.info("in handle close");
        this.modalInstance.close(this.modalData);
      };
      this.handleDismiss = function () {
        console.info("in handle dismiss");
        this.modalInstance.dismiss("cancel");
      };
      this.submit = function () {
        if (this.isNew) {
          addNewAgent();
        } else {
          updateAgent();
        }
      }
      this.initAgent = function () {
        return {
          firstName: '',
          lastName: '',
          status: 'Active',
          totalSales: 0,
          grossCommission: 0,
          totalHomes: 0
        }
      };
      // Methods only used inside of component
      function updateAgent() {
        Agent.updateAgent($ctrl.agent).then((updatedAgent) => {
          $ctrl.modalInstance.close({ status: 'update', agent: $ctrl.agent });
        })
      };
      function addNewAgent() {
        Agent.addNewAgent($ctrl.agent).then((agents) => {
          $ctrl.modalInstance.close({ status: 'new', agent: $ctrl.agent });
          $ctrl.isNew = false;
        });
      }
    }]
  });