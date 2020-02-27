<?php
namespace App\Services;

use Illuminate\Http\Request;

interface IOrderService
{
    /**
     * Function responsible for creating the order row.
     *
     * @return object
     */
    public function createOrder(Request $request, $type);

    /**
     * Function responsible for updating the order data.
     *
     * @return void
     */
    public function updateOrder(Request $request, $orderId);

    /**
     * Function responsible for filtering the orders
     * by user, status and checked or not.
     *
     * @return collection
     */
    public function filterOrders($statusList, $checked = null);
}
