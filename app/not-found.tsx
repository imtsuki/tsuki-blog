import Image from 'next/image';

import dora from '../public/dora.svg';

const NotFound = () => {
  return (
    <Image className="mx-auto" src={dora} alt="404" width={400} />
  );
};

export default NotFound;
