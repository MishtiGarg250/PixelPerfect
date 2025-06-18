'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import Link from "next/link";
import { PlusCircle } from 'lucide-react';
import { deleteTrack } from '@/actions/delete-track';
import { useTransition } from 'react';

type RoadmapItem = {
  id?: string;
  title: string;
  link?: string;
};

type Module = {
  id?: string;
  title: string;
  items: RoadmapItem[];
};

type Track = {
  id?: string;
  title: string;
  description: string;
  modules: Module[];
};

const AdminDashboard = () => {
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    const res = await axios.get('/api/admin/tracks');
    setTracks(res.data.tracks);
    console.log(tracks);
  };


  const handleEdit = async (trackData:{
    id:string;
    title:string;
    description:string;
    modules:{
      title:string;
      items:{title:string; link?:string}[];
    }[];
  }) => {
    try {
      // Placeholder for future edit logic
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-12 px-4 bg-black min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
        <Link href={"tracks/create"}>
          <Button
            variant="default"
            className="gap-2 bg-[#b5b5f6] text-black hover:bg-[#f7bff4]"
          >
            <PlusCircle className="h-4 w-4" />
            Add new Track
          </Button>
        </Link>
      </div>

      <h2 className="text-xl font-semibold mb-4">All Tracks</h2>
      {tracks.map((track) => (
        <div
          key={track.id}
          className="border border-purple-700 p-4 mb-6 rounded-lg bg-purple-900/10 shadow-md"
        >
          <h3 className="text-xl font-bold text-purple-300">{track.title}</h3>
          <p className="mb-3 text-purple-400">{track.description}</p>

          {track.modules.map((mod) => (
            <div key={mod.id} className="ml-4 mb-4">
              <p className="font-semibold text-purple-300">{mod.title}</p>
              <ul className="list-disc list-inside ml-4 text-sm text-purple-400">
                {mod.items.map((item) => (
                  <li key={item.id}>
                    {item.title}
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-300 underline ml-1 hover:text-purple-100"
                      >
                        ↗
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex gap-3 mt-4">
            <DeleteButton
              trackId={track.id}
            />
              
            <Link href="tracks/edit">
            <Button
              variant="outline"
              onClick={() => handleEdit({id:track.id!,title:track.title!,description:track.description|| "",modules:track.modules|| []})}
              className="border-purple-500 text-purple-300 hover:text-purple-100 hover:border-purple-300 text-sm"
            >
              Edit Track
            </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;type DeleteButtonProps={
  trackId:string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ trackId }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={() =>
        startTransition(async () => {
          await deleteTrack(trackId);
        })
      }
    >
      <Button className="bg-white text-purple-600" disabled={isPending} variant="ghost" size="sm" type="submit">
        {isPending ? "Deleting..." : "Delete"}
      </Button>
    </form>
  );
};

