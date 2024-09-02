interface WorkspaceIdPageProps {
  params: {
    workspaceId: string;
  };
}

const WorkspaceIdPage = ({ params }: WorkspaceIdPageProps) => {
  return (
    <div className="text-3xl text-rose-800 underline">
      ID : {params.workspaceId}
    </div>
  );
};

export default WorkspaceIdPage;
