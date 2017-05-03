'use strict';

angular.module('app', [])
  .component("reddit", {

    controller: function() {
      const vm = this;

      vm.posts = [
        { title: "bravo did what?!?", body: "he pooped on the rug", author: "Jazz", image: "dinky.jpg" },
        { title: "david did what?!?", body: "she pooped on the rug", author: "Egg", image: "dinky.jpg" },
        { title: "alpha did what?!?", body: "he pooped on the rug", author: "Dinky", image: "dinky.jpg" }
      ];

      vm.addPost = function() {
        if (vm.post) {
          vm.posts.push(vm.post);
          delete vm.post;
        }
      }

      vm.dropInit = "Votes"

    },
    templateUrl: "template.html"

  });
