<?php
namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Crypt;
use App\User;

class UserCommand extends Command
{

    protected $signature = 'user:make {name} {uid} {role}';

    protected $description = 'Make a user.';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $name = $this->argument('name');
        $uid = $this->argument('uid');
        try {
            $user = app(User::class);
            $user->name = $name;
            $user->uid = Crypt::encrypt($uid);
            $user->role = $this->argument('role');
            $user->status = 'active';
            $user->save();
            $this->info("User created: " . $user);
        } catch(\Exception $e) {
            $this->info("Unable to create user.");
        }
    }

}
