import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
  function userRoute(req, res) {
    res.send({ user: req.session.user });
  },
  {
    cookieName: "myapp",
    password: "giZXcG9bzjqyWm9NU7TR1Y7tP4b0Gebg",
  },
);
