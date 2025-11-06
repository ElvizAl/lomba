import { getCategory } from "@/utils/category";
import { useEffect, useState } from "react";
import { ChevronRightIcon } from "lucide-react";
import { numberWithCommas } from "@/utils";
import Loading from "@/components/ui/loading";

export default function Kategori({ type, title, onClick }: { type: string; title: string; onClick: (item: any) => void }) {

  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      const data = await getCategory({
        page: 1,
        limit: 10,
        name: "",
        start_date: "",
        end_date: "",
        id: "",
        state: type,
      });

      const groupedData = data.reduce((acc: any, item: any) => {
        const type = item.type.charAt(0).toUpperCase() + item.type.slice(1);
        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push(item);
        return acc;
      }, {});

      setData(groupedData);
      setLoading(false);
    };
    getData();
  });

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <>
      <div className="mt-10">
        <h1 className="text-md font-bold px-4">{title}</h1>
        {/* Search bar */}
        {/* <div className="mt-5 px-4">
          <input type="text" placeholder="Search" className="w-full border border-gray-300 rounded px-3 py-2" />
        </div> */}
        <div className="mt-5 mb-20 bg-white">
          {Object.entries(data).map(([key, value]: any) => (
            <div key={key}>
              <h2 className="text-md font-bold mt-5 px-4">{key}</h2>
              {value.map((item: any, i: number) => (
                <div onClick={() => onClick(item)} key={i} className="block border-b py-3 cursor-pointer px-4 text-sm">
                  <div className="flex justify-between items-center">
                    <span key={item.id} className="font-semibold">{item.name}</span>
                    <div className="flex">
                      {type == 'riwayat' ? (
                        <span>
                          Rp {item.balance < 0 ? "(" : ""}
                          {numberWithCommas(Math.abs(item.balance))}
                          {item.balance < 0 ? ")" : ""}
                        </span>
                      ) : ''}
                      <ChevronRightIcon />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
