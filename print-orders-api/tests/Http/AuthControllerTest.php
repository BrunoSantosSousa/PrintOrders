<?php
namespace AppTest\Http;

use AppTest\TestCase;

class AuthControllerTest extends TestCase
{

    public function testPostRequest()
    {
        $response = $this->call('POST', '/api/register', ['name' => 'Bruno dos Santos']);
        // dd($response->getContent());
        $this->assertEquals(200, $response->status());
    }

}
