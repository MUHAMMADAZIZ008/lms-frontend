import { Button, Select } from "antd";
import { PlusIcon } from "../../../assets/components/plus-icon";
import "../css/group-page.css";
import { useGeAllGroup } from "../service/query/use-get-all-group";
import { PaginationLeftIcon } from "../../../assets/components/pagination-left-icon";
import { useNavigate } from "react-router-dom";
import { PaginationT } from "../../../common/interface";
import { useEffect, useState } from "react";
import { PaginationRightIcon } from "../../../assets/components/pagination-right-icon";
import { GroupCard } from "../components/group-card";

export const GroupPage = () => {
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
      value: 6,
      label: 6,
    },
  ]);

  const { data, isLoading } = useGeAllGroup(paginationData);

  useEffect(() => {
    const buttonCount = Math.ceil(
      (data?.meta.totalCount ?? 1) / paginationData.limit
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

  return (
    <section className="group__page">
      <div className="group__header">
        <h2 className="group__header-title">Guruhlar</h2>
        <div className="group__header-wrap">
          <Button style={{ padding: "10px 20px" }} icon={<PlusIcon />}>
            Qo’shish
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
            <h1>Loading...</h1>
          ) : (
            data?.data.map((item, i) => <GroupCard item={item} i={i} />)
          )}
        </div>

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
      </div>
    </section>
  );
};
