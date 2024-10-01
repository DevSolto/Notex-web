import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { AddForm } from "./addForm";
import { Button } from "../ui/button";

type AddUserProps = {
  role: 'STUDENT' | 'TEACHER' | 'ADMIN'
}

export function AddUser(props: AddUserProps) {
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
            Adicionar um
            {
              props.role === 'STUDENT' ? 'Estudantes' : 'Professores'
            }
          </DialogTitle>
          <DialogDescription>
            Preencha todos os campos para adicionar um
            {
              props.role === 'STUDENT' ? ' estudantes' : ' professores'
            }
          </DialogDescription>
        </DialogHeader>
        <AddForm role={props.role} setDialogOpen={setDialogOpen} />
      </DialogContent>
    </Dialog>
  )
}