"use client";

import { useEffect, useState } from "react";
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

export default function UserDashboard() {
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/user/progress");
      console.log(res);
      setTracks(res.data.tracks);
    };
    fetchData();
  }, []);

  const calculateProgress = (items: Item[]) => {
    const total = items.length;
    const completed = items.filter(
      (item) => item.progress.length > 0 && item.progress[0].status === "COMPLETED"
    ).length;
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  const handleToggle = async (
    trackId: string,
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

      setTracks((prev) =>
        prev.map((track) =>
          track.id === trackId
            ? {
                ...track,
                modules: track.modules.map((module) =>
                  module.id === moduleId
                    ? {
                        ...module,
                        items: module.items.map((item) =>
                          item.id === itemId
                            ? {
                                ...item,
                                progress: [{ status: updatedStatus }],
                              }
                            : item
                        ),
                      }
                    : module
                ),
              }
            : track
        )
      );
    } catch (err) {
      console.error("Error updating progress", err);
    }
  };

  return (
    <div className="p-6 space-y-6 min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold text-purple-400">My Dashboard</h1>

      {tracks.map((track) => (
        <div
          key={track.id}
          className="bg-zinc-900 border border-purple-700 p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-purple-300">{track.title}</h2>
          <p className="text-gray-400">{track.description}</p>

          {track.modules.map((module) => (
            <div key={module.id} className="mt-6">
              <h3 className="text-lg font-semibold text-purple-200">
                {module.title}
              </h3>

              <div className="w-full bg-zinc-700 h-3 rounded-lg my-2">
                <div
                  className="h-3 rounded-lg bg-purple-500 transition-all duration-300 ease-in-out"
                  style={{ width: `${calculateProgress(module.items)}%` }}
                ></div>
              </div>
              <p className="text-sm text-purple-400 mb-2">
                Progress: {calculateProgress(module.items)}%
              </p>

              <ul className="ml-4 space-y-2 text-sm">
                {module.items.map((item) => {
                  const status = item.progress[0]?.status;
                  return (
                    <li
                      key={item.id}
                      className="flex items-center space-x-3 bg-zinc-800 p-2 rounded-md"
                    >
                      <input
                        type="checkbox"
                        checked={status === "COMPLETED"}
                        onChange={() =>
                          handleToggle(track.id, module.id, item.id, status)
                        }
                        className="accent-purple-500 w-4 h-4"
                      />
                      <span className="text-white">{item.title}</span>
                      <span className="ml-auto text-purple-400 font-medium text-xs">
                        {status}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}