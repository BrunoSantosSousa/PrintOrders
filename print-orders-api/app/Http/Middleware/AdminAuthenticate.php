<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\Factory as Auth;

class AdminAuthenticate
{
    protected $auth;

    public function __construct(Auth $auth)
    {
        $this->auth = $auth;
    }

    public function handle($request, Closure $next, $guard = null)
    {
        // dd($this->auth->user());

        if($this->auth->user()->role !== 'admin') {
            return response('Unauthorized.', 401);
        }
        return $next($request);
    }
}
