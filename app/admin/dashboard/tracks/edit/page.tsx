'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

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

const EditTrackPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [track, setTrack] = useState<Track>({
    title: "",
    description: "",
    modules: [],
  });

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const res = await axios.get(`/api/admin/tracks/${id}`);
        setTrack(res.data.track);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTrack();
  }, [id]);

  const handleTrackChange = (field: keyof Track, value: any) => {
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

  const handleSubmit = async () => {
    try {
      await axios.put(`/api/admin/tracks/${id}`, track);
      router.push("/admin-dashboard"); // Or wherever your dashboard is
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-8">Edit Track</h1>

      <div className="border p-6 rounded-2xl border-white/20">
        <input
          type="text"
          placeholder="Track Title"
          value={track.title}
          onChange={(e) => handleTrackChange("title", e.target.value)}
          className="block border-white/20 text-white w-full mb-4 p-2 border rounded-lg"
        />
        <textarea
          placeholder="Track Description"
          value={track.description}
          onChange={(e) => handleTrackChange("description", e.target.value)}
          className="block border-white/20 text-white w-full mb-4 p-2 border rounded-lg"
        />

        {track.modules.map((module, mIndex) => (
          <div key={mIndex} className="mb-6 p-4 border rounded border-purple-200">
            <input
              type="text"
              placeholder="Module Title"
              value={module.title}
              onChange={(e) => handleModuleChange(mIndex, e.target.value)}
              className="border-purple-300 text-purple-200 block w-full mb-2 p-2 border rounded"
            />
            {module.items.map((item, iIndex) => (
              <div key={iIndex} className="flex gap-4 mb-2">
                <input
                  type="text"
                  placeholder="Item Title"
                  value={item.title}
                  onChange={(e) =>
                    handleItemChange(mIndex, iIndex, "title", e.target.value)
                  }
                  className="flex-1 p-2 border border-purple-300 rounded text-purple-300"
                />
                <input
                  type="text"
                  placeholder="Item Link"
                  value={item.link || ""}
                  onChange={(e) =>
                    handleItemChange(mIndex, iIndex, "link", e.target.value)
                  }
                  className="flex-1 p-2 border border-purple-300 rounded text-purple-300"
                />
              </div>
            ))}
            <button
              onClick={() => handleAddItem(mIndex)}
              className="text-sm mt-2 bg-[#b5b5f6] text-black px-3 py-1 rounded-lg hover:bg-[#f7bff4]"
            >
              + Add Item
            </button>
          </div>
        ))}

        <div className="flex justify-end gap-3 mt-4">
          <Button
            onClick={handleAddModule}
            className="border-[#b5b5f6] border-2 text-[#b5b5f6] px-4 py-2 rounded-lg hover:bg-[#f7bff4] hover:text-black"
          >
            + Add Module
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-[#b5b5f6] text-black px-4 py-2 rounded-lg hover:bg-[#f7bff4]"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditTrackPage;
