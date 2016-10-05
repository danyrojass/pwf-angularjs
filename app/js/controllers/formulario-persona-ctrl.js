/**
 * Clase encargada de manejar el listado de personas.
 * @class
 */

app.controller('formularioPersonaCtrl', ['$scope', 'personaService', 'dataFactory',
    function ($scope, personaService, dataFactory) {
        /**
         * Array que contiene los datos de la lista
         * @type Array
         * @field
         */

         $scope.persona = {};

         function getContacts() {
             dataFactory.getContacts().then(function (response) {
               $scope.data = response.data;
             }, function (error) {
               window.alert("No se pudieron obtener los contactos.");
             });
         }

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
                    getContacts();
                    window.alert("¡Contacto guardado!");
                }, function(error) {
                    window.alert("¡No se pudo guardar el contacto!");
                });
            window.open("#personas/",'_self',false);
    	   }
       }
    }
 ]);
