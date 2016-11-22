(function() {
  'use strict';

      angular.module('myApp',[])
      .controller('myController', myController);


       function myController($scope,$http, $log,$filter){


         $scope.yourName = "luke mcallister";
         $http.get('got.json').
         success(function(response) {
           $scope.users = response;
            $log.info('chargée')


         })
          .error(function(data,status) {
            console.log('erreur');

          })
          $scope.removeUser = function(user){
              console.log(user);
             var position = $scope.users.indexOf(user);
             console.log(position);
              $scope.users.splice(position,1);
            }
            Materialize.toast('I am a toast!', 4000)

       }



}());
