import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { Button } from '../ui/button';
import { useState } from 'react';
import { LucideLoaderCircle } from 'lucide-react';
import { Input } from '../ui/input';

const subjectClassSchema = z.object({
  url: z.string().min(1, "A url é obrigatória."),
});

type FormData = z.infer<typeof subjectClassSchema>;

type AddFormProps = {
  setDialogOpen: (isOpen: boolean) => void;
  classId: string
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
    resolver: zodResolver(subjectClassSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsSending(true);
      await axios.post('http://localhost:4000/schedules', {
        ...data,
        classId: props.classId,
        creatorId: 'cm21yz8ic0000lehae9xrq4t2'
      });
      setIsSending(false);
      props.setDialogOpen(false);

      toast({
        title: "Sucesso",
        description: "Associação de Disciplina criada com sucesso!",
      });
    } catch (error) {
      setIsSending(false);
      console.log(error);


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
        <label>Link</label>
        <Input {...register('url')} placeholder='Digite a url do horário' />
        {errors.url && <p className='text-red-500'>{errors.url?.message}</p>}
      </div>

      {isSending ? (
        <LucideLoaderCircle className='animate-spin' />
      ) : (
        <Button type="submit">Enviar</Button>
      )}
    </form>
  );
};
