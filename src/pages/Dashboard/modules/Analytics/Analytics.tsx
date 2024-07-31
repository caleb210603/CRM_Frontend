import api from "@/services/api";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useQuery } from "react-query";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";
import { useState } from "react";

const getData = async (start_date: string | undefined, end_date: string | undefined)=>{
    const { data } = await api.get(`/sales/range-days/?start_date=${start_date}&end_date=${end_date}`);
    return data;
}

interface DataAnalytics {
    name: string,
    total: string
}

const Analytics = () => {
    const formatCurrency = (value: number) => `S/ ${value}`;
    const [startDate, setStartDate] = useState<string>();
    const [endDate, setEndDate] = useState<string>();    
    const { data: totalIncome } = useQuery<DataAnalytics[]>(
        ['totalIncome', startDate, endDate],
        () => getData(startDate, endDate), 
        {
            enabled: !!startDate && !!endDate
        }
    )

    //Obtenemos las fechas a filtrar
    const handleChange = (selectedDate: DateRange | undefined)=>{
        const start_date = selectedDate?.from;
        const end_date = selectedDate?.to;

        //Formateando las fechas
        const formatter_start_date = start_date?.toISOString().split('T')[0];
        const formatter_end_date = end_date?.toISOString().split('T')[0];
    
        setStartDate(formatter_start_date);
        setEndDate(formatter_end_date);
    }

    return (       
        <div className="">
            <div className="mb-10">
                <DatePickerWithRange onChange={handleChange} />
            </div>

            <ResponsiveContainer width="100%" height={350} >
            <BarChart data={totalIncome}>
                <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                />
                <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatCurrency}
                />
                <Bar
                dataKey="total"
                fill="currentColor"
                radius={[4, 4, 0, 0]}
                className="fill-primary"
                />
            </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Analytics;