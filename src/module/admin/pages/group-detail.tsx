import { Link, useParams } from "react-router-dom";
import { useGetOneGroup } from "../service/query/use-get-one-group";
import { Button, Form, FormProps, Modal, notification, Select } from "antd";
import { DeleteIcon } from "../../../assets/components/delete-icon";
import { EditIcon2 } from "../../../assets/components/edit-icon2";
import "../css/group-detail.css";
import { GroupStatus, UserGender } from "../../../common/enum";
import { useGetNoStudent } from "../service/query/use-get-no-student";
import { useEffect, useState } from "react";
import { GroupMemberFormType } from "../../../common/interface";
import { useCreateGroupMember } from "../service/mutation/use-create-group-member";
import { useQueryClient } from "@tanstack/react-query";

export const GroupDetail = () => {
  const { id } = useParams();
  const [api, contextHolder] = notification.useNotification();
  const { data, isLoading, error } = useGetOneGroup(id || "");

  if (error) {
    api.error({
      message: error.message,
    });
  }

  // add student
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentSelectorOption, setStudentSelectorOption] = useState<
    {
      value: string;
      label: string;
    }[]
  >();

  const { data: noStudentData } = useGetNoStudent(
    data?.data.group_id as string
  );

  useEffect(() => {
    const option = noStudentData?.data.map((item) => ({
      value: item.user_id,
      label: item.full_name,
    }));
    setStudentSelectorOption(option);
  }, [noStudentData]);

  const showModal = () => {
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { mutate } = useCreateGroupMember();

  const onFinish: FormProps<GroupMemberFormType>["onFinish"] = (values) => {
    values.groupId = data?.data.group_id as string;
    mutate(values, {
      onSuccess: () => {
        api.success({
          message: "Muvaffaqiyatli qo'shildi!",
        });
        setIsModalOpen(false);
        queryClient.refetchQueries({ queryKey: ["student", id] });
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
        <section className="group__detail">
          {contextHolder}
          <div className="group-detail__header">
            <h2 className="group-detail__header-title">Guruh haqida</h2>
            <div className="group-detail__header-wrap">
              <Button icon={<DeleteIcon />}>O'chirish</Button>
              <Button icon={<EditIcon2 />}>Tahrirlash</Button>
              <Button onClick={showModal}>O'quvchi qo'shish</Button>
            </div>
          </div>
          <div className="group-detail__content">
            <div className="group-detail__left-box">
              <div className="group-detail__left_group-box">
                <p>
                  Nomi: <span>{data?.data.name}</span>
                </p>
                <p>
                  Holati:{" "}
                  {data?.data.status === GroupStatus.COMPLETED ? (
                    <span>To'htatilgan</span>
                  ) : data?.data.status === GroupStatus.INACTIVE ? (
                    <span>Faol emas</span>
                  ) : (
                    <span>Faol</span>
                  )}
                </p>
                <p>
                  Boshlanish vaqti:{" "}
                  <span>{data?.data.start_date.split("T")[0]}</span>
                </p>
              </div>
              <div className="group-detail__left_teacher-box">
                <p>
                  To'liq ismi: <span>{data?.data.teacher.full_name}</span>
                </p>
                <p>
                  Manzili: <span>{data?.data.teacher.address}</span>
                </p>
                <p>
                  Telfon raqami: <span>{data?.data.teacher.phone_number}</span>
                </p>
                <p>
                  Jinsi:{" "}
                  <span>
                    {data?.data.teacher.gender === UserGender.MALE
                      ? "O'g'il bola"
                      : "Qiz bola"}
                  </span>
                </p>
                <p>
                  Username: <span>{data?.data.teacher.username}</span>
                </p>
              </div>
            </div>
            <div className="group-detail__student-box">
              <h3 className="group-detail__student-title">O'quvchilar</h3>
              <div className="group-detail__student_title-list">
                <p>#</p>
                <p>To'liq ismi</p>
                <p>Telfon raqami</p>
                <p>Jinsi</p>
                <p>Yashash manzili</p>
                <p>Tug'ilgan sana</p>
                <p>Username</p>
              </div>
              <div className="group-detail__student-list-box">
                {data?.data.group_members.map((item, i) => (
                  <ul key={item.user_id} className="group-detail__student-list">
                    <li>
                      <p>{i + 1}</p>
                    </li>
                    <li>
                      <Link to={`/admin/student-detail/${item.user.user_id}`}>
                        {item.user.full_name}
                      </Link>
                    </li>
                    <li>
                      <p>{item.user.phone_number}</p>
                    </li>
                    <li>
                      <p>{item.user.gender}</p>
                    </li>
                    <li>
                      <p>{item.user.address}</p>
                    </li>
                    <li>
                      <p>{item.user.data_of_birth.split("T")[0]}</p>
                    </li>
                    <li>
                      <p>{item.user.username}</p>
                    </li>
                  </ul>
                ))}
              </div>
            </div>
          </div>
          <Modal
            title="O'quvchi qo'shish"
            open={isModalOpen}
            onOk={() => form.submit()}
            onCancel={handleCancel}
            okText="Saqlash"
            cancelText="Bekor qilish"
          >
            <Form layout="vertical" onFinish={onFinish} form={form}>
              <Form.Item<GroupMemberFormType>
                label="O'quvchi Tanlash"
                name="userId"
                required
              >
                <Select
                  showSearch
                  placeholder="O'quvchi tanlang"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.children as unknown as string)
                      ?.toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
                  {studentSelectorOption?.map((item) => (
                    <Select.Option value={item.value} key={item.value}>
                      {item.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </section>
      )}
    </>
  );
};
