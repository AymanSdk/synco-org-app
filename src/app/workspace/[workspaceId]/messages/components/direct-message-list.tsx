import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { Doc } from '../../../../../../convex/_generated/dataModel';

interface DirectMessageListProps {
  members: Array<
    Doc<'members'> & {
      user: Doc<'users'>;
    }
  >;
}

export const DirectMessageList = ({ members }: DirectMessageListProps) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="grid gap-2">
        {members.map((member) => (
          <button
            key={member._id}
            onClick={() =>
              router.push(`/workspace/${workspaceId}/member/${member._id}`)
            }
            className="flex w-full items-center gap-x-2 rounded-md p-2 hover:bg-zinc-700/10"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={member.user.image} />
              <AvatarFallback>
                {member.user.name?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
              <div className="text-sm font-semibold">{member.user.name}</div>
              <span className="text-xs text-muted-foreground">
                {member.user.email}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
