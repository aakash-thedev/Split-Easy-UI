import { Navigate, Route, Routes } from "react-router-dom";
import Sidenav from "../components/Sidenav/Sidenav";
import routes from "./Routes";

const AvailableRoutes = () => {
  const isUserAuthenticated = localStorage.getItem('token');

  if (isUserAuthenticated) {
    return (
      <>
        <div
          className="main-page-content"
          style={{
            display: 'flex',
            flexDirection: 'row',
            height: "100vh",
            overflow: "scroll",
          }}
        >
          <Sidenav />

          <div style={{ flex: 1, height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Routes>
              {routes.map((route, index) =>
                route.protected ? <Route key={index} {...route} /> : null,
              )}

              <Route
                key={routes.length}
                path="/notfound"
                element={<div> PAGE NOT FOUND </div>}
              />
              <Route path="*" element={<Navigate to={"/groups"} replace />} />
            </Routes>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <Routes>
        {routes.map((route, index) =>
          !route.protected ? <Route key={index} {...route} /> : null,
        )}

        <Route
          key={routes.length}
          path="/notfound"
          element={<div> PAGE NOT FOUND </div>}
        />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    );
  }
};

export default AvailableRoutes;
