'use client'

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Save, Trash2 } from "lucide-react";
import Link from "next/link";

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

const NewTrackPage = () => {
  const router = useRouter();
  const [track, setTrack] = useState<Track>({
    title: "",
    description: "",
    modules: [],
  });

  const handleTrackChange = (field: keyof Track, value: string) => {
    setTrack({ ...track, [field]: value });
  };

  const handleModuleChange = (index: number, value: string) => {
    const updatedModules = [...track.modules];
    updatedModules[index].title = value;
    setTrack({ ...track, modules: updatedModules });
  };

  const handleAddModule = () => {
    setTrack({
      ...track,
      modules: [...track.modules, { title: "", items: [] }],
    });
  };

  const handleAddItem = (moduleIndex: number) => {
    const updatedModules = [...track.modules];
    updatedModules[moduleIndex].items.push({ title: "", link: "" });
    setTrack({ ...track, modules: updatedModules });
  };

  const handleItemChange = (
    moduleIndex: number,
    itemIndex: number,
    field: keyof RoadmapItem,
    value: string
  ) => {
    const updatedModules = [...track.modules];
    updatedModules[moduleIndex].items[itemIndex][field] = value;
    setTrack({ ...track, modules: updatedModules });
  };

  const handleRemoveItem = (moduleIndex: number, itemIndex: number) => {
    const updatedModules = [...track.modules];
    updatedModules[moduleIndex].items.splice(itemIndex, 1);
    setTrack({ ...track, modules: updatedModules });
  };

  const handleRemoveModule = (moduleIndex: number) => {
    const updatedModules = [...track.modules];
    updatedModules.splice(moduleIndex, 1);
    setTrack({ ...track, modules: updatedModules });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("/api/admin/tracks", track);
      router.push("/admin/dashboard/tracks");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-purple-900/20 to-transparent border-b border-purple-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/admin/dashboard/tracks">
              <Button variant="ghost" className="text-purple-400 hover:text-purple-300">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Tracks
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-purple-300 mb-4">Create New Track</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Track Details */}
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-purple-800/50 rounded-2xl shadow-xl p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">
                  Track Title
                </label>
                <input
                  type="text"
                  value={track.title}
                  onChange={(e) => handleTrackChange("title", e.target.value)}
                  className="w-full bg-zinc-800/50 border border-purple-800/50 rounded-lg px-4 py-2 text-white placeholder-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter track title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">
                  Description
                </label>
                <textarea
                  value={track.description}
                  onChange={(e) => handleTrackChange("description", e.target.value)}
                  className="w-full bg-zinc-800/50 border border-purple-800/50 rounded-lg px-4 py-2 text-white placeholder-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all min-h-[100px]"
                  placeholder="Enter track description"
                />
              </div>
            </div>
          </div>

          {/* Modules */}
          <div className="space-y-6">
            {track.modules.map((module, mIndex) => (
              <div
                key={mIndex}
                className="bg-zinc-900/50 backdrop-blur-sm border border-purple-800/50 rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="p-6 border-b border-purple-800/50">
                  <div className="flex items-center justify-between gap-4">
                    <input
                      type="text"
                      value={module.title}
                      onChange={(e) => handleModuleChange(mIndex, e.target.value)}
                      className="flex-1 bg-zinc-800/50 border border-purple-800/50 rounded-lg px-4 py-2 text-white placeholder-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Module Title"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                      onClick={() => handleRemoveModule(mIndex)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {module.items.map((item, iIndex) => (
                    <div
                      key={iIndex}
                      className="flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-zinc-800/30 p-4 rounded-lg"
                    >
                      <div className="flex-1 space-y-4 sm:space-y-0 sm:flex sm:gap-4">
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) =>
                            handleItemChange(mIndex, iIndex, "title", e.target.value)
                          }
                          className="flex-1 bg-zinc-800/50 border border-purple-800/50 rounded-lg px-4 py-2 text-white placeholder-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          placeholder="Item Title"
                        />
                        <input
                          type="text"
                          value={item.link || ""}
                          onChange={(e) =>
                            handleItemChange(mIndex, iIndex, "link", e.target.value)
                          }
                          className="flex-1 bg-zinc-800/50 border border-purple-800/50 rounded-lg px-4 py-2 text-white placeholder-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          placeholder="Item Link (optional)"
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                        onClick={() => handleRemoveItem(mIndex, iIndex)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  ))}

                  <Button
                    onClick={() => handleAddItem(mIndex)}
                    className="w-full sm:w-auto bg-purple-900/50 hover:bg-purple-900 text-purple-300 border border-purple-800/50"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>
              </div>
            ))}

            <Button
              onClick={handleAddModule}
              className="w-full bg-purple-900/50 hover:bg-purple-900 text-purple-300 border border-purple-800/50"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Module
            </Button>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg transition-colors"
            >
              <Save className="h-4 w-4 mr-2" />
              Create Track
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTrackPage; 