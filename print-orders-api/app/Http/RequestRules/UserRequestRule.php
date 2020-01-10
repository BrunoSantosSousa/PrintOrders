<?php
namespace App\Http\RequestRules;

class UserRequestRule implements IRestfulRequestRule
{
    public function getPostRules() : Array
    {
        return [
            'name' => 'required|string',
            'role' => 'required|in:user,admin'
        ];
    }

    public function getPutRules() : Array
    {
        return ['name' => 'required|string'];
    }

    public function getDestroyRules() : Array
    {
        return ['uid' => 'required|string'];
    }

}
