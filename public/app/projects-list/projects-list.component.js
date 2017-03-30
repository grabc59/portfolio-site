(function() {
  'use strict';

  angular.module('app')
  .component('projectsList', {
    controller: controller,
    templateUrl: `app/projects-list/projects-list.template.html`
 });
    controller.$inject = ['projectsListService'];

    function controller(projectsListService) {
      const vm = this;
      
      vm.$onInit = function() {
        vm.getProjects();
      }

      ////////////////////////////////
      //////// LOADING PROJECTS
      ////////////////////////////////
      vm.getProjects = function() {
        projectsListService
        .getProjects()
        .then(function(projects) {
          vm.projects = projects;
        });
      };

      vm.deleteProject = function(projectId) {
        console.log(projectId)
        projectsListService
        .deleteProject(projectId)
        .then(function() {
          vm.getProjects();
        })
      }


    }
}());