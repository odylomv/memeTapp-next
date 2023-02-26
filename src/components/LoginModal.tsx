import { Dialog, Transition } from '@headlessui/react';
import { signIn } from 'next-auth/react';
import Image from "next/image";
import { Fragment, useRef } from 'react';
import logo from '../../public/logo.png';

const LoginModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={() => onClose()}>
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
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center sm:mx-0 sm:h-10 sm:w-10">
                      {/* <ExclamationTriangleIcon className="h-6 w-6 text-amber-500" aria-hidden="true" /> */}
                      <Image src={logo} alt="memetapp logo" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0  sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6  text-neutral-200">
                        Join memeTapp!
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-neutral-400">
                          You must be logged in to do this action. Create an account now to not miss out on the fun!
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
                    onClick={() => signIn()}
                  >
                    Sign Up
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-transparent
                    bg-neutral-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-neutral-900
                      focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-2 sm:mt-0 sm:ml-3
                      sm:w-auto sm:text-sm"
                    ref={cancelButtonRef}
                    onClick={() => onClose()}
                  >
                    Not Now
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

export default LoginModal;
