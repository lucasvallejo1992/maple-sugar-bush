import { toast } from 'react-toastify';

export const showDefaultErrorToast = () => {
  toast.error('Somethings went wrong. Please try again later.');
}