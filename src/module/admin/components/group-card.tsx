import { useState } from "react";
import { Group } from "../../../common/interface";
import { Button, Typography } from "antd";
import { EditIcon } from "../../../assets/components/edit-icon";
import { DeleteIcon } from "../../../assets/components/delete-icon";
import "../css/group-page.css";
import { GroupStatus } from "../../../common/enum";

export const GroupCard = ({ item, i }: { item: Group; i: number }) => {
  const [isSure, setIsSure] = useState<boolean>(false);

  return (
    <ul className="group__content-card">
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
        <p>{item.created_at.split("T")[0]}</p>
      </li>
      <li>
        <p>{item.group_members.length}</p>
      </li>
      <li>
        <p
          style={
            item.status === GroupStatus.ACTIVE
              ? { color: "green" }
              : { color: "red" }
          }
        >
          {item.status}
        </p>
      </li>
      {isSure ? (
        <li>
          <div>
            <Typography>Ishonchingiz komilmi?</Typography>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Button onClick={() => setIsSure(false)}>Yo'q</Button>
              <Button variant="dashed">Ha</Button>
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
