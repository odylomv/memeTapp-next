import { Moon, Sun, SunMoon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/Select';

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-[120px]"></div>;
  }

  return (
    <Select value={theme} onValueChange={newTheme => setTheme(newTheme)}>
      <SelectTrigger className="w-[120px]" aria-label="Select theme">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem className="flex items-center" value="light">
          <Sun className="mb-1 ml-1 mr-2 inline h-4 w-4" />
          Light
        </SelectItem>
        <SelectItem value="dark">
          <Moon className="mb-1 ml-1 mr-2 inline h-4 w-4" />
          Dark
        </SelectItem>
        <SelectItem value="system">
          <SunMoon className="mb-1 ml-1 mr-2 inline h-4 w-4" />
          System
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
