import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";

export type HttpParams = {
  page: string;
  limit: string;
  orderBy: string;
  order: string;
  search?: string; 
};

type SubjectsFilterProps = {
  httpParams: HttpParams;
  setHttpParams: React.Dispatch<React.SetStateAction<HttpParams>>;
  totalPages: number;
};

export function SubjectsFilter(props: SubjectsFilterProps) {
  const [search, setSearch] = useState(props.httpParams.search || '');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    props.setHttpParams((prevParams) => ({
      ...prevParams,
      search: e.target.value,
      page: '1'
    }));
  };

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
        <Input
          onChange={handleSearchChange}
          type="search"
          value={search}
          placeholder="Procurar disciplina..."
          className="w-72"
        />
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
