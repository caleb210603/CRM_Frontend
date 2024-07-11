import { Notification, NotificationId, ResponseCreateNotification } from "@/types/notification";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";

interface NotificationsProviderState {
    notifications: Notification[],
    setNotifications: Dispatch<SetStateAction<Notification[]>>,    
    deleteNotification: (message: NotificationId)=>void,
    createNotification: (message: ResponseCreateNotification)=>void,
    getListNotifications: (page: number) =>void,
    loading: boolean
}

export const NotificationContext = createContext<NotificationsProviderState>({
    notifications: [],
    setNotifications: () => {},
    deleteNotification: ()=>{},
    createNotification: ()=>{},
    getListNotifications: ()=>{},
    loading: false
});

const NotificationProvider = ({children}: {children: ReactNode}) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [socket, setSocket] = useState<WebSocket | null>(null)
    const [hasNext, setHasNext] = useState(false);
    const [loading, setLoading] = useState(false);
    
    useEffect(()=>{
        const socketUrl = 'ws://127.0.0.1:8000/ws/notifications/';
    
        const websocket = new WebSocket(socketUrl);

        websocket.onopen = ()=>{
            console.log('connected')
        }
    
        websocket.onmessage = (event)=>{
            const response = JSON.parse(event.data)            

            if(response.type == 'single-list') {      
                const notification = response.data;
                const notification_transformed = {...notification, date: new Date(notification.date)}                
                setNotifications(prevNotifications => [notification_transformed, ...prevNotifications])
            }else if(response.type == 'list-all') {
                const has_next = response.has_next;
                const notifications = response.notifications as Notification[];
                const notifications_transformed = notifications.map((nt)=>{
                    return {...nt, date: new Date(nt.date)}
                })
                setNotifications(prevNotifications => [...prevNotifications, ...notifications_transformed])
                setHasNext(has_next);
            }                       

            setLoading(false);
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
        setLoading(true);
        socket?.send(JSON.stringify({
            action: 'delete',
            id
        }))
    }
    
    const getListNotifications = (page: number)=>{
        if(!hasNext) return;
        setLoading(true);
        socket?.send(JSON.stringify({
            action: 'list',
            page
        }))
    }

    return (
        <NotificationContext.Provider value={{notifications, loading, getListNotifications, setNotifications, createNotification, deleteNotification}}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = ()=> useContext(NotificationContext)

export default NotificationProvider;