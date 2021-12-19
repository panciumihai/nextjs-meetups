import { Fragment } from 'react';

import classes from './MeetupDetail.module.css';

const MeetupDetail = (props) => {
  const { image, title, address, description } = props;
  return (
    <section className={classes.detail}>
      <img src={image} alt={title} />
      <h1>{title}</h1>
      <p>{address}</p>
      <p>Description: {description}</p>
    </section>
  );
};

export default MeetupDetail;
