import notFound from "../assets/png/not-found.png";

export const NotFoundPage = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img style={{ width: "90%", height: "90%" }} src={notFound} alt="image" />
    </div>
  );
};
