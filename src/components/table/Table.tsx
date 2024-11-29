import { SearchOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { Button, Input, Table } from "antd";
import { DataType } from "../../types";
import { useState } from "react";
import Crud from "../crud/Crud";
const TableComponent: React.FC<{ data: DataType[] }> = ({ data }) => {
  const [open, setOpen] = useState(false);

  const columns: TableColumnsType<DataType> = [
    {
      title: "№",
      dataIndex: "index",
      key: "id",
      width: "2%",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Nomi",
      dataIndex: ["attachment", "origName"],
      key: "name",
      width: "15%",
    },
    {
      title: "Kurs",
      dataIndex: ["course", "name"],
      key: "age",
      width: "20%",
    },
  ];

  return (
    <div className="w-full p-5 border-2 border-gray-300 rounded-lg">
      <div className="flex items-center mb-5 justify-between gap-5">
        <div className="w-full max-w-[50%]">
          <Input
            placeholder="Qidiruv"
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
      <Table<DataType> columns={columns}  dataSource={data} />
      <Crud open={open} setOpen={setOpen} />
    </div>
  );
};

export default TableComponent;
