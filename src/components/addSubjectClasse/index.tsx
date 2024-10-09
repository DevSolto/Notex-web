import { IoPersonAddOutline } from "react-icons/io5";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useState } from "react";
import { RowSelectionState } from "@tanstack/react-table";
import { AddForm } from "./addForm";

type AddUserClasseProps = {
  casseId: string
}

export function AddSubjectClasse(props: AddUserClasseProps) {
  const [isDialogOpen, setDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger className="flex w-full justify-between items-center px-2 py-1.5">
        Adicionar disciplina
        <IoPersonAddOutline className="text-lg" />
      </DialogTrigger>
      <DialogContent className="bg-white min-w-[900px]">
        <DialogHeader>
          <DialogTitle>
            Adicionar disciplinas
          </DialogTitle>
          <DialogDescription>
            Preencha os campos a seguir para adicionar uma disciplina a turma
          </DialogDescription>
        </DialogHeader>
        <AddForm classId={props.casseId} setDialogOpen={setDialogOpen} />
      </DialogContent>
    </Dialog>
  )
}