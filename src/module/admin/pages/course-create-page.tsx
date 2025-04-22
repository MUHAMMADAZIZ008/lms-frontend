import { Button, Form, FormProps, Input, notification, Select } from "antd";
import { CancelIcon } from "../../../assets/components/cancel-icon";
import { ConfirmationIcon } from "../../../assets/components/confirmation-icon";
import "../css/course-create.css";
import { CourseTypeForm } from "../../../common/interface";
import { CourseStatus } from "../../../common/enum";
import { useCreateCourse } from "../service/mutation/use-create-course";

export const CourseCreatePage = () => {
  const [api, contextHolderNot] = notification.useNotification();

  const { mutate } = useCreateCourse();

  const [form] = Form.useForm();

  const onFinish: FormProps<CourseTypeForm>["onFinish"] = (values) => {
    values.duration = +values.duration;
    mutate(values, {
      onSuccess: () => {
        api.success({
          message: "Muvaffaqiyat saqlandi",
        });
        form.resetFields();
      },
      onError: (err) => {
        if (err.response.data.error === "Unprocessable Entity") {
          err.response.data.message.map((item: string) => {
            api.error({
              message: item,
            });
          });
        }
      },
    });
  };
  const onCancel = () => {
    form.resetFields();
  };

  return (
    <section className="course__crate">
      {contextHolderNot}
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <div className="course_create-header">
          <h2 className="course__create-title">Kurs yaratish</h2>
          <div className="course__create-header-wrap">
            <Form.Item label={null}>
              <Button onClick={onCancel} icon={<CancelIcon />} type="default">
                Bekor qilish
              </Button>
            </Form.Item>
            <Form.Item label={null}>
              <Button
                icon={<ConfirmationIcon />}
                type="primary"
                htmlType="submit"
              >
                Saqlash
              </Button>
            </Form.Item>
          </div>
        </div>
        <div className="course__crete-inputs">
          <Form.Item<CourseTypeForm>
            className="course__input"
            label="Guruh nomi"
            name="name"
            rules={[{ required: true, message: "Nomini kiriting!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<CourseTypeForm>
            className="course__input"
            label="Guruh uchun tafsif"
            name="description"
            rules={[{ required: true, message: "Tafsifni kiriting!" }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item<CourseTypeForm>
            className="course__input"
            label="Guruh davomligi"
            name="duration"
            rules={[{ required: true, message: "Davomligini kiriting!" }]}
          >
            <Input placeholder="120 kun..." />
          </Form.Item>

          <Form.Item<CourseTypeForm>
            className="course__input"
            label="Guruh holati"
            name="status"
            rules={[{ required: true, message: "Holatni tanlang!" }]}
          >
            <Select>
              <Select.Option value={CourseStatus.ACTIVE}>Faol</Select.Option>
              <Select.Option value={CourseStatus.INACTIVE}>
                Faol emas
              </Select.Option>
              <Select.Option value={CourseStatus.DRAFT}>
                Tugatilgan
              </Select.Option>
            </Select>
          </Form.Item>
        </div>
      </Form>
    </section>
  );
};
