/*
 * @Class
 * Definición del service que se encarga de la comunicación con la capa de servicios.
 * Abarca las operaciones que pueden ser realizads sobre el recurso Persona.
 */
app.service('personaService', ['$http', function ($http) {
      var urlBase = 'https://desa03.konecta.com.py/pwf/rest/agenda';

      this.getContacts = function () {
          return $http.get(urlBase);
      };

      this.getContact = function (id) {
          return $http.get(urlBase + '/' + id);
      };

      this.searchContacts = function (inicio, cantidad, parametro) {
          return $http.get(urlBase + "?inicio="+ inicio + "&cantidad=" + cantidad + '&filtro=' + parametro);
      };

}]);