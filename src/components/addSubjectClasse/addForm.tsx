import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { Button } from '../ui/button';
import { useState, useEffect } from 'react';
import { LucideLoaderCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { User } from '../userTable/columns';
import { Subject } from '../subjectTable/columns';

const subjectClassSchema = z.object({
  userId: z.string().min(1, "O professor é obrigatório."),
  subjectId: z.string().min(1, "A disciplina é obrigatória."),
});

type FormData = z.infer<typeof subjectClassSchema>;

type AddFormProps = {
  setDialogOpen: (isOpen: boolean) => void;
  classId: string
};

export const AddForm = (props: AddFormProps) => {
  const [isSending, setIsSending] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const { toast } = useToast();

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(subjectClassSchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, subjectsResponse] = await Promise.all([
          axios.get('https://q01b4kvh-4000.brs.devtunnels.ms/users?role=TEACHER'),
          axios.get('https://q01b4kvh-4000.brs.devtunnels.ms/subjects'),
        ]);

        setUsers(usersResponse.data.users);
        setSubjects(subjectsResponse.data.subjects);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: "Erro",
          description: "Erro ao carregar os dados",
        });
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      setIsSending(true);
      await axios.post('https://q01b4kvh-4000.brs.devtunnels.ms/subjectclass', {
        ...data,
        classId: props.classId
      });
      setIsSending(false);
      props.setDialogOpen(false);

      toast({
        title: "Sucesso",
        description: "Associação de Disciplina criada com sucesso!",
      });
    } catch (error) {
      setIsSending(false);

      const errorMessage =
        axios.isAxiosError(error) && error.response?.data
          ? JSON.stringify(error.response.data.message)
          : 'Erro ao adicionar a disciplina à classe';

      toast({
        variant: 'destructive',
        title: "Erro",
        description: errorMessage,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
      <div className='space-y-1'>
        <label>Usuário</label>
        <Select onValueChange={(value) => setValue('userId', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o usuário" />
          </SelectTrigger>
          <SelectContent>
            {users.map((user: User) => (
              <SelectItem key={user.id} value={user.id}>
                {user.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.userId && <p className='text-red-500'>{errors.userId?.message}</p>}
      </div>

      <div className='space-y-1'>
        <label>Disciplina</label>
        <Select onValueChange={(value) => setValue('subjectId', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione a disciplina" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subject: any) => (
              <SelectItem key={subject.id} value={subject.id}>
                {subject.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.subjectId && <p className='text-red-500'>{errors.subjectId?.message}</p>}
      </div>

      {isSending ? (
        <LucideLoaderCircle className='animate-spin' />
      ) : (
        <Button type="submit">Enviar</Button>
      )}
    </form>
  );
};
