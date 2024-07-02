import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import io from 'socket.io-client'

interface NotificationsType {
    message: string,
    id: number,
    userid: number,
    time: string
}

interface NotificationsProviderState {
    notifications: NotificationsType[],
    setNotifications: Dispatch<SetStateAction<NotificationsType[]>>
}

export const NotificationContext = createContext<NotificationsProviderState>({
    notifications: [],
    setNotifications: () => {}
});

const NotificationProvider = ({children}: {children: ReactNode}) => {
    const [notifications, setNotifications] = useState<NotificationsType[]>([]);
    const socket = io('http://localhost:3000');

    useEffect(()=>{
        socket.on('newNotification', (notification)=>{
            setNotifications((prevNotifications) => [...prevNotifications, notification])
        })

        return ()=>{
            socket.off('newNotification');
            socket.disconnect();
        }
    },[])

    return (
        <NotificationContext.Provider value={{notifications, setNotifications}}>
            {children}
        </NotificationContext.Provider>
    );
};

export default NotificationProvider;