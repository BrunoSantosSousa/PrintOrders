<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use App\Http\RequestRules\IRestfulRequestRule;


class Controller extends BaseController
{
    private $requestRule;

    public function __construct(IRestfulRequestRule $requestRule) {
        $this->requestRule = $requestRule;
    }

    public function validatePost(Request $request) {
        $this->validate($request, $this->requestRule->getPostRules());
    }

    public function validatePut(Request $request) {
        $this->validate($request, $this->requestRule->getPutRules());
    }

    public function validateDestroy(Request $request) {
        $this->validate($request, $this->requestRule->getDestroyRules());
    }

}
