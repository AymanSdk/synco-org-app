import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { Id } from '../../../../convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';

const userItemVariants = cva(
  'flex items-center gap-1.5 justify-start font-normal h-7 px-4 text-sm overflow-hidden',
  {
    variants: {
      variant: {
        default: 'text-[#f9edffcc]',
        active: 'text-[#213555] bg-white/90 hover:bg-white/90',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface UserItemProps {
  id: Id<'members'>;
  label?: string;
  image?: string;
  variant?: VariantProps<typeof userItemVariants>['variant'];
}

export const UserItem = ({
  id,
  label = 'member',
  image,
  variant,
}: UserItemProps) => {
  const workspaceId = useWorkspaceId();
  const avatarFallback = label.charAt(0).toUpperCase();

  return (
    <Button
      variant="transparent"
      className={cn(userItemVariants({ variant: variant }))}
      size="sm"
      asChild
    >
      <Link href={`/workspace/${workspaceId}/member/${id}`}>
        <Avatar className="mr-1 size-5 rounded-md">
          <AvatarImage className="rounded-md" src={image} />
          <AvatarFallback className="bg-sky-500 rounded-md text-xs text-white">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
        <span className="truncate text-sm">{label}</span>
      </Link>
    </Button>
  );
};
