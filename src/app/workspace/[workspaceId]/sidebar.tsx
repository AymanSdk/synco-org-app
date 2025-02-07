import { UserButton } from '@/features/auth/components/user-button';
import {
  BellIcon,
  BookOpen,
  Calendar,
  Home,
  LogOutIcon,
  MessagesSquareIcon,
  MoreHorizontal,
  Settings,
} from 'lucide-react';
import { SidebarButton } from './sidebar-button';
import { WorkspaceSwitcher } from './workspace-switcher';

import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { useAuthActions } from '@convex-dev/auth/react';

import Link from 'next/link';

export const Sidebar = () => {
  const workspaceId = useWorkspaceId();
  const pathname = usePathname();
  const { signOut } = useAuthActions();

  return (
    <aside className="flex h-full w-[70px] flex-col items-center gap-y-4 bg-[#213555] pb-4 pt-[9px]">
      <WorkspaceSwitcher />
      {/* TODO : Change the logic for pathname to make Home Icon Disabled */}
      <SidebarButton
        icon={Home}
        label="Home"
        isActive={pathname.includes('/workspace')}
      />
      <Link href={`/workspace/${workspaceId}/messages`}>
        <SidebarButton
          icon={MessagesSquareIcon}
          label="Messages"
          isActive={pathname.includes('/messages')}
        />
      </Link>
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
