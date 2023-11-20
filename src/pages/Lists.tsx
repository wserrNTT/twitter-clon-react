// React
import { FC } from 'react';

// Router
import { useParams } from 'react-router-dom';

const Lists: FC = () => {
  const { id } = useParams();
  return <div>{id}'s lists</div>;
};

export default Lists;
