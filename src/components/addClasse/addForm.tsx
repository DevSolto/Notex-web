import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/input';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { Button } from '../ui/button';
import { useState } from 'react';
import { LucideLoaderCircle } from 'lucide-react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '../ui/select';

const formSchema = z.object({
  title: z.string().min(1, "O nome da turma é obrigatório."),
  code: z.string().min(1, "O código é obrigatório."),
  year: z.string().min(4, "O ano deve ter 4 dígitos."),
});

type FormData = z.infer<typeof formSchema>;

type AddFormProps = {
  setDialogOpen: (isOpen: boolean) => void
}

export const AddForm = (props: AddFormProps) => {

  const [isSanding, setIsSending] = useState(false)

  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);

    try {
      setIsSending(true)
      const response = await axios.post('http://localhost:4000/classes', { ...data, period: 1 });
      setIsSending(false)
      console.log("Resposta da API:", response.data);
      props.setDialogOpen(false);

      window.location.reload();
      toast({
        title: "Sucesso",
        description: "Usuário adicionado com sucesso!",
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: "Erro",
        description: "Erro ao adicionar um usuário",
      })
      console.error("Erro ao enviar os dados", error);
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
        <label>Código</label>
        <Input {...register("code")} />
        {errors.code && <p className='text-red-500'>{errors.code?.message}</p>}
      </div>

      <div className='space-y-1'>
        <label>Ano</label>
        {/* Select para o campo de ano */}
        <Select
          onValueChange={(value) => setValue("year", value)} // Atualiza o valor do campo 'year'
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o ano" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 4 }, (_, i) => {
              const year = new Date().getFullYear() + i; // Lista dos últimos 10 anos
              return (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        {errors.year && <p className='text-red-500'>{errors.year?.message}</p>}
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
