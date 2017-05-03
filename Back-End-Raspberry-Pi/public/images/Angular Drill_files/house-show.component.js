(function() {
  'use strict'

  angular.module('app', ['ui-router'])
    .component('houseShow', {
      controller: function(houseService) {
        const vm = this

        vm.$onInit = function() {
          // TODO: figure out how to pull the house id from the URL
          const houseId = "";
          vm.house = houseService.findById(houseId)
        }

      },
      template: `
        <h1>{{$ctrl.house.name}}</h1>

        <p>{{$ctrl.house.address}}</p>

        <!-- TODO: add link here -->
      `
    })

}());
