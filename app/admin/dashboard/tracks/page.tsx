'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";

type Track = {
  id: string;
  title: string;
  description: string;
  modules: {
    id: string;
    title: string;
    items: {
      id: string;
      title: string;
      link?: string;
    }[];
  }[];
};

const TracksPage = () => {
  const router = useRouter();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const res = await axios.get("/api/admin/tracks");
        setTracks(res.data.tracks);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTracks();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this track?")) {
      try {
        await axios.delete(`/api/admin/tracks/${id}`);
        setTracks(tracks.filter((track) => track.id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-purple-400 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-purple-900/20 to-transparent border-b border-purple-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-4xl font-bold text-purple-300">Learning Tracks</h1>
            <Link href="/admin/dashboard/tracks/new">
              <Button className="bg-purple-600 hover:bg-purple-500 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create New Track
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="bg-zinc-900/50 backdrop-blur-sm border border-purple-800/50 rounded-2xl shadow-xl overflow-hidden hover:border-purple-700/50 transition-colors"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-purple-300 mb-2">
                  {track.title}
                </h2>
                <p className="text-purple-200/70 mb-4 line-clamp-2">
                  {track.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-purple-400 mb-6">
                  <span>{track.modules.length} Modules</span>
                  <span>•</span>
                  <span>
                    {track.modules.reduce(
                      (acc, module) => acc + module.items.length,
                      0
                    )}{" "}
                    Items
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link href={`/admin/dashboard/tracks/edit/${track.id}`}>
                    <Button
                      variant="outline"
                      className="border-purple-800/50 text-purple-300 hover:bg-purple-900/20"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    onClick={() => handleDelete(track.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                  <Link href={`/user/dashboard/${track.title.toLowerCase()}`}>
                    <Button
                      variant="ghost"
                      className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/20"
                    >
                      <ArrowRight className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {tracks.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl text-purple-300 mb-4">No tracks found</h3>
            <p className="text-purple-200/70 mb-6">
              Create your first learning track to get started
            </p>
            <Link href="/admin/dashboard/tracks/new">
              <Button className="bg-purple-600 hover:bg-purple-500 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create New Track
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TracksPage;
