"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

type ProgressStatus = "COMPLETED" | "IN_PROGRESS" | "NOT_STARTED";

type Item = {
  id: string;
  title: string;
  progress: { status: ProgressStatus }[];
};

type Module = {
  id: string;
  title: string;
  items: Item[];
};

type Track = {
  id: string;
  title: string;
  description: string;
  modules: Module[];
};

export default function TrackPage() {
  const [track, setTrack] = useState<Track | null>(null);
  const params = useParams(); // dynamic route param like "android", "web", etc.
  const [title,setTitle] = useState("");

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const res = await axios.get("/api/user/progress");
        console.log(res)
        const allTracks: Track[] = res.data.tracks;
        console.log(allTracks[0].title);
        console.log(params.track)

        const selectedTrack = allTracks.find(
          (t) => t.title.toLowerCase() === (params.track as string).toLowerCase()
        );
        console.log(selectedTrack)
        setTrack(selectedTrack || null);
      } catch (err) {
        console.error("Failed to fetch progress", err);
      }
    };

    fetchTrack();
  }, [params.track]);

  const calculateProgress = (items: Item[]) => {
    const total = items.length;
    const completed = items.filter(
      (item) => item.progress.length > 0 && item.progress[0].status === "COMPLETED"
    ).length;
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

 
  const setReadableTitle = (trackTitle: string) => {
    if (trackTitle.toLowerCase() === "web") {
      setTitle("Web Development");
    } else if (trackTitle.toLowerCase() === "android") {
      setTitle("Android Development");
    } else {
      setTitle("Competitive Programming");
    }
  };

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const res = await axios.get("/api/user/progress");
        const allTracks: Track[] = res.data.tracks;

        const selectedTrack = allTracks.find(
          (t) => t.title.toLowerCase() === (params.track as string).toLowerCase()
        );

        if (selectedTrack) {
          setTrack(selectedTrack);
          setReadableTitle(selectedTrack.title); // ✅ set the title here
        } else {
          setTrack(null);
        }
      } catch (err) {
        console.error("Failed to fetch progress", err);
      }
    };
    fetchTrack();
},[params.track]);
const handleToggle = async (
    moduleId: string,
    itemId: string,
    currentStatus: ProgressStatus
  ) => {
    const updatedStatus = currentStatus === "COMPLETED" ? "NOT_STARTED" : "COMPLETED";

    try {
      await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, status: updatedStatus }),
      });

      if (track) {
        setTrack({
          ...track,
          modules: track.modules.map((module) =>
            module.id === moduleId
              ? {
                  ...module,
                  items: module.items.map((item) =>
                    item.id === itemId
                      ? { ...item, progress: [{ status: updatedStatus }] }
                      : item
                  ),
                }
              : module
          ),
        });
      }
    } catch (err) {
      console.error("Error updating progress", err);
    }
  };


  

  if (!track) return <div className="text-center text-white mt-20">Loading...</div>;

  return (
    <div className="p-6 min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold text-purple-400 mb-6">{title}</h1>
      <p className="text-purple-300 mb-8">{track.description}</p>

      {track.modules.map((module) => (
        <div
          key={module.id}
          className="bg-zinc-900 border border-purple-700 p-6 rounded-xl shadow-lg mb-6"
        >
          <h2 className="text-xl font-semibold text-purple-300">{module.title}</h2>

          <div className="w-full bg-zinc-700 h-3 rounded-lg my-2">
            <div
              className="h-3 rounded-lg bg-purple-500 transition-all duration-300 ease-in-out"
              style={{ width: `${calculateProgress(module.items)}%` }}
            ></div>
          </div>
          <p className="text-sm text-purple-400 mb-3">
            Progress: {calculateProgress(module.items)}%
          </p>

          <ul className="space-y-2">
            {module.items.map((item) => {
              const status = item.progress[0]?.status || "NOT_STARTED";
              return (
                <li
                  key={item.id}
                  className="flex items-center space-x-3 bg-zinc-800 p-2 rounded-md"
                >
                  <input
                    type="checkbox"
                    checked={status === "COMPLETED"}
                    onChange={() =>
                      handleToggle(module.id, item.id, status)
                    }
                    className="accent-purple-500 w-4 h-4"
                  />
                  <span>{item.title}</span>
                  <span className="ml-auto text-purple-400 text-xs">{status}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
