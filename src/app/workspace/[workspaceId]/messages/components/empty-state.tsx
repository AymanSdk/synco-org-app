import { UsersIcon } from 'lucide-react';

export const EmptyState = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <UsersIcon className="h-10 w-10 text-muted-foreground" />
      <p className="mt-2 text-sm text-muted-foreground">
        No members to message
      </p>
    </div>
  );
};
