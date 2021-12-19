import { MongoClient } from 'mongodb';

import { useEffect, useState } from 'react';
import Head from 'next/head';

import MeetupList from '../components/meetups/MeetupList';

// const DUMMY_MEETUPS = [
//   {
//     id: 'm1',
//     title: 'A First Meetup',
//     image:
//       'https://detectiv-bacau.ro/wp-content/uploads/2021/03/detectivi-privati-onesti.jpg',
//     address: 'Buciumului nr. 13',
//   },
//   {
//     id: 'm2',
//     title: 'Cool Meetup',
//     image:
//       'https://previews.123rf.com/images/siempreverde22/siempreverde221712/siempreverde22171231061/91753432-panorama-of-onesti-bacau-county-romania.jpg',
//     address: 'Galaxia andromeda',
//   },
//   {
//     id: 'm3',
//     title: 'The last execution',
//     image:
//       'https://www.executari.com/poze/anunturi/apartament-3-camere--64-m-onesti.jpg',
//     address: 'Barul lui Titi',
//   },
// ];

const HomePage = (props) => {
  const { meetups } = props;

  const [loadedMeetups, setLoadedMeetups] = useState([]);
  useEffect(() => {
    // send a http request and fetch data
    setLoadedMeetups(meetups);
  }, []);

  // aici primim props de la functia getStaticProps(). Functia asta se executa doar la build si codul ei nu va ajunge
  // niciodata la client. Cu ajutorul ei putem incarca diferite date dinamic pentru a popula DOM ul initial pe care
  // il trimitem la client.

  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name='description'
          content='Beautiful meetups list with memorable things.'
        />
      </Head>
      <MeetupList meetups={meetups}></MeetupList>;
    </>
  );
};

// export const getServerSideProps = async (context) => {
//   const req = context.req;
//   const res = context.res;
//   // fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// };

export const getStaticProps = async () => {
  // fetch data from an API
  const client = await MongoClient.connect(
    'mongodb+srv://mongo-react:parola123@cluster0.spu0b.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray();
  const mappedMeetups = meetups.map((m) => {
    return {
      id: m._id.toString(),
      title: m.title,
      image: m.image,
      address: m.address,
    };
  });
  client.close();

  return {
    props: {
      // this props are directly passed on this page component (). HomePage = (props). They are generated at build and remain same until the next build
      meetups: mappedMeetups, // this approach is good for pages that has data that are not changing often
    },
    revalidate: 60, // this property regenerates this page with fresh data every X seconds if the page has incoming requests.
  };
};

export default HomePage;
