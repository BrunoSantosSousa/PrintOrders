<?php
namespace AppTest\Http;

use AppTest\TestCase;
use AppTest\Traits\AdminUserTrait;
use Laravel\Lumen\Testing\DatabaseMigrations;

class TestOrderControllerTest extends TestCase
{
    use DatabaseMigrations;
    use AdminUserTrait;

    public function testShowRequest()
    {
        $user = $this->getAdminUser();
        $testOrder = factory(\App\TestOrder::class)->create();
        $response = $this->actingAs($user)->call('GET', "/api/order/test/{$testOrder->order_id}");
        //dd($response->getContent());
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
            'description' => 'Math test'
        ];

        $response = $this->actingAs($user)->json('POST', '/api/order/test/', $data);

        $response->seeJson([
            'message' => 'CREATED'
        ]);
    }

    public function testPutRequest()
    {
        $user = $this->getAdminUser();
        $grade = factory(\App\Grade::class)->create();
        $testOrder = factory(\App\TestOrder::class)->create();
        $data = [
            'comments' => 'Now it has a comment',
            'status' => 'awaiting',
            'checked' => 1,
            'description' => 'its not ctrl c ctrl v'
        ];
        $response = $this->actingAs($user)->json('PUT', "/api/order/test/{$testOrder->id}", $data);
        $response->seeJson([
            'message' => 'UPDATED'
        ]);
    }
}
