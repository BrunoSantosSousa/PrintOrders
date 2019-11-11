<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class BookOrder extends Model
{

    protected $fillable = ['order_id', 'book_name', 'pages'];

}
