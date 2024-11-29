import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Table } from "antd";
import Crud from "../crud/Crud";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TableProps } from "../../types";

const TableComponent = <T extends object>({
  data,
  columns,
  open,
  setOpen,
  pagination,
}: TableProps<T>) => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/admin?search=${search}`);
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
      <Table<T> columns={columns} dataSource={data} pagination={pagination} />
      <Crud open={open} setOpen={setOpen} FormData={[]} setUpdateData={{}} />
    </div>
  );
};

export default TableComponent;
