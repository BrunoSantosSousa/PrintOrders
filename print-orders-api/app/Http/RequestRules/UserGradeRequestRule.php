<?php
namespace App\Http\RequestRules;

class UserGradeRequestRule implements IRestfulRequestRule
{
    public function getPostRules() : Array
    {
        return ['grade_id' => 'required|numeric'];
    }

    public function getPutRules() : Array
    {

    }

    public function getDestroyRules() : Array
    {

    }
}
