import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  FormProps,
  Input,
  message,
  notification,
  Select,
  Typography,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { StudentFieldType } from "../../../common/interface";
import { CancelIcon } from "../../../assets/components/cancel-icon";
import { ConfirmationIcon } from "../../../assets/components/confirmation-icon";
import "../css/student-create.css";
import { useEffect, useState } from "react";
import { useStudentUpload } from "../service/mutation/use-student-upload";
import { useGeAllGroup } from "../service/query/use-get-all-group";
import { PaymentEnum, UserGender } from "../../../common/enum";
import { useCreateStudent } from "../service/mutation/use-create-student";

export const StudentCreate = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [api, contextHolderNot] = notification.useNotification();

  const [imageUrl, setImageUrl] = useState<string>();

  const [dateOfBirth, setDateOfBirth] = useState<string>();

  //   const [studentGroupId, setStudentGroupId] = useState<string>();

  const [form] = Form.useForm<StudentFieldType>();

  const [groupSelectOption, setGroupSelectOption] = useState<
    {
      value: string;
      label: string;
    }[]
  >();

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { mutate: studentCreateMutate } = useCreateStudent();

  const onFinish: FormProps<StudentFieldType>["onFinish"] = (values) => {
    if (fileList.length === 0 || !fileList) {
      api.warning({
        message: "Rasimni yuklang",

        placement: "topRight",
      });
    } else {
      if (dateOfBirth && imageUrl) {
        values.data_of_birth = dateOfBirth;
        values.img_url = imageUrl;
        values.sum = +values.sum;
        studentCreateMutate(values, {
          onSuccess: () => {
            api.success({
              message: "Muvaffaqiyatli saqlandi!",
            });
            form.resetFields();
            fileList.length = 0;
            setImageUrl("");
          },
          onError: (err) => {
            api.error({
              message: err?.response?.data?.message,
            });
          },
        });
      }
    }
  };

  const onCancel = () => {
    form.resetFields();
  };

  const { mutate } = useStudentUpload();

  const changeUpload: UploadProps["onChange"] = ({
    fileList,
  }: {
    fileList: UploadFile[];
  }) => {
    const formData = new FormData();
    formData.append(`file`, fileList[0].originFileObj as Blob);
    mutate(formData, {
      onSuccess: (data) => {
        const img_url = data?.data?.image_url;
        setImageUrl(img_url);
      },
      onError: (error) => {
        messageApi.error(`Yuklashda xatolik: ${error.message}`);
      },
    });
    setFileList(fileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url || (file.preview as string);
    if (!src && file.originFileObj) {
      src = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as Blob);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src!;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onDateChange: DatePickerProps["onChange"] = (_, dateString) => {
    if (typeof dateString == "string") {
      setDateOfBirth(dateString);
    }
  };

  const { data, isError, error } = useGeAllGroup();
  if (isError) {
    api.error({
      message: error.message,
    });
  }

  useEffect(() => {
    const option = data?.data.map((item) => {
      return {
        value: item.group_id,
        label: item.name,
      };
    });
    setGroupSelectOption(option);
  }, [data]);

  return (
    <section className="student_create">
      {contextHolder}
      {contextHolderNot}
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div className="student-create__header">
          <h2 className="create__header-title">O’quvchilarni qo’shish</h2>
          <div className="create__header-button-wrap">
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
        <div className="student-create__inputs">
          <Form.Item className="student_create-inputs" label="Rasim">
            <Upload
              beforeUpload={() => false}
              listType="picture-card"
              className="custom-upload"
              fileList={fileList}
              maxCount={1}
              onChange={changeUpload}
              onPreview={onPreview}
              type="select"
            >
              {fileList.length < 1 && "Rasimni yuklang"}
            </Upload>
          </Form.Item>

          <Form.Item<StudentFieldType>
            className="student_create-inputs"
            label="To'liq ismi"
            name="full_name"
            rules={[{ required: true, message: "Isimni kiriting!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<StudentFieldType>
            className="student_create-inputs"
            label="Username"
            name="username"
            rules={[{ required: true, message: "username kiriting!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            className="student_create-inputs"
            label="Tug’ilgan sana"
            name="data_of_birth"
            rules={[{ required: true, message: "Tu'gilgan sanani kiriring!" }]}
          >
            <DatePicker onChange={onDateChange} />
          </Form.Item>

          <Form.Item<StudentFieldType>
            className="student_create-inputs"
            label="Telfon raqam"
            name="phone_number"
            rules={[
              { required: true, message: "Telfon raqamni kiriting!" },
              {
                pattern: /^(\+998)?[0-9]{9}$/,
                message:
                  "To‘g‘ri formatda raqam kiriting! (masalan: +998901234567)",
              },
            ]}
          >
            <Input placeholder="+998901234567" />
          </Form.Item>

          <Form.Item<StudentFieldType>
            className="student_create-inputs"
            label="Yashash manzili"
            name="address"
            rules={[{ required: true, message: "Manzilni kiriting!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<StudentFieldType>
            className="student_create-inputs"
            label="Jinsi"
            name="gender"
            rules={[{ required: true, message: "Jinsi tanlang!" }]}
          >
            <Select>
              <Select.Option value={UserGender.MALE}>
                <Typography>O'g'il bola</Typography>
              </Select.Option>
              <Select.Option value={UserGender.FEMALE}>
                <Typography>Qiz bola</Typography>
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item<StudentFieldType>
            className="student_create-inputs"
            label="Guruh"
            name="groupId"
            rules={[{ required: true, message: "Guruhni tanlang!" }]}
          >
            <Select
              // defaultValue={groupSelectOption && groupSelectOption[0].label}
            >
              {groupSelectOption?.map((item) => (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item<StudentFieldType>
            className="student_create-inputs"
            label="Parol"
            name="password"
            rules={[
              { required: true, message: "Parolni kiriting!" },
              {
                min: 6,
                message: "Parol kamida 6 ta belgidan iborat bo‘lishi kerak!",
              },
              {
                pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
                message:
                  "Parol kamida bitta katta harf va bitta raqamdan iborat bo‘lishi kerak!",
              },
            ]}
          >
            <Input.Password placeholder="Masalan: Aziz123" />
          </Form.Item>

          <Form.Item<StudentFieldType>
            className="student_create-inputs"
            label="To'lov turi"
            name="paymentType"
            rules={[{ required: true, message: "To'lov turini tanlang!" }]}
          >
            <Select>
              <Select.Option value={PaymentEnum.CASH}>Naqd</Select.Option>
              <Select.Option value={PaymentEnum.CREDIT_CARD}>
                Bank kartasi
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item<StudentFieldType>
            className="student_create-inputs"
            label="To'lov summasi"
            name="sum"
            rules={[{ required: true, message: "Summani kiriting!" }]}
          >
            <Input />
          </Form.Item>
        </div>
      </Form>
    </section>
  );
};
