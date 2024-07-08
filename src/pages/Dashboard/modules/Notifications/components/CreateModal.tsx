import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useNotification } from '@/contexts/notification';
import { FormEvent } from 'react';

const CreateModal = () => {
    const { createNotification } = useNotification();    

    const handleFormNotification = (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const title = formData.get('title') as string;        
        const description = formData.get('description') as string;
        const date = new Date();
        const user_id = 1;

        createNotification({action:'create', title, description, date, user_id})
    }

    return (
    <Dialog>
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
              Notificación
            </Label>            
            <Textarea name='description' className='w-full'/>
          </div>          
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