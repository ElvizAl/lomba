import { ReportSection } from "@/types";
import { numberWithCommas } from "@/utils";

interface ItemsProps {
    sections: ReportSection[];
}

export const Items = ({ sections }: ItemsProps) => {
    return (
        <>
            {
                sections.map((section) => section.section != 'Ringkasan' ? (
                    <div key={section.section}>
                        <h2 className="text-md font-semibold">{section.section}</h2>
                        <div className="mt-2 bg-white rounded p-3 mb-3 shadow-sm">
                            {section.items.map((item) => {
                                const isMin = item.amount < 0;
                                return (
                                    <div key={item.item_name} className="flex justify-between items-center my-2 text-sm">
                                        <p className={item.item_name.startsWith("Total") ? "font-bold" : ""}>{item.item_name}</p>
                                        <p className={item.item_name.startsWith("Total") ? "font-bold text-right" : "text-right"}>Rp {(isMin ? "(" : "") + numberWithCommas(Math.abs(item.amount)) + (isMin ? ")" : "")}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ) : null)
            }
        </>
    )
}
