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
        $this->app->bind(\App\Http\RequestRules\GradeRequestRule::class);

        // Resources
        $this->app->bind(\App\Http\Resources\UserGradeResource::class);

        // Resource Collections
        $this->app->bind(\App\Http\Resources\IResourceCollection::class,
                         \App\Http\Resources\ResourceCollection::class);

        $this->app->bind('App/Http/Resources/UserGradeResourceCollection', function($app) {
            $userGradeResource = $app->make(\App\Http\Resources\UserGradeResource::class);
            return $app->makeWith(\App\Http\Resources\IResourceCollection::class, [
                'resource' => $userGradeResource
            ]);
        });


        // Services
        $this->app->bind(\App\Services\IUidGenerator::class, \App\Services\UidGenerator::class);

    }
}
