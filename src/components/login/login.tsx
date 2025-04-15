import { Button, Form, FormProps, Input, message } from "antd";
import useLogin from "./service/mutation/use-login";
import { SaveCookie } from "../../config/cookie";
import { CookiesEnum, UserRole } from "../../common/enum";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/use-auth-store";

type FieldType = {
  username: string;
  password: string;
};

const Login = () => {
  const { logIn } = useAuthStore();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const { mutate, isPending } = useLogin();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    mutate(values, {
      onError(error) {
        messageApi.error(error?.response.data.message);
      },
      onSuccess(data) {
        SaveCookie(
          CookiesEnum.REFRESH_TOKEN,
          JSON.stringify(data.data.refreshToken),
          data.data.refresh_token_expire
        );
        logIn({ user: data.user, data: data.data });
        if (data.user.role === UserRole.ADMIN) {
          navigate("/admin");
        } else if (data.user.role === UserRole.TEACHER) {
          navigate("/teacher");
        }
      },
    });
  };

  return (
    <div
      style={{
        minWidth: "100vw",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {contextHolder}
      <Form
        name="auth"
        layout="vertical"
        style={{ width: 350 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input variant="underlined" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password variant="underlined" />
        </Form.Item>

        <Form.Item label={null}>
          <Button
            disabled={isPending}
            type="primary"
            htmlType="submit"
            style={{
              display: "block",
              width: "100%",
              backgroundColor: "#7D41ED",
            }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
