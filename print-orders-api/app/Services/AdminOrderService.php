<?php
namespace App\Services;

use Illuminate\Http\Request;
use App\Order;

class AdminOrderService implements IOrderService
{
    private $orderService = null;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    public function createOrder(Request $request, $type)
    {
        return $this->orderService->createOrder($request, $type);
    }

    public function updateOrder(Request $request, $orderId)
    {
        return $this->orderService->updateOrder($request, $orderId);
    }

    public function filterOrders($statusList, $start_date = null, $end_date = null)
    {
        $query = null;
        if(is_array($statusList) && count($statusList) > 0) {
            $query = Order::whereIn('status', $statusList);
        } else {
            $query = Order::whereIn('status', ['pending', 'awaiting']);
        }
        if(isset($start_date, $end_date)) {
            $query->whereBetween('delivery_date', array($start_date, $end_date));
        }
        return $query->orderBy('delivery_date', 'desc')->paginate(9);
    }
}
