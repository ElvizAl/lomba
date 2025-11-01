import { InputItem as InputItemType } from "@/types";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

const InputItem = ({
    id,
    item,
    updateItem,
    removeItem,
    isLastItem
}: {
    id: string;
    item: InputItemType;
    updateItem: (id: string, field: string, value: string) => void;
    removeItem?: (id: string) => void;
    isLastItem: boolean;
}) => {
    const router = useRouter();
    return (
        <div className="relative flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm border mb-3">
            <div className="flex-1 flex flex-col gap-3">
                <div className="">
                    {!isLastItem && removeItem && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                removeItem!(id);
                            }}
                            className="text-gray-400 hover:text-red-500 flex items-center gap-1"
                        >
                            <X className="w-5 h-5" />
                            <small>Hapus</small>
                        </button>
                    )}
                </div>
                <div className="relative">
                    <input
                        type="date"
                        value={item.tanggal || ''}
                        onChange={(e) => updateItem(id, 'tanggal', e.target.value)}
                        className='w-full p-2 border-b focus:outline-none focus:border-blue-500'
                    />
                </div>
                <input
                    type="text"
                    value={item.keterangan}
                    placeholder='Keterangan'
                    onChange={(e) => updateItem(id, 'keterangan', e.target.value)}
                    className='w-full p-2 border-b focus:outline-none focus:border-blue-500'
                />
                <div className="relative">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500">Rp</span>
                    <input
                        type="text"
                        value={item.nominal ? new Intl.NumberFormat('id-ID').format(Number(item.nominal)) : ''}
                        placeholder='0'
                        onChange={(e) => updateItem(id, 'nominal', e.target.value.replace(/\D/g, ''))}
                        className='w-full p-2 pl-8 border-b focus:outline-none focus:border-blue-500 text-right text-lg font-medium'
                    />
                </div>
            </div>
        </div>
    );
};

export default InputItem;
