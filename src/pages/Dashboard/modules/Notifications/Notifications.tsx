import NotificationCard from "./components/NotificationCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { useNotification } from "@/contexts/notification";
import CreateModal from "./components/CreateModal";

const Notifications = () => {
    const loading = false;
    const [page, setPage] = useState<number>(1);
    const {notifications} = useNotification();    

    //Función que valida si el usuario llego al final de la página
    const handleScroll = ()=>{
        if (loading) return; // Si ya estamos cargando datos, no hacer nada

        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = window.innerHeight;

        if (scrollTop + clientHeight >= scrollHeight) {
            setPage(prevPage=>prevPage + 1);
        }
    }

    //Cada vez que se haga scroll se validara si el usuario llegó al final de la página
    useEffect(()=>{
        window.addEventListener('scroll', handleScroll);

        return ()=> window.removeEventListener('scroll', handleScroll);
    },[])

    //Se llamará a la api para que carge las otras páginas de notificaciones cada vez que cambie el stado page
    useEffect(()=>{
        //Call api        
    },[page])    

    return (
        <div className="mb-6">            
            <CreateModal/>              
            <div className="my-4 mb-6 grid-content max-w-[1400px]">                
                {
                    loading ? 
                    <div className="flex flex-col gap-2">                    
                        <div className="flex-1">
                            <Skeleton className="h-full w-full"/>
                        </div>
                        <div className="flex gap-2">
                            <Skeleton className="h-8 aspect-square w-fit rounded-full"/>
                            <div className="flex flex-col gap-1 w-full">
                                <Skeleton className="h-4 aspect-square w-full"/>
                                <Skeleton className="h-4 aspect-square w-[80%]"/>
                            </div>
                        </div>
                    </div>
                    :
                    notifications.map((notification, index)=>(
                        <NotificationCard key={index} notification={notification}/>                
                    ))
                }                
            </div>            
        </div>
    );
};

export default Notifications;