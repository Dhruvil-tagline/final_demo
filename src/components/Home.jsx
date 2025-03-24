import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar';

const Home = () => {
  const { pathname } = useLocation();
  if (pathname === '/') {
    return <Navigate to='/dashboard' />
  }
  return (
    <div>
      <Navbar />
      <div style={{marginTop:"20px"}}>
      <Outlet />
      </div>
    </div>
  )
}

export default Home
