<?php
namespace App\Http\Resources;

interface IResource
{
    public function format($model) : Array;
}
