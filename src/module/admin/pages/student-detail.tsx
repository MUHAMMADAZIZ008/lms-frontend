import { Link, useParams } from "react-router-dom";
import { useGetOneStudent } from "../service/query/use-get-one-student";
import {
  Button,
  Form,
  FormProps,
  Image,
  Input,
  Modal,
  notification,
  Select,
} from "antd";
import { DeleteIcon } from "../../../assets/components/delete-icon";
import { EditIcon2 } from "../../../assets/components/edit-icon2";
import "../css/student-detail.css";
import { GroupStatus, PaymentEnum, UserGender } from "../../../common/enum";
import { useEffect, useState } from "react";
import { StudentPaymentFormType } from "../../../common/interface";
import { useCreateStudentPayment } from "../service/mutation/use-create-student-payment";
import { useGeAllGroup } from "../service/query/use-get-all-group";
import { useQueryClient } from "@tanstack/react-query";

export const StudentDetail = () => {
  const { id } = useParams();
  const [api, contextHolderNot] = notification.useNotification();
  const { data, isLoading, error } = useGetOneStudent(id || "");
  if (error) {
    api.error({
      message: error.message,
    });
  }
  const queryClient = useQueryClient();
  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [form] = Form.useForm<StudentPaymentFormType>();

  const { mutate } = useCreateStudentPayment();
  const onFinish: FormProps<StudentPaymentFormType>["onFinish"] = (values) => {
    values.student_id = id as string;
    values.sum = +values.sum;

    mutate(values, {
      onSuccess: () => {
        api.success({
          message: "Muvaffaqiyatli yaratildi",
        });
        setIsModalOpen(false);
        form.resetFields();
        queryClient.refetchQueries({ queryKey: ["student", id] });
      },
      onError: (err) => {
        api.error({
          message: err.message,
        });
      },
    });
  };

  const [groupSelectOption, setGroupSelectOption] = useState<
    {
      value: string;
      label: string;
    }[]
  >();

  const { data: groupData, isError, error: groupErr } = useGeAllGroup();
  if (isError) {
    api.error({
      message: groupErr.message,
    });
  }

  useEffect(() => {
    const option = groupData?.data.map((item) => {
      return {
        value: item.group_id,
        label: item.name,
      };
    });
    setGroupSelectOption(option);
  }, [data]);

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section className="student-detail">
      {contextHolderNot}
      <div className="student-detail__header">
        <h2 className="student-detail__header-title">O'quvchi haqida</h2>
        <div className="student-detail__header-wrap">
          <Button icon={<DeleteIcon />}>O'chirish</Button>
          <Button icon={<EditIcon2 />}>Tahrirlash</Button>
          <Button onClick={showModal}>To'lov qo'shish</Button>
        </div>
      </div>
      <div className="student-detail__content">
        <div className="student-detail__content-left">
          <div className="student-detail-img-box">
            <Image
              className="student-detail__image"
              height="200px"
              width="200px"
              src={data?.data.images[0].url}
              alt=""
            />
          </div>
          <div className="student-detail-left_content">
            <p className="student-detail-content_title">
              To'liq ismi: <span>{data?.data.full_name}</span>
            </p>
            <p className="student-detail-content_title">
              Telfon raqami: <span>{data?.data.phone_number}</span>
            </p>
            <p className="student-detail-content_title">
              Yashash manzili: <span>{data?.data.address}</span>
            </p>
            <p className="student-detail-content_title">
              Tug'ilgan sana:{" "}
              <span>{data?.data.data_of_birth.split("T")[0]}</span>
            </p>
            <p className="student-detail-content_title">
              Jinsi:{" "}
              <span>
                {data?.data.gender === UserGender.MALE
                  ? "O'g'il bola"
                  : "Qiz bola"}
              </span>
            </p>
            <p className="student-detail-content_title">
              Username: <span>{data?.data.username}</span>
            </p>
          </div>
        </div>
        <div className="student-detail__content-right">
          <div className="student-detail_right-group">
            <h3 className="student-detail_right-group__title">Guruhlar</h3>
            <div className="student-detail_right-group-list">
              <div className="student-detail_right-group-title-list">
                <p>#</p>
                <p>Nomi</p>
                <p>Boshlangan sana</p>
                <p>Holati</p>
              </div>
              <div className="student-detail_group-list-box">
                {data?.data.group_members.map((item, i) => (
                  <ul key={item.user_id} className="student-detail_group-list">
                    <li>
                      <p>{i + 1}</p>
                    </li>
                    <li>
                      <Link to={`/admin/group-detail/${item.group.group_id}`}>
                        {item.group.name}
                      </Link>
                    </li>
                    <li>
                      <p>{item.group.start_date.split("T")[0]}</p>
                    </li>
                    <li>
                      <p
                        style={
                          item.group.status === GroupStatus.ACTIVE
                            ? { fontWeight: "600", color: "green" }
                            : { fontWeight: "600", color: "red" }
                        }
                      >
                        {item.group.status}
                      </p>
                    </li>
                  </ul>
                ))}
              </div>
            </div>
          </div>
          <div className="student-detail_right-payment">
            <h3 className="student-detail_payment-title">To'lovlar</h3>
            <div className="student-detail_payment-list-titles">
              <p>#</p>
              <p>Miqdori</p>
              <p>To'lov turi</p>
              <p>Vaqti</p>
            </div>
            <div className="student-detail_payment-list-box">
              {data?.data.PaymentForStudent.map((item, i) => (
                <ul
                  key={item.payment_id}
                  className="student-detail_payment-list"
                >
                  <li className="student-detail_payment-item">
                    <p>{i + 1}</p>
                  </li>
                  <li className="student-detail_payment-item">
                    <p>{item.sum}</p>
                  </li>
                  <li className="student-detail_payment-item">
                    <p>{item.type === PaymentEnum.CASH ? "Naqd" : "Karta"}</p>{" "}
                  </li>
                  <li className="student-detail_payment-item">
                    <p>{item.created_at.split("T")[0]}</p>
                  </li>
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        title="To'lovni qabul qilish"
        onCancel={handleCancel}
        okText="Tashdiqlash"
        cancelText="Bekor qilish"
        onOk={() => form.submit()}
      >
        <Form onFinish={onFinish} form={form} layout="vertical">
          <Form.Item<StudentPaymentFormType>
            label="To'lov turi"
            name="type"
            rules={[{ required: true, message: "To'lov turini tanlang!" }]}
          >
            <Select placeholder="To'lov turini tanlang">
              <Select.Option value={PaymentEnum.CASH}>Naqt</Select.Option>
              <Select.Option value={PaymentEnum.CREDIT_CARD}>
                Karta
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item<StudentPaymentFormType>
            label="To'lov miqdori"
            name="sum"
            rules={[
              { required: true, message: "To'lov miqdorini kiriting!" },
              {
                validator: (_, value) => {
                  if (!value || isNaN(value)) {
                    return Promise.reject("To'lov miqdori son bo'lishi kerak!");
                  }
                  if (Number(value) <= 0) {
                    return Promise.reject(
                      "To'lov miqdori musbat son bo'lishi kerak!"
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input type="number" placeholder="Masalan: 150000" />
          </Form.Item>

          <Form.Item<StudentPaymentFormType>
            className="student_create-inputs"
            label="Guruh"
            name="group_id"
            rules={[{ required: true, message: "Guruhni tanlang!" }]}
          >
            <Select placeholder="Guruhni tanlang">
              {groupSelectOption?.map((item) => (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </section>
  );
};
