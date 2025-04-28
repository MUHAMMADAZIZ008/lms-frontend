import { useParams } from "react-router-dom";
import { useGetOneGroup } from "../service/query/use-get-one-group";
import { Button } from "antd";
import { DeleteIcon } from "../../../assets/components/delete-icon";
import { EditIcon2 } from "../../../assets/components/edit-icon2";
import "../css/group-detail.css";
import { GroupStatus, UserGender } from "../../../common/enum";

export const GroupDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetOneGroup(id || "");

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <section className="group__detail">
          <div className="group-detail__header">
            <h2 className="group-detail__header-title">O'quvchi haqida</h2>
            <div className="group-detail__header-wrap">
              <Button icon={<DeleteIcon />}>O'chirish</Button>
              <Button icon={<EditIcon2 />}>Tahrirlash</Button>
              <Button>O'quvchi qo'shish</Button>
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
                  <ul className="group-detail__student-list">
                    <li><p>{i + 1}</p></li>
                    <li><p>{item.user.full_name}</p></li>
                    <li><p>{item.user.phone_number}</p></li>
                    <li><p>{item.user.gender}</p></li>
                    <li><p>{item.user.address}</p></li>
                    <li><p>{item.user.data_of_birth.split('T')[0]}</p></li>
                    <li><p>{item.user.username}</p></li>
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
