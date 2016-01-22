(function(angular) {

    'use strict';

    /*

     */
    var app = angular.module('myApp', [
        'ngResource',
        'ngDialog'
    ]);

    app.service('ClientsResource', function ($resource) {

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

    app.service('InvprodtermResource', function ($resource) {

        return $resource("/index.php/invprodterm", {}, {

            items: {
                method: 'GET',
                url: '/index.php/api/invprodterm'
            }

        });

    });

    app.controller('MainController', function(ngDialog){

        var main = this;

        main.delete = function()
        {
            ngDialog.open({ template: 'resources/js/views/delete.html' });
        };


    });

    app.controller('ListCtrl', function (ClientsResource, $timeout, ngDialog, $scope, InvprodtermResource) {

        var lista = this;

        function getClients() {

            var clients = ClientsResource.get({
                query: lista.query
            });

            clients.$promise.then(function (data) {

                lista.clients = data.items;

            });

        }

        getClients();

        lista.cliente = function(id) {

            var client = ClientsResource.get_client({CveCliente: id});

            client.$promise.then( function(data) {

                lista.client_name = data.item.NomCliente;

            });

        };


        lista.filter = function() {

            console.log('veamos');

            //$timeout(function(){

            getClients();

            //}, 2000);

        };

        lista.items = [
            {
                'Producto': 'S830001',
                'DescArt': 'PERFO 2222',
                'CantiOrden': 2,
                'PrecioLista': 1000
            },
            {
                'Producto': 'S830022',
                'DescArt': 'PERFO 6666',
                'CantiOrden': 6,
                'PrecioLista': 15000
            },
            {
                'Producto': 'S830111',
                'DescArt': 'PERFO 9999',
                'CantiOrden': 1,
                'PrecioLista': 18000
            }
        ];


        lista.removeItem = function(index) {

            lista.items.splice(index, 1);

        };


        lista.total = function() {

            var total = 0;
            angular.forEach(lista.items, function(item) {
                total += item.CantiOrden * item.PrecioLista;
            });

            return total;
        };

        lista.addItem = function() {
            lista.items.push({
                CantiOrden: 1,
                name: '',
                PrecioLista: 0
            });
        };

        lista.send = function() {

            ngDialog.open({ template: 'nothing.html' });

        };

    });

    app.directive('autoComplete', function(InvprodtermResource) {
        return {
            restrict: "A",
            require: "ngModel",
            link: function(scope, elem, attr, ngModelCtrl) {

                elem.autocomplete({
                    source: function (searchTerm, response) {

                        InvprodtermResource.items(searchTerm).$promise.then(function (autocompleteResults) {

                            response($.map(autocompleteResults.items, function (autocompleteResult) {

                                return {
                                    label:  autocompleteResult.PTNumArticulo + '-' + autocompleteResult.PTDesc,
                                    value: autocompleteResult.PTNumArticulo,
                                    DescArt: autocompleteResult.PTDesc,
                                    PrecioLista: autocompleteResult.PTPrecioVta
                                };

                            }));

                        });

                    },
                    minLength: 3,
                    select: function(event, ui) {

                        event.preventDefault();
                        elem.val(ui.item.value);

                        scope.item.DescArt = ui.item.DescArt;
                        scope.item.PrecioLista = ui.item.PrecioLista;

                        scope.$apply(function() {

                            ngModelCtrl.$setViewValue(ui.item.value);

                        });
                    },
                });
            }

        };
    });


})(angular); /* global angular*/

// jQuery
$('.dropdown-menu').find('input').click(function (e) {
    e.stopPropagation();
});
