import { Outlet, Navigate } from 'react-router-dom';
import Header from './Header'; // Seu header para usuários logados
import Footer from './Footer';
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import { AppSidebar } from '../appSidebar';

const ProtectedLayout = () => {
  /*const isAutenticado = localStorage.getItem('token'); 

  if (!isAutenticado) {
    return <Navigate to="/login" replace />;
  }*/

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <div className="flex flex-col flex-1 w-full">
          <Header /> 
            <main className="grow  p-4">
              <SidebarTrigger />
              <Outlet/>
            </main>
            <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ProtectedLayout;