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
        vm.toggleProjectFormTracker = false;
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

      vm.toggleProjectForm = function(e) {
        vm.toggleProjectFormTracker = !vm.toggleProjectFormTracker;
        console.log(vm.toggleProjectFormTracker);
      }

      vm.submitProject = function(project) {
        projectsListService
        .submitProject(project)
        .then(function() {
          vm.toggleProjectFormTracker = false;
          delete vm.project;
          vm.getProject();
        })
      }

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