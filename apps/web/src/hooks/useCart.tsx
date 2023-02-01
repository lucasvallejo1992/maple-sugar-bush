import Axios from 'axios';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

import { ProductType } from '../enums/ProductType.enum';
import { useState } from 'react';
import { showDefaultErrorToast } from '../utils/toast.utils';

const addToCartLoadingBaseValue = {
  id: '',
  loading: false,
}

export const useCart = (type?: ProductType) => {
  const [isLoadingAddToCart, setIsLoadingAddToCart] = useState(addToCartLoadingBaseValue);

  const { data, isError, isLoading, refetch: refectchCart } = useQuery<[]>(
    ['cart'],
    async () => {
      const res = await Axios.get(`${process.env.REACT_APP_API_BASE_URL}/cart`);
      return res.data;
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
      setIsLoadingAddToCart({ id: productId, loading: true })
      await Axios.patch(`${process.env.REACT_APP_API_BASE_URL}/cart?productId=${productId}`, undefined, {
        params: {
          productId,
          newQty
        }
      });
      
      await refectchCart();
      toast.success('Item quantity updated.');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingAddToCart(addToCartLoadingBaseValue);
    }
  }

  return {
    cart: data,
    isError,
    isLoading,
    isLoadingAddToCart,
    addItemToCart,
    updateItemFromCart,
  };
}