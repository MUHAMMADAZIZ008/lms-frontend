import { useState } from "react";
import { DeleteIcon } from "../../../assets/components/delete-icon";
import { EditIcon } from "../../../assets/components/edit-icon";
import { Student } from "../../../common/interface";
import { Button, Image, notification, Typography } from "antd";
import { useDeleteStudent } from "../service/mutation/use-delete-student";
import { useQueryClient } from "@tanstack/react-query";

const StudentCard = ({ item, i }: { item: Student; i: number }) => {
  const [api, contextHolderNot] = notification.useNotification();

  const [isSure, setIsSure] = useState<boolean>(false);
  const { mutate } = useDeleteStudent();

  const queryClient = useQueryClient();

  const deleteStudentFn = () => {
    mutate(item.user_id, {
      onSuccess(data) {
        console.log(data);
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

  return (
    <ul className="student__content-card">
      {contextHolderNot}
      <li>
        <p>{i + 1}</p>
      </li>
      <li>
        {item.images.length !== 0 ? (
          <Image
            width={40}
            height={40}
            style={{ borderRadius: "50%" }}
            src={item.images[0].url}
          />
        ) : (
          ""
        )}
        <p>{item.full_name}</p>
      </li>
      <li>
        <p>{item.data_of_birth.split("T")[0]}</p>
      </li>
      <li>
        <p
          style={
            item.gender === "MALE" ? { color: "#3aada8" } : { color: "#ff5f5f" }
          }
        >
          {item.gender}
        </p>
      </li>
      <li>
        <p>{item.phone_number}</p>
      </li>
      <li>
        <p>{item.address}</p>
      </li>
      <li>
        <p>{item.group_members[0]?.group.name}</p>
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
          <button>
            <EditIcon />
          </button>
          <button onClick={() => setIsSure(true)}>
            <DeleteIcon />
          </button>
        </li>
      )}
    </ul>
  );
};

export default StudentCard;
