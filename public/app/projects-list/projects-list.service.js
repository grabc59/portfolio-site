(function() {
    'use strict';

    angular.module('app')
        .service('projectsListService', projectsListService);

    projectsListService.$inject = ['$http'];

    function projectsListService($http) {

        this.getProjects = getProjects;
        this.submitProject = submitProject;
        this.getSpecificProject = getSpecificProject;
        this.patchProject = patchProject;
        this.deleteProject = deleteProject;

        function getProjects() {
            return $http.get('/classifieds/')
                .then(function(response) {
                    return response.data;
                });
        }

        function getSpecificProject(projectId) {
            return $http.get('/classifieds/' + projectId)
                .then(function(response) {
                    return response;
                });
        }

        function submitProject(newProject) {
            return $http.post('/classifieds/', newProject)
                .then(function(response) {
                    console.log(response)
                    return response.data;
                });
        }

      function patchProject(editProject) {
        return $http.patch('/classifieds/' + editProject.id, editProject)
          .then(function(response) {
            return response;
          });
      }

      function deleteProject(projectId) {
        return $http.delete('/classifieds/' + projectId)
          .then(function(response) {
            return response;
          });
      }
    }
}());
