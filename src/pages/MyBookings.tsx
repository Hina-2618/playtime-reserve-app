import React from 'react';
import { useApp } from '@/context/AppContext';
import BookingCard from '@/components/BookingCard';
import { Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const MyBookings: React.FC = () => {
  const { bookings } = useApp();
  const navigate = useNavigate();

  const sortedBookings = [...bookings].sort((a, b) => {
    const dateA = new Date(a.bookedAt);
    const dateB = new Date(b.bookedAt);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <div className="flex items-center gap-3 mb-8">
          <div className="gradient-primary rounded-lg p-2">
            <Calendar className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">
              My Bookings
            </h1>
            <p className="text-sm text-muted-foreground">
              View and manage your turf bookings
            </p>
          </div>
        </div>

        {sortedBookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
              <MapPin className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="font-heading text-xl font-semibold text-foreground mb-2">
              No bookings yet
            </h2>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              You haven't made any bookings yet. Browse available turfs and book
              your first slot!
            </p>
            <Button variant="hero" size="lg" onClick={() => navigate('/')}>
              Browse Turfs
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
