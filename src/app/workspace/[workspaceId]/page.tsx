"use client";

import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";

const WorkspaceIdPage = () => {
  const workspaceId = useWorkspaceId();
  const { data } = useGetWorkspace({ id: workspaceId });

  return (
    <div className="text-lg text-rose-800 underline">
      Data : {JSON.stringify(data)}
    </div>
  );
};

export default WorkspaceIdPage;
