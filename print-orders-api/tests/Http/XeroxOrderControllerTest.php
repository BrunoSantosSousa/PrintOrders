<?php
namespace AppTest\Http;

use AppTest\TestCase;
use AppTest\Traits\AdminUserTrait;
use Laravel\Lumen\Testing\DatabaseMigrations;

class XeroxOrderControllerTest extends TestCase
{

    use DatabaseMigrations;
    use AdminUserTrait;

    public function testShowRequest()
    {
        $user = $this->getAdminUser();
        $xeroxOrder = factory(\App\XeroxOrder::class)->create();
        $response = $this->actingAs($user)->call('GET', "/api/order/xerox/{$xeroxOrder->order_id}");
        $this->assertEquals(200, $response->status());
    }

    public function testPostRequest()
    {
        $user = $this->getAdminUser();
        $grade = factory(\App\Grade::class)->create();

        $data = [
            'grade_id' => $grade->id,
            'comments' => 'No comment',
            'delivery_date' => '2020-02-10',
            'description' => 'Portuguese xerox'
        ];

        $response = $this->actingAs($user)->json('POST', '/api/order/xerox/', $data);

        $response->seeJson([
            'message' => 'CREATED'
        ]);
    }

    public function testPutRequest()
    {
        $user = $this->getAdminUser();
        $grade = factory(\App\Grade::class)->create();
        $xeroxOrder = factory(\App\XeroxOrder::class)->create();
        $data = [
            'comments' => 'Now it has a comment!',
            'status' => 'awaiting',
            'checked' => 1,
            'description' => 'changed description'
        ];
        $response = $this->actingAs($user)->json('PUT', "/api/order/xerox/{$xeroxOrder->id}", $data);
        $response->seeJson([
            'message' => 'UPDATED'
        ]);
    }


}
