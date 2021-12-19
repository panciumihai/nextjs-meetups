// our-domain.com/new-meetup
import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import Head from 'next/head';

const NewMeetupPage = () => {
  const router = useRouter();

  const addMeetupHandler = async (enteredMeetupData) => {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    console.log(data);
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>Add your meetup</title>
        <meta
          name='description'
          content='This form is perfect to add your next meetups.'
        ></meta>
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler}></NewMeetupForm>
    </>
  );
};

export default NewMeetupPage;
