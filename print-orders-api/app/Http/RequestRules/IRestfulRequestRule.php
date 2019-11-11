<?php
namespace App\Http\RequestRules;

interface IRestfulRequestRule
{
    /**
     * Rules for post requests.
     *
     * @return Array
     */
    public function getPostRules() : Array;

    /**
     * Rules for put requests.
     *
     * @return Array
     */
    public function getPutRules() : Array;

    /**
     * Rules for delete requests.
     *
     * @return Array
     */
    public function getDestroyRules() : Array;
}
