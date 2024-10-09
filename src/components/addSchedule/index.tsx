import { IoPersonAddOutline } from "react-icons/io5";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useState } from "react";
import { AddForm } from "./addForm";

type AddUserClasseProps = {
  casseId: string
}

export function AddSchedule(props: AddUserClasseProps) {
  const [isDialogOpen, setDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger className="flex w-full justify-between items-center px-2 py-1.5">
        Adicionar um horário
        <IoPersonAddOutline className="text-lg" />
      </DialogTrigger>
      <DialogContent className="bg-white min-w-[900px]">
        <DialogHeader>
          <DialogTitle>
            Adicionar horário
          </DialogTitle>
          <DialogDescription>
            Preencha os campos a seguir para adicionar um horário a turma
          </DialogDescription>
        </DialogHeader>
        <AddForm classId={props.casseId} setDialogOpen={setDialogOpen} />
      </DialogContent>
    </Dialog>
  )
}