import { withIronSessionApiRoute } from "iron-session/next";
import fs from 'fs';
import cheerio from 'cheerio';
import axios from 'axios';
import path from 'path';
import { links } from "../../lib/links";


export default withIronSessionApiRoute(
  async function dataRouter(req, res) {
    // if(!req.session.user) {
    //   return res.send('No access');
    // }
    try {
      const data = await links.get();

      return res.send({
        success: true,
        data: JSON.parse(JSON.stringify(data)),
      });

    } catch(e) {
      return res.send({
        success: false,
        message: e.toString()
      });
    }

  },
  {
    cookieName: "myapp",
    password: "giZXcG9bzjqyWm9NU7TR1Y7tP4b0Gebg",
  },
);

