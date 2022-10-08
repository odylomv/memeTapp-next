import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef } from 'react';
import MemeCard from './MemeCard';

const MemePreviewModal: React.FC<{ file: File | undefined; cancel: () => void; onUpload: () => void }> = ({
  file,
  cancel,
  onUpload,
}) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root appear={true} show={!!file} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={cancel}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-neutral-800 bg-opacity-90 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 flex justify-center">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <Dialog.Panel className="transform overflow-hidden rounded-xl shadow-2xl transition-all sm:w-full">
                <div className="max-h-[80vh] overflow-y-scroll bg-neutral-900 p-4 sm:py-4 sm:px-14">
                  <div className="sm:flex sm:items-start">
                    <div className=" text-center sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="pb-2 text-lg font-medium leading-6 text-neutral-200">
                        Meme Preview
                      </Dialog.Title>
                      <div className="mt-2 ">
                        <MemeCard
                          meme={{
                            imageURL: file ? URL.createObjectURL(file) : undefined,
                          }}
                          mock={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-neutral-800 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-700
                      px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none 
                      focus:ring-2 focus:ring-red-800 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => onUpload()}>
                    Upload
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-transparent
                    bg-neutral-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-neutral-900
                      focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-2 sm:mt-0 sm:ml-3
                      sm:w-auto sm:text-sm"
                    ref={cancelButtonRef}
                    onClick={() => cancel()}>
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default MemePreviewModal;
