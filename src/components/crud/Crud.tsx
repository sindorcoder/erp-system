import { useState } from "react";
import { Button, Modal, Form, Select, Input } from "antd";
import type { FormProps } from "antd";
import { FieldType, DataTypes, Course, Contract } from "../../types";
import {
  useCreateContractMutation,
  useGetCourseQuery,
  useUpdateContractMutation,
} from "../../redux/api/allPeople-api";
import Uploader from "../uploader/Uploader";
import { useForm } from "antd/es/form/Form";
import { useCrudEffects } from "../../hooks/useCrudEffects";

const { Option } = Select;

const Crud: React.FC<{
  open: boolean;
  setOpen: (open: boolean) => void;
  FormData: Contract[] | any;
  setUpdateData: any;
}> = ({ open, setOpen, FormData, setUpdateData }) => {
  const [form] = useForm();
  const [uploadFile, setUploadFile] = useState<any>(null);
  const [courseId, setCourseId] = useState<number>(0);
  const [createData, setCreateData] = useState<DataTypes>({
    title: "",
    courseId: 0,
    attachment: {
      size: 0,
      url: "",
      origName: "",
    },
  });
  const [createContract, { isLoading, data, isSuccess, isError }] =
    useCreateContractMutation();
  const [
    updateContract,
    { data: dataUpdate, isSuccess: isSuccessUpdate, isError: isErrorUpdate },
  ] = useUpdateContractMutation();
  const { data: courseData } = useGetCourseQuery();
  const onFinish: FormProps<FieldType>["onFinish"] = () => {
    if (FormData?.course?.id) {
      updateContract({ ...createData, id: FormData?.id });
      setUpdateData({});
    } else {
      createContract(createData);
      setUpdateData({});
    }
  };

  useCrudEffects({
    isSuccessUpdate,
    dataUpdate,
    isErrorUpdate,
    uploadFile,
    isSuccess,
    data,
    isError,
    courseId,
    FormData,
    open,
    setOpen,
    form,
    setCreateData,
    createData,
    setUpdateData,
  });

  const onValuesChange = (values: FieldType) => {
    setCreateData({ ...createData, ...values });
  };

  const cancel = () => {
    setOpen(false);
    form.resetFields();
    setUpdateData({});
  };

  return (
    <>
    
      <Modal
        title={
          FormData?.course?.id ? "Shartnoma tahrirlash" : "Shartnoma yaratish"
        }
        footer={false}
        open={open}
        onCancel={cancel}
        centered
        maskClosable={false}
      >
        <Form
          form={form}
          name="basic"
          wrapperCol={{ span: 24 }}
          onFinish={onFinish}
          onValuesChange={onValuesChange}
          layout="vertical"
        >
          <Form.Item<FieldType>
            label="Kurs"
            name="courseId"
            rules={[{ required: true, message: "Iltimos kursni kiriting!" }]}
          >
            <Select
              placeholder="Kursni tanlang"
              onChange={(value) => setCourseId(value)}
            >
              {courseData?.data?.courses?.map((item: Course) => (
                <Option value={item.id}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item<FieldType>
            label="Nomi"
            name="title"
            rules={[{ required: true, message: "Iltimos nomini kiriting!" }]}
          >
            <Input />
          </Form.Item>
          <Uploader FormDataDoc={FormData} setUploadFile={setUploadFile} />
          <Form.Item label={null}>
            <div className="flex gap-5 items-center justify-end">
              <Button
                color="danger"
                variant="dashed"
                className="mt-10 py-5"
                onClick={cancel}
              >
                Bekor qilish
              </Button>

              <Button
                loading={isLoading}
                disabled={isLoading}
                className="py-5 px-5 !bg-[#0EB182] mt-10"
                type="primary"
                htmlType="submit"
              >
                {FormData?.course?.id ? "Tahrirlash" : "Yaratish"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Crud;