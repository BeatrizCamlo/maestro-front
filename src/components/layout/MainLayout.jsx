import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';

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
