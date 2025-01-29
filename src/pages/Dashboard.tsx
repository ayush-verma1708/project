import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart3, TrendingUp, Package, Users, DollarSign, ShoppingCart, AlertTriangle } from 'lucide-react';
import axios from 'axios';
import { format } from 'date-fns';

interface Order {
  id: string;
  customer: string;
  totalAmount: number;
  status: string;
  createdAt: string;
}

interface Stats {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  lowStockProducts: number;
}

export function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      const response = await axios.get('/api/reports/type/dashboard');
      return response.data as Stats;
    },
  });

  const { data: recentOrders, isLoading: ordersLoading } = useQuery({
    queryKey: ['recentOrders'],
    queryFn: async () => {
      const response = await axios.get('/api/orders?limit=5');
      return response.data as Order[];
    },
  });

  const statCards = [
    {
      title: 'Total Sales',
      value: statsLoading ? '-' : `$${stats?.totalSales.toLocaleString()}`,
      icon: DollarSign,
      trend: '+12.5%',
      color: 'text-green-600',
    },
    {
      title: 'Total Orders',
      value: statsLoading ? '-' : stats?.totalOrders.toLocaleString(),
      icon: ShoppingCart,
      trend: '+5.2%',
      color: 'text-blue-600',
    },
    {
      title: 'Total Customers',
      value: statsLoading ? '-' : stats?.totalCustomers.toLocaleString(),
      icon: Users,
      trend: '+3.1%',
      color: 'text-purple-600',
    },
    {
      title: 'Total Products',
      value: statsLoading ? '-' : stats?.totalProducts.toLocaleString(),
      icon: Package,
      trend: '+2.4%',
      color: 'text-orange-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <button className="px-4 py-2 bg-black-600 text-white rounded-md hover:bg-black-700 focus:outline-none focus:ring-2 focus:ring-black-500 focus:ring-offset-2">
          Generate Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="ml-2 text-sm font-medium text-green-500">{stat.trend}</span>
              <span className="ml-2 text-sm font-medium text-gray-500">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Low Stock Alert */}
      {!statsLoading && stats?.lowStockProducts > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            <p className="ml-3 text-sm text-yellow-700">
              {stats.lowStockProducts} products are running low on stock
            </p>
            <button className="ml-auto text-sm font-medium text-yellow-700 hover:text-yellow-600">
              View Inventory →
            </button>
          </div>
        </div>
      )}

      {/* Recent Orders */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
            <button className="text-sm font-medium text-black-600 hover:text-black-500">
              View all
            </button>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {ordersLoading ? (
            <div className="p-4 text-center text-gray-500">Loading orders...</div>
          ) : (
            recentOrders?.map((order) => (
              <div key={order.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Order #{order.id}</p>
                    <p className="text-sm text-gray-500">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      ${order.totalAmount.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(order.createdAt), 'MMM d, yyyy')}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      order.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Sales Chart */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Sales Overview</h2>
          <select className="text-sm border-gray-300 rounded-md">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
          </select>
        </div>
        <div className="h-72 flex items-center justify-center text-gray-500">
          <BarChart3 className="h-8 w-8 mr-2" />
          <span>Sales chart will be implemented here</span>
        </div>
      </div>
    </div>
  );
}