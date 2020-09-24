<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{

    protected $fillable = [
        'grade_id',
        'type',
        'status',
        'checked',
        'comments',
        'delivery_date'
    ];

    public function grade()
    {
        return $this->belongsTo(Grade::class);
    }

    public function test_order()
    {
        return $this->hasOne(TestOrder::class);
    }

    public function book_order()
    {
        return $this->hasOne(BookOrder::class);
    }

    public function xerox_order()
    {
        return $this->hasOne(XeroxOrder::class);
    }
}
