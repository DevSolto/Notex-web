import { ClasseCard } from "@/components/classeCard";
import { Container } from "@/components/container";
import { ClassesFilter } from "@/components/filters/classesFilter";
import { useEffect, useState } from "react"; ''
import axios from 'axios';
import { LucideLoaderCircle } from "lucide-react";
import { AddClasse } from "@/components/addClasse";

export interface ClassData {
  id: string;
  title: string;
  code: string;
  year: string;
  period: number;
}

export function Classes() {
  const [data, setData] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://q01b4kvh-4000.brs.devtunnels.ms/classes');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError('Ocorreu um erro ao buscar os dados.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <header className="flex w-full justify-between mb-5">
        <div>
          <h1 className="text-2xl">Turmas</h1>
          <p className="text-neutral-600">Lista de turmas</p>
        </div>
        <AddClasse />
      </header>
      <main className="flex flex-col justify-center items-center gap-5 max-h-full">
        <ClassesFilter />
        {loading ? (
          <LucideLoaderCircle className="animate-spin" />
        ) : (
          <div className="grid justify-center w-full md:grid-cols-2 lg:grid-cols-3 gap-5 flex-1">
            {
              data.map((classe) => (
                <ClasseCard
                  setClasses={setData}
                  key={classe.id}
                  id={classe.id}
                  title={classe.title}
                  code={classe.code}
                  numberOfStudents={35}
                  year={classe.year}
                />
              ))
            }
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </main>
    </Container>
  );
}
