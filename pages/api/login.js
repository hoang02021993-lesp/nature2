import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
  async function loginRoute(req, res) {
    // get user from database then:
    if(req.body.password && req.body.password === '123!@#') {
      req.session.user = {
        id: 1,
        login: true,
        foo: 'baz'
      };
      await req.session.save();
      res.send({ success: true });
    } else {
      res.send({ success: false, msg: 'Pass sai!' });
    }
  },
  {
    cookieName: "myapp",
    password: "giZXcG9bzjqyWm9NU7TR1Y7tP4b0Gebg",
  },
);
