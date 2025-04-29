import { Button, DatePicker, DatePickerProps, Empty, Select, Spin } from "antd";
import { PlusIcon } from "../../../assets/components/plus-icon";
import "../css/group-page.css";
import { useGeAllGroup } from "../service/query/use-get-all-group";
import { PaginationLeftIcon } from "../../../assets/components/pagination-left-icon";
import { useNavigate } from "react-router-dom";
import { filterOptionForGroup, PaginationT } from "../../../common/interface";
import { useEffect, useState } from "react";
import { PaginationRightIcon } from "../../../assets/components/pagination-right-icon";
import { GroupCard } from "../components/group-card";
import { FilterIcon } from "../../../assets/components/filter-icon";
import { CloseIcon } from "../../../assets/components/close-icon";
import { SaveIcon } from "../../../assets/components/save-icon";
import { GroupStatus, SearchEnum } from "../../../common/enum";
import { useGlobalSearch } from "../../../store/use-global-search";

export const GroupPage = () => {
  const navigate = useNavigate();
  const [paginationData, setPaginationData] = useState<PaginationT>({
    limit: 6,
    page: 1,
  });
  const [filterOption, setFilterOption] = useState<filterOptionForGroup>({});

  const { setInputValue, inputValue } = useGlobalSearch();
  useEffect(() => {
    setInputValue(undefined, SearchEnum.GROUP);
  }, []);

  useEffect(() => {
    if (inputValue.type === SearchEnum.GROUP) {
      setFilterOption((state) => ({ ...state, name: inputValue.value }));
    }
  }, [inputValue.value]);

  const [paginationButtonCount, setPaginationButtonCount] = useState<number>(1);
  const [selectionOption, setSelectionOption] = useState<
    { value: number; label: number }[]
  >([
    {
      value: 6,
      label: 6,
    },
  ]);

  const { data, isLoading } = useGeAllGroup(paginationData, filterOption);

  useEffect(() => {
    const buttonCount = Math.ceil(
      (data?.meta.totalCount ?? 1) / paginationData.limit
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

  const createGroupNavigate = () => {
    navigate("/admin/group-create");
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

  const filterDateFn: DatePickerProps["onChange"] = (_, dateString) => {
    if (typeof dateString == "string") {
      setFilterOption((state) => ({ ...state, start_date: dateString }));
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

  const handleStatusFn = (value: GroupStatus) => {
    if (value) {
      setFilterOption((state) => ({ ...state, status: value }));
    }
  };

  return (
    <section className="group__page">
      <div className="group__header">
        <h2 className="group__header-title">Guruhlar</h2>
        <div className="group__header-wrap">
          <Button
            onClick={createGroupNavigate}
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
          className="group__filter-modal"
        >
          <div className="group__modal-header">
            <p className="group__modal-title">Filtr</p>
            <button onClick={handleCancel} className="group__modal-btn">
              <CloseIcon />
            </button>
          </div>
          <div className="group__modal-content">
            <div className="group__modal-content-wrap">
              <DatePicker
                onChange={filterDateFn}
                placeholder="Yaratilgan vaqti"
              />
              <Select
                onChange={handleStatusFn}
                style={{ width: "100%" }}
                placeholder="Holati"
              >
                <Select.Option value={undefined}>Hammasi</Select.Option>
                <Select.Option value={GroupStatus.ACTIVE}>Aktive</Select.Option>
                <Select.Option value={GroupStatus.INACTIVE}>
                  Aktive emas
                </Select.Option>
                <Select.Option value={GroupStatus.COMPLETED}>
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
          ) : data?.data.length ? (
            data?.data.map((item, i) => (
              <GroupCard key={item.group_id} item={item} i={i} />
            ))
          ) : (
            <Empty />
          )}
        </div>
        {isLoading ? (
          ""
        ) : data?.data.length ? (
          <div className="group__pagination-box">
            <p className="group__pagination-text">Sahifalar</p>
            <div className="group__pagination_button-wrap">
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
      </div>
    </section>
  );
};
