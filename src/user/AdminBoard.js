import React, { useState, useEffect } from 'react';
import Layout from '../main/Layout';
import { Link } from 'react-router-dom';
import Chart from 'react-google-charts';
import {
  listOrders,
  getProducts,
  getCategories,
  getStatusValues,
  updateOrderStatus,
} from '../admin/apiAdmin';
import { isAuthenticated } from '../backEnd';

export default function AdminBoard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [cate, setCates] = useState([]);
  const [status, setStatus] = useState([]);
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const { user, token } = isAuthenticated();
  const loadOrders = async () => {
    const data = await listOrders(user._id, token);
    if (data.error) {
      console.log(data.error);
    } else {
      setOrders(data);
    }
  };
  const loadProducts = async () => {
    const data = await getProducts(user._id, token);
    if (data.error) {
      console.log(data.error);
    } else {
      setProducts(data);
    }
  };

  const loadCategories = async () => {
    const data = await getCategories(user._id, token);
    if (data.error) {
      console.log(data.error);
    } else {
      setCates(data);
    }
  };

  useEffect(() => {
    loadOrders();
    loadProducts();
    loadCategories();
  }, []);
  const adminLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">Admin Actions</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/create/category">
              Create Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to={`/create/product`}>
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to={`/admin/orders`}>
              View Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Admin Information</h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">
            {role === 1 ? 'Admin' : 'Regular User'}
          </li>
        </ul>
      </div>
    );
  };

  const siteInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Buiness Overview</h3>
        <ul className="list-group">
          <li className="list-group-item">total orders: {orders.length}</li>
        </ul>
        <ul className="list-group">
          <li className="list-group-item">total products: {products.length}</li>
        </ul>
        <ul className="list-group">
          <li className="list-group-item">total categories: {cate.length}</li>
        </ul>
      </div>
    );
  };

  return (
    <Layout title="Dashboard" description={`Hi ${name}`} className="container">
      <div className="row">
        <div className="col-3">{adminLinks()}</div>
        <div className="col-9">
          {adminInfo()}
          {siteInfo()}
        </div>
      </div>
    </Layout>
  );
}
