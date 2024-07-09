import { Notification, NotificationId, ResponseCreateNotification } from "@/types/notification";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";

interface NotificationsProviderState {
    notifications: Notification[],
    setNotifications: Dispatch<SetStateAction<Notification[]>>,    
    deleteNotification: (message: NotificationId)=>void,
    createNotification: (message: ResponseCreateNotification)=>void
}

export const NotificationContext = createContext<NotificationsProviderState>({
    notifications: [],
    setNotifications: () => {},
    deleteNotification: ()=>{},
    createNotification: ()=>{}
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

            if(response.type == 'single_notification') {      
                const notification = response.data;
                const notification_transformed = {...notification, date: new Date(notification.date)}                
                setNotifications(prevNotifications => [...prevNotifications, notification_transformed])
            }else if(response.type == 'notification_totallist') {
                const notification = response.data as Notification[];
                const notification_transformed = notification.map((nt)=>{
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

    const createNotification = (message: ResponseCreateNotification) => {                
        socket?.send(JSON.stringify({
            action: 'create',
            ...message
        }))                
    };

    const deleteNotification = (id: NotificationId)=>{
        socket?.send(JSON.stringify({
            action: 'delete',
            id
        }))
    }

    return (
        <NotificationContext.Provider value={{notifications, setNotifications, createNotification, deleteNotification}}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = ()=> useContext(NotificationContext)

export default NotificationProvider;