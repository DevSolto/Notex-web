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

const userSchema = z.object({
  title: z.string().min(1, "O titulo é obrigatório."),
  description: z.string().min(1, "A descrição é obrigatória")
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
      const response = await axios.post('http://localhost:4000/reports', { ...data, creatorId: "cm1n1gecd0000p20tk2szib7u" });
      setIsSending(false);
      props.setDialogOpen(false);

      window.location.reload();
      toast({
        title: "Sucesso",
        description: "Comunicado adicionado com sucesso!",
      });
      console.log(response);
    } catch (error) {
      setIsSending(false);
      console.log(error);

      toast({
        variant: 'destructive',
        title: "Erro",
        description: "Erro ao adicionar um comunicado",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
      <div className='space-y-1'>
        <label>Titulo</label>
        <Input {...register("title")} />
        {errors.title && <p className='text-red-500'>{errors.title?.message}</p>}
      </div>

      <div className='space-y-1'>
        <label>Descrição</label>
        <Textarea {...register("description")} />
        {errors.description && <p className='text-red-500'>{errors.description?.message}</p>}
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
