'use client';

import { Menu } from 'lucide-react';
import { useState } from 'react';
import NavDropdown from './dropdowns/NavDropdown';
import { Button } from './ui/Button';

export function MobileNavbarMenu() {
  const [dropdown, setDropdown] = useState(false);

  const MenuButton = () => (
    <Button variant={'ghost'} aria-label="Navigation menu" onClick={() => setDropdown(true)}>
      <Menu className="text-muted-foreground" />
    </Button>
  );

  return dropdown ? <NavDropdown open={dropdown} onClose={() => setDropdown(false)} /> : <MenuButton />;
}
