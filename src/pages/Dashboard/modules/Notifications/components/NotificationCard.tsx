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
import { User } from "@/types/auth"

interface Props {
  notification: Notification,
  infoPerfil: Pick<User, 'name' | 'image'>[],
  index: number
}

const NotificationCard: React.FC<Props> = ({notification, infoPerfil, index})=> {  
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
              <div
                className="w-7 aspect-square rounded-full overflow-hidden"
              >
                {
                  infoPerfil[index].image != null ? 
                  <img 
                      className="w-full h-full object-center object-cover" 
                      src={infoPerfil[index].image.toString()}
                      alt="imagen de perfil"  
                  />
                  :
                  <div>{infoPerfil[index].name.slice(1,0).toUpperCase()}</div>
                }
              </div>
                <span className="">{infoPerfil[index].name}</span>    
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