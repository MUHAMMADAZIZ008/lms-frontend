import { useParams } from "react-router-dom";
import { useGetOneTeacher } from "../service/query/use-get-one-teacher";
import { Button, Image } from "antd";
import { DeleteIcon } from "../../../assets/components/delete-icon";
import { EditIcon2 } from "../../../assets/components/edit-icon2";
import "../css/teacher-detail.css";
import { GroupStatus, UserGender } from "../../../common/enum";

export const TeacherDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetOneTeacher(id || "");

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <section className="teacher-detail">
          <div className="teacher-detail__header">
            <h2 className="teacher-detail__header-title">O'quvchi haqida</h2>
            <div className="teacher-detail__header-wrap">
              <Button icon={<DeleteIcon />}>O'chirish</Button>
              <Button icon={<EditIcon2 />}>Tahrirlash</Button>
              <Button>To'lov qo'shish</Button>
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
                  <ul className="teacher-detail__group-list">
                    <li className="teacher-detail__group-item">
                      <p>{i + 1}</p>
                    </li>
                    <li className="teacher-detail__group-item">
                      <p>{item.name}</p>
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
          </div>
        </section>
      )}
    </>
  );
};
