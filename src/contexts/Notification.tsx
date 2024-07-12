import React, { ReactNode, createContext, useContext, useState } from "react";
import { Notification, NotificationId, ResponseCreateNotification } from "@/types/notification";
import useWebSocket from "@/hooks/useWebSocket";

// Define la interfaz del estado del proveedor de notificaciones
interface NotificationsProviderState {
    notifications: Notification[];
    setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
    deleteNotification: (id: NotificationId) => void;
    createNotification: (notification: ResponseCreateNotification) => void;
    getListNotifications: (page: number) => void;
    loading: boolean;
    archiveNotification: (userId: number, notificationId: number) => void;
}

// Crea el contexto de notificaciones con valores predeterminados
export const NotificationContext = createContext<NotificationsProviderState>({
    notifications: [],
    setNotifications: () => {},
    deleteNotification: () => {},
    createNotification: () => {},
    getListNotifications: () => {},
    loading: false,
    archiveNotification: () => {}
});

// Proveedor de notificaciones
const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [hasNext, setHasNext] = useState(false);

    const onNotificationReceived = (notification: Notification) => {
        setNotifications(prevNotifications => [notification, ...prevNotifications]);
    };

    const onNotificationsListReceived = (notifications: Notification[], hasNext: boolean) => {
        setNotifications(prevNotifications => [...prevNotifications, ...notifications]);
        setHasNext(hasNext);
    };

    const {
        createNotification,
        deleteNotification,
        archiveNotification,
        getListNotifications,
        loading,
    } = useWebSocket({ onNotificationReceived, onNotificationsListReceived, hasNext });

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                setNotifications,
                deleteNotification,
                createNotification,
                getListNotifications,
                loading,
                archiveNotification,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);

export default NotificationProvider;
