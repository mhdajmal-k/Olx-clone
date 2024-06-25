import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const success = (test) => toast.success(test);
export const  failed=(test)=>toast.error(test)