import { format } from 'date-fns';

interface ChannelHeroProps {
  name: string;
  creationTime: number; // TODO: ! check if this give an error change type to number
}

export const ChannelHero = ({ name, creationTime }: ChannelHeroProps) => {
  return (
    <div className="mx-5 mb-4 mt-[88px]">
      <p className="mb-2 flex items-center text-2xl font-bold"># {name}</p>
      <p className="mb-4 font-normal text-slate-800">
        This channel was created on {format(creationTime, 'MMMM do, yyyy')}.
        This is the very beginning of the <strong>{name}</strong> channel.
      </p>
    </div>
  );
};
