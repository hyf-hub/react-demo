import SvgIcon from "@/components/common/SvgIcon";
import { UserOutlined } from "@ant-design/icons";
import type { FormInstance } from "antd";
import { Button, Form, Input, message as AntdMessage } from "antd";
import { useRef } from "react";
import style from "./login.module.scss";
import { useNavigate } from "react-router";
type FieldType = {
  username?: string;
  password?: string;
};

const Login: React.FC = () => {
  const formRef = useRef<FormInstance>(null);
  const router = useNavigate();
  const [messageApi, contextHolder] = AntdMessage.useMessage();
  const handleBtnClick = async () => {
    console.log(
      "🚀 ~ file: index.tsx:12 ~ handleBtnClick ~ handleBtnClick:",
      formRef.current?.getFieldsValue(),
    );

    formRef.current
      ?.validateFields()
      .then((res: Partial<FieldType>) => {
        const { password, username } = res;
        if (username === "admin" && password === "admin123") {
          router("/home");
        } else {
          return Promise.reject();
        }
      })
      .catch((error) => {
        const message = error ? "账号或密码不能为空！！" : "账号或密码错误！！";
        messageApi.error(message);
        console.log("错误", error);
      });
  };
  return (
    <>
      {contextHolder}
      <div className={style.login}>
        <p className="tip">数字孪生可视化,让数字化看得见</p>
        <div className="login_container">
          <div className="box">
            <div className="title">
              <p>水务集团</p>
              <p>智慧水务管理平台</p>
            </div>
            <Form className="form" ref={formRef}>
              <Form.Item<FieldType>
                label=""
                name="username"
                rules={[{ required: true, message: "请输入账号!" }]}
              >
                <Input placeholder="请输入账号" prefix={<UserOutlined />} />
              </Form.Item>
              <Form.Item<FieldType>
                label=""
                name="password"
                rules={[{ required: true, message: "请输入密码!" }]}
              >
                <Input
                  placeholder="请输入密码"
                  prefix={<SvgIcon color="#00bcff" name="password"></SvgIcon>}
                />
              </Form.Item>
            </Form>
            <Button type="primary" className="button" onClick={() => handleBtnClick()}>
              登录
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
