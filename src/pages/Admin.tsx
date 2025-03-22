
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useToast } from "@/hooks/use-toast";
import { BookingData } from '@/components/booking/types';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Admin = () => {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchBookings();
  }, [filterStatus]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      let query = supabase.from('bookings').select('*');
      
      if (filterStatus) {
        query = query.eq('status', filterStatus);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setBookings(data as BookingData[]);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast({
        title: "Failed to load bookings",
        description: "There was an error loading the booking data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      
      // Update local state
      setBookings(bookings.map(booking => 
        booking.id === id ? { ...booking, status } : booking
      ));
      
      toast({
        title: "Status Updated",
        description: `Booking status has been updated to ${status}.`,
        variant: "default",
      });
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update the booking status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status: string | null) => {
    switch(status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Booking Management</h1>
            <p className="mt-2 text-gray-600">Manage and track all customer bookings</p>
          </div>
          
          <Tabs defaultValue="all" className="mb-6">
            <TabsList>
              <TabsTrigger value="all" onClick={() => setFilterStatus(null)}>All Bookings</TabsTrigger>
              <TabsTrigger value="pending" onClick={() => setFilterStatus('pending')}>Pending</TabsTrigger>
              <TabsTrigger value="in-progress" onClick={() => setFilterStatus('in-progress')}>In Progress</TabsTrigger>
              <TabsTrigger value="completed" onClick={() => setFilterStatus('completed')}>Completed</TabsTrigger>
              <TabsTrigger value="cancelled" onClick={() => setFilterStatus('cancelled')}>Cancelled</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin w-10 h-10 border-4 border-neatspin-600 rounded-full border-t-transparent mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading bookings...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600">No bookings found</p>
              {filterStatus && (
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setFilterStatus(null)}
                >
                  View All Bookings
                </Button>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <Table>
                <TableCaption>
                  {filterStatus ? `Showing ${bookings.length} ${filterStatus} bookings` : `Showing all ${bookings.length} bookings`}
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Pickup Details</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">
                        {formatDate(booking.created_at)}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{booking.name}</div>
                        <div className="text-sm text-gray-500">{booking.email}</div>
                        <div className="text-sm text-gray-500">{booking.phone}</div>
                      </TableCell>
                      <TableCell>
                        {booking.service === 'basic' 
                          ? 'Basic Wash' 
                          : booking.service === 'premium' 
                            ? 'Premium Care' 
                            : 'Family Bundle'}
                      </TableCell>
                      <TableCell>
                        <div>{booking.date}</div>
                        <div className="text-sm text-gray-500">{booking.time}</div>
                        <div className="text-sm text-gray-500 truncate max-w-[200px]">{booking.address}</div>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(booking.status)}`}>
                          {booking.status || 'pending'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {booking.status !== 'in-progress' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => updateBookingStatus(booking.id, 'in-progress')}
                            >
                              Start
                            </Button>
                          )}
                          {booking.status !== 'completed' && booking.status !== 'cancelled' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-green-600 border-green-200 hover:bg-green-50"
                              onClick={() => updateBookingStatus(booking.id, 'completed')}
                            >
                              Complete
                            </Button>
                          )}
                          {booking.status !== 'cancelled' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-red-600 border-red-200 hover:bg-red-50"
                              onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                            >
                              Cancel
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
