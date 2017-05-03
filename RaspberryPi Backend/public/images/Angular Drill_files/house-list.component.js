(function() {
  'use strict'

  angular.module('app', ['ui-router'])
    .component('houseList', {
      controller: function(houseService) {
        const vm = this

        vm.$onInit = function() {
          vm.houses = houseService.houses
        }
      },
      template: `
        <h1>Houses</h1>

        <ul>
          <li ng-repeat="house in $ctrl.houses">
          <a ui-sref="home">
          { { house.name }}
          </a>
            <!-- TODO: add link here -->
          </li>
        </ul>

        <!-- TODO: add link here -->
      `
    })

}());
