import NavbarLayout from '@mtp/components/NavbarLayout';
import UploadMeme from '@mtp/components/UploadMeme/UploadMeme';

export default function upload() {
  return (
    <NavbarLayout currentLink="Upload">
      <div className="flex h-full items-center justify-center">
        <UploadMeme />
      </div>
    </NavbarLayout>
  );
}
