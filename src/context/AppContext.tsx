import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Booking, City, SLOT_TIMINGS, generateBookingId } from '@/data/turfs';

interface SlotState {
  [turfId: string]: {
    [date: string]: {
      [slotId: string]: 'available' | 'booked';
    };
  };
}

interface AppContextType {
  isAuthenticated: boolean;
  user: User | null;
  selectedCity: City;
  bookings: Booking[];
  slotStates: SlotState;
  login: (email: string, password: string) => boolean;
  signup: (user: User) => boolean;
  logout: () => void;
  setSelectedCity: (city: City) => void;
  getSlotStatus: (turfId: string, date: string, slotIndex: number) => 'available' | 'booked';
  bookSlot: (turfId: string, turfName: string, city: string, date: string, slotIndex: number, price: number) => string;
  cancelBooking: (bookingId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [selectedCity, setSelectedCity] = useState<City>('Chennai');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [slotStates, setSlotStates] = useState<SlotState>({});

  const login = (email: string, password: string): boolean => {
    if (email.trim() !== '' && password.trim() !== '') {
      if (!user) {
        setUser({
          fullName: 'Guest User',
          email: email,
          mobile: '9876543210',
        });
      }
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const signup = (newUser: User): boolean => {
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const getSlotStatus = (turfId: string, date: string, slotIndex: number): 'available' | 'booked' => {
    const slotId = `slot-${slotIndex}`;
    return slotStates[turfId]?.[date]?.[slotId] || 'available';
  };

  const bookSlot = (
    turfId: string,
    turfName: string,
    city: string,
    date: string,
    slotIndex: number,
    price: number
  ): string => {
    const slotId = `slot-${slotIndex}`;
    const bookingId = generateBookingId();
    const slotTiming = SLOT_TIMINGS[slotIndex];

    setSlotStates((prev) => ({
      ...prev,
      [turfId]: {
        ...prev[turfId],
        [date]: {
          ...prev[turfId]?.[date],
          [slotId]: 'booked',
        },
      },
    }));

    const newBooking: Booking = {
      id: bookingId,
      turfId,
      turfName,
      city,
      date,
      slotTime: `${slotTiming.startTime} - ${slotTiming.endTime}`,
      price,
      status: 'booked',
      bookedAt: new Date().toISOString(),
    };

    setBookings((prev) => [newBooking, ...prev]);

    return bookingId;
  };

  const cancelBooking = (bookingId: string) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    const slotIndex = SLOT_TIMINGS.findIndex(
      (s) => `${s.startTime} - ${s.endTime}` === booking.slotTime
    );
    const slotId = `slot-${slotIndex}`;

    setSlotStates((prev) => ({
      ...prev,
      [booking.turfId]: {
        ...prev[booking.turfId],
        [booking.date]: {
          ...prev[booking.turfId]?.[booking.date],
          [slotId]: 'available',
        },
      },
    }));

    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        user,
        selectedCity,
        bookings,
        slotStates,
        login,
        signup,
        logout,
        setSelectedCity,
        getSlotStatus,
        bookSlot,
        cancelBooking,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
