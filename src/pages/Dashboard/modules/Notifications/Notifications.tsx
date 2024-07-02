import { Button } from "@/components/ui/button"
import NotificationCard from "./components/NotificationCard";

const Notifications = () => {
    return (
        <div>
            <Button>Crear notificación</Button>
            
            <div className="my-4 grid-content">
                <NotificationCard/>
                <NotificationCard/>
                <NotificationCard/>
                <NotificationCard/>
            </div>
                        
        </div>
    );
};

export default Notifications;