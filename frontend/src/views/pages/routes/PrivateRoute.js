import { Outlet, Navigate } from 'react-router-dom';
import { isLogin } from '../utils/index';

const PrivateRoutes = () => {
    return(
      isLogin() ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes