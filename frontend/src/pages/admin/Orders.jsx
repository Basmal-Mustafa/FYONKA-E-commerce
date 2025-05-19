import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/orders/all',
        { 
          headers: { 
            Authorization: `Bearer ${localStorage.getItem('token')}` 
          } 
        }
      );

      if (response.data.data) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.data.message) {
        toast.success('Order status updated successfully');
        fetchAllOrders(); // Refresh the orders list
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error('Failed to update order status');
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-warning';
      case 'processing':
        return 'bg-info';
      case 'shipped':
        return 'bg-primary';
      case 'delivered':
        return 'bg-success';
      case 'cancelled':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col">
          <h2 className="order-title">Order List</h2>
        </div>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : orders.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No orders found.
        </div>
      ) : (
        <div className="row">
          {orders.map((order) => (
            <div key={order._id} className="col-12 mb-4">
              <div className="card order-card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Order Details</h5>
                  <div className="d-flex align-items-center gap-2">
                    <span className="badge bg-primary">ID: {order._id}</span>
                    <select
                      className="form-select form-select-sm"
                      value={order.status || 'pending'}
                      onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                      style={{ width: 'auto' }}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <div className="mb-2">
                        <strong>Customer:</strong>
                        <span className="ms-2">{order.userId?.username || 'Guest'}</span>
                      </div>
                      <div>
                        <strong>Email:</strong>
                        <span className="ms-2">{order.userId?.email || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="text-end">
                        <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                          {order.status || 'Pending'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <h6 className="card-subtitle mb-3 text-muted">Items Ordered</h6>
                  <div className="table-responsive">
                    <table className="table table-sm table-hover">
                      <thead className="table-light">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Item</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Price</th>
                          <th scope="col">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.productId?.name || 'Product not found'}</td>
                            <td>{item.quantity}</td>
                            <td>${item.price?.toFixed(2) || '0.00'}</td>
                            <td>${((item.price || 0) * item.quantity).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="text-end mt-3">
                    <strong>Total Amount:</strong>
                    <span className="ms-2 order-total">${order.totalAmount?.toFixed(2) || '0.00'}</span>
                  </div>
                </div>
                <div className="card-footer text-muted">
                  <small>Order Date: {new Date(order.createdAt).toLocaleDateString()}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
