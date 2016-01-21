<?php

namespace lalocespedes;

use Illuminate\Database\Eloquent\Model as Eloquent;
/**
 *
 */
class Clientes extends Eloquent
{
    protected $table = 'fclientes';
    public $timestamps = [];
    protected $primaryKey = null;
    public $incrementing = false;

    protected $fillable = [
        'NomCliente',
        'RFCCliente'
    ];

    protected $hidden = [
        'updated_at',
        'created_at'
    ];
}
