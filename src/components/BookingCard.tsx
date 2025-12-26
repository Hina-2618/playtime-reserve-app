import React, { useState } from 'react';
import { Booking } from '@/data/turfs';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { MapPin, Calendar, Clock, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface BookingCardProps {
  booking: Booking;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const { cancelBooking } = useApp();
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const bookingDate = new Date(booking.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isFutureBooking = bookingDate >= today;
  const canCancel = booking.status === 'booked' && isFutureBooking;

  const handleConfirmCancel = () => {
    cancelBooking(booking.id);
    setShowCancelDialog(false);
  };

  return (
    <>
      <Card className="overflow-hidden animate-fade-in">
        <div className="gradient-primary px-4 py-3 flex items-center justify-between">
          <span className="text-sm font-medium text-primary-foreground">
            Booking ID: {booking.id}
          </span>
          <Badge
            variant={booking.status === 'booked' ? 'default' : 'destructive'}
            className={
              booking.status === 'booked'
                ? 'bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30'
                : ''
            }
          >
            {booking.status === 'booked' ? 'Confirmed' : 'Cancelled'}
          </Badge>
        </div>
        <CardContent className="pt-4 space-y-3">
          <h3 className="font-heading text-lg font-bold text-foreground">
            {booking.turfName}
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{booking.city}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4 text-primary" />
              <span>
                {new Date(booking.date).toLocaleDateString('en-IN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4 text-primary" />
              <span>{booking.slotTime}</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t">
            <span className="text-sm text-muted-foreground">Amount Paid</span>
            <span className="text-lg font-bold text-foreground">₹{booking.price}</span>
          </div>
        </CardContent>
        {canCancel && (
          <CardFooter>
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => setShowCancelDialog(true)}
            >
              <X className="h-4 w-4" />
              Cancel Booking
            </Button>
          </CardFooter>
        )}
      </Card>

      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Booking?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this booking? This action cannot be
              undone and the slot will become available for others.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Booking</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmCancel}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Yes, Cancel Booking
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default BookingCard;
