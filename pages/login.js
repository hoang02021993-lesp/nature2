import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withIronSessionSsr } from "iron-session/next";
import LoginPage from "../containers/LoginPage";

function Admin(props) {
  return <LoginPage {...props} />;
}

Admin.propTypes = {};

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    if (user?.login) {
      return {
        redirect: {
          destination: '/assmin',
          permanent: false,
        },
      }
    }

    return {
      props: {},
    };
  },
  {
    cookieName: "myapp",
    password: "giZXcG9bzjqyWm9NU7TR1Y7tP4b0Gebg",
  }
);

export default Admin;
