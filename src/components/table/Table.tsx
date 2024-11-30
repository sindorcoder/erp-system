import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Table } from "antd";
import Crud from "../crud/Crud";
import { useEffect, useState } from "react";
import { TableProps } from "../../types";
import useSearchParamsHook from "../../hooks/useQueryParams";

const TableComponent = ({
  data,
  columns,
  open,
  setOpen,
  pagination,
}: TableProps) => {
  const [search, setSearch] = useState("");
  const { setParam, removeParam } = useSearchParamsHook();
  useEffect(() => {
    if (search !== "") {
      setParam("search", search.toLowerCase());
    }
    if (search === "") {
      removeParam("search");
    }
  }, [search]);

  return (
    <div className="w-full p-5 border-2 border-gray-300 rounded-lg">
      <div className="flex items-center mb-5 justify-between gap-5">
        <div className="w-full max-w-[50%]">
          <Input
            placeholder="Qidiruv"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="py-2 !border-[#0EB182]"
            prefix={<SearchOutlined />}
          />
        </div>
        <Button
          onClick={() => setOpen(true)}
          type="primary"
          className="!bg-[#0EB182]"
        >
          Qo'shish
        </Button>
      </div>
      <Table
        key={data?.id}
        columns={columns}
        dataSource={data}
        pagination={pagination}
      />
      <Crud
        open={open}
        setOpen={setOpen}
        FormData={[]}
        setUpdateData={{}}
        checkUpdate={() => {}}
      />
    </div>
  );
};

export default TableComponent;
