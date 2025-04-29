import { Button, DatePickerProps, Empty, Select } from "antd";
import { PlusIcon } from "../../../assets/components/plus-icon";
import "../css/course-page.css";
import { useNavigate } from "react-router-dom";
import { useGetAllCourse } from "../service/query/use-get-all-course";
import { CourseCard } from "../components/course-card";
import { useEffect, useState } from "react";
import { filterOptionForCourse, PaginationT } from "../../../common/interface";
import { PaginationLeftIcon } from "../../../assets/components/pagination-left-icon";
import { PaginationRightIcon } from "../../../assets/components/pagination-right-icon";
import { FilterIcon } from "../../../assets/components/filter-icon";
import { CourseStatus, SearchEnum } from "../../../common/enum";
import { CloseIcon } from "../../../assets/components/close-icon";
import { SaveIcon } from "../../../assets/components/save-icon";
import { useGlobalSearch } from "../../../store/use-global-search";

export const CoursePage = () => {
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

  const [filterOption, setFilterOption] = useState<filterOptionForCourse>({});

  const { setInputValue, inputValue } = useGlobalSearch();
  useEffect(() => {
    setInputValue(undefined, SearchEnum.COURSE);
  }, []);

  useEffect(() => {
    if (inputValue.type === SearchEnum.COURSE) {
      setFilterOption((state) => ({ ...state, name: inputValue.value }));
    }
  }, [inputValue.value]);

  const { data, isLoading } = useGetAllCourse(paginationData, filterOption);

  useEffect(() => {
    const buttonCount = Math.ceil(
      (data?.meta.total ?? 1) / paginationData.limit
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

  const navigate = useNavigate();
  const navigateFn = () => {
    navigate("/admin/course-create");
  };

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSave = () => {
    setFilterOption((state) => ({ ...state, isSaved: true }));
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isModalOpen) {
          setIsModalOpen(false);
        }
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isModalOpen]);

  const handleStatusFn = (value: CourseStatus) => {
    if (value) {
      setFilterOption((state) => ({ ...state, status: value }));
    }
  };

  return (
    <section className="course">
      <div className="course__header">
        <h2 className="course__header-title">Kurslar</h2>
        <div className="course__header-wrap">
          <Button
            onClick={navigateFn}
            style={{ padding: "10px 20px" }}
            icon={<PlusIcon />}
          >
            Qo’shish
          </Button>
          <Button onClick={showModal}>
            <FilterIcon />
          </Button>
        </div>

        <div
          style={isModalOpen ? { opacity: 1 } : { opacity: 0, zIndex: -1 }}
          className="course__filter-modal"
        >
          <div className="course__modal-header">
            <p className="course__modal-title">Filtr</p>
            <button onClick={handleCancel} className="course__modal-btn">
              <CloseIcon />
            </button>
          </div>
          <div className="course__modal-content">
            <div className="course__modal-content-wrap">
              <Select
                onChange={handleStatusFn}
                style={{ width: "100%" }}
                placeholder="Holati"
              >
                <Select.Option value={undefined}>Hammasi</Select.Option>
                <Select.Option value={CourseStatus.ACTIVE}>
                  Aktive
                </Select.Option>
                <Select.Option value={CourseStatus.INACTIVE}>
                  Aktive emas
                </Select.Option>
                <Select.Option value={CourseStatus.DRAFT}>
                  To'htatilgan
                </Select.Option>
              </Select>
            </div>
            <Button onClick={handleSave} icon={<SaveIcon />}>
              Saqlash
            </Button>
          </div>
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
        <div className="course__list-box">
          {isLoading ? (
            <h1>Loading...</h1>
          ) : data?.data.length === 0 ? (
            <Empty />
          ) : (
            data?.data.map((item, i) => (
              <CourseCard key={item.course_id} item={item} i={i} />
            ))
          )}
        </div>
        {data?.data.length === 0 ? (
          ""
        ) : (
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
        )}
      </div>
    </section>
  );
};
