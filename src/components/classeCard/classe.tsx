import axios from "axios";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { UserTable } from "../userTable";
import { columns, User } from "../userTable/columns";
import { ScrollArea } from "../ui/scroll-area";

type ClasseProps = {
  classeId: string;
}

export type Classe = {
  id: string;
  title: string;
  code: string;
  year: string;
  period: number;
  createdAt: string;
  updatedAt: string;
  Studing: {
    userId: string;
    user: User,
    classId: string;
    class: {
      id: string;
      title: string;
      code: string;
      year: string;
      period: number;
      createdAt: string;
      updatedAt: string;
    };
    createdAt: string;
    updatedAt: string;
  }[];
};

export function Classe(props: ClasseProps) {
  const [data, setData] = useState<Classe | null>(null);  // Estado pode ser null inicialmente
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<Classe>(
          `http://localhost:4000/classes/${props.classeId}`
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError('Ocorreu um erro ao buscar os dados.');
        setLoading(false);
      }
    };

    if (props.classeId) {
      fetchData();
    }
  }, [props.classeId]);

  let formattedDate = '';
  if (data) {
    formattedDate = new Date(data?.createdAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Ver turma</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[1000px]">
        {loading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p>{error}</p>
        ) : data ? (
          <>
            <DialogHeader className="flex-row items-center justify-between pt-3">
              <DialogTitle>
                {data.title}
              </DialogTitle>
              <p>Criado em: {formattedDate}</p>
            </DialogHeader>
            <DialogDescription>
              <p>Código: {data.code}</p>
              <p>Ano: {data.year}</p>
              <p>Período: {data.period}</p>
            </DialogDescription>
            <div>
              <p className="text-lg font-semibold">Estudantes:</p>
              <ScrollArea className="h-[500px] py-5">
                <UserTable columns={columns} data={data.Studing.map(s => s.user)} role="STUDENT" />
              </ScrollArea>
            </div>
          </>
        ) : (
          <p>Nenhum dado disponível.</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
