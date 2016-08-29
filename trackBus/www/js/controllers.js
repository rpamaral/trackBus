// TODO: Ver forma de encontrar o ônibus mais proximo da pessoa

angular.module('starter.controllers', [])


.controller('MapController', function($scope, $ionicLoading, uiGmapGoogleMapApi, $http) {

  function activate(){
    function mapSetup(){
        return uiGmapGoogleMapApi.then(function(maps) {
            if (navigator.geolocation) {
                $scope.setCurrentPosition();
            } else {
                console.error("No geolocation!");
            }
        });
    };
    return mapSetup().then(function(){
        $scope.getLineMarkers();
        //initializeMarkers();
    });
  };

  $scope.map = {center: {latitude: 0, longitude: 0},
                zoom: 10};
  //Variables
  $scope.markers = [];
  var buses = [];
  $scope.form = {line: ""};

  activate();

  function setPosition (latitude, longitude) {
      $scope.map.refresh({
          latitude: latitude, longitude: longitude
      });
  };

  $scope.setCurrentPosition = function() {
      navigator.geolocation.getCurrentPosition(
          function success(position) {
              setPosition(position.coords.latitude, position.coords.longitude);
          },
          function failure(result) {
              console.error(result);
          },{
              maximumAge: 30000,
              timeout: 5000,
              enableHighAccuracy: true

          }
      );
  };


  function getJsonData() {
    var req = {
                method: 'GET',
                url: 'http://dadosabertos.rio.rj.gov.br/apiTransporte/apresentacao/rest/index.cfm/onibus2',
                //params: {id: id}
            };
    return $http(req);
  };

  function searchLine(result) {
    var columns = result.data.COLUMNS;
    var data = result.data.DATA;
    console.log($scope.form.line)
    if ($scope.form.line == ''){
      return;
    }
    angular.forEach(data, function(bus){
      if(bus[2] == $scope.form.line){
        buses.push(bus);
      }
    });
  };

  function setBusMarkers() {
    $scope.markers = [];
    var result = [];
    angular.forEach(buses, function(bus){
        result.push({
          coords: {latitude: bus[3], longitude: bus[4]},
          line: bus[2]
        })
    });
    console.log(result);
    $scope.markers = result;
  };


  $scope.getLineMarkers = function(){
    return getJsonData().then(function(result){
      searchLine(result);
      setBusMarkers();
    });
  };

});