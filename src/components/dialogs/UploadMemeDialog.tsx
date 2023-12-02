import { api } from '@mtp/lib/api';
import { Upload } from 'lucide-react';
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import MockMemeCard from '../MockMemeCard';
import { useDialog } from '../providers/DialogProvider';
import { Button } from '../ui/Button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/Dialog';
import { useToast } from '../ui/use-toast';

export default function UploadMemeDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { toast } = useToast();
  const { serverError } = useDialog();

  const trpcContext = api.useContext();
  const memeUploader = api.meme.uploadMeme.useMutation();
  const memeEnabler = api.meme.enableMeme.useMutation();

  const [file, setFile] = useState<File | undefined>(undefined);

  const onUpload = () => {
    if (!file) return;

    memeUploader.mutate(undefined, {
      onSuccess: ({ memeId, uploadURL }) => {
        fetch(uploadURL, { method: 'PUT', body: file })
          .then(resp => {
            if (!resp.ok) return console.log(resp);

            memeEnabler.mutate(
              { memeId },
              {
                onSuccess: () => {
                  void trpcContext.meme.getPaginated.invalidate();
                  toast({ description: 'Meme uploaded successfully' });
                },
                onError: serverError,
              }
            );
          })
          .catch(err => console.log(err));
      },
      onError: serverError,
    });
    onClose();
    setFile(undefined);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={isOpen => {
        if (!isOpen) {
          setFile(undefined);
          onClose();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">Upload meme</DialogTitle>
          <DialogDescription>
            Drag & Drop an image below or click the area to choose a file from your computer. After previewing your
            meme, click Upload.
          </DialogDescription>
        </DialogHeader>
        {file ? (
          <>
            <Button
              variant={'secondary'}
              onClick={() => {
                setFile(undefined);
              }}
            >
              Clear Image
            </Button>
            <MockMemeCard imageUrl={URL.createObjectURL(file)} />
          </>
        ) : (
          <Dropzone
            multiple={false}
            accept={{
              'image/*': ['.jpeg', '.png'],
            }}
            onDrop={acceptedFiles => {
              setFile(acceptedFiles[0]);
              console.log('image accepted', acceptedFiles[0]);
            }}
          >
            {({ getRootProps, getInputProps, isDragAccept, isDragReject, isDragActive }) => (
              <div
                {...getRootProps()}
                className="group flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-md bg-secondary hover:bg-border"
              >
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <Upload className="h-8 w-8 group-hover:scale-110" />
                  {isDragAccept && <p className="mt-2 text-lg">Drop your meme here</p>}
                  {isDragReject && <p className="mt-2 text-xl text-destructive">Invalid file type</p>}
                  {!isDragActive && (
                    <>
                      <p className="my-2 text-center text-lg">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs">PNG/JPG images supported</p>
                    </>
                  )}
                </div>
                <input {...getInputProps()} id="dropzone-file" />
              </div>
            )}
          </Dropzone>
        )}

        {file && (
          <DialogFooter>
            <Button
              variant={'secondary'}
              onClick={() => {
                setFile(undefined);
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              variant={'destructive'}
              onClick={() => {
                onUpload();
              }}
            >
              Upload
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
