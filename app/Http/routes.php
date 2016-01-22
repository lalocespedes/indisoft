<?php
// Routes

//home
require_once INC_ROOT . '/app/Http/Controllers/Home/Home.php';

//Cotizaciones
require_once INC_ROOT . '/app/Http/Controllers/Cotizaciones/Cotizaciones.php';
require_once INC_ROOT . '/app/Http/Controllers/Cotizaciones/Create.php';


//Api

require_once INC_ROOT . '/app/Http/Controllers/Api/Clientes/Clientes.php';
require_once INC_ROOT . '/app/Http/Controllers/Api/Clientes/Cliente.php';


require_once INC_ROOT . '/app/Http/Controllers/Api/Invprodterm/Producto.php';
require_once INC_ROOT . '/app/Http/Controllers/Api/Invprodterm/Productos.php';
