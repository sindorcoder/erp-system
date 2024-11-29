import { useEffect, useState } from "react";
import { Button, Modal, Form, Select, message, Input } from "antd";
import type { FormProps } from "antd";
import { FieldType } from "../../types";
import { useCreateContractMutation } from "../../redux/api/allPeople-api";
import Uploader from "../uploader/Uploader";

const { Option } = Select;

const Crud: React.FC<{ open: boolean; setOpen: (open: boolean) => void }> = ({
  open,
  setOpen,
}) => {
  const [uploadFile, setUploadFile] = useState<any>(null);
  const [courseId, setCourseId] = useState<number>(0);
  const [createData, setCreateData] = useState<any>({
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

  const onFinish: FormProps<FieldType>["onFinish"] = () => {
    createContract(createData);
  };

  useEffect(() => {
    if (uploadFile) {
      setCreateData({
        ...createData,
        attachment: {
          origName: uploadFile.data[0].fileName,
          url: uploadFile.data[0].path,
          size: uploadFile.data[0].size,
        },
      });
    }
    if (isSuccess && data) {
      message.success("Shartnoma muvaffaqiyatli yaratildi");
      setOpen(false);
    }
    if (isError) {
      message.error("Shartnoma yaratishda xatolik yuz berdi");
    }
  }, [uploadFile, data, isSuccess, isError]);

  useEffect(() => {
    if (courseId) {
      setCreateData((prev: any) => ({...prev, courseId: Number(courseId)}));
    }
  }, [courseId]);

  const onValuesChange = (values: FieldType) => {
    setCreateData({ ...createData, ...values});
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
            name="courseId"
            rules={[{ required: true, message: "Iltimos kursni kiriting!" }]}
          >
            <Select placeholder="Kursni tanlang" onChange={(value) => setCourseId(value)}>
              <Option value="3">Grafik dizayn</Option>
              <Option value="1">Fullstack</Option>
              <Option value="2">SMM</Option>
            </Select>
          </Form.Item>

          <Form.Item<FieldType>
            label="Nomi"
            name="title"
            rules={[
              { required: true, message: "Iltimos nomini kiriting!" },
            ]}
          >
            <Input />
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
