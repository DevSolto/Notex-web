import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/input';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { Button } from '../ui/button';
import { useState } from 'react';
import { LucideLoaderCircle } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const userSchema = z.object({
  title: z.string().min(1, "O título é obrigatório."),
  description: z.string().min(1, "A descrição é obrigatória."),
  recipients: z.string()
});

type FormData = z.infer<typeof userSchema>;

type AddFormProps = {
  setDialogOpen: (isOpen: boolean) => void;
};

export const AddForm = (props: AddFormProps) => {
  const [isSending, setIsSending] = useState(false);

  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);
    try {
      setIsSending(true);

      const response = await axios.post('http://localhost:4000/reports', { ...data, creatorId: "cm1n1gecd0000p20tk2szib7u" });
      setIsSending(false);
      props.setDialogOpen(false);

      toast({
        title: "Sucesso",
        description: `Comunicado enviado para ${response.data.numberOfUsersWhoReceived} usuários!`,
      });
      console.log(response);
    } catch (error) {
      setIsSending(false);
      console.log(error);

      toast({
        variant: 'destructive',
        title: "Erro",
        description: "Erro ao enviar um comunicado.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
      <div className='space-y-1'>
        <label>Título</label>
        <Input {...register("title")} />
        {errors.title && <p className='text-red-500'>{errors.title?.message}</p>}
      </div>

      <div className='space-y-1'>
        <label>Descrição</label>
        <Textarea {...register("description")} />
        {errors.description && <p className='text-red-500'>{errors.description?.message}</p>}
      </div>

      <div className='space-y-1'>
        <label>Destinatários</label>
        <Select onValueChange={(value) => setValue('recipients', value)}>
          <SelectTrigger>
            <SelectValue placeholder='Para quem vai esse comunicado?' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='TEACHER'>Professores</SelectItem>
              <SelectItem value='STUDENT'>Estudantes</SelectItem>
              <SelectItem value='ADMIN'>Coordenadores</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {errors.recipients && <p className='text-red-500'>{errors.recipients?.message}</p>}
      </div>

      {isSending ? (
        <LucideLoaderCircle className='animate-spin' />
      ) : (
        <Button type="submit">Enviar</Button>
      )}
    </form>
  );
};
