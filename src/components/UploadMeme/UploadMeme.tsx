import { ArrowUpTrayIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { trpc } from '../../utils/trpc';
import MemePreviewModal from './MemePreviewModal';

const UploadMeme = () => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const cancelModal = () => setFile(undefined);

  const memeUploader = trpc.meme.uploadMeme.useMutation();

  const onUpload = async () => {
    if (!file) return;

    setFile(undefined);
    const { uploadURL: url } = await memeUploader.mutateAsync();
    const resp = await fetch(url, { method: 'PUT', body: file });

    if (!resp.ok) console.log(resp);
  };

  return (
    <>
      <div className="flex w-full flex-col gap-4 rounded-xl bg-neutral-800 p-4 sm:w-96">
        <span className="text-2xl">Upload meme</span>
        <span className="text-md">Select an image:</span>

        <Dropzone
          multiple={false}
          accept={{
            'image/*': ['.jpeg', '.png'],
          }}
          onDrop={acceptedFiles => setFile(acceptedFiles[0])}>
          {({ getRootProps, getInputProps, isDragAccept, isDragReject, isDragActive }) => (
            <div
              {...getRootProps()}
              className="group flex h-64 w-full cursor-pointer flex-col items-center justify-center
                rounded-lg border-2 border-solid border-neutral-600 bg-neutral-700 
              hover:border-neutral-500  hover:bg-neutral-600">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <ArrowUpTrayIcon className="h-8 w-8 text-neutral-400 group-hover:scale-110" />
                {isDragAccept && <p className="text-sm text-neutral-400">Drop your meme here</p>}
                {isDragReject && <p className="text-xl text-red-400">Invalid file type</p>}
                {!isDragActive && (
                  <>
                    <p className="my-2 text-center text-lg text-neutral-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-neutral-400">PNG/JPG images supported</p>
                  </>
                )}
              </div>
              <input {...getInputProps()} id="dropzone-file" />
            </div>
          )}
        </Dropzone>
      </div>

      <MemePreviewModal file={file} cancel={cancelModal} onUpload={onUpload} />
    </>
  );
};

export default UploadMeme;
