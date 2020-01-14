<?php
namespace App\Http\Resources;

interface IResourceCollection
{
    public function format($collection) : Array;
}
