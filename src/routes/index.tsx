import { memo, ReactElement, useCallback } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import privateRoutes from './privateRoutes';
import { Page404 } from 'pages/public/Page404';
import { LoginPage } from 'pages/public/LoginPage';

import IRoute from 'interfaces/route';
import { useAppSelector } from 'hooks/useAppSelector';

const RoutesAplication = (): ReactElement => {
  function PrivateRoute({ children }: any) {
    const { isLoggedIn } = useAppSelector((state) => state.authReducer);
    if (!isLoggedIn) return <Navigate to="/login" />;

    return children;
  }

  const renderPrivateRoutes = useCallback((route: IRoute) => {
    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          <PrivateRoute route={route}>
            <route.component />
          </PrivateRoute>
        }
      >
        {route.children?.length! > 0
          ? route.children?.map((routeChild: any, index) => {
              return (
                <Route
                  key={routeChild.name}
                  path={index === 0 ? null : routeChild.path}
                  index={index === 0}
                  element={<routeChild.component />}
                />
              );
            })
          : null}
      </Route>
    );
  }, []);

  return (
    <Routes>
      <Route path="*" element={<Page404 />} />
      <Route path="/login" element={<LoginPage />} />
      {privateRoutes.map(renderPrivateRoutes)}
    </Routes>
  );
};

export default memo(RoutesAplication);
