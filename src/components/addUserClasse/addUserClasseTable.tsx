import { useEffect, useState } from "react";
import { User } from './columns';
import axios from "axios";
import { UsersFilter } from "../filters/studentsFilter";
import { ColumnDef, OnChangeFn, RowSelectionState } from "@tanstack/react-table";
import { DataTableSelect } from "../ui/data-table-select";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";

export type HttpParams = {
  page: string;
  limit: string;
  orderBy: string;
  order: string;
  role: string;
};

type UserTableProps = {
  columns: ColumnDef<User>[]
  rowSelection: RowSelectionState;
  onRowSelectionChange: OnChangeFn<RowSelectionState>;
  classeId: string
};

export function AddUserClasseTable(props: UserTableProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [httpParams, setHttpParams] = useState<HttpParams>({
    limit: '8',
    order: 'asc',
    orderBy: 'name',
    page: '1',
    role: 'STUDENT',
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<{
        users: User[];
        total: number;
        totalPages: number;
      }>(
        `https://q01b4kvh-4000.brs.devtunnels.ms/students/${props.classeId}?page=${httpParams.page}&limit=${httpParams.limit}&orderBy=${httpParams.orderBy}&order=${httpParams.order}`
      );
      console.log(response);
      setTotalPages(response.data.totalPages);
      setUsers(response.data.users);
    } catch (error) {
      setError('Erro ao carregar usuários');
      console.error('Erro ao buscar usuários:', error);
    } finally {
      setLoading(false);
    }
  };
  const addUsersClasse = async () => {
    console.log(selectedIds);

    try {
      const response: { data: { count: number } } = await axios.post(
        `https://q01b4kvh-4000.brs.devtunnels.ms/studying`,
        {
          classeId: props.classeId,
          usersId: selectedIds
        }
      );
      console.log(response)
      fetchUsers()
      toast({
        title: 'Sucesso',
        description: `${response.data.count} estudantes adicionados a turma`
      })
    } catch (error) {
      console.error('Erro ao adicionar estudantes a turma usuários:', error);
    } finally {
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [httpParams])

  return (
    <>
      <UsersFilter
        httpParams={httpParams}
        setHttpParams={setHttpParams}
        totalPages={totalPages}
      />

      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : users.length > 0 ? (
        <DataTableSelect
          setSelectedIds={setSelectedIds}
          columns={props.columns}
          data={users}
        />
      ) : (
        <p>Nenhum usuário encontrado.</p>
      )}
      <div>
        <Button onClick={addUsersClasse}>Adicionar</Button>
      </div>
    </>
  );
}
