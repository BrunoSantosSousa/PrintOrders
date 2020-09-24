<?php
namespace App\Http\Resources;

class BookOrderResource implements IResource
{
    public function format($model) : Array
    {
        return [
            'id' => $model->id,
            'type' => 'book',
            'book_id' => $model->book_order->id,
            'book_name' => $model->book_order->book_name,
            'pages' => $model->book_order->pages,
            'delivery_date' => $model->delivery_date,
            'status' => $model->status,
            'checked' => $model->checked,
            'comments' => $model->comments,
            'drive_path' => $model->drive_path,
            'grade' => $model->grade->description
        ];
    }
}
