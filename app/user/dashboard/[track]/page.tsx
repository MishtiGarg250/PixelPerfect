"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useUser, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";

type ProgressStatus = "COMPLETED" | "IN_PROGRESS" | "NOT_STARTED";

type Item = {
  id: string;
  title: string;
  link?: string;
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
  const params = useParams();
  const [title, setTitle] = useState("");
  const { isSignedIn, isLoaded } = useUser();

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

  const fetchTrack = async () => {
    try {
      const res = await axios.get("/api/user/progress");
      const allTracks: Track[] = res.data.tracks;

      const selectedTrack = allTracks.find(
        (t) => t.title.toLowerCase() === (params.track as string).toLowerCase()
      );

      if (selectedTrack) {
        setTrack(selectedTrack);
        setReadableTitle(selectedTrack.title);
      } else {
        setTrack(null);
      }
    } catch (err) {
      console.error("Failed to fetch progress", err);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      fetchTrack();
    }
  }, [params.track, isLoaded]);

  const handleToggle = async (
    moduleId: string,
    itemId: string,
    currentStatus: ProgressStatus
  ) => {
    if (!isSignedIn) {
      return (
        <SignInButton mode="modal">
          <button className="text-sm text-purple-400 hover:underline">
            Sign in to save progress
          </button>
        </SignInButton>
      );
    }

    const updatedStatus = currentStatus === "COMPLETED" ? "NOT_STARTED" : "COMPLETED";

    try {
      const response = await fetch("/api/user/update-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, status: updatedStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update progress");
      }

      await fetchTrack();
    } catch (err) {
      console.error("Error updating progress", err);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[#b5b5f6] 400 text-xl">Loading...</div>
      </div>
    );
  }

  if (!track) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[#b5b5f6] text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <div className="bg-gradient-to-l from-[#b5b5f6] to-[#f7bff4] text-white border-b border-[#b5b5f6] max-w-full rounded-r-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/user/dashboard">
              <Button variant="ghost" className="text-purple-400 hover:text-purple-300">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-white">{title}</h1>
          <p className="text-purple-200/80 text-lg max-w-3xl">{track.description}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {track.modules.map((module) => (
            <div
              key={module.id}
              className="bg-zinc-900/50 backdrop-blur-sm border border-[#b5b5f6] rounded-2xl shadow-xl overflow-hidden transition-all duration-300"
            >
              <div className="p-6 border-b border-[#b5b5f6]">
                <h2 className="text-2xl font-semibold text-purple-300 mb-4">{module.title}</h2>
                
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] transition-all duration-500 ease-out"
                      style={{ width: `${calculateProgress(module.items)}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-[#f7bff4] min-w-[60px]">
                    {calculateProgress(module.items)}%
                  </span>
                </div>
              </div>

              <ul className="divide-y divide-[#b5b5f6">
                {module.items.map((item) => {
                  const status = item.progress?.[0]?.status || "NOT_STARTED";
                  return (
                    <li
                      key={item.id}
                      className="group  transition-colors duration-200"
                    >
                      <div className="p-4 sm:p-6">
                        <div className="flex items-start gap-4">
                          <button
                            onClick={() => handleToggle(module.id, item.id, status)}
                            className="mt-1 flex-shrink-0"
                          >
                            {status === "COMPLETED" ? (
                              <CheckCircle2 className="h-5 w-5 text-[#f7bff4]" />
                            ) : (
                              <Circle className="h-5 w-5 text-[#f7bff4] group-hover:text-purple-400" />
                            )}
                          </button>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-purple-100 font-medium">{item.title}</span>
                              <span className="text-xs font-medium px-2 py-1 rounded-full border-[#b5b5f6] border-1 text-[#b5b5f6]">
                                {status}
                              </span>
                            </div>

                            {item.link && (
                              <Link 
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 inline-flex items-center text-sm text-white hover:text-[#b5b5f6] transition-colors"
                              >
                                <span className="truncate">↳ {item.link}</span>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
