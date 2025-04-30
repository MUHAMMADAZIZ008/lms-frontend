import { useNavigate, useParams } from "react-router-dom";
import { useGetOneCourse } from "../service/query/use-get-one-course";
import { Button, Empty, Spin } from "antd";
import { PaginationLeftIcon } from "../../../assets/components/pagination-left-icon";
import "../css/course-detail.css";
import { GroupCard } from "../components/group-card";

export const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetOneCourse(id || "");
  console.log(data);

  const goBackFn = () => {
    navigate(-1);
  };
  return (
    <section>
      <div className="course-detail__header">
        <h2 className="course-detail__header-title">Kurs haqida</h2>
        <div className="course-detail__header-wrap">
          <Button
            onClick={goBackFn}
            icon={<PaginationLeftIcon />}
            type="default"
          >
            Ortga qaytish
          </Button>
        </div>
      </div>
      <div className="group__content">
        <div className="group__content_title-box">
          <p>#</p>
          <p>Nomi</p>
          <p>Tafsifi</p>
          <p>Tashkil topgan vaqti</p>
          <p>Bolalar soni</p>
          <p>Holati</p>
          <p>Imkoniyatlar</p>
        </div>
        <div className="group__content-list-box">
          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 50,
              }}
            >
              <Spin size="large" />
            </div>
          ) : data?.groups.length ? (
            data?.groups.map((item, i) => (
              <GroupCard key={item.group_id} item={item} i={i} />
            ))
          ) : (
            <Empty />
          )}
        </div>
      </div>
    </section>
  );
};
