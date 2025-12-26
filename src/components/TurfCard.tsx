import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Turf } from '@/data/turfs';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Users, IndianRupee } from 'lucide-react';

interface TurfCardProps {
  turf: Turf;
}

const TurfCard: React.FC<TurfCardProps> = ({ turf }) => {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden group animate-fade-in">
      <div className="relative h-48 overflow-hidden">
        <img
          src={turf.image}
          alt={turf.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-heading text-lg font-bold text-primary-foreground truncate">
            {turf.name}
          </h3>
          <p className="flex items-center gap-1 text-sm text-primary-foreground/90">
            <MapPin className="h-3 w-3" />
            {turf.area}, {turf.city}
          </p>
        </div>
      </div>
      <CardContent className="pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" />
            <span>Open 24 Hours</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="h-4 w-4 text-primary" />
            <span>Max {turf.maxPlayers}</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <IndianRupee className="h-5 w-5 text-primary" />
          <span className="text-xl font-bold text-foreground">{turf.pricePerSlot}</span>
          <span className="text-sm text-muted-foreground">/ slot</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => navigate(`/turf/${turf.id}`)}
        >
          View Slots
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TurfCard;
