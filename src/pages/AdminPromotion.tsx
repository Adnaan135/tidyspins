
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AdminPromotion from '@/components/admin/AdminPromotion';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminPromotionPage = () => {
  const { user, isAdmin } = useAuth();

  // Only allow access to admin users
  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center bg-gray-50">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6">Admin Tools</h1>
          <AdminPromotion />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminPromotionPage;
