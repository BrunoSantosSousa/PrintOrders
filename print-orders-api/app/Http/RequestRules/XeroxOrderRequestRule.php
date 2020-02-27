<?php
namespace App\Http\RequestRules;

class XeroxOrderRequestRule implements IRestfulRequestRule
{

    public function getPostRules() : Array
    {
        return [
            'grade_id' => 'required',
            'delivery_date' => 'required',
            'description' => 'required'
        ];
    }

    public function getPutRules() : Array
    {
        return [
            'status' => 'required|in:pending,awaiting,done',
            'checked' => 'required'
        ];
    }

    public function getDestroyRules() : Array
    {
        return [];
    }

}
