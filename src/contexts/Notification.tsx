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

const initialState = [
    {
        id: 1,        
        title: 'title1',
        notification: 'texto aleatorio',
        user: {
            name: 'jorge',
            last_name: 'silva'
        },
        date: '11-11-11'
    },
    {
        id: 1,
        title: 'title1',
        notification: 'texto aleatorio',
        user: {
            name: 'jorge',
            last_name: 'silva'
        },
        date: '11-11-11'
    },
    {
        id: 1,
        title: 'title1',
        notification: 'texto aleatorio',
        user: {
            name: 'jorge',
            last_name: 'silva'
        },
        date: '11-11-11'
    },
    {
        id: 1,
        title: 'title1',
        notification: 'texto aleatorio',
        user: {
            name: 'jorge',
            last_name: 'silva'
        },
        date: '11-11-11'
    },
    {
        id: 1,
        title: 'title1',
        notification: 'texto aleatorio',
        user: {
            name: 'jorge',
            last_name: 'silva'
        },
        date: '11-11-11'
    },
]

const NotificationProvider = ({children}: {children: ReactNode}) => {
    const [notifications, setNotifications] = useState<Notification[]>(initialState);
    const [socket, setSocket] = useState<WebSocket | null>(null)
    
    useEffect(()=>{
        const socketUrl = `ws://127.0.0.1:54375/ws/notifications/`;
    
        const websocket = new WebSocket(socketUrl);

        websocket.onopen = ()=>{
            console.log('connected')
        }
    
        websocket.onmessage = (event)=>{
            const data = JSON.parse(event.data);
            console.log(data)            
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