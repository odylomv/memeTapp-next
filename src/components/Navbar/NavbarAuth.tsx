import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { BellIcon } from '@heroicons/react/24/outline';

const NavbarAuth: React.FC = () => {
  return (
    <>
      <SignedIn>
        <button
          type="button"
          className="mr-3 rounded-full bg-neutral-800 p-1 text-neutral-400 hover:text-white
         focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-800"
        >
          <span className="sr-only">View notifications</span>
          <BellIcon className="h-6 w-6" aria-hidden="true" />
        </button>

        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="rounded-md px-3 py-2 text-sm font-medium text-neutral-300 hover:bg-neutral-700 hover:text-white">
            Login
          </button>
        </SignInButton>
      </SignedOut>
    </>
  );
};

export default NavbarAuth;
