import React from 'react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Phone, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user, bookings, logout } = useApp();
  const navigate = useNavigate();

  const activeBookings = bookings.filter((b) => b.status === 'booked').length;
  const cancelledBookings = bookings.filter((b) => b.status === 'cancelled').length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="gradient-primary rounded-lg p-2">
            <User className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">
              My Profile
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage your account information
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Profile Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-secondary rounded-lg">
                <div className="gradient-primary rounded-full p-4">
                  <User className="h-8 w-8 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground">
                    {user?.fullName || 'Guest User'}
                  </h3>
                  <p className="text-sm text-muted-foreground">Member</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email Address</p>
                    <p className="font-medium text-foreground">
                      {user?.email || 'user@example.com'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Mobile Number</p>
                    <p className="font-medium text-foreground">
                      {user?.mobile || '9876543210'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Booking Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-secondary rounded-lg">
                  <p className="text-3xl font-bold font-heading text-foreground">
                    {bookings.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                </div>
                <div className="text-center p-4 bg-success/10 rounded-lg">
                  <p className="text-3xl font-bold font-heading text-success">
                    {activeBookings}
                  </p>
                  <p className="text-sm text-muted-foreground">Active</p>
                </div>
                <div className="text-center p-4 bg-destructive/10 rounded-lg">
                  <p className="text-3xl font-bold font-heading text-destructive">
                    {cancelledBookings}
                  </p>
                  <p className="text-sm text-muted-foreground">Cancelled</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate('/my-bookings')}
              >
                <Calendar className="h-4 w-4 mr-2" />
                View My Bookings
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate('/')}
              >
                <MapPin className="h-4 w-4 mr-2" />
                Browse Turfs
              </Button>
              <Button
                variant="destructive"
                className="w-full"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
