import { useEffect, useState } from "react";
import axios from "axios";
import { DataTable } from "../ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Subject } from "./columns";
import { SubjectsFilter } from "../filters/subjectsFilter";

export type HttpParams = {
  page: string;
  limit: string;
  orderBy: string;
  order: string;
  search?: string;  // Campo para busca por nome de disciplinas
};

type SubjectTableProps = {
  columns: ColumnDef<Subject>[];
  data?: Subject[];
};

export function SubjectTable(props: SubjectTableProps) {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [httpParams, setHttpParams] = useState<HttpParams>({
    limit: '8',
    order: 'asc',
    orderBy: 'name',  // Ordenar pelo nome da disciplina
    page: '1',
    search: '',  // Inicializa com string vazia para a busca por nome
  });

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<{
        subjects: Subject[];
        total: number;
        totalPages: number;
      }>(
        `https://q01b4kvh-4000.brs.devtunnels.ms/subjects?page=${httpParams.page}&limit=${httpParams.limit}&orderBy=${httpParams.orderBy}&order=${httpParams.order}&search=${httpParams.search || ''}`
      );
      console.log(response);

      setTotalPages(response.data.totalPages);
      setSubjects(response.data.subjects);
    } catch (error) {
      setError('Erro ao carregar disciplinas');
      console.error('Erro ao buscar disciplinas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!props.data) {
      fetchSubjects();
    } else {
      setSubjects(props.data);
    }
  }, [httpParams, props.data]);  // Observa mudanças em httpParams e props.data

  return (
    <>
      {!props.data && (
        <SubjectsFilter
          httpParams={httpParams}
          setHttpParams={setHttpParams}
          totalPages={totalPages}
        />
      )}

      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : subjects.length > 0 ? (
        <DataTable
          columns={props.columns}
          data={subjects}
        />
      ) : (
        <p>Nenhuma disciplina encontrada.</p>
      )}
    </>
  );
}
