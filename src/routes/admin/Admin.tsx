import TableComponent from "../../components/table/Table";
import { useGetAllPeopleQuery } from "../../redux/api/allPeople-api";

const Admin = () => {

  const {data} = useGetAllPeopleQuery();

  return (
    <div className="p-4">
      <TableComponent data={data?.data.contracts}/>
    </div>
  );
};

export default Admin;
