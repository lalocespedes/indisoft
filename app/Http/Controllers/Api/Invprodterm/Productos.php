<?php

use lalocespedes\Invprodterm;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->get('/api/invprodterm', function(Request $request, Response $response) {

    $params = $request->getParams();

    if(isset($params['term'])) {

        $query = Invprodterm::select('PTNumArticulo', 'PTDesc', 'PTPrecioVta')
            ->where('PTNumArticulo', 'like', '%' .$params['term']. '%')
            ->orWhere('PTDesc', 'like', '%' .$params['term']. '%');

    } else {

        $query = new Invprodterm;
    }

    $response = $this->response->withStatus(200)
        ->withHeader('Content-type', 'application/json')
        ->write(json_encode([
            'total' => $query->count(),
            'items' => $query->take(5)->get()
        ]));

    return $response;

});
