angular.module('starter.controllers', [])


.controller('MapController', function($scope, $ionicLoading, $compile) {
  $scope.initialize = function() {
    $scope.centerOnMe();
  }


  $scope.centerOnMe = function() {
    $scope.selectedMap = false;

    var options = { timeout: 10000, enableHighAccuracy: true };

    navigator.geolocation.getCurrentPosition(function(position) {
      var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      var mapOptions = {
        center: latLng,
        zoom: 20,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
      };

      $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

      var marker = new google.maps.Marker({
        position: latLng,
        map: $scope.map,
      });

    });
  }

});