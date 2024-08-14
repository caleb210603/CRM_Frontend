import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { DateRange } from 'react-day-picker';

interface CalendaryTableProps {
  onChange: (dateRange: DateRange | undefined) => void;
}

export default function CalendaryTable({ onChange }: CalendaryTableProps) {
  return (
    <div className="mt-4 mb-1">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <DatePickerWithRange onChange={onChange} />
        </div>
      </div>
    </div>
  );
}
