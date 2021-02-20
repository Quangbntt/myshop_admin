/* eslint-disable react/prop-types */
import React, { memo, useEffect, useCallback, useState } from "react";
import {
  makeSelectIsAuthenticated,
  makeSelectAppConfig,
} from "containers/App/selectors";
import { createStructuredSelector } from "reselect";
import ErrorBoundary from "react-error-boundary";
import ServiceBase from "utils/ServiceBase";
import { browseGlobalConfig, logOut } from "containers/App/actions";
import { connect } from "react-redux";
import { Layout, Result } from "antd";
import styled from "styled-components";
import { compose } from "recompose";
import ErrorMessage from "components/ErrorMessage";
import TopMenu from "./TopMenu";
import BottomMenu from "./BottomMenu";
import SubTopMenu from "./SubTopMenu";
import SideBar from "./SideBar";
import classNames from "classnames";
import { Table } from "antd";
import { $Cookies } from "utils/cookies";
import { JWT_TOKEN } from "utils/constants";
import Globals from "utils/globals";

const { Header, Footer, Content, Sider } = Layout;
const AuthorizedLayout = ({
  className,
  location,
  children,
  profile,
  isAuthenticated,
  onBrowseGlobalConfig,
  onLogOut,
  appConfig,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const token = $Cookies.get(JWT_TOKEN);
  const onBrowseGlobalConfigRequest = useCallback(async () => {
    if (token) {
      const resultEntry = await ServiceBase.requestJson({
        method: "GET",
        url: "/menu/list",
        data: {},
      });
      
      // khi token hết hạn sẽ logout
      if (resultEntry.hasErrors) {
        Globals.clear();
      } else {
        onBrowseGlobalConfig(resultEntry);
      }
    }
  }, [token]);
  useEffect(() => {
    onBrowseGlobalConfigRequest();
  }, [onBrowseGlobalConfigRequest]);

  return (
    <Layout
      className={classNames({
        [className]: true,
      })}
    >
      <SideBar appConfig={appConfig} collapsed={collapsed} />
      <Layout className="site-layout">
        <TopMenu
          toggle={toggle}
          collapsed={collapsed}
          onLogOut={onLogOut}
          location={location}
        />
        <Content
          className="site-layout-background"
          style={{
            margin: "5px 16px",
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated(),
  appConfig: makeSelectAppConfig(),
});
const mapDispatchToProps = (dispatch) => ({
  onBrowseGlobalConfig: (resultEntry) =>
    dispatch(browseGlobalConfig(resultEntry)),
  onLogOut: () => dispatch(logOut()),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default styled(
  compose(
    withConnect,
    memo
  )(AuthorizedLayout)
)`
  min-height: 100vh;
  header {
    padding: 0;
    height: 80px;
    line-height: inherit;
    // position: sticky;
    // top: 0;
    // z-index: 10;
  }
  // main {
  //   min-height: calc(100vh - 56px - 200px);
  //   .main_container {
  //     padding: 0px 1rem 1rem 1rem;
  //   }
  // }
  // footer {
  //   z-index: 100;
  //   padding: 0;
  // }
`;
