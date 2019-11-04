<?php
namespace App\Services;

interface IUidGenerator
{
    /**
     * Function responsible for generating the unique user id.
     *
     * @return string
     */
    public function generate() : string;
}
