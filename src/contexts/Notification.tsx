import { Notification } from "@/types/notification";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";

interface NotificationsProviderState {
    notifications: Notification[],
    setNotifications: Dispatch<SetStateAction<Notification[]>>,    
    websocket: WebSocket | null
}

export const NotificationContext = createContext<NotificationsProviderState>({
    notifications: [],
    setNotifications: () => {},
    websocket: null
});

const NotificationProvider = ({children}: {children: ReactNode}) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [socket, setSocket] = useState<WebSocket | null>(null)
    
    useEffect(()=>{
        const socketUrl = 'ws://127.0.0.1:8000/ws/notifications/';
    
        const websocket = new WebSocket(socketUrl);

        websocket.onopen = ()=>{
            console.log('connected')
        }
    
        websocket.onmessage = (event)=>{
            const response = JSON.parse(event.data)

            if(response.type == 'notification_list') {      
                const notification = response.data;
                const notification_transformed = {...notification, date: new Date(notification.date)}
                setNotifications(prevNotifications => [...prevNotifications, notification_transformed])
            }else if(response.type == 'notification_totallist') {
                const notification = response.data as [];
                const notification_transformed = notification.map((nt: Object)=>{
                    return {...nt, date: new Date(nt.date)}
                })
                setNotifications(notification_transformed)
            }                       
        }
    
        websocket.onclose = () => {
            console.log('WebSocket disconnected');
        }
        
        // Manejar eventos de error
        websocket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        // Guardar el socket en el estado
        setSocket(websocket);        

        // Cerrar el socket cuando el componente se desmonte
        return () => {
            websocket.close();
        };
    }, []);

    return (
        <NotificationContext.Provider value={{notifications, setNotifications, websocket: socket}}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = ()=> useContext(NotificationContext)

export default NotificationProvider;