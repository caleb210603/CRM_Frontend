import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Notification } from "@/types/notification"
import { Pencil, Trash2 } from "lucide-react"

interface Props {
  notification: Notification
}

const NotificationCard: React.FC<Props> = ({notification})=> {
  return (
    <Card className="w-full">
        <div className="h-56 overflow-y-scroll scrollbar-hidden">
            <CardHeader className="w-full flex-row items-center flex justify-between">
                <CardTitle className="text-lg">{notification.title}</CardTitle>                   
                <span className="pb-1 text-sm text-[#55587C]">Hace 2 minutos</span>             
            </CardHeader>
            <CardContent>        
                <p>{notification.notification}</p>
            </CardContent>
        </div>
        <CardFooter className="flex border-t items-center py-3 justify-between">
            <div className="flex gap-2 items-center">
                <img 
                    className="w-7 object-center object-cover aspect-square rounded-full" 
                    src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt=""  
                />
                <span className="">{notification.user.name}</span>    
            </div>
            <div className="flex justify-between gap-2">
                <Trash2 size={18} className="text-red-500"/>
                <Pencil size={18} className="text-yellow-500"/>
            </div>
      </CardFooter>
    </Card>
  )
}

export default NotificationCard;