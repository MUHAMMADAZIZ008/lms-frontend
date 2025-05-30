import { Link, useParams } from "react-router-dom";
import { useGetOneTeacher } from "../service/query/use-get-one-teacher";
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
import "../css/teacher-detail.css";
import { GroupStatus, PaymentEnum, UserGender } from "../../../common/enum";
import { useState } from "react";
import { TeacherPaymentFormType } from "../../../common/interface";
import { useCreateTeacherPayment } from "../service/mutation/use-create-teacher-payment";
import { useQueryClient } from "@tanstack/react-query";

export const TeacherDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetOneTeacher(id || "");
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm<TeacherPaymentFormType>();

  const queryClient = useQueryClient();

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // form
  const { mutate } = useCreateTeacherPayment();
  const onFinish: FormProps<TeacherPaymentFormType>["onFinish"] = (values) => {
    values.teacher_id = id as string;
    values.sum = +values.sum;
    mutate(values, {
      onSuccess: () => {
        api.success({
          message: "Muvaffaqiyat to'landi",
        });
        setIsModalOpen(false);
        queryClient.refetchQueries({ queryKey: ["teacher", id] });
        form.resetFields();
      },
      onError: (err) => {
        api.error({
          message: err.message,
        });
      },
    });
  };

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <section className="teacher-detail">
          {contextHolder}
          <div className="teacher-detail__header">
            <h2 className="teacher-detail__header-title">O'qtuvchi haqida</h2>
            <div className="teacher-detail__header-wrap">
              <Button icon={<DeleteIcon />}>O'chirish</Button>
              <Button icon={<EditIcon2 />}>Tahrirlash</Button>
              <Button onClick={showModal}>Oylik to'lash</Button>
            </div>
          </div>
          <div className="teacher-detail__content">
            <div className="teacher-detail__content-left">
              <div className="teacher-detail-img-box">
                <Image
                  className="teacher-detail__image"
                  height="200px"
                  width="200px"
                  src={data?.data.images[0].url}
                  alt=""
                />
              </div>
              <div className="teacher-detail-left_content">
                <p className="teacher-detail-content_title">
                  To'liq ismi: <span>{data?.data.full_name}</span>
                </p>
                <p className="teacher-detail-content_title">
                  Telfon raqami: <span>{data?.data.phone_number}</span>
                </p>
                <p className="teacher-detail-content_title">
                  Yashash manzili: <span>{data?.data.address}</span>
                </p>
                <p className="teacher-detail-content_title">
                  Tug'ilgan sana:{" "}
                  <span>{data?.data.data_of_birth.split("T")[0]}</span>
                </p>
                <p className="teacher-detail-content_title">
                  Jinsi:{" "}
                  <span>
                    {data?.data.gender === UserGender.MALE
                      ? "O'g'il bola"
                      : "Qiz bola"}
                  </span>
                </p>
                <p className="teacher-detail-content_title">
                  Username: <span>{data?.data.username}</span>
                </p>
              </div>
            </div>
            <div className="teacher-detail__content-right">
              <div className="teacher-detail__content-group-box">
                <h3 className="teacher-detail__group_title">Guruhlar</h3>
                <div className="teacher-detail_group-title_list">
                  <p>#</p>
                  <p>Nomi</p>
                  <p>Boshlangan sana</p>
                  <p>Holati</p>
                </div>
                <div className="teacher-detail__group-list-box">
                  {data?.data.groups.map((item, i) => (
                    <ul
                      key={item.teacher_id}
                      className="teacher-detail__group-list"
                    >
                      <li className="teacher-detail__group-item">
                        <p>{i + 1}</p>
                      </li>
                      <li className="teacher-detail__group-item">
                        <Link to={`/admin/group-detail/${item.group_id}`}>
                          {item.name}
                        </Link>{" "}
                      </li>
                      <li className="teacher-detail__group-item">
                        <p>{item.start_date.split("T")[0]}</p>
                      </li>
                      <li className="teacher-detail__group-item">
                        <p
                          style={
                            item.status === GroupStatus.ACTIVE
                              ? { fontWeight: "600", color: "green" }
                              : { fontWeight: "600", color: "red" }
                          }
                        >
                          {item.status}
                        </p>
                      </li>
                    </ul>
                  ))}
                </div>
              </div>
              <div className="teacher-detail__content-payment-box">
                <h3 className="teacher-detail__payment_title">To'lovlar</h3>
                <div className="teacher-detail__payment_title_list">
                  <p>#</p>
                  <p>Miqdori</p>
                  <p>Turi</p>
                  <p>Berilgan sana</p>
                </div>
                <div className="teacher-detail__payment-list-box">
                  {data?.data.PaymentForTeacher.map((item, i) => (
                    <ul
                      key={item.payment_id}
                      className="teacher-detail__payment-list"
                    >
                      <li className="teacher-detail__payment-item">
                        <p>{i + 1}</p>
                      </li>
                      <li className="teacher-detail__payment-item">
                        <p>{item.sum}</p>
                      </li>
                      <li className="teacher-detail__payment-item">
                        <p>
                          {item.type === PaymentEnum.CASH ? "Naqd" : "Karta"}
                        </p>
                      </li>
                      <li className="teacher-detail__payment-item">
                        <p>{item.created_at.split("T")[0]}</p>
                      </li>
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Modal
            title="Oylik to'lash"
            open={isModalOpen}
            onOk={() => form.submit()}
            onCancel={handleCancel}
            okText="Tasdiqlash"
            cancelText="Bekor qilish"
          >
            <Form onFinish={onFinish} layout="vertical" form={form}>
              <Form.Item<TeacherPaymentFormType>
                label="To'lov turi"
                name="type"
                rules={[
                  { required: true, message: "Iltimos, to'lov turini tanlang" },
                ]}
              >
                <Select placeholder="To'lov turini tanlang">
                  <Select.Option value={PaymentEnum.CASH}>Naqd</Select.Option>
                  <Select.Option value={PaymentEnum.CREDIT_CARD}>
                    Karta orqali
                  </Select.Option>
                </Select>
              </Form.Item>

              <Form.Item<TeacherPaymentFormType>
                label="To'lov miqdori"
                name="sum"
                rules={[
                  {
                    required: true,
                    message: "Iltimos, to'lov miqdorini kiriting",
                  },
                  {
                    validator: (_, value) => {
                      if (!value || isNaN(value)) {
                        return Promise.reject(
                          "To'lov miqdori son bo'lishi kerak"
                        );
                      }
                      if (Number(value) <= 0) {
                        return Promise.reject(
                          "To'lov miqdori musbat son bo'lishi kerak"
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input type="number" placeholder="Masalan: 100000" />
              </Form.Item>
            </Form>
          </Modal>
        </section>
      )}
    </>
  );
};
