import { Menu, Transition } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from "next/image";
import { Fragment } from 'react';

const popupOptions = [
  { name: 'Your Profile', click: undefined },
  { name: 'Settings', click: undefined },
  { name: 'Sign Out', click: () => signOut() },
];

const NavbarAvatar: React.FC = () => {
  const { status, data: sessionData } = useSession();

  if (status === 'loading') return <></>;

  if (!sessionData) {
    return (
      <button
        className="rounded-md px-3 py-2 text-sm font-medium text-neutral-300 hover:bg-neutral-700 hover:text-white"
        onClick={() => signIn()}
      >
        Login
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        className="rounded-full bg-neutral-800 p-1 text-neutral-400 hover:text-white focus:outline-none
         focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-800"
      >
        <span className="sr-only">View notifications</span>
        <BellIcon className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Profile dropdown */}
      <Menu as="div" className="relative ml-3">
        <div>
          <Menu.Button
            className="flex rounded-full bg-neutral-800 text-sm focus:outline-none 
              focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-800"
          >
            <span className="sr-only">Open user menu</span>
            <Image
              src={sessionData.user?.image ?? ''}
              alt="avatar"
              width={100}
              height={100}
              className="block h-8 w-8 rounded-full hover:opacity-90"
            />
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
            {popupOptions.map(options => (
              <Menu.Item key={options.name}>
                <button
                  className={'block w-full px-4 py-2 text-sm text-neutral-700 ui-active:bg-neutral-100'}
                  onClick={options.click}
                >
                  {options.name}
                </button>
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default NavbarAvatar;
