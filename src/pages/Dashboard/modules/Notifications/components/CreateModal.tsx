import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ToastAction } from '@/components/ui/toast';
import { useNotification } from '@/contexts/notification';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { z } from 'zod';

const notificationSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  description: z.string().min(1, "La descripción es requerida")
});

const CreateModal = () => {
    const { createNotification } = useNotification();    
    const [isOpen, setIsOpen] = useState(false);
    const [errors, setErrors] = useState<{ title?: string; description?: string }>({});
    const { toast } = useToast();
    const userAuth = useAuth();  
    const user_id = useRef<number>()
  
    useEffect(()=>{
      if(!userAuth.user) return;
      user_id.current = userAuth.user.id;
    },[userAuth])

    const showSuccessfulToast = ()=>{
      toast({
        title: "Notificación creada correctamente",        
        action: (
          <ToastAction altText="Notificación creada correctamente">Cerrar</ToastAction>
        ),
      })
    }

    const handleFormNotification = (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const title = formData.get('title') as string;        
        const description = formData.get('description') as string;
        const date = new Date();                                                            

        const validation = notificationSchema.safeParse({ title, description });

        if (!validation.success) {
          const newErrors = validation.error.errors.reduce((acc, error) => {
            if (typeof error.path[0] === 'string') {
              acc[error.path[0]] = error.message;
            }
            return acc;
          }, {} as Record<string, string>);
          setErrors(newErrors);
          return;
        }
  
        if(!user_id.current) return
        setErrors({})
        createNotification({title, description, date, user_id: user_id.current, list_archives: []})
        showSuccessfulToast();
        setIsOpen(false);
    }

    return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>        
        <Button>Crear notificación</Button>      
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form className='grid gap-4' action="" onSubmit={handleFormNotification}>            
        <DialogHeader>
          <DialogTitle>Crear notificación</DialogTitle>          
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex text-start flex-col items-start gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>            
            <Input name='title' className='w-full'/>
          </div>          
          <div className="flex text-start flex-col items-start gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>            
            <Textarea name='description' className='w-full'/>
          </div>          
          {
            errors.title &&
            <div className='border border-[#E57373] text-sm pl-3 text-[#E57373] rounded-sm p-2.5'>
              {errors.title}
            </div>
          }
        </div>
        <DialogFooter>
          <Button type="submit">Crear notificación</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>        
    );
};

export default CreateModal;