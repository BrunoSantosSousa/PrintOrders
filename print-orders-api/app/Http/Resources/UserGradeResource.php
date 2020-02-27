<?php
namespace App\Http\Resources;

class UserGradeResource implements IResource
{
    public function format($model) : Array
    {
        return [
            'id' => $model->id,
            'user' => [
                'id' => $model->user_id
            ],
            'grade' => [
                'id' => $model->grade_id,
                'description' => $model->grade->description
            ]
        ];
    }
}
