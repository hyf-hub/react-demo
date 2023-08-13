import { Form, Input } from "antd";
import "./login.module.scss";
type FieldType = {
  username?: string;
  password?: string;
};
const Login: React.FC = () => {
  return (
    <div className="login">
      <p className="tip">数字孪生可视化,让数字化看得见</p>
      <div className="login_container">
        <div className="box">
          <div className="title">
            <p>水务集团</p>
            <p>智慧水务管理平台</p>
          </div>
          <Form className="form">
            <Form.Item<FieldType>
              label=""
              name="username"
              rules={[{ required: true, message: "Please input your username!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label=""
              name="password"
              rules={[{ required: true, message: "Please input your username!" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Login;
