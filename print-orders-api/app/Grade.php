<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class Grade extends Model
{

    protected $fillable = [ 'description' ];

    public function user_grades()
    {
        return $this->hasMany(UserGrade::class);
    }
}
