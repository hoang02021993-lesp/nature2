import clientPromise from "./mongodb";

export const links = {
  add: (payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        const client = await clientPromise;
        const db = client.db("sample_mflix");

        const dataSave = {
          ...payload,
          site: process.env.SITE
        };

        const data = await db.collection('links').insert(dataSave);
        resolve(data);
      } catch(e) {
        reject(e);
      }
    });
  },
  get: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const client = await clientPromise;
        const db = client.db("sample_mflix");

        const data = await db.collection('links').find({
          site: process.env.SITE
        }).sort({createdAt: -1}).toArray();
        resolve(data);
      } catch(e) {
        reject(e);
      }
    });
  },
  getBySlug: (slug) => {
    return new Promise(async (resolve, reject) => {
      try {
        const client = await clientPromise;
        const db = client.db("sample_mflix");

        const data = await db.collection('links').findOne({slug});
        resolve(data);
      } catch(e) {
        reject(e);
      }
    });
  }
};
