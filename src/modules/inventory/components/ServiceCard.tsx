import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { categoryColors, cn } from "@/lib/utils";
import { CategoriaDetail } from "@/types/auth";

import { Service } from "@/types/service";

interface ProductCardProps {
    service: Service;
    activeType: string | undefined;
    className?: string;
    CategoriaDetail: CategoriaDetail | undefined;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    imageClasses: string;
}

export function ServiceCard({
    service,
    activeType,
    className,
    CategoriaDetail,
    setLoading,
    imageClasses,
}: ProductCardProps) {
    return (
        <Card className={cn("rounded-xl overflow-hidden", className)}>
            <CardHeader
                className={cn(
                    "text-start w-full",
                    activeType == "detailedView" && "w-1/2"
                )}
            >
                <CardTitle className="truncate">{service.name}</CardTitle>
                <CardDescription
                    className={cn(
                        "text-2xl columns-2",
                        activeType === "listView" && "flex items-center gap-5"
                    )}
                >
                    {/* {"S/. " + service.price} */}
                    {CategoriaDetail && (
                        <Badge className={`${categoryColors[CategoriaDetail.color]}`}>
                            {CategoriaDetail.name}
                        </Badge>
                    )}
                </CardDescription>
                {(activeType === "detailedView" || activeType === "listView") && (
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                )}
            </CardHeader>
            <CardContent
                className={cn(
                    "w-full",
                    activeType === "detailedView" && "pt-6 w-1/2",
                    activeType === "listView" && "p-0 w-80"
                )}
            >
                <div
                    className={cn(
                        "overflow-hidden w-full h-64",
                        activeType === "listView" ? "rounded-none" : "rounded-lg"
                    )}
                >
                    <img
                        src={typeof service?.image === 'string' ? service.image : URL.createObjectURL(service.image)}
                        alt={service.name}
                        onLoad={() => setLoading(false)}
                        className={imageClasses}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
