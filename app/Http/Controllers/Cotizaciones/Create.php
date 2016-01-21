<?php

use lalocespedes\Cotiza;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->get('/cotizaciones/add', function(Request $request, Response $response) {
    
    return $this->view->render($response, 'cotizaciones/add.twig');

    
});

$app->post('/cotizaciones', function(Request $request, Response $response) {
    
    $params = $request->getParams();

    Cotiza::create($params);
    
    $response = $this->response->withStatus(200)
            ->withHeader('Content-type', 'application/json')
            ->write(json_encode([
                'message' => 'Cotizacion generada',
                'folio' => '99999'
            ]));
    
    return $response;

});
