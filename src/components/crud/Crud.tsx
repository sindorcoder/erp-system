import { Button, Modal, Form, Input } from "antd";
import type { FormProps } from "antd";
import { FieldType } from "../../types";
import Uploader from "../uploader/Uploader";
const Crud: React.FC<{ open: boolean; setOpen: (open: boolean) => void }> = ({
  open,
  setOpen,
}) => {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
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
          layout="vertical"
        >
          <Form.Item<FieldType>
            label="Kurs"
            name="kurs"
            rules={[{ required: true, message: "Iltimos kursni kiriting!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Nomi"
            name="nomi"
            rules={[{ required: true, message: "Iltimos nomni kiriting!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={null}>
            <Uploader />
            <Button
              className="w-full py-5 !bg-[#0EB182] mt-10"
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Crud;
