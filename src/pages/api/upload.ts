import { NextApiRequest, NextApiResponse } from 'next';
import { getServerAuthSession } from '../../server/common/get-server-auth-session';

const upload = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  if (session) {
    // TODO: Store files somewhere :(
  } else {
    res.send({
      error: 'You must be signed in to upload files.',
    });
  }
};

export default upload;
