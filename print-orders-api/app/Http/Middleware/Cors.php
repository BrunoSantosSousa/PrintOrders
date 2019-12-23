<?php
 namespace App\Http\Middleware;

 use Closure;
 use Illuminate\Http\Response;
 Use Log;

 class Cors {

    protected $settings = array(
        'origin' => '*',
        'allowMethods' => 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
        'allowHeaders' => 'content-type, token',
        'exposeHeaders' => 'token'
    );

    protected function setOrigin($req, $res)
    {
        $origin = $this->settings['origin'];
        if(is_callable($origin)) {
            $origin = call_user_func($origin, $req->header("Origin"));
        }
        $res->header('Access-Control-Allow-Origin', $origin);
    }

    protected function setExposeHeaders($req, $res)
    {
        if(isset($this->settings['exposeHeaders'])) {
            $exposeHeaders = $this->settings['exposeHeaders'];
            if(is_array($exposeHeaders)) {
                $exposeHeaders = implode(", ", $exposeHeaders);
            }
            $res->header('Access-Control-Expose-Headers', $exposeHeaders);
        }
    }

    protected function setMaxAge($req, $res)
    {
        if(isset($this->settings['maxAge'])) {
            $req->headers('Access-Control-Max-Age', $this->settings['maxAge']);
        }
    }

    protected function setAllowCredentials($req, $res)
    {
        if(isset($this->settings['allowCredentials']) && $this->settings['allowCredentials'] === true) {
            $res->header('Access-Control-Allow-Credentials', 'true');
        }
    }

    protected function setAllowMethods($req, $res)
    {
        if(isset($this->settings['allowMethods'])) {
            $allowMethods = $this->settings['allowMethods'];
            if(is_array($allowMethods)) {
                $allowMethods = implode(", ", $allowMethods);
            }
            $res->header('Access-Control-Allow-Methods', $allowMethods);
        }
    }

    protected function setAllowHeaders($req, $res)
    {
        if(isset($this->settings['allowHeaders'])) {
            $allowHeaders = $this->settings['allowHeaders'];
            if(is_array($allowHeaders)) {
                $allowHeaders = implode(", ", $allowHeaders);
            }
        } else {
            $allowHeaders = $req->headers("Access-Control-Request-Headers");
        }
        $res->header('Access-Control-Allow-Headers', $allowHeaders);
    }

    protected function setCorsHeaders($req, $res)
    {
        if($req->isMethod('OPTIONS')) {
            $this->setOrigin($req, $res);
            $this->setMaxAge($req, $res);
            $this->setAllowCredentials($req, $res);
            $this->setAllowMethods($req, $res);
            $this->setAllowHeaders($req, $res);
        } else {
            $this->setOrigin($req, $res);
            $this->setExposeHeaders($req, $res);
            $this->setAllowCredentials($req, $res);
        }
    }

    public function handle($request, Closure $next)
    {
        if($request->isMethod('OPTIONS')) {
            $response = new Response("", 200);
        } else {
            $response = $next($request);
        }
        $this->setCorsHeaders($request, $response);
        return $response;
    }

 }
