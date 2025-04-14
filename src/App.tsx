import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";

function App() {
  return (
    <>
      <Routes>
        {routes.map((item, i) => (
          <Route key={i} path={item.path} element={item.element}>
            {item.children?.map((childItem, j) => (
              <Route
                key={j}
                index={!childItem.path}
                path={childItem.path}
                element={childItem.element}
              />
            ))}
          </Route>
        ))}
      </Routes>
    </>
  );
}

export default App;
