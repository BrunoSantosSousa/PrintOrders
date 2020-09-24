<?php
namespace App\Http\Resources;

class TestOrderResource implements IResource
{
    public function format($model) : Array
    {
        return [
            'id' => $model->id,
            'type' => 'test',
            'test_id' => $model->test_order->id,
            'description' => $model->test_order->description,
            'delivery_date' => $model->delivery_date,
            'status' => $model->status,
            'checked' => $model->checked,
            'comments' => $model->comments,
            'drive_path' => $model->drive_path,
            'grade' => $model->grade->description
        ];
    }
}
