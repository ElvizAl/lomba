import { ChevronRight } from "lucide-react";
import Link from "next/link";

const HCard = ({ menu, i }: { menu: any, i: number }) => {
    if (menu.href) {
        return (
            <Link href={menu.href} className='bg-white px-4 py-3 hover:bg-gray-100 rounded border flex items-center justify-between mb-4' key={i}>
                <div className="flex items-center">
                    <div className='bg-gray-50 rounded-full p-3'>
                        <menu.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h6 className='font-semibold text-sm ml-2'>{menu.name}</h6>
                        {menu.description && <p className='text-xs text-gray-500 ml-2'>{menu.description}</p>}
                    </div>
                </div>
                <ChevronRight className="w-6 h-6" />
            </Link>
        )
    }
    return (
        <button onClick={() => menu.action()} className='bg-white px-4 py-3 hover:bg-gray-100 rounded border flex items-center justify-between mb-4' key={i}>
            <div className="flex items-center">
                <div className='bg-gray-50 rounded-full p-3'>
                    <menu.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                    <h6 className='font-semibold text-sm ml-2'>{menu.name}</h6>
                    {menu.description && <p className='text-xs text-gray-500 ml-2'>{menu.description}</p>}
                </div>
            </div>
            <ChevronRight className="w-6 h-6" />
        </button>
    )
}

export default HCard
