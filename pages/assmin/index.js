import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withIronSessionSsr } from "iron-session/next";
import AdminPage from "../../containers/AdminPage";
import { links } from "../../lib/links";

function Admin(props) {
  return <AdminPage {...props} />;
}

Admin.propTypes = {};

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    const data = await links.get();

    if (!user?.login) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    return {
      props: {
        user: user ?? null,
        data: JSON.parse(JSON.stringify(data))
      },
    };
  },
  {
    cookieName: "myapp",
    password: "giZXcG9bzjqyWm9NU7TR1Y7tP4b0Gebg",
  }
);

export default Admin;
