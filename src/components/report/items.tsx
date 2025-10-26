import { numberWithCommas } from "@/utils";

interface ItemsProps {
    sections: {
        section: string;
        items: {
            item_name: string;
            amount: number;
        }[];
    }[];
}

export const Items = ({ sections }: ItemsProps) => {
    return (
        <>
            {
                sections.map((section) => (
                    <div key={section.section}>
                        <h2 className="text-lg font-semibold">{section.section}</h2>
                        <div className="mt-2 bg-white rounded p-3 mb-3 shadow-sm">
                            {section.items.map((item) => {
                                const isMin = item.amount < 0;
                                return (
                                    <div key={item.item_name} className="flex justify-between items-center my-2">
                                        <p>{item.item_name}</p>
                                        <p className="text-right">Rp {(isMin ? "-" : "") + numberWithCommas(Math.abs(item.amount))}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ))
            }
        </>
    )
}
