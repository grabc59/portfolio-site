(function() {
  'use strict';

  angular.module('app')
  .component('editAd', {
    controller: controller,
    templateUrl: `app/edit-ad/edit-ad.template.html`
 });
    controller.$inject = ['adsListService', '$stateParams', '$state'];

    function controller(adsListService, $stateParams, $state) {
      const vm = this;
      
      vm.$onInit = function() {
        console.log("edit-ad controller start");
        const adId = $stateParams.id;
        vm.getSpecificAd(adId);
      }

      vm.getSpecificAd = function(adId) {
          adsListService.getSpecificAd(adId)
          .then(function(response) {
              console.log(response);
                vm.ad = response.data;
            });
      }

      vm.submitAd = function(ad) {
          console.log(ad);
        adsListService.patchAd(ad)
            .then(function(response) {
                delete vm.editPost;
                console.log(response);
                $state.go('adsList');
            });
        };
      }
    
}());