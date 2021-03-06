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

        /*
        Function to carry out the actual PUT request to S3 using the signed request from the app.
        */
        function uploadFile(file, signedRequest, url){
          const xhr = new XMLHttpRequest();
          xhr.open('PUT', signedRequest);
          xhr.onreadystatechange = () => {
            if(xhr.readyState === 4){
              if(xhr.status === 200){
                document.getElementById('preview').src = url;
                vm.project.image = url;
                console.log(vm.project.image);
              } else {
                alert('Could not upload file.');
              }
            }
          };
          xhr.send(file);
        }

        /*
          Function to get the temporary signed request from the app.
          If request successful, continue to upload the file using this signed
          request.
        */
        function getSignedRequest(file){
          const xhr = new XMLHttpRequest();
          xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
          xhr.onreadystatechange = () => {
            if(xhr.readyState === 4){
              if(xhr.status === 200){
                console.log(xhr.responseText);
                const response = JSON.parse(xhr.responseText);
                uploadFile(file, response.signedRequest, response.url);
              }
              else{
                alert('Could not get signed URL.');
              }
            }
          };
          xhr.send();
        }

        /*
        Function called when file input updated. If there is a file selected, then
        start upload procedure by asking for a signed request from the app.
        */
        function initUpload(){
          const files = document.getElementById('file-input').files;
          const file = files[0];
          if(file == null){
            return alert('No file selected.');
          }
          getSignedRequest(file);
        }

        /*
        Bind listeners when the page loads.
        */
        (() => {
            document.getElementById('file-input').onchange = initUpload;
        })();

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