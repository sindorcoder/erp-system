import { Button, Modal, Form, Select, InputNumber, message } from "antd";
import type { FormProps } from "antd";
import { FieldType } from "../../types";
import Uploader from "../uploader/Uploader";
import { useEffect, useState } from "react";
import { useCreateContractMutation } from "../../redux/api/allPeople-api";

const { Option } = Select;

const Crud: React.FC<{ open: boolean; setOpen: (open: boolean) => void }> = ({
  open,
  setOpen,
}) => {
  const [uploadFile, setUploadFile] = useState<any>(null);
  const [createData, setCreateData] = useState<any>({
   title: "",
   courseId: 0,
   attechment: {
    "size": 0,
    url: "",
    originName: ""
   },
   course: {
    id: 0,
    name: ""
   }
  });
  const [createContract, { isLoading, data, isSuccess, isError }] =
    useCreateContractMutation();


  const onFinish: FormProps<FieldType>["onFinish"] = () => {
    createContract(createData);
  };


  // console.log(data)

  useEffect(() => {
    if (uploadFile) {
      setCreateData({ ...createData, attechment: {originName: uploadFile.data[0].fileName, url: uploadFile.data[0].path, size: uploadFile.data[0].size} });
    }
    if (isSuccess && data) {
      message.success("Shartnoma muvaffaqiyatli yaratildi");
    }
    if (isError) {
      message.error("Shartnoma yaratishda xatolik yuz berdi");
    }
  }, [uploadFile, data, isSuccess, isError]);

  console.log(createData);

  const onValuesChange = ( values: FieldType) => {
    setCreateData({ ...createData, ...values, course: {...values}});
  };

  const cancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        title="Shartnoma yaratish"
        footer={false}
        open={open}
        onCancel={cancel}
        centered
        maskClosable={false}
      >
        <Form
          name="basic"
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onValuesChange={onValuesChange}
          layout="vertical"
        >
          <Form.Item<FieldType>
            label="Kurs"
            name="title"
            rules={[{ required: true, message: "Iltimos kursni kiriting!" }]}
          >
            <Select>
              <Option value="graphic">Grafik dizayn</Option>
              <Option value="frontend">Frontend</Option>
              <Option value="backend">Backend</Option>
              <Option value="fullstack">Fullstack</Option>
              <Option value="mobile">Mobile</Option>
              <Option value="ux">UX/UI</Option>
              <Option value="marketing">Marketing</Option>
            </Select>
          </Form.Item>

          <Form.Item<FieldType>
            label="Kurs ID"
            name="courseId"
            rules={[
              { required: true, message: "Iltimos kurs ID ni kiriting!" },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Uploader setUploadFile={setUploadFile} />
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
                Saqlash
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Crud;
