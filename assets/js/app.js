(function(angular) {

    'use strict';

    /*

     */
    var app = angular.module('myApp', [
        'ngResource',
        'ngDialog'
    ]);
    
    app.factory('ClientsResource', function ($resource) {

        return $resource("/index.php/clientes", {}, {

            get: {
                method: 'GET',
                url: '/index.php/clientes'
            },
            get_client: {
                method: 'GET',
                url: '/index.php/api/cliente/:CveCliente',
                params: {
                        CveCliente: "@CveCliente"
                    }
            }

        });

    });
    
    app.controller('MainController', function(ngDialog){
       
       var main = this;
       
       main.delete = function()
       {
           ngDialog.open({ template: 'resources/js/views/delete.html' });
       }
        
        
    });
    
    app.controller('ListCtrl', function (ClientsResource) {
        
        var lista = this;
        
        lista.clients = ClientsResource.get();
        
        lista.clients.$promise.then( function(data) {
            
            lista.items = data.items;
            
        });
        
        lista.cliente = function(id) {
          
            lista.client = ClientsResource.get_client({CveCliente: id});
          
            lista.client.$promise.then( function(data) {
            
                lista.client_name = data.item.NomCliente;
            
            });
          
        };
        
    });
    
    
})(angular); /* global angular*/

// jQuery
$('.dropdown-menu').find('input').click(function (e) {
    e.stopPropagation();
});