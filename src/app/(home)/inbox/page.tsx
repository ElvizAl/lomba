"use client";
import Navbar from "@/components/layout/navbar";
import { useState } from "react";
import { useEffect } from "react";
import { getInbox } from "@/utils/inbox";
import Image from "next/image";

export default function Inbox() {

  const [inboxes, setInboxes] = useState([]);

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const inboxData = await getInbox();
        setInboxes(inboxData);
      } catch (error) {
        console.error("Error fetching inbox:", error);
      }
    };
    fetchInbox();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4">
      <Navbar title="Notifikasi" />
      <div className="mt-7">
        {
          inboxes.length > 0 ? (
            inboxes.map((inbox: any) => (

              <div key={inbox.id} className="">
                <small className="text-gray-500">
                  {new Date(inbox.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </small>
                <div className="flex border rounded-lg bg-white p-4 mb-4 ">
                  <Image
                    src="/logo.png"
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
            <p>No messages found</p>
          )
        }
      </div>
    </div>
  );
}
