// Hooks
import { useTitle } from '@/hooks';

const EmptyProfile = () => {
  useTitle('Perfil /X');

  return <div>Este usuario no existe</div>;
};

export default EmptyProfile;
