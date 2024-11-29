import { HiPencil } from "react-icons/hi";
import { TableColumnsType } from "antd";
import TableComponent from "../../components/table/Table";
import {
  useGetAllPeopleQuery,
  useGetByIdQuery,
} from "../../redux/api/allPeople-api";
import { Contract } from "../../types";
import { useEffect, useState } from "react";
import Crud from "../../components/crud/Crud"
import { useSearchParams } from "react-router-dom";

const Admin = () => {
  const [search, setSearch] = useState("");
  const { data } = useGetAllPeopleQuery(search);
  const [open, setOpen] = useState(false);
  const [updateData, setUpdateData] = useState<any>({} as any);
  const [id, setId] = useState(0);
  const [current, setCurrent] = useState(1);
  const { data: dataById } = useGetByIdQuery(id);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  useEffect(() => {
    if (dataById?.data) {
      setUpdateData(dataById.data);
    }
  }, [dataById]);

  const handleButtonClick = (id: number) => {
    setId(id);
    setOpen(true);
  };

  const columns: TableColumnsType<Contract> = [
    {
      title: "№",
      width: "10%",
      render: (_, __, index) => {
        return (current - 1) * 10 + index + 1;
      }
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
        pagination={{ pageSize: 10, onChange: (page: number) => setCurrent(page) }}
      />
      <Crud
        open={open}
        setOpen={setOpen}
        FormData={updateData}
        setUpdateData={setUpdateData}
      />
    </div>
  );
};

export default Admin;
