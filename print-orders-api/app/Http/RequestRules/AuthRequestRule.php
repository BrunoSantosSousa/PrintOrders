<?php
namespace App\Http\RequestRules;

class AuthRequestRule implements IRestfulRequestRule
{
    public function getPostRules() : Array
    {
        return [
            'name' => 'required|string'
        ];
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
