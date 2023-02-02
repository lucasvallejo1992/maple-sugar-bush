import Axios from 'axios';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

import { ProductType } from '../enums/ProductType.enum';
import { useEffect, useState } from 'react';
import { showDefaultErrorToast } from '../utils/toast.utils';
import { ProductCart } from '../types/productCart.type';

const addToCartLoadingBaseValue = {
  id: '',
  loading: false,
}

export const useCart = (type?: ProductType) => {
  const [isLoadingAddToCart, setIsLoadingAddToCart] = useState(addToCartLoadingBaseValue);
  const [productsCount, setProductsCount] = useState(0);
  const [totalInCart, setTotalInCart] = useState(0);

  const { data, isError, isLoading, refetch: refectchCart } = useQuery<ProductCart[]>(
    ['cart'],
    async () => {
      const res = await Axios.get(`${process.env.REACT_APP_API_BASE_URL}/cart`);
      const { data } = res;

      return data;
    });

  const showMaxQtyForProductError = () => {
    toast.error('You have reached the maximum quantity of this product in stock.');
  }

  const addItemToCart = async (productId: string) => {
    try {
      setIsLoadingAddToCart({ id: productId, loading: true })
      await Axios.put(`${process.env.REACT_APP_API_BASE_URL}/cart`, undefined, {
        params: {
          productId,
        }
      });

      await refectchCart();
      toast.success('Item added to your cart.');
    } catch (error: any) {
      const errorMsg: string = error?.response?.data?.message;
  
      errorMsg === 'MAX_STOCK_ERROR' ? showMaxQtyForProductError() : showDefaultErrorToast()
    } finally {
      setIsLoadingAddToCart(addToCartLoadingBaseValue);
    }
  }

  const updateItemFromCart = async (productId: string, newQty: number = 1) => {
    try {
      await Axios.patch(`${process.env.REACT_APP_API_BASE_URL}/cart`, undefined, {
        params: {
          productId,
          newQty
        }
      });

      toast.success('Item quantity updated.');
    } catch (error: any) {
      const errorMsg: string = error?.response?.data?.message;
  
      errorMsg === 'MAX_STOCK_ERROR' ? showMaxQtyForProductError() : showDefaultErrorToast()
    } finally {
      await refectchCart();
    }
  }

  const removeFromCart = async (productId: string) => {
    try {
      await Axios.delete(`${process.env.REACT_APP_API_BASE_URL}/cart`, {
        params: {
          productId,
        }
      });

      toast.success('Item removed from your cart.');
    } catch (error: any) {
      showDefaultErrorToast();
    } finally {
      await refectchCart();
    }
  }

  const checkOrder = async () => {
    try {
      if (!data?.length) {
        return;
      }
  
      const orderList = data?.map(({ productId, qty }) => ({
        productId,
        qty
      }));
  
      const res = await Axios.post(`${process.env.REACT_APP_API_BASE_URL}/order`, orderList);
  
      const { isOrderValid, errors } = res.data;

      if (!isOrderValid && errors.length) {
        errors.forEach((error: string) => {
          toast.error(error);
        });
        return;
      }

      toast.success('Your order is valid.');
    } catch (error: any) {
      showDefaultErrorToast();
    }
  }

  useEffect(() => {
    if (data) {
      setProductsCount(data.reduce(
        (acc: number, curr: any) => acc + curr.qty,
        0
      ));
      setTotalInCart(data.reduce(
        (acc: number, curr: any) => acc + (curr.qty * curr.price),
        0
      ))
    }
  }, [data])

  return {
    productList: data,
    productsCount,
    totalInCart,
    isError,
    isLoading,
    isLoadingAddToCart,
    addItemToCart,
    updateItemFromCart,
    removeFromCart,
    checkOrder,
  };
}