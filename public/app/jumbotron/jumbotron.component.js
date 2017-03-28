(function() {
  'use strict';

  angular.module('app')
  .component('jumbotron', {
    controller: controller,
    templateUrl: `app/jumbotron/jumbotron.template.html`
 });
    controller.$inject = ['projectsListService', '$stateParams', '$state'];

    function controller(projectsListService, $stateParams, $state) {
      const vm = this;
      
      vm.$onInit = function() {
        console.log("jumbotron controller start");
      }
    }
}());