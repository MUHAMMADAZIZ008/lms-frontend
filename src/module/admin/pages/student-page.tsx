import {
  Button,
  DatePicker,
  DatePickerProps,
  Empty,
  notification,
  Select,
  Spin,
} from "antd";
import { PlusIcon } from "../../../assets/components/plus-icon";
import "../css/student-page.css";
import { useGetAllStudent } from "../service/query/use-get-all-student";
import { useEffect, useState } from "react";
import { PaginationLeftIcon } from "../../../assets/components/pagination-left-icon";
import { PaginationRightIcon } from "../../../assets/components/pagination-right-icon";
import { filterOptionForStudent, PaginationT } from "../../../common/interface";
import StudentCard from "../components/student-card";
import { useNavigate } from "react-router-dom";
import { FilterIcon } from "../../../assets/components/filter-icon";
import { CloseIcon } from "../../../assets/components/close-icon";
import { SearchEnum, UserGender } from "../../../common/enum";
import { useGeAllGroup } from "../service/query/use-get-all-group";
import { SaveIcon } from "../../../assets/components/save-icon";
import { useGlobalSearch } from "../../../store/use-global-search";

export const StudentPage = () => {
  const navigate = useNavigate();
  const [api, contextHolderNot] = notification.useNotification();
  const { setInputValue, inputValue } = useGlobalSearch();
  useEffect(() => {
    setInputValue(undefined, SearchEnum.STUDENT);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterOption, setFilterOption] = useState<filterOptionForStudent>({});
  const [paginationData, setPaginationData] = useState<PaginationT>({
    limit: 6,
    page: 1,
  });

  useEffect(() => {
    if (inputValue.type === SearchEnum.STUDENT) {
      setFilterOption((state) => ({ ...state, fullname: inputValue.value }));
    }
  }, [inputValue.value]);

  const [paginationButtonCount, setPaginationButtonCount] = useState<number>(1);
  const [selectionOption, setSelectionOption] = useState<
    { value: number; label: number }[]
  >([
    {
      value: 1,
      label: 1,
    },
  ]);
  const { data, isLoading } = useGetAllStudent(paginationData, filterOption);

  const [groupSelectOption, setGroupSelectOption] = useState<
    {
      value: string;
      label: string;
    }[]
  >();

  const { data: groupData, isError, error } = useGeAllGroup();
  if (isError) {
    api.error({
      message: error.message,
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
  }, [groupData]);

  useEffect(() => {
    const buttonCount = Math.ceil(
      (data?.meta.studentCount ?? 1) / paginationData.limit
    );

    setPaginationButtonCount(buttonCount);
  }, [data, paginationData]);

  useEffect(() => {
    // let buttonCount = 1;
    // while (buttonCount <= paginationButtonCount) {
    //   selectOption.push({ value: buttonCount, label: buttonCount });
    //   buttonCount++;
    // }
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
    navigate("/admin/student-create");
  };

  // modal
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

  const filterDateFn: DatePickerProps["onChange"] = (_, dateString) => {
    if (typeof dateString == "string") {
      setFilterOption((state) => ({ ...state, date_of_birth: dateString }));
    }
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

  const handleGenderFn = (value: UserGender) => {
    if (value) {
      setFilterOption((state) => ({ ...state, gender: value }));
    }
  };
  const handleGroupFn = (value: string) => {
    if (value) {
      setFilterOption((state) => ({ ...state, group_id: value }));
    }
  };
  return (
    <section className="student-page">
      {contextHolderNot}
      <div className="student__header">
        <h2 className="student__header-title">O’quvchilar jadvali</h2>
        <div className="student__header-wrap">
          <Button
            onClick={studentCreateNavigate}
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
          className="student__filter-modal"
        >
          <div className="student__modal-header">
            <p className="student__modal-title">Filtr</p>
            <button onClick={handleCancel} className="student__modal-btn">
              <CloseIcon />
            </button>
          </div>
          <div className="student__modal-content">
            <div className="student__modal-content-wrap">
              <DatePicker onChange={filterDateFn} />
              <Select
                onChange={handleGenderFn}
                style={{ width: "100%" }}
                placeholder="Jinsi"
              >
                <Select.Option value={undefined}>Hammasi</Select.Option>
                <Select.Option value={UserGender.MALE}>
                  O'g'il bola
                </Select.Option>
                <Select.Option value={UserGender.FEMALE}>
                  Qiz bola
                </Select.Option>
              </Select>
              <Select
                onChange={handleGroupFn}
                style={{ width: "100%" }}
                placeholder="Guruh nomi"
              >
                <Select.Option value={undefined}>Hammasi</Select.Option>
                {groupSelectOption?.map((item) => (
                  <Select.Option key={item.value} value={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <Button onClick={handleSave} icon={<SaveIcon />}>
              Saqlash
            </Button>
          </div>
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
          <p>Gurux nomi</p>
          <p>Imkonyatlar</p>
        </div>
        <div className="student__content-list-box">
          {isLoading ? (
            <div className="loading-center">
              <Spin size="large" />
            </div>
          ) : data?.data.length ? (
            data?.data.map((item, i) => (
              <StudentCard key={item.user_id} item={item} i={i} />
            ))
          ) : (
            <Empty />
          )}
        </div>
      </div>

      {isLoading ? (
        ""
      ) : data?.data.length ? (
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
      ) : (
        ""
      )}
    </section>
  );
};
