import { useEffect, useState } from "react";
import { User } from './columns';
import axios from "axios";
import { DataTable } from "../ui/data-table";
import { UsersFilter } from "../filters/studentsFilter";
import { ColumnDef } from "@tanstack/react-table";

export type HttpParams = {
  page: string;
  limit: string;
  orderBy: string;
  order: string;
  role: string;
  search?: string;  // Adiciona campo para busca
};

type UserTableProps = {
  role: 'STUDENT' | 'TEACHER' | 'ADMIN';
  columns: ColumnDef<User>[];
  data?: User[];
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
    search: '',  // Inicializa com string vazia para busca
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
        `http://localhost:4000/users?page=${httpParams.page}&limit=${httpParams.limit}&orderBy=${httpParams.orderBy}&order=${httpParams.order}&role=${httpParams.role}&search=${httpParams.search || ''}`
      );
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
    if (!props.data) {
      fetchUsers();
    } else {
      setUsers(props.data);
    }
  }, [httpParams, props.data]);  // Observa httpParams e props.data

  return (
    <>
      {!props.data && (
        <UsersFilter
          httpParams={httpParams}
          setHttpParams={setHttpParams}
          totalPages={totalPages}
        />
      )}

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
