(function() {
    'use strict';

    angular.module('app')
        .service('adsListService', adsListService);

    adsListService.$inject = ['$http'];

    function adsListService($http) {

        this.getAds = getAds;
        this.submitAd = submitAd;
        this.getSpecificAd = getSpecificAd;
        this.patchAd = patchAd;
        this.deleteAd = deleteAd;

        function getAds() {
            return $http.get('/classifieds/')
                .then(function(response) {
                    return response.data;
                });
        }

        function getSpecificAd(adId) {
            return $http.get('/classifieds/' + adId)
                .then(function(response) {
                    return response;
                });
        }

        function submitAd(newAd) {
            return $http.post('/classifieds/', newAd)
                .then(function(response) {
                    console.log(response)
                    return response.data;
                });
        }

      function patchAd(editAd) {
        return $http.patch('/classifieds/' + editAd.id, editAd)
          .then(function(response) {
            return response;
          });
      }

      function deleteAd(adId) {
        return $http.delete('/classifieds/' + adId)
          .then(function(response) {
            return response;
          });
      }
    }
}());
