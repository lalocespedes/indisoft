<?php

namespace lalocespedes;

use Illuminate\Database\Eloquent\Model as Eloquent;
/**
 *
 */
class Cotiza extends Eloquent
{
    protected $table = 'fcotiza';
    public $timestamps = [];

    protected $fillable = [
        'Cliente',
        'CantiOrden'
    ];

    protected $hidden = [
        'updated_at',
        'created_at'
    ];
}
