import { IoPersonAddOutline } from "react-icons/io5";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { UserTable } from "../userTable";
import { columns } from "./columns";
import { useState } from "react";
import { RowSelectionState } from "@tanstack/react-table";

export function AddUserClasse() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  console.log(rowSelection);

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
        <UserTable
          role="STUDENT"
          columns={columns}
          onRowSelectionChange={setRowSelection}
          rowSelection={rowSelection}
        />
      </DialogContent>
    </Dialog>
  )
}