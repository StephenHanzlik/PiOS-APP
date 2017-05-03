(function() {
  'use strict'

  angular.module('app', , ['ui-router'])
    .component('houseNew', {
      controller: function($state, houseService) {
        const vm = this

        vm.$onInit = function() {
          vm.houses = houseService.houses
        }

        vm.addHouse = function() {
          houseService.addHouse(vm.house)
            // TODO: go to the appropriate URL here
        }
      },
      template: `
        <h1>New House</h1>

        <form ng-submit="$ctrl.addHouse()">
          <p>
            Name: <input ng-model="$ctrl.house.name">
          </p>
          <p>
            Address: <input ng-model="$ctrl.house.address">
          </p>
          <p>
            <button type="submit">Create House</button>
          </p>
        </form>
      `
    })

}());
