import React from 'react';
import {BrowserRouter,Route,Link,Switch} from 'react-router-dom'

import './App.css';

import Product from './pages/Product'
import ProductForm from './pages/ProductForm'
import Category from './pages/Category'
import User from './pages/User'
import ProductDetails from './pages/ProductDetails'
import Memo from './pages/Memo'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/* 左侧导航 */}
      <div className="nav_left">
        <div className="title">
          KFC-后台管理系统
        </div>
        <ul>
          <li>
            <Link to="/category">分类管理</Link>
          </li>
          <li>
            <Link to="/product">菜单管理</Link>
          </li>
          <li>
            <Link to="/user">用户管理</Link>
          </li>
          <li>
            <Link to="/memo">备忘录</Link>
          </li>
        </ul>
      </div>
      {/* 右侧内容 */}
      <div className="content_right">
      
        {/* 路由 */}
        <Switch>
          <Route path="/product" component={Product}/>
          <Route path="/productForm" component={ProductForm}/>
          <Route path="/category" component={Category}/>
          <Route path="/user" component={User}/>
          <Route path="/productDetails" component={ProductDetails}/>
          <Route path="/memo" component={Memo}/>
        </Switch>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;