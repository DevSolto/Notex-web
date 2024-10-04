import { IoPersonAddOutline } from "react-icons/io5";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { columns } from "./columns";
import { useState } from "react";
import { RowSelectionState } from "@tanstack/react-table";
import { AddUserClasseTable } from "./addUserClasseTable";

type AddUserClasseProps = {
  casseId: string
}

export function AddUserClasse(props: AddUserClasseProps) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  return (
    <Dialog>
      <DialogTrigger className="flex w-full justify-between items-center px-2 py-1.5">
        Adicionar aluno
        <IoPersonAddOutline className="text-lg" />
      </DialogTrigger>
      <DialogContent className="bg-white min-w-[900px]">
        <DialogHeader>
          <DialogTitle>
            Adicionar Estudantes
          </DialogTitle>
          <DialogDescription>
            Selecione os estudantes que você quer adicionar a turma
          </DialogDescription>
        </DialogHeader>
        <AddUserClasseTable
          columns={columns}
          onRowSelectionChange={setRowSelection}
          rowSelection={rowSelection}
          classeId={props.casseId}
        />
      </DialogContent>
    </Dialog>
  )
}