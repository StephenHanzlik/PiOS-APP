(function() {
  'use strict'

  angular.module('app')
    .service('houseService', function () {
      this.houses = [
        {id: 1, name: 'Spacious two bedroom', address: '10 Main St'},
      ]

      this.addHouse = function (house) {
        this.houses.push(house)
        house.id = this.houses.length
      }

      this.findById = function (id) {
        return this.houses.find(house => house.id == id)
      }
    })

}());
