(function() {
  'use strict';

  angular.module('app')
  .component('adsList', {
    controller: controller,
    templateUrl: `app/ads-list/ads-list.template.html`
 });
    controller.$inject = ['adsListService'];

    function controller(adsListService) {
      const vm = this;
      
      vm.$onInit = function() {
        vm.getAds();
        vm.toggleAdvertiseFormTracker = false;
      }

      ////////////////////////////////
      //////// LOADING ADS
      ////////////////////////////////
      vm.getAds = function() {
        adsListService
        .getAds()
        .then(function(ads) {
          vm.ads = ads;
        });
      };

      vm.toggleAdvertiseForm = function(e) {
        vm.toggleAdvertiseFormTracker = !vm.toggleAdvertiseFormTracker;
        console.log(vm.toggleAdvertiseFormTracker);
      }

      vm.submitAd = function(ad) {
        adsListService
        .submitAd(ad)
        .then(function() {
          vm.toggleAdvertiseFormTracker = false;
          delete vm.ad;
          vm.getAds();
        })
      }

      vm.deleteAd = function(adId) {
        console.log(adId)
        adsListService
        .deleteAd(adId)
        .then(function() {
          vm.getAds();
        })
      }


    }
}());