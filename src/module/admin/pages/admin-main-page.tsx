import { Button, Typography } from "antd";
import "../css/admin-main-page.css";
import { useEffect, useState } from "react";
import { useGetDashboard } from "../service/query/use-get-dashboard";
import IncomeIcon from "../../../assets/components/income-icon";
import { CalendarIcon } from "../../../assets/components/calendar-icon";
import { CostIcon } from "../../../assets/components/cost-icon";
import { Pie } from "@ant-design/charts";
import Title from "antd/es/typography/Title";
import { UsersIcon } from "../../../assets/components/users-icon";
import { Skeleton } from "antd";
import { UserRole } from "../../../common/enum";
import { DashboardT } from "../../../common/interface";

const boxes = [
  { id: undefined , title: "Hammasi" },
  { id: UserRole.TEACHER, title: "O'qtuvchilar" },
  { id: UserRole.STUDENT, title: "O'quvchilar" },
];

interface chartDataT {
  type: string;
  value: number;
}

export const AdminMainPage = () => {
  const [selectedBtn, setSelectedBtn] = useState<string>(boxes[0].title);
  const [chartData, setChartData] = useState<chartDataT[]>([]);

  const [dashboardConfig, setDashboardConfig] = useState<DashboardT>({
    category: undefined,
  });
  const { data, isLoading } = useGetDashboard(dashboardConfig);

  
  useEffect(() => {
    if (data?.data?.ageStats) {
      const newChartData = Object.entries(data.data.ageStats).map(
        ([key, value]) => ({
          type: key,
          value: value as number,
        })
      );
      setChartData(newChartData);
    }
  }, [data]);

  const chartConfig = {
    appendPadding: 10,
    data: chartData,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.5,
    label: { text: "value", style: { fontWeight: "bold" } },
    legend: { color: { title: false, position: "right", rowPadding: 5 } },
  };

  if (isLoading) return <Skeleton active />;

  const categorySelectFn = (item: any) => {
    setSelectedBtn(item.title);
    setDashboardConfig((state) => ({ ...state, category: item.id }));
  };

  return (
    <section className="admin__main-page">
      <div className="admin_main-header">
        <h2 className="admin_main-title">Asosiy bo’lim</h2>
      </div>
      <div className="admin__main-content">
        <div className="main__content-top">
          <div className="content__box-main">
            <div className="content__control-box">
              <h3 className="content__control-title">
                {selectedBtn} soni: <span>{data?.data.userCount} ta</span>
              </h3>
              <div className="content__control-wrap">
                {boxes.map((item) => (
                  <Button
                    key={item.title}
                    style={
                      selectedBtn === item.title ? { color: "#3aada8" } : {}
                    }
                    onClick={() => categorySelectFn(item)}
                  >
                    {item.title}
                  </Button>
                ))}
              </div>
            </div>
            <div className="content__control-list-box">
              <div className="control-list-title-box">
                <p>#</p>
                <p>O’qituvchilar F.I.O</p>
                <p>Tug’ilgan sana</p>
                <p>Jinsi</p>
                <p>Username</p>
              </div>
              <div className="content__control-list-wrap">
                {data?.data.users?.map((item, i) => (
                  <ul key={item.user_id} className="content__teacher-cart">
                    <li>{i + 1}</li>
                    <li>{item.full_name}</li>
                    <li>{item.data_of_birth.split("T")[0]}</li>
                    <li>
                      <Typography
                        style={{
                          color: item.gender === "MALE" ? "#3aada8" : "#ff5f5f",
                        }}
                      >
                        {item.gender === "MALE" ? "Erkak" : "Ayol"}
                      </Typography>
                    </li>
                    <li>{item.username}</li>
                  </ul>
                ))}
              </div>
            </div>
          </div>
          <div className="statistic-box-wrap">
            <div className="statistic-box">
              <IncomeIcon />
              <p className="statistic-box_title">Kirimlar</p>
              <p className="statistic-box_sum">{data?.data.income.sum} soʻm</p>
              <div className="statistic-text-wrap">
                <CalendarIcon />
                <p>
                  O'tgan oyga nisbatan
                  {data?.data.income.percent !== undefined && (
                    <span
                      style={{
                        color:
                          data?.data.income.percent >= 0
                            ? "#3aada8"
                            : "#FF8484",
                      }}
                    >
                      {data?.data.income.percent >= 0 ? "+" : ""}
                      {data?.data.income.percent}%
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="statistic-box">
              <CostIcon />
              <p className="statistic-box_title">Chiqimlar</p>
              <p className="statistic-box_sum">{data?.data.cost.sum} soʻm</p>
              <div className="statistic-text-wrap">
                <CalendarIcon />
                <p>
                  O'tgan oyga nisbatan
                  {data?.data.cost.percent !== undefined && (
                    <span
                      style={{
                        color:
                          data?.data.cost.percent >= 0 ? "#3aada8" : "#FF8484",
                      }}
                    >
                      {data?.data.cost.percent >= 0 ? "+" : ""}
                      {data?.data.cost.percent}%
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="main__content-bottom">
          <div className="content-bottom_main">
            <div className="content-bottom_main-box"></div>
            <div className="content-bottom_main-box">
              <div className="bottom_main-header">
                <Title className="bottom_main-header_title">
                  Bolalarni yosh bo’yicha statistikasi
                </Title>
                <p className="bottom_main-header-present">100%</p>
              </div>
              {chartData.length > 0 && (
                <Pie className="chart-box" {...chartConfig} />
              )}
            </div>
          </div>
          <div className="button__right-box">
            <div className="statistic-box">
              <UsersIcon />
              <p className="statistic-box_title">Bolalar soni</p>
              <p className="statistic-box_sum">{data?.data.studentCount} ta</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
