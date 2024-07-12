

import { DatePickerWithRange } from "@/components/ui/date-range-picker";

export default function CalendaryTable() {
  return (
    <div className="mt-8 mb-3">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <DatePickerWithRange />
        </div>
      </div>
    </div>
  );
}

