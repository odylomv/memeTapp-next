import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);

  const Skeleton = () => <div className="w-[120px]"></div>;

  const Switch = dynamic(() => import('./Switch'), { loading: Skeleton });

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? <Switch /> : <Skeleton />;
}
