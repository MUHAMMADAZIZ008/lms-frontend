import "../css/settings.css";
import { useGetProfile } from "../service/query/use-get-profile";

export const SettingsPage = () => {
  const { data } = useGetProfile();
  console.log(data);
  
  return (
    <section className="settings__page">
      <div className="settings__header">
        <h2 className="settings__header-title">Shaxsiy ma'lumotlar</h2>
      </div>
      <div className="settings__content">
        <div className="setting__info-box"></div>
      </div>
    </section>
  );
};
