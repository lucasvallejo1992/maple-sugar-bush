import { useQuery } from 'react-query';
import Axios from 'axios';

export const useCatalog = () => {
  const { data, isError, isLoading, refetch } = useQuery(
    ['catalog'],
    async () => {
      const res = await Axios.get('http://127.0.0.1:8080/products');
      console.log(res.data);
      return res.data;
    });

  return { products: data, isError, isLoading };
}