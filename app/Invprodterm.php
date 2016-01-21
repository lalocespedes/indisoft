<?php

namespace lalocespedes;

use Illuminate\Database\Eloquent\Model as Eloquent;
/**
 *
 */
class Invprodterm extends Eloquent
{
    protected $table = 'invprodterm';
    public $timestamps = [];

    protected $fillable = [
        'PTNumArticulo',
        'PTDesc',
        'PTPrecioVta'
    ];

    protected $hidden = [
        'updated_at',
        'created_at'
    ];
}
