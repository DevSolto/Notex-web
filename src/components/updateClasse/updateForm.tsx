import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/input';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { Button } from '../ui/button';
import { useState } from 'react';
import { LucideLoaderCircle } from 'lucide-react';
import { ClassData } from '@/pages/classes';

const formSchema = z.object({
  title: z.string().optional(),
  code: z.string().optional(),
  year: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

type UpdateFormProps = {
  id: string
  title: string
  code: string
  year: string
  setDialogOpen: (isOpen: boolean) => void
  setClasses: React.Dispatch<React.SetStateAction<ClassData[]>>
}

export const UpdateForm = (props: UpdateFormProps) => {

  const [isSanding, setIsSending] = useState(false)

  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsSending(true)
      const response = await axios.patch(`https://q01b4kvh-4000.brs.devtunnels.ms/classes/${props.id}`, { ...data });

      props.setClasses(prevClasses => 
        prevClasses.map(classe => 
          classe.id === props.id ? { ...classe, ...data } : classe
        )
      );
      setIsSending(false)
      console.log("Resposta da API:", response.data);
      props.setDialogOpen(false);

      toast({
        title: "Sucesso",
        description: "Turma editada com sucesso!",
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: "Erro",
        description: "Erro ao editar um usuário",
      })
      console.error("Erro ao enviar os dados", error);
      props.setDialogOpen(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
      <div className='space-y-1'>
        <label>Título</label>
        <Input {...register("title")} defaultValue={props.title} />
        {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
      </div>

      <div className='space-y-1'>
        <label>Código</label>
        <Input {...register("code")} defaultValue={props.code} />
        {errors.code && <p className='text-red-500'>{errors.code.message}</p>}
      </div>

      <div className='space-y-1'>
        <label>Ano</label>
        <Input {...register("year")} defaultValue={props.year} />
        {errors.year && <p className='text-red-500'>{errors.year.message}</p>}
      </div>

      {
        isSanding ? (
          <LucideLoaderCircle className='animate-spin' />
        ) : (
          <Button>
            Enviar
          </Button>
        )
      }
    </form>
  );
};
