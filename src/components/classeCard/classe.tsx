import axios from "axios";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { UserTable } from "../userTable";
import { columns as userColumns, User } from "../userTable/columns";
import { columns as subjectColumns } from '../subjectTable/columns';
import { ScrollArea } from "../ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { SubjectTable } from "../subjectTable";
import { Subject } from "../subjectTable/columns";
import { IoDownloadOutline } from "react-icons/io5";
import { AddSubjectClasse } from "../addSubjectClasse";
import { AddUserClasse } from "../addUserClasse";
import { AddSchedule } from "../addSchedule";

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
  Studing?: {
    userId: string;
    classId: string;
    createdAt: string;
    updatedAt: string;
    user: User;
  }[];
  SubjectClass?: {
    userId: string;
    classId: string;
    subjectId: string;
    createdAt: string;
    updatedAt: string;
    subject: Subject;
  }[];
  Schedule?: {
    id: string;
    url: string;
    createdAt: string;
    updatedAt: string;
    creatorId: string;
    classId: string;
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
    if (data.SubjectClass) {
      const subjects = data.SubjectClass.map(s => s.subject)

      console.log(subjects);
    }
  }

  const handleDownload = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'schedule.pdf'); // Define o nome do arquivo ao baixar
    document.body.appendChild(link);
    link.click();
    link.remove();
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
            <Tabs defaultValue="students" className="border p-5 rounded-2xl">
              <TabsList className="gap-3 w-full justify-center">
                <TabsTrigger className="border rounded-xl" value="students">
                  Estudantes
                </TabsTrigger>
                <TabsTrigger className="border rounded-xl" value="subjects">
                  Disciplinas
                </TabsTrigger>
                <TabsTrigger className="border rounded-xl" value="schedule">
                  Horário
                </TabsTrigger>
              </TabsList>
              <TabsContent value="students">
                <div className="flex w-full justify-between items-center">
                  <p className="text-lg font-semibold">Estudantes:</p>
                  <Button>
                    <AddUserClasse casseId={props.classeId} />
                  </Button>
                </div>
                <ScrollArea className="h-[500px] py-5">
                  {data.Studing && data.Studing.length > 0 ? (
                    <UserTable columns={userColumns} data={data.Studing.map(s => s.user)} role="STUDENT" />
                  ) : (
                    <p>Nenhum estudante encontrado.</p>
                  )}
                </ScrollArea>
              </TabsContent>
              <TabsContent value="subjects">
                <div className="flex w-full justify-between items-center">
                  <p className="text-lg font-semibold">Disciplinas:</p>
                  <Button>
                    <AddSubjectClasse casseId={props.classeId} />
                  </Button>
                </div>
                <ScrollArea className="h-[500px] py-5">
                  {data.SubjectClass && data.SubjectClass.length > 0 ? (
                    <SubjectTable data={data.SubjectClass.map(s => s.subject)} columns={subjectColumns} />
                  ) : (
                    <p>Nenhuma disciplina encontrada.</p>
                  )}
                </ScrollArea>
              </TabsContent>
              <TabsContent value="schedule">
                <div className="flex w-full justify-between items-center">
                  <p className="text-lg font-semibold">Horários:</p>
                  <Button>
                    <AddSchedule casseId={props.classeId} />
                  </Button>
                </div>
                <ScrollArea className="h-[500px] py-5">
                  {data.Schedule && data.Schedule.length > 0 ? (
                    data.Schedule.map(schedule => (
                      <div key={schedule.id} className="flex items-center justify-between">
                        <p>Criado em: {new Date(schedule.createdAt).toLocaleDateString('pt-BR')}</p>
                        <Button onClick={() => handleDownload(schedule.url)}>
                          <IoDownloadOutline />
                          Baixar
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p>Nenhum horário encontrado.</p>
                  )}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <p>Nenhum dado disponível.</p>
        )}
      </DialogContent>
    </Dialog >
  );
}
