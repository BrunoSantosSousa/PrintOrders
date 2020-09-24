<?php
namespace App\Services;

use Illuminate\Http\Request;
use App\Order;

class OrderService implements IOrderService
{

    public function createOrder(Request $request, $type)
    {
        return Order::create([
            'grade_id' => $request->input('grade_id'),
            'type' => $type,
            'status' => 'pending',
            'checked' => 0,
            'comments' => $request->has('comments') ? $request->input('comments') : '',
            'delivery_date' => $request->input('delivery_date')
        ]);
    }

    public function updateOrder(Request $request, $orderId)
    {
        $order = Order::find($orderId);
        $order->status = $request->input('status');
        $order->checked = $request->input('checked');
        if($request->has('comments')) {
            $order->comments = $request->input('comments');
        }
        if($request->has('drive_path')) {
            $order->drive_path = $request->input('drive_path');
        }
        if($request->has('delivery_date')) {
            $order->delivery_date = $request->input('delivery_date');
        }
        $order->save();
    }

    public function filterOrders($statusList, $start_date = null, $end_date = null) {
        throw new \Exception("Method is not implemented!");
    }

}
