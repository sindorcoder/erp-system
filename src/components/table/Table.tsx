import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Table } from "antd";
import { Contract } from "../../types";
import { TableColumnsType } from "antd";
import Crud from "../crud/Crud";

const TableComponent: React.FC<{
  data: Contract[];
  columns: TableColumnsType<Contract>;
  open: boolean;
  setOpen: (open: boolean) => void;
}> = ({ data, columns, open, setOpen }) => {
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
      <Table<Contract> columns={columns} dataSource={data} />
      <Crud open={open} setOpen={setOpen} FormData={[]} />
    </div>
  );
};

export default TableComponent;
