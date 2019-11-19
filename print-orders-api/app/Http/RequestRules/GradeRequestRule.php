<?php
namespace App\Http\RequestRules;

class GradeRequestRule implements IRestfulRequestRule
{
    public function getPostRules() : Array
    {
        return ['description' => 'required|string'];
    }

    public function getPutRules() : Array
    {
        return ['description' => 'required|string'];
    }

    public function getDestroyRules() : Array
    {

    }
}
