<?php
namespace AppTest\Http;

use AppTest\TestCase;
use AppTest\Traits\AdminUserTrait;
use Laravel\Lumen\Testing\DatabaseMigrations;

class BookOrderControllerTest extends TestCase
{
    use DatabaseMigrations;
    use AdminUserTrait;

    public function testShowRequest()
    {
        $user = $this->getAdminUser();
        $bookOrder = factory(\App\BookOrder::class)->create();
        $response = $this->actingAs($user)->call('GET', "/api/order/book/{$bookOrder->order_id}");
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
            'book_name' => '6º Ano - Trilhas - Módulo 1',
            'pages' => '10, 11 e 12'
        ];

        $response = $this->actingAs($user)->json('POST', '/api/order/book', $data);

        $response->seeJson([
            'message' => 'CREATED'
        ]);
    }

    public function testPutRequest()
    {
        $user = $this->getAdminUser();
        $bookOrder = factory(\App\BookOrder::class)->create();
        $data = [
            'comments' => 'Book scan is boring!',
            'status' => 'awaiting',
            'checked' => 1,
            'book_name' => 'Another book',
            'pages' => '404'
        ];
        $response = $this->actingAs($user)->json('PUT', "/api/order/book/{$bookOrder->id}", $data);
        $response->seeJson([
            'message' => 'UPDATED'
        ]);
    }
}
