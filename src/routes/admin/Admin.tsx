import { HiPencil } from "react-icons/hi";
import { TableColumnsType } from "antd";
import TableComponent from "../../components/table/Table";
import {
  useGetAllPeopleQuery,
  useGetByIdQuery,
} from "../../redux/api/allPeople-api";
import { Contract } from "../../types";
import { useEffect, useState } from "react";
import Crud from "../../components/crud/Crud";
import { useSearchParams } from "react-router-dom";

const Admin = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateData, setUpdateData] = useState<any>({} as any);
  const [id, setId] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSizes, setPageSizes] = useState(10);
  const [searchParams] = useSearchParams();

  const { data: dataById } = useGetByIdQuery(id);
  const { data } = useGetAllPeopleQuery(search);
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  useEffect(() => {
    if (isUpdate) {
      setUpdateData(dataById?.data);
    }
  }, [isUpdate, dataById?.data]);

  const handleButtonClick = (id: number) => {
    setId(id);
    setOpen(true);
    setIsUpdate(true);
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrent(page);
    setPageSizes(pageSize);
  };

  const columns: TableColumnsType<Contract> = [
    {
      title: "№",
      width: "10%",
      render: (_, __, index) => {
        return (current - 1) * pageSizes + index + 1;
      },
    },
    {
      title: "Fayl nomi",
      dataIndex: ["attachment", "origName"],
      key: "name",
      width: "30%",
    },
    {
      title: "Nomi",
      dataIndex: "title",
      key: "title",
      width: "30%",
    },
    {
      title: "Kurs",
      dataIndex: ["course", "name"],
      key: "age",
      width: "63%",
    },
    {
      render: (data) => {
        return (
          <button
            className="flex items-center gap-2 hover:text-[#0EB182]"
            onClick={() => handleButtonClick(data.id)}
          >
            <HiPencil size={20} color="#0EB182" /> Tahrirlash
          </button>
        );
      },
    },
  ];

  return (
    <div className="p-4">
      <TableComponent
        open={open}
        setOpen={setOpen}
        data={data?.data.contracts as Contract[]}
        columns={columns}
        pagination={{
          current,
          total: data?.data.total,
          onChange: handlePageChange,
        }}
        checkUpdate={setIsUpdate}
      />
      <Crud
        open={open}
        setOpen={setOpen}
        FormData={updateData}
        setUpdateData={setUpdateData}
        checkUpdate={setIsUpdate}
      />
    </div>
  );
};

export default Admin;
