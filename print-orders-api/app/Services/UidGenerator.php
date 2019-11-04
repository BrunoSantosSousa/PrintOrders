<?php
namespace App\Services;

class UidGenerator implements IUidGenerator
{

    private $characterGroup = [];

    public function __construct()
    {
        $numbers =  "0123456789";
        $characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $this->characterGroup[0] = $numbers;
        $this->characterGroup[1] = $characters;
    }

    public function generate() : string
    {
        $group = $this->characterGroup;
        $str = "";
        while(strlen($str) < 6){
            $groupN = rand(0, 1);
            $groupIndex = rand(0, strlen($group[$groupN]) - 1);
            $character = substr($group[$groupN], $groupIndex, 1);
            if($groupN == 1) {
                if(rand(0, 1) == 1) {
                    $character = strtolower($character);
                }
            }
            $str .= $character;
        }
        return $str;
    }

}
