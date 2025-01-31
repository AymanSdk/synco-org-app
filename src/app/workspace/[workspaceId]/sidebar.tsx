import { UserButton } from '@/features/auth/components/user-button';
import { WorkspaceSwitcher } from './workspace-switcher';
import { SidebarButton } from './sidebar-button';
import {
  BellIcon,
  Calendar,
  Home,
  LogOutIcon,
  MessagesSquareIcon,
  MoreHorizontal,
  Presentation,
  Settings,
  BookOpen,
} from 'lucide-react';

import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';

import { Button } from '@/components/ui/button';
import { useAuthActions } from '@convex-dev/auth/react';

import Link from 'next/link';

export const Sidebar = () => {
  const pathname = usePathname();
  const { signOut } = useAuthActions();

  return (
    <aside className="flex h-full w-[70px] flex-col items-center gap-y-4 bg-[#213555] pb-4 pt-[9px]">
      <WorkspaceSwitcher />
      <SidebarButton
        icon={Home}
        label="Home"
        isActive={pathname.includes('/workspace')}
      />
      <SidebarButton icon={MessagesSquareIcon} label="Messages" />
      <SidebarButton icon={Calendar} label="Meeting" />
      <SidebarButton icon={BellIcon} label="Activity" />
      <Link href="/api-docs">
        <SidebarButton
          icon={BookOpen}
          label="API Docs"
          isActive={pathname === '/api-docs'}
        />
      </Link>
      <SidebarButton icon={Settings} label="Settings" />
      <SidebarButton icon={MoreHorizontal} label="More" />
      <div className="mt-auto flex flex-col items-center justify-center gap-y-1">
        <UserButton />
      </div>
      <Button variant="transparent" size="icon" onClick={() => signOut()}>
        <LogOutIcon />
      </Button>
    </aside>
  );
};
