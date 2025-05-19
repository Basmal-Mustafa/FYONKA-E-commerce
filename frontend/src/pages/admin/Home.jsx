import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { toast } from 'react-toastify';

// Register chart.js modules
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const Home = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    totalRevenue: 0
  });

  const [ordersData, setOrdersData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Orders Placed',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  });

  const [productsData, setProductsData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Products by Category',
        data: [],
        backgroundColor: [
          '#ef476f', 
          '#ffd166',  
          '#073b4c', 
          '#06d6a0',  
          '#118ab2', 
        ],
      },
    ],
  });

  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Revenue',
        data: [],
        borderColor: '#d90429',
        backgroundColor: 'rgba(217, 4, 41, 0.1)',
        fill: true,
      },
    ],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch orders
        const ordersResponse = await axios.get('http://localhost:5000/api/orders/all', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        // Fetch products
        const productsResponse = await axios.get('http://localhost:5000/api/products');

        // Fetch users
        const usersResponse = await axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        if (ordersResponse.data.data && productsResponse.data.data && usersResponse.data.data) {
          const orders = ordersResponse.data.data;
          const products = productsResponse.data.data;
          const users = usersResponse.data.data;

          // Calculate total revenue
          const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

          // Update stats
          setStats({
            totalOrders: orders.length,
            totalProducts: products.length,
            totalUsers: users.length,
            totalRevenue: totalRevenue
          });

          // Process orders data for chart
          const last6Months = Array.from({ length: 6 }, (_, i) => {
            const d = new Date();
            d.setMonth(d.getMonth() - i);
            return d.toLocaleString('default', { month: 'short' });
          }).reverse();

          const ordersByMonth = last6Months.map(month => {
            return orders.filter(order => {
              const orderDate = new Date(order.createdAt);
              return orderDate.toLocaleString('default', { month: 'short' }) === month;
            }).length;
          });

          setOrdersData(prev => ({
            ...prev,
            labels: last6Months,
            datasets: [{
              ...prev.datasets[0],
              data: ordersByMonth
            }]
          }));

          // Process products data for chart
          const categories = [...new Set(products.map(p => p.categoryId?.name || 'Uncategorized'))];
          const productsByCategory = categories.map(category => 
            products.filter(p => (p.categoryId?.name || 'Uncategorized') === category).length
          );

          setProductsData(prev => ({
            ...prev,
            labels: categories,
            datasets: [{
              ...prev.datasets[0],
              data: productsByCategory
            }]
          }));

          // Process revenue data for chart
          const revenueByMonth = last6Months.map(month => {
            return orders
              .filter(order => {
                const orderDate = new Date(order.createdAt);
                return orderDate.toLocaleString('default', { month: 'short' }) === month;
              })
              .reduce((sum, order) => sum + (order.totalAmount || 0), 0);
          });

          setRevenueData(prev => ({
            ...prev,
            labels: last6Months,
            datasets: [{
              ...prev.datasets[0],
              data: revenueByMonth
            }]
          }));
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard data');
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard">
      <h1 className="text-3xl font-bold text-center my-4 mb-10 font-serif text-[#0f145b]">Welcome to Admin Panel</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 px-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-600">Total Orders</h3>
          <p className="text-2xl font-bold text-[#0f145b]">{stats.totalOrders}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-600">Total Products</h3>
          <p className="text-2xl font-bold text-[#0f145b]">{stats.totalProducts}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-600">Total Users</h3>
          <p className="text-2xl font-bold text-[#0f145b]">{stats.totalUsers}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-600">Total Revenue</h3>
          <p className="text-2xl font-bold text-[#0f145b]">${stats.totalRevenue.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="charts grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        {/* Orders Graph */}
        <div className="chart-container bg-white p-4 rounded-lg shadow" style={{ height: '400px' }}>
          <h2 className="text-xl font-semibold mb-4 text-[#0f145b]">Orders Placed</h2>
          <Bar 
            data={ordersData} 
            options={{ 
              responsive: true, 
              maintainAspectRatio: false 
            }} 
          />
        </div>

        {/* Products by Category Graph */}
        <div className="chart-container bg-white p-4 rounded-lg shadow" style={{ height: '400px' }}>
          <h2 className="text-xl font-semibold mb-4 text-[#0f145b]">Products by Category</h2>
          <Pie 
            data={productsData} 
            options={{ 
              responsive: true, 
              maintainAspectRatio: false 
            }} 
          />
        </div>

        {/* Revenue Graph */}
        <div className="chart-container bg-white p-4 rounded-lg shadow md:col-span-2" style={{ height: '400px' }}>
          <h2 className="text-xl font-semibold mb-4 text-[#0f145b]">Revenue</h2>
          <Line 
            data={revenueData} 
            options={{ 
              responsive: true, 
              maintainAspectRatio: false 
            }} 
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
