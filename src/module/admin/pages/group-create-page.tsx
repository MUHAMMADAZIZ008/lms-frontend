import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  FormProps,
  Input,
  notification,
  Select,
} from "antd";
import dayjs from "dayjs";
import { CancelIcon } from "../../../assets/components/cancel-icon";
import { ConfirmationIcon } from "../../../assets/components/confirmation-icon";
import "../css/course-create.css";
import { GroupTypeForm, SelectOptionT } from "../../../common/interface";
import { GroupStatus } from "../../../common/enum";
import { useEffect, useState } from "react";
import { useGetAllCourse } from "../service/query/use-get-all-course";
import { useCreateGroup } from "../service/mutation/use-create-group";
import { useTeacherForGroup } from "../service/query/use-teacher-for-group";
import { PaginationLeftIcon } from "../../../assets/components/pagination-left-icon";
import { useNavigate } from "react-router-dom";

export const GroupCreatePage = () => {
  const [api, contextHolderNot] = notification.useNotification();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [teacherSelectOption, setTeacherSelectOption] =
    useState<SelectOptionT[]>();
  const [courseSelectOption, setCourseSelectOption] =
    useState<SelectOptionT[]>();

  const [startDate, setStartDate] = useState<string>(
    dayjs().format("YYYY-MM-DD")
  );

  const { mutate } = useCreateGroup();
  const onFinish: FormProps<GroupTypeForm>["onFinish"] = (values) => {
    values.start_date = startDate;
    mutate(values, {
      onSuccess: () => {
        api.success({
          message: "Muvaffaqiyat saqlandi",
        });
        form.resetFields();
      },
      onError: (err) => {
        const errData = err?.response?.data;
        if (errData.statusCode === 409) {
          api.error({
            message: errData.message,
          });
        }
        if (errData.error === "Unprocessable Entity") {
          errData.message.map((item: string) => {
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

  // get all teacher
  const { data: teacherData } = useTeacherForGroup();

  useEffect(() => {
    if (teacherData) {
      const option: SelectOptionT[] = teacherData.data.map((item) => {
        return {
          value: item.user_id,
          label: item.full_name,
        };
      });
      setTeacherSelectOption(option);
    }
  }, [teacherData]);

  // get all course

  const { data: courseData } = useGetAllCourse();
  useEffect(() => {
    const option = courseData?.data.map((item) => {
      return {
        value: item.course_id,
        label: item.name,
      };
    });
    setCourseSelectOption(option);
  }, [courseData]);

  const onDateChange: DatePickerProps["onChange"] = (_, dateString) => {
    if (typeof dateString == "string") {
      setStartDate(dateString);
    }
  };
  const goBackFn = () => {
    navigate(-1);
  };
  return (
    <section className="course__crate">
      {contextHolderNot}
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <div className="course_create-header">
          <h2 className="course__create-title">Guruh yaratish</h2>
          <div className="course__create-header-wrap">
            <Form.Item label={null}>
              <Button
                onClick={goBackFn}
                icon={<PaginationLeftIcon />}
                type="default"
              >
                Ortga qaytish
              </Button>
            </Form.Item>
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
          <Form.Item<GroupTypeForm>
            className="course__input"
            label="Guruh nomi"
            name="name"
            rules={[{ required: true, message: "Nomini kiriting!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<GroupTypeForm>
            className="course__input"
            label="Guruh uchun tafsif"
            name="description"
            rules={[{ required: true, message: "Tafsifni kiriting!" }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item<GroupTypeForm>
            className="course__input"
            label="Boshlanish sanasi"
            name="start_date"
            rules={[{ required: true, message: "Tafsifni kiriting!" }]}
          >
            <DatePicker onChange={onDateChange} />
          </Form.Item>

          <Form.Item<GroupTypeForm>
            className="course__input"
            label="Guruh holati"
            name="status"
            rules={[{ required: true, message: "Holatni tanlang!" }]}
          >
            <Select>
              <Select.Option value={GroupStatus.ACTIVE}>Faol</Select.Option>
              <Select.Option value={GroupStatus.INACTIVE}>
                Faol emas
              </Select.Option>
              <Select.Option value={GroupStatus.COMPLETED}>
                Tugatilgan
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item<GroupTypeForm>
            className="course__input"
            label="Group uchun ustoz"
            name="teacher_id"
            rules={[{ required: true, message: "Ustoz tanlang!" }]}
          >
            <Select
              showSearch
              filterOption={(input, option) =>
                (option?.children as unknown as string)
                  ?.toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              {teacherSelectOption?.map((item) => (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item<GroupTypeForm>
            className="course__input"
            label="Group uchun kurs"
            name="course_id"
            rules={[{ required: true, message: "Kurs tanlang!" }]}
          >
            <Select
              showSearch
              filterOption={(input, option) =>
                (option?.children as unknown as string)
                  ?.toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              {courseSelectOption?.map((item) => (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      </Form>
    </section>
  );
};
