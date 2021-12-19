// /api/new-meetup
// POST /api/new-meetup/
import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;

    // const { title, image, address, description } = data;

    const client = await MongoClient.connect(
      'mongodb+srv://mongo-react:parola123@cluster0.spu0b.mongodb.net/meetups?retryWrites=true&w=majority'
    );
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({
      message: 'Meetup inserted!',
    });
  }
};

export default handler;

// mongo cred: mongo-react parola123
