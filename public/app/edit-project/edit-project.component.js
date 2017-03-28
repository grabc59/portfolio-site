(function() {
  'use strict';

  angular.module('app')
  .component('editProject', {
    controller: controller,
    templateUrl: `app/edit-project/edit-project.template.html`
 });
    controller.$inject = ['projectsListService', '$stateParams', '$state'];

    function controller(projectsListService, $stateParams, $state) {
      const vm = this;
      
      vm.$onInit = function() {
        console.log("edit-project controller start");
        const projectId = $stateParams.id;
        vm.getSpecificProject(projectId);
      }

      vm.getSpecificProject = function(projectId) {
          projectsListService.getSpecificProject(projectId)
          .then(function(response) {
              console.log(response);
                vm.project = response.data;
            });
      }

      vm.submitProject = function(project) {
        console.log(project);
        projectsListService.patchProject(project)
            .then(function(response) {
                delete vm.editPost;
                console.log(response);
                $state.go('projectsList');
            });
        };
      }
    
}());