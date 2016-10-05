/**
 * Enrutador de la aplicación
 */
var app = angular.module('agregamepyApp', ['ngRoute','ui.bootstrap']);

// configure our routes
app.config(function ($routeProvider) {
    $routeProvider
        .when('/personas', {
            templateUrl: 'views/lista-persona-partial.html',
            controller: 'listaPersonaCtrl'
        })

        .when('/agenda/:id/ver', {
            templateUrl: 'views/view.html',
            controller: 'listaPersonaCtrl',
            method: 'view'
        })

        .when('/', {
            templateUrl: 'views/formulario-persona-partial.html',
            controller: 'formularioPersonaCtrl'
        });
});

/**
 * Variable compartida entre los controladores. se utiliza para añadir
 * elementos a la lista de personas.
 */
app.factory('dataFactory', ['$http', function($http) {
    var urlBase = 'https://desa03.konecta.com.py/pwf/rest/agenda';
    var dataFactory = {};
    dataFactory.getContacts = function () {
        return $http.get(urlBase);
    };

    dataFactory.getContact = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    dataFactory.searchContacts = function (inicio, cantidad, parametro) {
        return $http.get(urlBase + "?inicio="+ inicio + "&cantidad=" + cantidad + '&filtro=' + parametro);
    };

    dataFactory.insertContact = function (item) {
        return $http.post(urlBase, item);
    };
    
    return dataFactory;
}]);