import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TURFS, SLOT_TIMINGS } from '@/data/turfs';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import SlotPicker from '@/components/SlotPicker';
import PaymentModal from '@/components/PaymentModal';
import {
  MapPin,
  Clock,
  Users,
  IndianRupee,
  CalendarIcon,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const TurfDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { bookSlot } = useApp();

  const turf = TURFS.find((t) => t.id === id);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingId, setBookingId] = useState('');

  if (!turf) {
    return (
      <div className="container py-12 text-center">
        <h2 className="font-heading text-xl font-bold text-foreground">Turf not found</h2>
        <Button className="mt-4" onClick={() => navigate('/')}>
          Go Back
        </Button>
      </div>
    );
  }

  const dateString = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  const selectedSlotTiming = selectedSlot !== null ? SLOT_TIMINGS[selectedSlot] : null;

  const handlePaymentSuccess = () => {
    if (selectedSlot !== null && selectedDate) {
      const newBookingId = bookSlot(
        turf.id,
        turf.name,
        turf.city,
        dateString,
        selectedSlot,
        turf.pricePerSlot
      );
      setBookingId(newBookingId);
      setShowPayment(false);
      setBookingSuccess(true);
    }
  };

  const handleProceedToPayment = () => {
    setShowPayment(true);
  };

  if (bookingSuccess) {
    return (
      <div className="container py-12">
        <Card className="max-w-lg mx-auto animate-scale-in">
          <CardContent className="pt-8 text-center">
            <div className="rounded-full bg-success/10 p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <CheckCircle2 className="h-12 w-12 text-success" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
              Slot Booked Successfully!
            </h2>
            <p className="text-muted-foreground mb-6">
              Your booking has been confirmed
            </p>

            <div className="bg-secondary rounded-lg p-4 space-y-3 text-left mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Booking ID</span>
                <span className="font-mono font-semibold text-primary">{bookingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Turf</span>
                <span className="font-semibold">{turf.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">City</span>
                <span className="font-semibold">{turf.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="font-semibold">
                  {selectedDate && format(selectedDate, 'PPP')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Slot</span>
                <span className="font-semibold">
                  {selectedSlotTiming?.startTime} - {selectedSlotTiming?.endTime}
                </span>
              </div>
            </div>

            <Button
              variant="hero"
              size="lg"
              className="w-full"
              onClick={() => navigate('/my-bookings')}
            >
              Go to My Bookings
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-32 md:pb-12">
      {/* Hero Image */}
      <div className="relative h-64 md:h-80">
        <img
          src={turf.image}
          alt={turf.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-card/80 backdrop-blur hover:bg-card"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="absolute bottom-6 left-4 right-4 md:left-6">
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
            {turf.name}
          </h1>
          <p className="flex items-center gap-1 text-primary-foreground/90">
            <MapPin className="h-4 w-4" />
            {turf.address}
          </p>
        </div>
      </div>

      <div className="container py-6 grid md:grid-cols-3 gap-6">
        {/* Left Column - Details */}
        <div className="md:col-span-2 space-y-6">
          {/* Quick Info */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="text-center p-4">
              <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Open Hours</p>
              <p className="font-semibold">24 Hours</p>
            </Card>
            <Card className="text-center p-4">
              <Users className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Max Players</p>
              <p className="font-semibold">{turf.maxPlayers}</p>
            </Card>
            <Card className="text-center p-4">
              <IndianRupee className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Per Slot</p>
              <p className="font-semibold">₹{turf.pricePerSlot}</p>
            </Card>
          </div>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">About this Turf</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{turf.description}</p>
            </CardContent>
          </Card>

          {/* Date & Slot Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Select Date & Slot</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Date Picker */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Select Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal h-12',
                        !selectedDate && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-popover" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Slot Picker */}
              {selectedDate && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Select Time Slot
                  </label>
                  <SlotPicker
                    turfId={turf.id}
                    date={dateString}
                    selectedSlot={selectedSlot}
                    onSelectSlot={setSelectedSlot}
                    pricePerSlot={turf.pricePerSlot}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Booking Summary (Desktop) */}
        <div className="hidden md:block">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg">Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Turf</span>
                  <span className="font-medium">{turf.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">City</span>
                  <span className="font-medium">{turf.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">
                    {selectedDate ? format(selectedDate, 'PPP') : 'Not selected'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Slot</span>
                  <span className="font-medium">
                    {selectedSlotTiming
                      ? `${selectedSlotTiming.startTime} - ${selectedSlotTiming.endTime}`
                      : 'Not selected'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Max Players</span>
                  <span className="font-medium">{turf.maxPlayers}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Price</span>
                  <span className="text-2xl font-bold text-foreground">
                    ₹{turf.pricePerSlot}
                  </span>
                </div>
              </div>

              <Button
                variant="hero"
                size="lg"
                className="w-full"
                disabled={selectedSlot === null || !selectedDate}
                onClick={handleProceedToPayment}
              >
                Proceed to Payment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mobile Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t p-4 md:hidden">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-muted-foreground">Total Price</p>
            <p className="text-xl font-bold text-foreground">₹{turf.pricePerSlot}</p>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            {selectedSlotTiming
              ? `${selectedSlotTiming.startTime} - ${selectedSlotTiming.endTime}`
              : 'Select a slot'}
          </div>
        </div>
        <Button
          variant="hero"
          size="lg"
          className="w-full"
          disabled={selectedSlot === null || !selectedDate}
          onClick={handleProceedToPayment}
        >
          Proceed to Payment
        </Button>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        open={showPayment}
        onClose={() => setShowPayment(false)}
        onSuccess={handlePaymentSuccess}
        amount={turf.pricePerSlot}
      />
    </div>
  );
};

export default TurfDetails;
