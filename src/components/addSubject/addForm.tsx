import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/input';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { Button } from '../ui/button';
import { useState } from 'react';
import { LucideLoaderCircle } from 'lucide-react';

const userSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório."),
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
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsSending(true);
      await axios.post('http://localhost:4000/subjects', { ...data });
      setIsSending(false);
      props.setDialogOpen(false);

      toast({
        title: "Sucesso",
        description: "Disciplina adicionada com sucesso!",
      });
    } catch (error) {
      setIsSending(false);

      const errorMessage =
        axios.isAxiosError(error) && error.response?.data
          ? JSON.stringify(error.response.data.message)
          : 'Erro ao adicionar disciplina';

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
        <label>Nome</label>
        <Input {...register("name")} placeholder="Digite o nome da disciplina" />
        {errors.name && <p className='text-red-500'>{errors.name?.message}</p>}
      </div>

      {
        isSending ? (
          <LucideLoaderCircle className='animate-spin' />
        ) : (
          <Button type="submit">Enviar</Button>
        )
      }
    </form>
  );
};
