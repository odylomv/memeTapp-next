import { NextPage } from 'next';
import Head from 'next/head';
import { Navbar } from '../components/Navbar';
import UploadMeme from '../components/UploadMeme';

const Upload: NextPage = () => {
  return (
    <>
      <Head>
        <title>Upload | memeTapp</title>
        <meta name="description" content="memeTapp is a Meme social media platform" />
        <link rel="icon" href="favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center bg-neutral-900 text-gray-100">
        <Navbar page="Upload" />

        <div className="flex w-full max-w-7xl flex-1 flex-col items-center justify-center p-4">
          <UploadMeme />
        </div>
      </main>
    </>
  );
};

export default Upload;
