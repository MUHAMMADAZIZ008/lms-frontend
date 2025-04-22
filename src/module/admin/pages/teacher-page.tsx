import { Button, Select } from "antd";
import { PlusIcon } from "../../../assets/components/plus-icon";
import "../css/student-page.css";
import { useEffect, useState } from "react";
import { PaginationLeftIcon } from "../../../assets/components/pagination-left-icon";
import { PaginationRightIcon } from "../../../assets/components/pagination-right-icon";
import { PaginationT } from "../../../common/interface";
import { useNavigate } from "react-router-dom";
import { useGetAllTeacher } from "../service/query/use-get-all-teacher";
import TeacherCard from "../components/teacher-card";

export const TeacherPage = () => {
  const navigate = useNavigate();
  const [paginationData, setPaginationData] = useState<PaginationT>({
    limit: 6,
    page: 1,
  });
  const [paginationButtonCount, setPaginationButtonCount] = useState<number>(1);
  const [selectionOption, setSelectionOption] = useState<
    { value: number; label: number }[]
  >([
    {
      value: 1,
      label: 1,
    },
  ]);
  const { data, isLoading } = useGetAllTeacher(paginationData);

  useEffect(() => {
    const buttonCount = Math.ceil(
      (data?.meta.teacherCount ?? 1) / paginationData.limit
    );

    setPaginationButtonCount(buttonCount);
  }, [data, paginationData]);

  useEffect(() => {
    const selectOption = [
      {
        value: 6,
        label: 6,
      },
      {
        value: 10,
        label: 10,
      },
      {
        value: 20,
        label: 20,
      },
      {
        value: 30,
        label: 30,
      },
    ];

    setSelectionOption(selectOption);
  }, []);

  const studentCreateNavigate = () => {
    navigate("/admin/teacher-create");
  };

  return (
    <section className="student-page">
      <div className="student__header">
        <h2 className="student__header-title">O'qtuvchilar jadvali</h2>
        <div className="student__header-wrap">
          <Button
            onClick={studentCreateNavigate}
            style={{ padding: "10px 20px" }}
            icon={<PlusIcon />}
          >
            Qo’shish
          </Button>
        </div>
      </div>
      <div className="student__content-box">
        <div className="student__content_title-box">
          <p>#</p>
          <p>Bolalar F.I.O</p>
          <p>Tug’ilgan sana</p>
          <p>Jinsi</p>
          <p>Telfon raqami</p>
          <p>Uy manzili</p>
          <p>Usernname</p>
          <p>Imkonyatlar</p>
        </div>
        <div className="student__content-list-box">
          {isLoading ? (
            <h2>Loading...</h2>
          ) : (
            data &&
            data?.data.map((item, i) => (
              <TeacherCard key={item.user_id} item={item} i={i} />
            ))
          )}
        </div>
      </div>
      <div className="student__pagination-box">
        <p className="student__pagination-text">Sahifalar</p>
        <div className="student__pagination_button-wrap">
          <Button
            icon={<PaginationLeftIcon />}
            disabled={paginationData.page <= 1 ? true : false}
            onClick={() =>
              setPaginationData((prev) => ({
                ...prev,
                page: Math.max(prev.page - 1, 1),
              }))
            }
          />
          <p>{paginationData.page}</p>
          <Button
            disabled={
              paginationData.page >= paginationButtonCount ? true : false
            }
            icon={<PaginationRightIcon />}
            onClick={() =>
              setPaginationData((prev) => ({
                ...prev,
                page: Math.min(prev.page + 1, paginationButtonCount),
              }))
            }
          />
        </div>
        <Select
          value={paginationData.limit}
          options={selectionOption}
          style={{ width: 80 }}
          onChange={(value) =>
            setPaginationData((prev) => ({
              ...prev,
              limit: value,
            }))
          }
        />
      </div>
    </section>
  );
};
