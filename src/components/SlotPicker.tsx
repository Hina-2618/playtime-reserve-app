import React from 'react';
import { SLOT_TIMINGS } from '@/data/turfs';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Clock, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SlotPickerProps {
  turfId: string;
  date: string;
  selectedSlot: number | null;
  onSelectSlot: (slotIndex: number) => void;
  pricePerSlot: number;
}

const SlotPicker: React.FC<SlotPickerProps> = ({
  turfId,
  date,
  selectedSlot,
  onSelectSlot,
  pricePerSlot,
}) => {
  const { getSlotStatus } = useApp();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-primary bg-primary/10" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-muted border-2 border-muted" />
          <span>Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded gradient-primary" />
          <span>Selected</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {SLOT_TIMINGS.map((slot, index) => {
          const status = getSlotStatus(turfId, date, index);
          const isSelected = selectedSlot === index;
          const isBooked = status === 'booked';

          return (
            <Button
              key={index}
              variant={isBooked ? 'slotBooked' : isSelected ? 'hero' : 'slot'}
              className={cn(
                'h-auto py-3 px-4 flex flex-col items-start gap-1 relative',
                isSelected && 'ring-2 ring-primary ring-offset-2'
              )}
              disabled={isBooked}
              onClick={() => !isBooked && onSelectSlot(index)}
            >
              <div className="flex items-center gap-2 w-full">
                <Clock className="h-4 w-4" />
                <span className="text-xs font-medium">
                  {slot.startTime} - {slot.endTime}
                </span>
              </div>
              <div className="flex items-center justify-between w-full">
                <span className="text-sm font-bold">₹{pricePerSlot}</span>
                {isBooked ? (
                  <span className="flex items-center gap-1 text-xs">
                    <X className="h-3 w-3" /> Booked
                  </span>
                ) : isSelected ? (
                  <span className="flex items-center gap-1 text-xs">
                    <Check className="h-3 w-3" /> Selected
                  </span>
                ) : null}
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default SlotPicker;
