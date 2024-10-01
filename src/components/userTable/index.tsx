import { useEffect, useState } from "react";
import { User } from './columns';
import axios from "axios";
import { DataTable } from "../ui/dataTable";
import { UsersFilter } from "../filters/studentsFilter";
import { ColumnDef, OnChangeFn, RowSelectionState } from "@tanstack/react-table";

export type HttpParams = {
  page: string;
  limit: string;
  orderBy: string;
  order: string;
  role: string;
};

type UserTableProps = {
  role: 'STUDENT' | 'TEACHER'
  columns: ColumnDef<User>[]
  rowSelection: RowSelectionState;
  onRowSelectionChange: OnChangeFn<RowSelectionState>;
};

export function UserTable(props: UserTableProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [httpParams, setHttpParams] = useState<HttpParams>({
    limit: '8',
    order: 'asc',
    orderBy: 'name',
    page: '1',
    role: props.role,
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
        `http://localhost:4000/users?page=${httpParams.page}&limit=${httpParams.limit}&orderBy=${httpParams.orderBy}&order=${httpParams.order}&role=${httpParams.role}`
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

  useEffect(() => {
    fetchUsers();
  }, [httpParams]); // Atualiza sempre que os parâmetros de consulta mudam

  const handleUserAdded = () => {
    fetchUsers();
  };

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
        <DataTable
          columns={props.columns}
          data={users}
        />
      ) : (
        <p>Nenhum usuário encontrado.</p>
      )}
    </>
  );
}
