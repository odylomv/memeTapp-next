import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import { trpc } from '../../utils/trpc';
import { MemeCardModel } from './MemeCard';

const OptionsPopup: React.FC<{ mock: boolean; meme: Partial<MemeCardModel> }> = ({ mock, meme }) => {
  const memeDelete = trpc.meme.deleteMeme.useMutation();

  const popupOptions = [
    { name: 'Log Debug Info', click: undefined },
    {
      name: 'Delete meme',
      click: () => {
        if (!meme.id) return;

        memeDelete.mutate({ id: meme.id });
      },
    },
    { name: 'Report meme', click: undefined },
  ];

  if (mock) return <EllipsisVerticalIcon className="h-6 w-6 text-neutral-500" />;

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button
          className="flex rounded-full bg-neutral-800 hover:bg-neutral-700 focus:bg-neutral-700 
         focus:outline-none">
          <span className="sr-only">Open meme options</span>

          <EllipsisVerticalIcon className="h-6 w-6 text-neutral-500" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md 
      bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {popupOptions.map(options => (
            <Menu.Item key={options.name}>
              <button
                className={'block w-full px-4 py-2 text-sm text-neutral-700 ui-active:bg-neutral-100'}
                onClick={options.click}>
                {options.name}
              </button>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default OptionsPopup;
