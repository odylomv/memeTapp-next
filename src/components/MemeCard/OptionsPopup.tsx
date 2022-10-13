import { Dialog, Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import { useSession } from 'next-auth/react';
import { Fragment, useRef, useState } from 'react';
import { trpc } from '../../utils/trpc';
import { MemeCardModel } from './MemeCard';

const OptionsPopup: React.FC<{ meme: MemeCardModel }> = ({ meme }) => {
  const { data } = useSession();

  const trpcContext = trpc.useContext();
  const memeDelete = trpc.meme.deleteMeme.useMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const popupOptions = [
    { name: 'Log Debug Info', show: true, click: undefined },
    {
      name: 'Delete meme',
      show: !!data?.user && meme.authorId === data.user.id,
      click: () => setModalOpen(true),
    },
    { name: 'Report meme', show: true, click: undefined },
  ];

  return (
    <>
      <Menu as="div" className="relative ml-3">
        <div>
          <Menu.Button className="flex text-neutral-600 hover:text-neutral-400">
            <span className="sr-only">Open meme options</span>

            <EllipsisVerticalIcon className="h-6 w-6" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md 
           bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            {popupOptions.map(
              options =>
                options.show && (
                  <Menu.Item key={options.name}>
                    <button
                      className={'block w-full px-4 py-2 text-sm text-neutral-700 ui-active:bg-neutral-100'}
                      onClick={options.click}
                    >
                      {options.name}
                    </button>
                  </Menu.Item>
                )
            )}
          </Menu.Items>
        </Transition>
      </Menu>

      {/* Delete meme modal */}
      <Transition.Root show={modalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setModalOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-neutral-800 bg-opacity-90 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-xl shadow-2xl transition-all sm:w-full sm:max-w-lg">
                  <div className="bg-neutral-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-700 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon className="h-6 w-6 text-amber-500" aria-hidden="true" />
                      </div>
                      <div className="mt-3 text-center sm:mt-0  sm:ml-4 sm:text-left">
                        <Dialog.Title as="h3" className="text-lg font-medium leading-6  text-neutral-200">
                          Delete meme
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-neutral-400">
                            Are you sure you want to delete your meme? Maybe your past self was funnier. This meme is so
                            funny, I promise. You can&apos;t change your mind later.
                          </p>
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
                      onClick={() => {
                        memeDelete.mutate(
                          { id: meme.id },
                          { onSuccess: () => trpcContext.meme.getPaginated.invalidate() }
                        );

                        setModalOpen(false);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-transparent
                    bg-neutral-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-neutral-900
                      focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-2 sm:mt-0 sm:ml-3
                      sm:w-auto sm:text-sm"
                      ref={cancelButtonRef}
                      onClick={() => setModalOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default OptionsPopup;
