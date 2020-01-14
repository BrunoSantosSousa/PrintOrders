<?php
namespace App\Http\Resources;

class ResourceCollection implements IResourceCollection
{
    private $resource = null;

    public function __construct(IResource $resource)
    {
        $this->resource = $resource;
    }

    public function format($eloquentCollection) : Array
    {
        $resource = $this->resource;
        return $eloquentCollection->map(function($record) use($resource) {
            return $this->resource->format($record);
        })->toArray();
    }

}
