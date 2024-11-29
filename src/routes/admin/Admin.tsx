import TableComponent from "../../components/table/Table";
import { useGetAllPeopleQuery, useGetCourseQuery } from "../../redux/api/allPeople-api";

const Admin = () => {

  const {data} = useGetAllPeopleQuery();
  const {data: courseData} = useGetCourseQuery();

  console.log(courseData)

  return (
    <div className="p-4">
      <TableComponent data={data?.data.contracts}/>
    </div>
  );
};

export default Admin;
