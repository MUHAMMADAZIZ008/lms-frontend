import { Button, Typography } from "antd";
import "../css/admin-main-page.css";
import { useState } from "react";
import { useGetDashboard } from "../service/query/use-get-dashboard";
import { GetCookie } from "../../../config/cookie";
import IncomeIcon from "../../../assets/components/income-icon";
import { CalendarIcon } from "../../../assets/components/calendar-icon";

const boxes = [
  {
    id: 1,
    title: "O’qituvchilar",
  },
  {
    id: 2,
    title: "Tarbiyachilar",
  },
  {
    id: 3,
    title: "Ishchilar",
  },
];

export const AdminMainPage = () => {
  const [selectedBtn, setSelectedBtn] = useState<string>();

  const { data } = useGetDashboard();
  console.log(GetCookie("access_token"));

  return (
    <section className="admin__main-page">
      <div className="admin_main-header">
        <h2 className="admin_main-title">Asosiy bo’lim</h2>
      </div>
      <div className="admin__main-content">
        <div>
          <div className="main__content-top">
            <div className="content__box-main">
              <div className="content__control-box">
                <h3 className="content__control-title">
                  O’qituvchilar soni: <span>{data?.data.teacherCount} ta</span>
                </h3>
                <div className="content__control-wrap">
                  {boxes.map((item) => (
                    <Button
                      style={
                        selectedBtn === item.title ? { color: "#3aada8" } : {}
                      }
                      onClick={() => setSelectedBtn(item.title)}
                      key={item.id}
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
                  {data?.data.teachers.map((item, i) => (
                    <ul key={item.user_id} className="content__teacher-cart">
                      <li>{i + 1}</li>
                      <li>
                        <Typography>{item.full_name}</Typography>
                      </li>
                      <li>{item.data_of_birth.split("T")[0]}</li>
                      <li>
                        <Typography
                          style={
                            item.gender === "MALE"
                              ? { color: "#3aada8" }
                              : { color: "#ff5f5f" }
                          }
                        >
                          {item.gender === "MALE" ? "O'g'il bola" : "Qiz bola"}
                        </Typography>
                      </li>
                      <li>{item.username}</li>
                    </ul>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div>
                <IncomeIcon />
                <p>{data?.data.income.sum} so'm</p>
                <div>
                  {<CalendarIcon />}{" "}
                  <p>
                    O'tgan oyga nisbatan nisbatan
                    {data?.data.income.percent &&
                    data?.data.income.percent <= 0 ? (
                      <span>-{data?.data.income.percent}</span>
                    ) : (
                      <span> +{data?.data.income.percent}</span>
                    )}
                  </p>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
