<?php

use lalocespedes\Clientes;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->get('/clientes', function(Request $request, Response $response) {

    $cotizaciones = Clientes::select('NomCliente', 'CveCliente');

     $response = $this->response->withStatus(200)
            ->withHeader('Content-type', 'application/json')
            ->write(json_encode([
                'total' => $cotizaciones->count(),
                'items' => $cotizaciones->take(5)->get()
                ]));
    
    return $response;

});
