import React from 'react';
import { useApp } from '@/context/AppContext';
import { TURFS } from '@/data/turfs';
import CitySelector from '@/components/CitySelector';
import TurfCard from '@/components/TurfCard';
import { MapPin, Search } from 'lucide-react';

const Home: React.FC = () => {
  const { selectedCity } = useApp();

  const filteredTurfs = TURFS.filter((turf) => turf.city === selectedCity);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero py-12 md:py-16">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Book Your <span className="text-primary">Perfect Turf</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Find and book premium sports turfs in your city. Play anytime, 24/7.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CitySelector />
          </div>
        </div>
      </section>

      {/* Turfs Grid */}
      <section className="py-8 md:py-12">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <h2 className="font-heading text-xl font-bold text-foreground">
                Turfs in {selectedCity}
              </h2>
            </div>
            <span className="text-sm text-muted-foreground">
              {filteredTurfs.length} available
            </span>
          </div>

          {filteredTurfs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTurfs.map((turf) => (
                <TurfCard key={turf.id} turf={turf} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                No turfs available
              </h3>
              <p className="text-muted-foreground">
                No turfs available in this location. Try selecting a different city.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
