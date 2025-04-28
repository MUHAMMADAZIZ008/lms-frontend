import { useParams } from "react-router-dom";
import { useGetOneStudent } from "../service/query/use-get-one-student";
import { Button, Image } from "antd";
import { DeleteIcon } from "../../../assets/components/delete-icon";
import { EditIcon2 } from "../../../assets/components/edit-icon2";
import "../css/student-detail.css";
import { UserGender } from "../../../common/enum";

export const StudentDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetOneStudent(id || "");

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section className="student-detail">
      <div className="student-detail__header">
        <h2 className="student-detail__header-title">O'quvchi haqida</h2>
        <div className="student-detail__header-wrap">
          <Button icon={<DeleteIcon />}>O'chirish</Button>
          <Button icon={<EditIcon2 />}>Tahrirlash</Button>
          <Button>To'lov qo'shish</Button>
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
                  <ul className="student-detail_group-list">
                    <li>
                      <p>{i + 1}</p>
                    </li>
                    <li>
                      <p>{item.group.name}</p>
                    </li>
                    <li>
                      <p>{item.group.start_date.split("T")[0]}</p>
                    </li>
                    <li>
                      <p>{item.group.status}</p>
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
                <ul className="student-detail_payment-list">
                  <li className="student-detail_payment-item">
                    <p>{i + 1}</p>
                  </li>
                  <li className="student-detail_payment-item">
                    <p>{item.sum}</p>
                  </li>
                  <li className="student-detail_payment-item">
                    <p>{item.type}</p>
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
    </section>
  );
};
