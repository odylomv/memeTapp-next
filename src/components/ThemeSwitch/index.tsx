import { useEffect, useState } from 'react';
import Switch from './Switch';

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);

  const Skeleton = () => <div className="w-[120px]"></div>;

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? <Switch /> : <Skeleton />;
}
