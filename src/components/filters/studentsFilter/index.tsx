import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";

export type HttpParams = {
  page: string;
  limit: string;
  orderBy: string;
  order: string;
  role: string;
  search?: string;  // Adiciona campo para busca
};

type UsersFilterProps = {
  httpParams: HttpParams;
  setHttpParams: React.Dispatch<React.SetStateAction<HttpParams>>;
  totalPages: number;
};

export function UsersFilter(props: UsersFilterProps) {
  const years: number[] = [];

  const [search, setSearch] = useState(props.httpParams.search || '');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    props.setHttpParams((prevParams) => ({
      ...prevParams,
      search: e.target.value,
      page: '1',
    }));
  };

  Array.from({ length: 4 }, (_, i) => {
    const year = new Date().getFullYear() + (i + 1);
    years.push(year);
  });

  Array.from({ length: 5 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    years.push(year);
  });

  years.sort((a, b) => b - a);

  const handlePageChange = (direction: 'next' | 'previous') => {
    const currentPage = parseInt(props.httpParams.page, 10) || 1;

    const newPage = direction === 'next' ? currentPage + 1 : Math.max(1, currentPage - 1);

    props.setHttpParams({
      ...props.httpParams,
      page: String(newPage),
    });
  };


  return (
    <div className="w-full flex justify-between mb-5">
      <div className="flex gap-3">
        <Input onChange={handleSearchChange} type="search" placeholder="Procurar..." className="w-72" />
      </div>

      <div className="flex gap-5 items-center">
        <Button
          className="bg-white border text-black shadow-sm hover:bg-neutral-100"
          onClick={() => handlePageChange('previous')}
          disabled={parseInt(props.httpParams.page, 10) === 1}
        >
          <IoArrowBackOutline />
        </Button>

        <span>{props.httpParams.page || '1'}</span>

        <Button
          className="bg-white border text-black shadow-sm hover:bg-neutral-100"
          onClick={() => handlePageChange('next')}
          disabled={parseInt(props.httpParams.page, 10) === props.totalPages}
        >
          <IoArrowForwardOutline />
        </Button>
      </div>
    </div>
  );
}
