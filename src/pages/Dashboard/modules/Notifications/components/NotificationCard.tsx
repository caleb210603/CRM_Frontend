import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Notification } from "@/types/notification"
import { Pencil } from "lucide-react"
import DeleteModal from "./DeleteModal"
import { useNotification } from "@/contexts/notification"
import { getDaysPassed } from "@/lib/utils"

interface Props {
  notification: Notification
}

const NotificationCard: React.FC<Props> = ({notification})=> {  
  const { deleteNotification } = useNotification();      

  return (
    <Card className=" flex flex-col w-full max-w-[450px]">
        <div className="h-44 overflow-y-scroll scrollbar-hidden">
            <CardHeader className="w-full flex-row items-top flex justify-between">
                <CardTitle className="text-lg">{notification.title}</CardTitle>                   
                <span className="pb-1.5 text-sm text-[#55587C] whitespace-nowrap">{getDaysPassed(notification.date)}</span>                             
            </CardHeader>
            <CardContent>        
                <p>{notification.description}</p>
            </CardContent>
        </div>
        <CardFooter className="flex border-t items-center py-3 justify-between">
            <div className="flex gap-2 items-center">
                <img 
                    className="w-7 object-center object-cover aspect-square rounded-full" 
                    src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt=""  
                    />
                <span className="">name</span>    
            </div>
            <div className="flex justify-between gap-2">
                <DeleteModal handleDelete={()=>{deleteNotification(notification.id)}}/>                
                <Pencil size={18} className="text-yellow-500"/>
            </div>
      </CardFooter>
    </Card>
  )
}

export default NotificationCard;