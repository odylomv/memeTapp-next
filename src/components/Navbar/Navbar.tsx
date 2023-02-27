import banner from '@assets/memeTapp_banner.png';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import NavbarAvatar from './NavbarAvatar';

const navigation = [
  { name: 'Browse', href: '/' },
  { name: 'Upload', href: '/upload' },
  { name: 'Search', href: '#' },
];

export const Navbar: React.FC<{ page: string }> = ({ page }) => {
  return (
    <Disclosure as="nav" className="sticky top-0 z-20 w-full bg-neutral-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button
                  className="inline-flex items-center justify-center rounded-md p-2 text-neutral-400
                  hover:bg-neutral-700 hover:text-white focus:outline-none
                    focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex items-center">
                  <Image className="block h-8 w-auto" src={banner} alt="memeTapp" sizes="150px" />
                  {process.env.NODE_ENV === 'development' && <span className="font-bold">DEV</span>}
                </div>

                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map(item => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={
                          'rounded-md px-3 py-2 text-sm font-medium' +
                          ' ' +
                          (item.name === page
                            ? 'bg-neutral-900 text-white'
                            : 'text-neutral-300 hover:bg-neutral-700 hover:text-white')
                        }
                        aria-current={item.name === page ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="absolute inset-y-0 right-0 flex items-center pr-2 
                  sm:static sm:inset-auto sm:ml-6 sm:pr-0"
              >
                <NavbarAvatar />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="space-y-1 px-2 pt-2 pb-3 sm:hidden">
            {navigation.map(item => (
              <Link key={item.name} href={item.href}>
                <Disclosure.Button
                  className={
                    'block rounded-md px-3 py-2 text-base font-medium' +
                    ' ' +
                    (item.name === page ? 'bg-neutral-900' : 'text-neutral-300 hover:bg-neutral-700 hover:text-white')
                  }
                  aria-current={item.name === page ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              </Link>
            ))}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
