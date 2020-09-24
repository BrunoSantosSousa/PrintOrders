<?php
namespace AppTest\Http;

use AppTest\TestCase;
use AppTest\Traits\AdminUserTrait;
use Laravel\Lumen\Testing\DatabaseMigrations;

class OrderControllerTest extends TestCase
{
    use DatabaseMigrations;
    use AdminUserTrait;

    /**
     * @group order
     */
    public function testGetRequest()
    {
        $user = $this->getAdminUser();
        factory(\App\XeroxOrder::class, 10)->create();
        $response = $this->actingAs($user)->call('GET', '/api/order/?status=done');
        $this->assertEquals(200, $response->status());
    }
}
