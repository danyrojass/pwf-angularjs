/**
 * Clase encargada de manejar el listado de personas.
 * @class
 */

app.controller('formularioPersonaCtrl', ['$scope', '$rootScope', 'personaService', 'dataFactory',
    function ($scope, $rootScope, personaService, dataFactory) {
        /**
         * Array que contiene los datos de la lista
         * @type Array
         * @field
         */

         $scope.persona = {};

        /**
         * Se encarga de agregar datos a la lista
         * @function
         */

        $scope.agregar = function () {
          var contact = angular.copy($scope.persona);
    	    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

          if ($scope.persona.nombre == undefined){
            alert('¡Campo "Nombre" debe ser no nulo!');
            return false;
          }
          else if ($scope.persona.apellido == undefined){
            alert('¡Campo "Apellido" debe ser no nulo!');
            return false;
          }
          else if ($scope.persona.alias == undefined){
            alert('¡Campo "Alias" debe ser no nulo!');
            return false;
          }
          else if ($scope.persona.telefono == undefined){
            alert('¡Campo "Teléfono" debe ser no nulo!');
            return false;
          }
          else if ($scope.persona.direccion == undefined){
            alert('¡Campo "Dirección" debe ser no nulo!');
            return false;
          }
    	    else if (reg.test($scope.persona.email) == false)
    	    {
            alert('¡Campo "Email" inválido!');
            return false;
    	    } else {
            dataFactory.insertContact(contact)
                .then(function (response) {
                    window.alert("¡Contacto guardado!");
		    window.open("#agenda/"+response.data.id+"/editar", '_self',false);
		    $rootScope.persona = $scope.persona;
                }, function(error) {
                    window.alert("¡No se pudo guardar el contacto!");
                });
    	   }
       }
    }
 ]);