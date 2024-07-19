import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertCircle, CheckCircle } from "lucide-react";
import React from "react";

interface AlertDialogPaymentProps {
    feedbackMessage: string;
    setFeedbackMessage: (message: string) => void;
    feedbackType: string;
  }
  

export const AlertDialogPayment : React.FC<AlertDialogPaymentProps> = ({ feedbackMessage, setFeedbackMessage, feedbackType }) => {

    return (
     <Dialog open={Boolean(feedbackMessage)} onOpenChange={() => setFeedbackMessage('')}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{feedbackType == "success" ? <CheckCircle className='text-green-500'/> : <AlertCircle className='text-red-500'/>}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {feedbackMessage}
        </DialogDescription>
        <DialogFooter>
          <DialogClose>
            <Button onClick={() => setFeedbackMessage("")}>
              Cerrar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
)
}

export default AlertDialogPayment;

