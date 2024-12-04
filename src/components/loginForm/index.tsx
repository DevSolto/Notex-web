'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import Cookies from 'js-cookie';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RiLoaderFill } from "react-icons/ri";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useNavigate } from 'react-router-dom';
import { cpf } from 'easy-cpf';

export const loginFormSchema = z.object({
  cpf: z.string().min(1, 'O cpf é obrigatório.').refine(cpf.validate, 'O cpf precisa ser válido'),
  password: z.string().min(8, 'A senha tem que ter no mínimo 8 caracteres.')
});

export function LoginForm() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      cpf: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://q01b4kvh-4000.brs.devtunnels.ms/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.data || 'Erro ao realizar login.');
        return;
      }

      const data = await response.json();

      Cookies.set('authToken', data.data, { expires: 7 });
      console.log('Token armazenado com sucesso:', data.data);

      // Redireciona para a página inicial
      navigate('/');

    } catch (error: unknown) {
      console.error('Erro no login:', error);
      setError('Ocorreu um erro inesperado. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="cpf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cpf</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu cpf" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Digite sua senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <RiLoaderFill className="animate-spin" /> : 'Entrar'}
        </Button>
      </form>
    </FormProvider>
  );
}
