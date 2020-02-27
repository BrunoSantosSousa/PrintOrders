<?php
namespace App\Services;

use Illuminate\Contracts\Auth\Factory as Auth;

class OrderServiceFactory
{
    private $auth = null;

    public function __construct(Auth $auth)
    {
        $this->auth = $auth;
    }

    public function create()
    {
        if($this->auth->user()->role === 'admin') {
            return app(AdminOrderService::class);
        } else {
            return app(UserOrderService::class);
        }
    }
}
