<?php
namespace App\Http\RequestRules;

class OrderRequestRule implements IRestfulRequestRule
{
    public function getPostRules() : Array
    {
        return [];
    }

    public function getPutRules() : Array
    {
        return [];
    }

    public function getDestroyRules() : Array
    {
        return [];
    }
}
