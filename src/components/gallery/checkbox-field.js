angular.module('Anavo').
directive('checkboxField', function(inputPrefill, pathsData) {
  'use strict';
  return {
    replace: true,
    restrict: 'E',
    scope: {
      field: '=',
      postData: '='
    },
    controllerAs: 'checkboxFieldVM',
    bindToController: true,
    templateUrl: [
      pathsData.directives,
      'input_fields/checkbox/checkbox-field.html'
    ].join(''),

    controller: function() {
      var vm = this;

      this.$onInit = function() {
        // Check for pre-checked box
        if (
            _.indexOf(inputPrefill.checked, vm.field.entity_field_name) !== -1 &&
            !vm.postData.hasOwnProperty(vm.field.entity_field_name)
          ) {
          vm.postData[vm.field.entity_field_name] = true;
        }
      };
    }
  };
});
