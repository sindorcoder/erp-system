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

const Admin = () => {
  const { data } = useGetAllPeopleQuery();
  const [open, setOpen] = useState(false);
  const [updateData, setUpdateData] = useState<any>({} as any);
  const [id, setId] = useState(0);
  const { data: dataById } = useGetByIdQuery(id);

  useEffect(() => {
    if (dataById?.data) {
      setUpdateData(dataById.data);
    }
  }, [dataById?.data]);


  const handleButtonClick = (id: number) => {
    setId(id);
    setOpen(true);
  };

  const columns: TableColumnsType<Contract> = [
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
