'use client'
import { useEffect, useState } from "react";
import axios from 'axios'
import { Button } from "@/components/ui/button";

type RoadmapItem = {
    id?: string;
    title: string;
    link?: string;
}

type Module = {
    id?: string;
    title: string;
    items: RoadmapItem[];
}

type Track = {
    id?: string;
    title: string;
    description: string;
    modules: Module[];
}

const AdminDashboardForm = () => {

    const [tracks, setTracks] = useState<Track[]>([]);
    const [newTrack, setNewTrack] = useState<Track>({
        title: '',
        description: '',
        modules: [],
    });

    useEffect(() => {
        fetchTracks();
    }, []);

    const fetchTracks = async () => {
        const res = await axios.get('/api/admin/tracks');

        setTracks(res.data.tracks);
        console.log(tracks)
    };

    const handleTrackChange = (field: keyof Track, value: any) => {
        setNewTrack({ ...newTrack, [field]: value });
    };

    const handleAddModule = () => {
        setNewTrack({
            ...newTrack,
            modules: [...newTrack.modules, { title: '', items: [] }],
        });
    };

    const handleModuleChange = (index: number, value: string) => {
        const updatedModules = [...newTrack.modules];
        updatedModules[index].title = value;
        setNewTrack({ ...newTrack, modules: updatedModules });
    };

    const handleAddItem = (moduleIndex: number) => {
        const updatedModules = [...newTrack.modules];
        updatedModules[moduleIndex].items.push({ title: '', link: '' });
        setNewTrack({ ...newTrack, modules: updatedModules });
    };

    const handleItemChange = (moduleIndex: number, itemIndex: number, field: keyof RoadmapItem, value: string) => {
        const updatedModules = [...newTrack.modules];
        updatedModules[moduleIndex].items[itemIndex][field] = value;
        setNewTrack({ ...newTrack, modules: updatedModules });
    };

    const handleSubmit = async () => {
        try {
            const res = await axios.post('/api/admin/tracks', newTrack);
            setNewTrack({ title: '', description: '', modules: [] });
            fetchTracks();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        


        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-white">Create New Track</h1>

            <div className="mb-12 border ml-[-8px] p-6 rounded-2xl shadow-md bg-transparent  border-white/20">
                <h2 className="text-xl font-semibold mb-6 mt-[-6px] text-white">Add New Track</h2>
                <input
                    type="text"
                    placeholder="Track Title"
                    value={newTrack.title}
                    onChange={(e) => handleTrackChange('title', e.target.value)}
                    className="block border-white/20 text-white w-full mb-4 p-2 border rounded-lg"
                />
                <textarea
                    placeholder="Track Description"
                    value={newTrack.description}
                    onChange={(e) => handleTrackChange('description', e.target.value)}
                    className="block border-white/20 text-white w-full mb-4 p-2 border rounded-lg"
                />

                {newTrack.modules.map((module, mIndex) => (
                    <div key={mIndex} className="mb-6 p-4 border rounded border-purple-200">
                        <input
                            type="text"
                            placeholder="Module Title"
                            value={module.title}
                            onChange={(e) => handleModuleChange(mIndex, e.target.value)}
                            className="border-purple-300 text-purple-200 block w-full mb-2 p-2 border  rounded"
                        />
                        {module.items.map((item, iIndex) => (
                            <div key={iIndex} className="flex gap-4 mb-2 border-purple-200">
                                <input
                                    type="text"
                                    placeholder="Item Title"
                                    value={item.title}
                                    onChange={(e) =>
                                        handleItemChange(mIndex, iIndex, 'title', e.target.value)
                                    }
                                    className="flex-1 p-2 border border-purple-300 rounded text-purple-300"
                                />
                                <input
                                    type="text"
                                    placeholder="Item Link"
                                    value={item.link || ''}
                                    onChange={(e) =>
                                        handleItemChange(mIndex, iIndex, 'link', e.target.value)
                                    }
                                    className="flex-1 p-2 border border-purple-300 rounded text-purple-300"
                                />
                            </div>
                        ))}
                        <button
                            onClick={() => handleAddItem(mIndex)}
                            className="text-sm mt-2 bg-[#b5b5f6] text-black px-3 py-1 rounded-lg hover:bg-[#f7bff4]">
                            + Add Item
                        </button>
                    </div>
                ))}
                <div className="flex w-full justify-end">
                <Button
                    onClick={handleAddModule}
                    className="border-[#b5b5f6] border-2 mt-2 text-[#b5b5f6] px-4 py-2 rounded-lg hover:bg-[#f7bff4] hover:text-black hover:border-[#f7bff4]"
                >
                    + Add Module
                </Button>


                <Button
                    onClick={handleSubmit}
                    className="bg-[#b5b5f6] mt-2 text-black ml-3 px-4 py-2 rounded-lg hover:bg-[#f7bff4]"
                >
                    Submit Track
                </Button>
                </div>
            </div>
        </div>
    )

}

export default AdminDashboardForm