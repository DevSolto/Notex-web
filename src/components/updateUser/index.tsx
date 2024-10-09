import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { IoPencilOutline } from "react-icons/io5";
import { User } from "../userTable/columns";
import { UpdateUserForm } from "./updateForm";

type UpdateUserProps = {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  role: string;
  avatarUrl: string;
  isActive: boolean;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

export function UpdateUser(props: UpdateUserProps) {
  const [isDialogOpen, setDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger className="flex w-full justify-between items-center px-2 py-1.5 font-normal text-sm">
        Editar
        <IoPencilOutline />
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>
            Editar o usuário
          </DialogTitle>
          <DialogDescription>
            Preencha todos os campos para atualizar os dados
          </DialogDescription>
        </DialogHeader>
        <UpdateUserForm
          setUsers={props.setUsers}
          id={props.id}
          name={props.name}
          email={props.email}
          cpf={props.cpf}
          phone={props.phone}
          role={props.role}
          avatarUrl={props.avatarUrl}
          isActive={props.isActive}
          setDialogOpen={setDialogOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
