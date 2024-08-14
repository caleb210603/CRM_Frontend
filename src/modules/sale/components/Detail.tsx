import { SaleDetailSkeleton } from '@/components/ui/skeleton';
import { Box, Tag } from 'lucide-react';
import { SaleDetail, SaleDetailProduct, SaleDetailService} from '@/types/sale';
import { Product } from '@/types/product';

interface DetailProps {
    sale: SaleDetail;
    isLoading: boolean;
    type: 'product' | 'service';
}

const Detail = ({ sale, isLoading, type }: DetailProps) => {
    
    if (isLoading) {
        return <SaleDetailSkeleton />;
    }

    const data = sale[`${type}Data`];
    const IconComponent = type === 'product' ? Tag : Box;

    if (!data) {
        return null;
    }

    const item = type === 'product' ? (data as SaleDetailProduct).product : (data as SaleDetailService).service;
    const imageSrc = typeof item.image === 'string' ? item.image : URL.createObjectURL(item.image);
    const date = 'sale_obj' in data ? data.sale_obj.date : 'sale' in data ? data.sale.date : undefined;

    return (
        <div className="flex flex-col items-start rounded-xl border p-4 mb-4 relative gap-4 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
    <div className="grid grid-cols-3 w-full">
        <p className="text-xl font-semibold leading-none flex items-center">
            <IconComponent className="mr-2 text-blue-500" />
            {item.name} {type === 'product' ? (item as Product).brand : ''} {item.description}
        </p>
        {date && <p className="text-base text-gray-500 text-center">Fecha de venta: {date}</p>}
        <p className="text-lg text-right font-bold">Precio: {data.unit_price}</p>
    </div>
    <hr className="w-full" />
    <div className="flex items-start">
        <img src={imageSrc} alt={type} className="w-48 h-48 object-cover rounded-xl mr-4 shadow-sm" />
        <div className="flex-1 space-y-2 text-lg">
            <p className="text-base">Cantidad: <span className="font-medium">{data.quantity}</span></p>
            <p className="text-base">Descuento: <span className="font-medium">{data.discount}</span></p>
            <p className="text-base">Impuesto: <span className="font-medium">{data.tax}</span></p>
            <p className="text-base">Total: <span className="font-medium">{data.total_item_amount}</span></p>
        </div>
    </div>
</div>
    );
}

export default Detail;