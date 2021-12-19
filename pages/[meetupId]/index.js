import { MongoClient, ObjectId } from 'mongodb';

import Head from 'next/head';
import MeetupDetail from '../../components/meetups/MeetupDetail';

const MeetupDetailsPage = (props) => {
  const { image, title, address, description } = props.meetupData;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description}></meta>
      </Head>
      <MeetupDetail
        image={image}
        title={title}
        address={address}
        description={description}
      ></MeetupDetail>
    </>
  );
};

export const getStaticPaths = async () => {
  // it's used when the page needs to have multiple pre-rendered versions. Example: pre-rendered product pages
  const client = await MongoClient.connect(
    'mongodb+srv://mongo-react:parola123@cluster0.spu0b.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
};

export async function getStaticProps(context) {
  // fetch data for a single meetup
  const meetupId = context.params.meetupId;
  console.log(meetupId);

  const client = await MongoClient.connect(
    'mongodb+srv://mongo-react:parola123@cluster0.spu0b.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });

  return {
    props: {
      meetupData: {
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
      },
    },
  };
}

export default MeetupDetailsPage;
