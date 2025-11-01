"use client";
import Navbar from "@/components/layout/navbar";
import { useState } from "react";
import { useEffect } from "react";
import { getInbox, markAsRead } from "@/utils/inbox";
import Image from "next/image";
import Loading from "@/components/ui/loading";
import { InboxData } from "@/types";

export default function Inbox() {
  const [loading, setLoading] = useState(true);
  const [inboxes, setInboxes] = useState<InboxData[]>([]);

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const inboxData = await getInbox();
        setInboxes(inboxData);
        inboxData.forEach((inbox: InboxData) => {
          if (!inbox.is_read) {
            markAsRead(inbox.id);
          }
        });
      } catch (error) {
        console.error("Error fetching inbox:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInbox();
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4">
      <Navbar title="Notifikasi" />
      <div className="mt-7">
        {
          inboxes.length > 0 ? (
            inboxes.map((inbox: InboxData) => (

              <div key={inbox.id} className="">
                {/* red dots */}
                <div className="flex items-center">
                  {!inbox.is_read ? (
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  ) : null}
                  <small className="text-gray-500">
                    {new Date(inbox.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                    })}
                  </small>
                </div>
                <div className="flex border rounded-lg bg-white p-4 mb-4 ">
                  <Image
                    src={"/img/" + (inbox.metadata?.image || 'noted.png')}
                    alt="Logo"
                    width={100}
                    height={100}
                    className="w-8 h-8 mt-2"
                    priority
                  />
                  <div className="ml-4">
                    <h6 className="font-bold">{inbox.title}</h6>
                    <p className="text-gray-500">{inbox.content}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-80">
              <div className="flex flex-col items-center">

                <Image
                  src={"/img/noted.png"}
                  alt="Noted"
                  width={100}
                  height={100}
                  className="w-64"
                  priority
                />
                <p className="text-gray-500 mt-2 text-xl font-bold">Tidak ada notifikasi</p>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}
