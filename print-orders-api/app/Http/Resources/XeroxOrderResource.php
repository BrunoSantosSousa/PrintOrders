<?php
namespace App\Http\Resources;

class XeroxOrderResource implements IResource
{
    public function format($model) : Array
    {
        return [
            'id' => $model->id,
            'type' => 'xerox',
            'xerox_id' => $model->xerox_order->id,
            'description' => $model->xerox_order->description,
            'delivery_date' => $model->delivery_date,
            'status' => $model->status,
            'checked' => $model->checked,
            'comments' => $model->comments,
            'drive_path' => $model->drive_path,
            'grade' => $model->grade->description
        ];
    }
}
