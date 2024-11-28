import React, { useEffect } from "react";
import { FieldType } from "../../types";
import type { FormProps } from "antd";
import { Button, Form, Input, message } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useLoginMutation } from "../../redux/api/login-api";
import { loginUser } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [login, { isLoading, data, isSuccess, isError }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    login(values);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(loginUser({ token: data?.data.accessToken }));
      navigate("/admin");
      message.success("Tizimga muvaffaqiyatli kirildi");
    }

    if (isError) {
      message.error("Login yoki parol xato");
    }
  }, [data, isSuccess, isError]);

  return (
    <div className="w-full p-4 h-full">
      <h1 className="text-2xl mb-[32px] font-bold">Tizimga kirish</h1>
      <Form
        layout="vertical"
        name="Login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item<FieldType>
          label="Login"
          name="login"
          rules={[{ required: true, message: "Login kiriting!" }]}
        >
          <Input className="py-2" placeholder="Login" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Parol"
          name="password"
          rules={[{ required: true, message: "Parol kiriting!" }]}
        >
          <Input.Password
            className="py-2"
            placeholder="Parol"
            iconRender={(visible) =>
              visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <Form.Item>
          <Button
            loading={isLoading}
            disabled={isLoading}
            className="w-full !bg-[#0EB182] py-5"
            type="primary"
            htmlType="submit"
          >
            Kirish
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
