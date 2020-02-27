<?php
namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\Factory as Auth;
use App\Order;

class UserOrderService implements IOrderService
{
    private $orderService = null;
    private $userGradeService = null;
    private $auth = null;

    public function __construct(
        OrderService $orderService,
        UserGradeService $userGradeService,
        Auth $auth)
    {
        $this->orderService = $orderService;
        $this->userGradeService = $userGradeService;
        $this->auth = $auth;
    }

    public function createOrder(Request $request, $type)
    {
        return $this->orderService->createOrder($request, $type);
    }

    public function updateOrder(Request $request, $orderId)
    {
        $this->orderService->updateOrder($request, $orderId);
    }

    public function filterOrders($statusList, $checked = null)
    {
        $user = $this->auth->user();
        $gradeIdList = $this->userGradeService->listUserGradeId($user);
        $query = Order::whereIn('grade_id', $gradeIdList);
        if(is_array($statusList) && count($statusList) > 0) {
            $query = $query->whereIn('status', $statusList);
        }
        if($checked != null) {
            $query = $query->where('checked', '=', $checked);
        }
        return $query->paginate(10);
    }
}
