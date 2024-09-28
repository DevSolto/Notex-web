import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { UpdateForm } from "./updateForm";
import { IoPencilOutline } from "react-icons/io5";
import { ClassData } from "@/pages/classes";


type UpdateClasseProps = {
  id: string
  title: string
  code: string
  year: string
  setClasses: React.Dispatch<React.SetStateAction<ClassData[]>>
}
export function UpdateClasse(props: UpdateClasseProps) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger className="flex w-full justify-between items-center px-2 py-1.5">
        Editar
        <IoPencilOutline />
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>
            Adicionar umas turma
          </DialogTitle>
          <DialogDescription>
            Preencha todos os campos para adicionar uma turma
          </DialogDescription>
        </DialogHeader>
        <UpdateForm
          setClasses={props.setClasses}
          id={props.id}
          title={props.title}
          code={props.code}
          year={props.year}
          setDialogOpen={setDialogOpen}
        />
      </DialogContent>
    </Dialog>
  )
}