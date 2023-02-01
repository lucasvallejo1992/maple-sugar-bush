import { useQuery } from 'react-query';
import Axios from 'axios';

import { Product } from '../types/product.type';
import { ProductType } from '../enums/ProductType.enum';

export const useCatalog = (type?: ProductType) => {
  const { data, isError, isLoading, refetch } = useQuery<Product[]>(
    ['catalog'],
    async () => {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/products`,
        { params: { type } }
      );
      return res.data;
    });

  return { products: data, isError, isLoading };
}