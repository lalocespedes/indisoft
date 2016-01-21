<?php

use lalocespedes\Clientes;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->get('/clientes', function(Request $request, Response $response) {

    $params = $request->getParams();

    if(isset($params['query'])) {

        $clientes = Clientes::select('NomCliente', 'CveCliente')
            ->where('CveCliente', 'like', '%' .$params['query']. '%')
            ->orWhere('NomCliente', 'like', '%' .$params['query']. '%');

    } else {

        $clientes = new Clientes;
    }

     $response = $this->response->withStatus(200)
            ->withHeader('Content-type', 'application/json')
            ->write(json_encode([
                'total' => $clientes->count(),
                'items' => $clientes->take(5)->get()
                ]));
    
    return $response;

});
