import React from 'react';
import { Route, Routes } from "react-router-dom";

import MainLayout from '../layouts/MainLayout';
import Cart from '../pages/Cart';
import Catalog from '../pages/Catalog';
import ProductDetail from '../pages/ProductDetail';
import NotFound from '../pages/NotFound';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Catalog />} />
      <Route path="cart" element={<Cart />} />
      <Route path="product/:id" element={<ProductDetail />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default AppRoutes;
