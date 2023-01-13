import { withIronSessionApiRoute } from "iron-session/next";
import fs from 'fs';
import cheerio from 'cheerio';
import axios from 'axios';
import path from 'path';

import clientPromise from "../../lib/mongodb";
import { links } from "../../lib/links";

export default withIronSessionApiRoute(
  async function linksRouter(req, res) {
    if(!req.session.user) {
      return res.send('No access');
    }
    try {
      const { url } = req.body;
      const request = await axios.get(url);
      const {data} = request;

      const $ = cheerio.load(data);
      const title = $('title').text();
      let image = $('meta[name="og:image"]').attr('content');
      let imageBackup = $('meta[property="og:image"]').attr('content');
      image = image || imageBackup;


      if(!title) {
        throw new Error('Không có title');
      }

      if(!image) {
        throw new Error('Không có image');
      }

      if(!isValidHttpUrl(image)) {
        const endpointURL = new URL(url);
        const path = image.indexOf('/') === 0 ? image : `/${image}`;
        image = `${endpointURL.origin}${path}`;
      }

      // const imageFile = await uploadFromUrl(image);
      const slug = string_to_slug(`${Date.now()} ${title}`);


      await links.add({
        title,
        image,
        // path: imageFile,
        slug,
        description: "...",
        endpoint: url,
        createdAt: new Date()
      });

      return res.send({
        success: true,
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

function isValidHttpUrl(string) {
  let url;
  
  try {
    url = new URL(string);
  } catch (_) {
    return false;  
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function uploadFromUrl (url) {
  const fileName = path.parse(url).base;
  // const filePath = path.join(__dirname, `../../public/uploads/${fileName}`);
  const filePath = `/uploads/${Date.now()}.${fileName}`;
  const filePathSave = `public${filePath}`;
  console.log('save', filePathSave);
  
  return axios({
    url,
    responseType: 'stream',
  }).then(
    (response) =>
      new Promise((resolve, reject) => {
        response.data
          .pipe(fs.createWriteStream(filePathSave))
          .on('finish', () => resolve(filePath))
          .on('error', (e) => {
            console.error(e);
            reject(new Error('cannot upload image'));
          });
      }),
  );
};

function string_to_slug (str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to   = "aaaaeeeeiiiioooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

  return str;
}