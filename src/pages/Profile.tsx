// React
import { FC } from 'react';

// Router
import { useParams } from 'react-router-dom';

const Profile: FC = () => {
  const { id } = useParams();
  return <div>{id}'s Profile</div>;
};

export default Profile;
