import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { AddForm } from "./addForm";
import { Button } from "../ui/button";

export function AddReport() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger>
        <Button>
          Adicionar
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>
            Adicionar um Comunicado
          </DialogTitle>
          <DialogDescription>
            Preencha todos os campos para adicionar um comunicado
          </DialogDescription>
        </DialogHeader>
        <AddForm setDialogOpen={setDialogOpen} />
      </DialogContent>
    </Dialog>
  )
}