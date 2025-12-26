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

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {SLOT_TIMINGS.map((slot, index) => {
          const status = getSlotStatus(turfId, date, index);
          const isSelected = selectedSlot === index;
          const isBooked = status === 'booked';

          return (
            <Button
              key={index}
              variant={isBooked ? 'slotBooked' : isSelected ? 'hero' : 'slot'}
              className={cn(
                'h-auto py-4 px-4 flex flex-col items-center justify-center gap-2 min-h-[90px]',
                isSelected && 'ring-2 ring-primary ring-offset-2'
              )}
              disabled={isBooked}
              onClick={() => !isBooked && onSelectSlot(index)}
            >
              <div className="flex items-center justify-center gap-2">
                <Clock className="h-4 w-4 shrink-0" />
                <span className="text-sm font-semibold whitespace-nowrap">
                  {slot.startTime}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">to</span>
              <span className="text-sm font-semibold">{slot.endTime}</span>
              <div className="flex items-center justify-center gap-2 pt-1 border-t border-current/10 w-full">
                <span className="text-base font-bold">₹{pricePerSlot}</span>
                {isBooked ? (
                  <span className="flex items-center gap-1 text-xs opacity-70">
                    <X className="h-3 w-3" />
                  </span>
                ) : isSelected ? (
                  <span className="flex items-center gap-1 text-xs">
                    <Check className="h-3 w-3" />
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
