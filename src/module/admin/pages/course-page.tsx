import { Button } from "antd";
import { PlusIcon } from "../../../assets/components/plus-icon";
import "../css/course-page.css";

export const CoursePage = () => {
  return (
    <section className="course">
      <div className="course__header">
        <h2 className="course__header-title">Kurslar</h2>
        <div className="course__header-wrap">
          <Button style={{ padding: "10px 20px" }} icon={<PlusIcon />}>
            Qo’shish
          </Button>
        </div>
      </div>
      <div className="course__content">
        <div className="course__content-header">
          <p>#</p>
          <p>Nomi</p>
          <p>Tafsifi</p>
          <p>Davomiligi</p>
          <p>Holati</p>
          <p>Imkoniyatlar</p>
        </div>
      </div>
    </section>
  );
};
