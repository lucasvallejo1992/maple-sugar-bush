import { useQuery } from 'react-query';
import Axios from 'axios';

import { Product } from '../types/product.type';
import { ProductType } from '../enums/ProductType.enum';
import { useEffect } from 'react';

export const useCatalog = (type?: ProductType) => {
  const { data, isError, isLoading, refetch } = useQuery<Product[]>(
    ['catalog'],
    async () => {
      const params = type === ProductType.ALL ? undefined : { type };
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/products`,
        { params }
      );
      
      return res.data;
    });

    useEffect(() => {
      refetch();
    }, [type])

  return { products: data, isError, isLoading, refetchProducts: refetch };
}