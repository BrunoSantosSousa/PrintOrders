<?php
namespace AppTest\Services;

use AppTest\TestCase;
use App\Services\IUidGenerator;

class UidGeneratorTest extends TestCase
{


    public function testGenerate()
    {
        $uid = app(IUidGenerator::class)->generate();
        $this->assertEquals(6, strlen($uid));
    }

}
