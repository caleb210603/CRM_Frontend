import { useEffect, useRef, useState } from "react";
import { BellIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { UserNotificationTab } from "./UserNotificationTab";
import { Notification } from "@/types/notification";
import { useNotification } from "@/contexts/notification";

export default function UserNotification() {  
  const { notifications } = useNotification();
  const [notificationList, setNotificationList] = useState(notifications);
  const prevNotifications = useRef(notifications);
  const [archives, setArchives] = useState<Notification[]>([]);  
  const [unreadCount, setUnreadCount] = useState(0);
  const idUser = useRef<number>()
  useEffect(()=>{
    const userData = localStorage.getItem('userData');
    if(userData) {
      idUser.current = JSON.parse(userData).id      
    }

  },[])
  
  //Función que marca a las notificaciones como leidas
  //Es decir ya no se motrará la bola roja en la campanita
  const markAllAsRead = ()=>{
    console.log('erer')
    setUnreadCount(0)
  }

  //Verificamos si existen notificaciones sin leer, en caso de existir los mostraremos  en la campana
  useEffect(()=>{
    const difference = notifications.length - prevNotifications.current.length;    

    if(difference > 0) {
      setUnreadCount(difference)
    }
  },[notifications])

  const handleArchive = (id: number) => {    
  };

  const restoreListNotification = (id: number) => {    
  };  

  useEffect(()=>{    
    const newList = notifications.filter(noti=>{
      if(idUser.current){        
        if(noti.list_archives.includes(4)) {          
          return false
        }else {
          return true
        }        
      } 
      })
      setNotificationList(newList);
      const listArchives = notifications.filter(noti=>{
        if(idUser.current){
          if(noti.list_archives.includes(idUser.current)) {          
            return true
          }else {
            return true
          }        
        } 
        })
        setArchives(listArchives)
  },[notifications])

  return (
    <DropdownMenu>      
      <DropdownMenuTrigger >
        <div
          className="relative p-[.4rem] rounded-full bg-primary cursor-pointer"          
        >
          {unreadCount > 0 && (
            <span className="absolute right-[-5px] top-[-3px] mt-0 pr-[1px] h-3.5 w-3.5 rounded-full bg-destructive text-[10px] flex justify-center items-center">{unreadCount}</span>
          )}
          <BellIcon className="text-background" />
        </div>
      </DropdownMenuTrigger>      
      <DropdownMenuContent className="w-[400px] lg:relative lg:right-[50%] pt-2">
        <div className=" h-[300px] rounded-md">
          <div>
            <Tabs defaultValue="notificaciones" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-transparent">
                <TabsTrigger
                  value="notificaciones"
                  className="pb-3 rounded-none border-b-2 data-[state=active]:border-primary"
                >
                  Notificaciones
                </TabsTrigger>
                <TabsTrigger
                  value="archivados"
                  className="pb-3 rounded-none border-b-2 data-[state=active]:border-primary"
                >
                  Archivados
                </TabsTrigger>
              </TabsList>
              <UserNotificationTab
                list={notificationList}
                onArchive={handleArchive}
              />
              <UserNotificationTab
                list={archives}
                value="archivados"
                onRestore={restoreListNotification}                
              />
            </Tabs>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
