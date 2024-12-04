import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/input';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { Button } from '../ui/button';
import { useState } from 'react';
import { LucideLoaderCircle } from 'lucide-react';
import { cpf } from 'easy-cpf';

const userSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório."),
  email: z.string().email("E-mail inválido."),
  cpf: z.string().min(11, "O CPF deve ter 11 dígitos.").max(14, "O CPF é inválido.").refine(cpf.validate, 'O CPF é inválido'),
  password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres."),
  phone: z.string().min(10, "O telefone deve ter no mínimo 10 dígitos."),
});

type FormData = z.infer<typeof userSchema>;

type AddFormProps = {
  setDialogOpen: (isOpen: boolean) => void;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN';
};

export const AddForm = (props: AddFormProps) => {
  const [isSending, setIsSending] = useState(false);

  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsSending(true);
      await axios.post('https://q01b4kvh-4000.brs.devtunnels.ms/users', { ...data, role: props.role, avatarUrl: "https://github.com/DevSolto.png" });
      setIsSending(false);
      props.setDialogOpen(false);

      toast({
        title: "Sucesso",
        description: "Usuário adicionado com sucesso!",
      });
    } catch (error) {
      setIsSending(false);

      const errorMessage =
        axios.isAxiosError(error) && error.response?.data
          ? JSON.stringify(error.response.data.message)
          : 'Erro ao adicionar usuário';

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
        <Input {...register("name")} placeholder="Digite o nome completo" />
        {errors.name && <p className='text-red-500'>{errors.name?.message}</p>}
      </div>

      <div className='space-y-1'>
        <label>E-mail</label>
        <Input {...register("email")} placeholder="exemplo@dominio.com" />
        {errors.email && <p className='text-red-500'>{errors.email?.message}</p>}
      </div>

      <div className='space-y-1'>
        <label>CPF</label>
        <Input {...register("cpf")} placeholder="000.000.000-00" />
        {errors.cpf && <p className='text-red-500'>{errors.cpf?.message}</p>}
      </div>

      <div className='space-y-1'>
        <label>Senha</label>
        <Input type="password" {...register("password")} placeholder="Digite sua senha" />
        {errors.password && <p className='text-red-500'>{errors.password?.message}</p>}
      </div>

      <div className='space-y-1'>
        <label>Telefone</label>
        <Input {...register("phone")} placeholder="(99) 99999-9999" />
        {errors.phone && <p className='text-red-500'>{errors.phone?.message}</p>}
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
