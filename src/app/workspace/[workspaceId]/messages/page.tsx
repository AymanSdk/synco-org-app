'use client';

import { useGetMembers } from '@/features/members/api/use-get-members';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { Loader } from 'lucide-react';
import { DirectMessageList } from './components/direct-message-list';
import { EmptyState } from './components/empty-state';

const MessagesPage = () => {
  const workspaceId = useWorkspaceId();
  const { data: members, isLoading } = useGetMembers({ workspaceId });

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!members?.length) {
    return <EmptyState />;
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b px-6 py-3">
        <h1 className="text-xl font-semibold">Direct Messages</h1>
      </div>
      <DirectMessageList members={members} />
    </div>
  );
};

export default MessagesPage;
