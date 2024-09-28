import React from 'react';
import { IoTrashBinOutline } from "react-icons/io5";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { ClassData } from '@/pages/classes';


type DeleteClasseProps = {
  id: string;
  setClasses: React.Dispatch<React.SetStateAction<ClassData[]>>;
};

export function DeleteClasse({ id, setClasses }: DeleteClasseProps) {
  const deleteClasse = async () => {
    try {
      const response = await axios.delete(`https://q01b4kvh-4000.brs.devtunnels.ms/classes/${id}`);
      console.log("Resposta da API:", response.data);

      setClasses(classes => classes.filter(classe => classe.id !== id));

      toast({
        title: "Sucesso",
        description: "Turma excluída com sucesso!",
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: "Erro",
        description: "Erro ao excluir uma turma",
      });
      console.error("Erro ao enviar os dados", error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex w-full justify-between items-center px-2 py-1.5">
        Excluir
        <IoTrashBinOutline />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>
          Tem certeza que deseja excluir uma turma?
        </AlertDialogTitle>
        <AlertDialogDescription>
          Esta ação não pode ser desfeita. Isso excluirá permanentemente a turma e removerá seus dados de nossos servidores.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={deleteClasse}>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
