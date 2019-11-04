<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {

        // Request Rules
        $this->app->bind(\App\Http\RequestRules\AuthRequestRule::class);

        // Services
        $this->app->bind(\App\Services\IUidGenerator::class, \App\Services\UidGenerator::class);

    }
}
