import { memo, ReactElement, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';

import privateRoutes from './privateRoutes';
import { Page404 } from 'pages/public/Page404';

import IRoute from 'interfaces/route';

const RoutesAplication = (): ReactElement => {
  function PrivateRoute({ children }: any) {
    // const { tempUser, isLoggedIn } = useSelector((state: RootReducer) => state.authReducer);
    // if (!isLoggedIn) return <Navigate to="/login" />;
    // else if (route.name !== 'userspage' && isEmpty(tempUser)) return <Navigate to="/users" />;

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
      {privateRoutes.map(renderPrivateRoutes)}
    </Routes>
  );
};

export default memo(RoutesAplication);
