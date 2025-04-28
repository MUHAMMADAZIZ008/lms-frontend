import { useState } from "react";
import { Group } from "../../../common/interface";
import { Button, Typography } from "antd";
import { DeleteIcon } from "../../../assets/components/delete-icon";
import "../css/group-page.css";
import { GroupStatus } from "../../../common/enum";
import { EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const GroupCard = ({ item, i }: { item: Group; i: number }) => {
  const [isSure, setIsSure] = useState<boolean>(false);

  const navigate = useNavigate();

  const navigateFn = () => {
    navigate(`/admin/group-detail/${item.group_id}`);
  };
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
