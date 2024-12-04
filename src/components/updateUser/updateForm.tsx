import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/input';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { LucideLoaderCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { User } from '../userTable/columns';

const formSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório."),
  email: z.string().email("E-mail inválido."),
  cpf: z.string().min(11, "O CPF deve ter 11 dígitos.").max(14, "O CPF é inválido."),
  phone: z.string().min(10, "O telefone deve ter no mínimo 10 dígitos."),
  role: z.string().optional(),
  avatarUrl: z.string().optional(),
  isActive: z.boolean().optional(),
});

type FormData = z.infer<typeof formSchema>;

type UpdateUserFormProps = {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  role: string;
  avatarUrl: string;
  isActive: boolean;
  setDialogOpen: (isOpen: boolean) => void;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

export const UpdateUserForm = (props: UpdateUserFormProps) => {

  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsSending(true);
      const response = await axios.patch(`https://q01b4kvh-4000.brs.devtunnels.ms/users/${props.id}`, { ...data });

      props.setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === props.id ? { ...user, ...data } : user
        )
      );
      setIsSending(false);
      console.log("Resposta da API:", response.data);
      props.setDialogOpen(false);

      toast({
        title: "Sucesso",
        description: "Usuário editado com sucesso!",
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: "Erro",
        description: "Erro ao editar um usuário",
      });
      console.error("Erro ao enviar os dados", error);
      props.setDialogOpen(false);
    }
  };

  useEffect(() => {
    setValue("name", props.name);
    setValue("email", props.email);
    setValue("cpf", props.cpf);
    setValue("phone", props.phone);
    setValue("role", props.role);
    setValue("avatarUrl", props.avatarUrl);
    setValue("isActive", props.isActive);
  }, [props, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
      <div className='space-y-1'>
        <label>Nome</label>
        <Input {...register("name")} defaultValue={props.name} />
        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
      </div>

      <div className='space-y-1'>
        <label>E-mail</label>
        <Input {...register("email")} defaultValue={props.email} />
        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
      </div>

      <div className='space-y-1'>
        <label>CPF</label>
        <Input {...register("cpf")} defaultValue={props.cpf} />
        {errors.cpf && <p className='text-red-500'>{errors.cpf.message}</p>}
      </div>

      <div className='space-y-1'>
        <label>Telefone</label>
        <Input {...register("phone")} defaultValue={props.phone} />
        {errors.phone && <p className='text-red-500'>{errors.phone.message}</p>}
      </div>

      <div className='space-y-1'>
        <label>Papel</label>
        <Select onValueChange={(value) => setValue("role", value)} defaultValue={props.role}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o papel do usuário" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ADMIN">Administrador</SelectItem>
            <SelectItem value="TEACHER">Professor</SelectItem>
            <SelectItem value="STUDENT">Estudante</SelectItem>
          </SelectContent>
        </Select>
        {errors.role && <p className='text-red-500'>{errors.role?.message}</p>}
      </div>

      {
        isSending ? (
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
