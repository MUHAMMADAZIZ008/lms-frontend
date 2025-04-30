import { Course } from "../../../common/interface";
import { DeleteIcon } from "../../../assets/components/delete-icon";
import "../css/course-page.css";
import { CourseStatus } from "../../../common/enum";
import { useState } from "react";
import { Button, notification, Typography } from "antd";
import { useDeleteCourse } from "../service/mutation/use-delete-course";
import { useQueryClient } from "@tanstack/react-query";
import { EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const CourseCard = ({ item, i }: { item: Course; i: number }) => {
  const [isSure, setIsSure] = useState<boolean>(false);
  const [api, contextHolderNot] = notification.useNotification();

  const { mutate } = useDeleteCourse();

  const queryClient = useQueryClient();

  const deleteStudentFn = () => {
    mutate(item.course_id, {
      onSettled() {
        api.success({
          message: "Muvaffaqiyat o'chirildi",
        });
        queryClient.refetchQueries({
          queryKey: ["course_list"],
        });
      },
      onError: (err) => {
        api.error({
          message: err.message,
        });
      },
    });
  };
  const navigate = useNavigate();

  const navigateFn = () => {
    navigate(`/admin/course-detail/${item.course_id}`);
  };
  return (
    <ul className="course__list" key={item.course_id}>
      {contextHolderNot}
      <li>
        <p>{i + 1}</p>
      </li>
      <li>
        <p>{item.name}</p>
      </li>
      <li>
        <p>{item.description}</p>
      </li>
      <li>
        <p>{item.duration}</p>
      </li>
      <li>
        {item.status === CourseStatus.ACTIVE ? (
          <p style={{ color: "green" }}>{item.status}</p>
        ) : (
          ""
        )}
        {item.status !== CourseStatus.ACTIVE ? (
          <p style={{ color: "red" }}>{item.status}</p>
        ) : (
          ""
        )}
      </li>
      {isSure ? (
        <li>
          <div>
            <Typography>Ishonchingiz komilmi?</Typography>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Button onClick={() => setIsSure(false)}>Yo'q</Button>
              <Button onClick={deleteStudentFn} variant="dashed">
                Ha
              </Button>
            </div>
          </div>
        </li>
      ) : (
        <li>
          <Button
            onClick={navigateFn}
            type="primary"
            color="green"
            style={{ color: "green" }}
          >
            <EyeOutlined />
          </Button>
          <button onClick={() => setIsSure(true)}>
            <DeleteIcon />
          </button>
        </li>
      )}
    </ul>
  );
};
