/**
 * Clase encargada de manejar el listado de personas.
 * @class
 */
 app.controller('listaPersonaCtrl', ['$scope', '$rootScope', 'dataFactory',

     function ($scope, $rootScope, dataFactory) {
        /**
         * Array que contiene los datos de la visualización
         * @type Array
         * @field
         */
        $scope.data = {};
        $scope.data.lista = [];

        $scope.results = $rootScope.results;
        $scope.persona = $rootScope.persona;

        $scope.currentPage = 0;
        $scope.numPerPage = 5;
        $scope.maxSize = 5;
        /**
         * Constructor / Entrypoint
         * @constructor
         */
        (function initialize() {
            //se realiza el get solo si no hay datos
            if ($scope.data.lista.length == 0) {
                getContacts();
            }
        })();

        function getContacts() {
            dataFactory.getContacts().then(function (response) {
              $scope.data = response.data;
            }, function (error) {
              window.alert("No se pudieron obtener los contactos.");
            });
        };

        getContactos = function(){
           var parametro = document.getElementById("parametro").value;
           var inicio;
           if ($scope.currentPage == 0){
        	   inicio = $scope.currentPage;
           } else {
        	   inicio = $scope.currentPage + 2*(2*($scope.currentPage-1)) -1;
           }
           var cantidad = $scope.numPerPage;
           dataFactory.searchContacts(inicio, cantidad, parametro).then(function (response) {
             $scope.data = response.data;
             $scope.total = response.data.total;
           }, function (error) {
             window.alert("No se pudieron obtener los resultados.");
           });
        };
        
        
        $scope.edit = function(item){
            $scope.persona = angular.copy(item);
            $rootScope.persona = $scope.persona;
            window.open("#agenda/"+item.id+"/editar", '_self',false);
  	      };

        $scope.editContact = function (contact) {
             dataFactory.editContact(contact)
              .then(function (response) {
                  getContacts();
                  window.alert("¡Contacto modificado!");
                  window.open("#personas/",'_self',false);
              }, function (error) {
                  window.alert("Imposible modificar el contacto.");
              });
          };
          
        $scope.deleteContact = function (contact) {
              var result = window.confirm("¿Está seguro que desea borrar el contacto?");
              if(result == true){
                console.log(contact.id);
                 dataFactory.deleteContact(contact).then(function (response) {
                      getContacts();
                      window.alert("¡Contacto elimindo!");
                      window.open("#personas/",'_self',false);
                  }, function (error) {
                      window.alert("Imposible eliminar el contacto.");
                  });
              } else {return false;}
            };

        $scope.buscarContactos = function(){
            getContactos();
        };

        $scope.getContact = function (contact) {
          dataFactory.getContact(contact.id)
          .then(function (response) {
            $scope.persona = angular.copy(response.data);
            $rootScope.persona = $scope.persona;
            window.open("#agenda/"+contact.id+"/ver", '_self',false);
          }, function (error) {
              window.alert("Imposible obtener el contacto.");
        });
    };
}]);