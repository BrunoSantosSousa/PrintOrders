<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class UserGrade extends Model
{

    protected $fillable = [ 'user_id', 'grade_id' ];

    public function grade()
    {
        return $this->belongsTo(Grade::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
