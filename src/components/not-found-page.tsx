import notFound from "../assets/png/not-found.png";

export const NotFoundPage = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <img
        style={{ width: "100%", height: "100%" }}
        src={notFound}
        alt="image"
      />
    </div>
  );
};
