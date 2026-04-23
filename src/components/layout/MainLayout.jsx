import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const MainLayout = () => (
  <div className="min-h-screen flex flex-col bg-white">
    <Header />
    <main className="flex-grow flex items-center justify-center p-4">
      <Outlet />
    </main>
    <Footer />
  </div>
);
export default MainLayout;