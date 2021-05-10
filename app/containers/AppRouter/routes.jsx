import _ from "lodash";
import React from "react";
import { Route, Switch } from "react-router-dom";
import SignIn from "containers/SignIn/Loadable";

import Dashboard from "containers/Dashboard/Loadable";
import Account from "containers/Account/Loadable";
import Product from "containers/Product/Loadable";
import Category from "containers/Category/Loadable";
import Test from "containers/Test/Loadable";
import Branch from "containers/Branch/Loadable";
import Order from "containers/Order/Loadable";
import New from "containers/New/Loadable";
import Promotion from "containers/Promotion/Loadable";
import Report from "containers/Report/Loadable";

import Profile from "containers/Profile/Loadable";
import NotFoundPage from "containers/NotFoundPage/Loadable";
import AuthorizedLayout from "components/Layout/AuthorizedLayout";
import GuestLayout from "components/Layout/GuestLayout";
import Public from "components/Layout/Public";
// Authorized router
export const MainRouter = (props) => {
  return (
    <Switch>
      {_.map(authorizedRoutes, (route, routeId) => {
        return <Route key={routeId} {...route} {...props} />;
      })}
    </Switch>
  );
};
// Các routes được public khi không đăng nhập

export const publicRouter = [
  {
    path: "/signin",
    exact: true,
    layout: GuestLayout,
    component: SignIn,
  },

  {
    path: "/",
    layout: AuthorizedLayout,
    component: MainRouter,
  },
];
export const authorizedRoutes = [
  {
    path: "/profile",
    exact: true,
    component: Profile,
  },
  {
    path: "/tai-khoan",
    exact: true,
    component: Account,
  },
  {
    path: "/test",
    exact: true,
    component: Test,
  },
  {
    path: "/san-pham",
    exact: true,
    component: Product,
  },
  {
    path: "/khuyen-mai",
    exact: true,
    component: Promotion,
  },
  {
    path: "/tin-tuc",
    exact: true,
    component: New,
  },
  {
    path: "/don-hang",
    exact: true,
    component: Order,
  },
  {
    path: "/thuong-hieu",
    exact: true,
    component: Branch,
  },
  {
    path: "/loai-san-pham",
    exact: true,
    component: Category,
  },
  {
    path: "/thong-ke",
    exact: true,
    component: Report,
  },
  {
    path: "/",
    exact: true,
    component: Dashboard,
  },
  {
    path: "*",
    exact: true,
    component: NotFoundPage,
  },
];
