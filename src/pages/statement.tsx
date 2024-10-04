import { User } from "@/components/userTable/columns";
import { useEffect, useState } from "react";
import axios from "axios";
import { ReportCard } from "@/components/reportCard";
import { HttpParams, ReportsFilter } from "@/components/filters/reportsFilter";
import { LucideLoaderCircle } from "lucide-react";
import { AddReport } from "@/components/addReport";

interface Report {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  creatorId: string;
  creator: User;
  userCount: number;
}
export function Statement() {
  const [data, setData] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0)
  const [httpParams, setHttpParams] = useState<HttpParams>({
    limit: '4',
    order: 'asc',
    orderBy: 'title',
    page: '1',
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get<{
          reports: Report[]
          totalPages: number
        }>(
          `http://localhost:4000/reports?page=${httpParams.page}&limit=${httpParams.limit}&orderBy=${httpParams.orderBy}&order=${httpParams.order}`
        );
        setData(response.data.reports);
        setTotalPages(response.data.totalPages)
        setLoading(false);
      } catch (error) {
        setError('Ocorreu um erro ao buscar os dados.');
        setLoading(false);
      }
    };

    fetchData();
  }, [httpParams]);
  return (
    <>
      <header className="flex w-full justify-between mb-5">
        <div>
          <h1 className="text-2xl">Comunicados</h1>
          <p className="text-neutral-600">Lista de comunicados</p>
        </div>
        <AddReport />
      </header>
      <ReportsFilter httpParams={httpParams} setHttpParams={setHttpParams} totalPages={totalPages} />
      <main className="flex w-full justify-center">
        {loading ? (
          <LucideLoaderCircle className="animate-spin" />
        ) : (
          <div className="space-y-3 w-full">
            {data.map((report) => {
              return (
                <ReportCard
                  key={report.id}
                  createdAt={new Date(report.createdAt)}
                  creatorAvatar={report.creator.avatarUrl}
                  creatorName={report.creator.name}
                  description={report.description}
                  title={report.title}
                />
              )
            })}
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </main>
    </>
  )
}