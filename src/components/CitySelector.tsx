import React from 'react';
import { useApp } from '@/context/AppContext';
import { CITIES, City } from '@/data/turfs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MapPin } from 'lucide-react';

const CitySelector: React.FC = () => {
  const { selectedCity, setSelectedCity } = useApp();

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <MapPin className="h-5 w-5 text-primary" />
        <span className="font-medium">Location:</span>
      </div>
      <Select
        value={selectedCity}
        onValueChange={(value) => setSelectedCity(value as City)}
      >
        <SelectTrigger className="w-48 bg-card">
          <SelectValue placeholder="Select city" />
        </SelectTrigger>
        <SelectContent className="bg-popover">
          {CITIES.map((city) => (
            <SelectItem key={city} value={city}>
              {city}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CitySelector;
