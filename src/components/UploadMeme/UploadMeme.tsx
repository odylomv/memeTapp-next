import { ArrowUpTrayIcon } from '@heroicons/react/20/solid';
import { api } from '@mtp/lib/api';
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { useServerError } from '../ServerErrorContext';
import MemePreviewModal from './MemePreviewModal';

const UploadMeme = () => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { onServerError } = useServerError();

  const memeUploader = api.meme.uploadMeme.useMutation();
  const memeEnabler = api.meme.enableMeme.useMutation();

  const imageURL = file ? URL.createObjectURL(file) : '';
  const cancelModal = () => setModalOpen(false);

  const onUpload = () => {
    if (!file) return;

    setFile(undefined);
    setModalOpen(false);
    memeUploader.mutate(undefined, {
      onSuccess: ({ memeId, uploadURL }) => {
        fetch(uploadURL, { method: 'PUT', body: file })
          .then(resp => {
            if (!resp.ok) return console.log(resp);

            memeEnabler.mutate({ memeId }, { onError: onServerError });
          })
          .catch(err => console.log(err));
      },
      onError: onServerError,
    });
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
          onDrop={acceptedFiles => {
            setFile(acceptedFiles[0]);
            setModalOpen(true);
          }}
        >
          {({ getRootProps, getInputProps, isDragAccept, isDragReject, isDragActive }) => (
            <div
              {...getRootProps()}
              className="group flex h-64 w-full cursor-pointer flex-col items-center justify-center
                rounded-lg border-2 border-solid border-neutral-600 bg-neutral-700 
              hover:border-neutral-500  hover:bg-neutral-600"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
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

      <MemePreviewModal open={modalOpen} imageURL={imageURL} cancel={cancelModal} onUpload={onUpload} />
    </>
  );
};

export default UploadMeme;
