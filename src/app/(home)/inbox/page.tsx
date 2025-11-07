"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/navbar";
import Loading from "@/components/ui/loading";
import { getInbox, markAsRead } from "@/utils/inbox";
import type { InboxData } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Pagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export default function Inbox() {
  const [loading, setLoading] = useState(true);
  const [inboxes, setInboxes] = useState<InboxData[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    total_pages: 1
  });

  const fetchInbox = useCallback(async (page: number = 1) => {
    try {
      setLoading(true);
      const response = await getInbox(page, pagination.limit);
      setInboxes(response.data);
      setPagination(response.pagination);

      // Mark unread messages as read
      await Promise.all(
        response.data.map((inbox: InboxData) => 
          !inbox.is_read ? markAsRead(inbox.id) : Promise.resolve()
        )
      );
    } catch (error) {
      console.error("Error fetching inbox:", error);
    } finally {
      setLoading(false);
    }
  }, [pagination.limit]);

  useEffect(() => {
    fetchInbox(pagination.page);
  }, [fetchInbox, pagination.page]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.total_pages) {
      setPagination(prev => ({ ...prev, page: newPage }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading && pagination.page === 1) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4">
      <Navbar title="Notifikasi" />
      <div className="mt-6 max-w-2xl mx-auto">
        {inboxes.length > 0 ? (
          <div className="space-y-4">
            {inboxes.map((inbox) => (
              <div key={inbox.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                        <Image
                          src={`/img/${inbox.metadata?.image || 'noted.png'}`}
                          alt={inbox.title}
                          width={24}
                          height={24}
                          className="w-6 h-6"
                          priority
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center mb-1">
                        {!inbox.is_read && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        )}
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {inbox.title}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        {inbox.content}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(inbox.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {pagination.total_pages > 1 && (
              <div className="mt-6 flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1 || loading}
                  className="px-3 py-2 text-sm flex items-center gap-1.5"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Sebelumnya</span>
                </Button>
                
                <div className="flex items-center bg-gray-50 rounded-lg px-3 py-1.5">
                  <span className="text-sm font-medium text-gray-700">
                    {pagination.page}
                  </span>
                  <span className="mx-1 text-gray-400">/</span>
                  <span className="text-sm text-gray-500">
                    {pagination.total_pages}
                  </span>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.total_pages || loading}
                  className="px-3 py-2 text-sm flex items-center gap-1.5"
                >
                  <span>Selanjutnya</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="bg-gray-100 p-6 rounded-full mb-4">
              <Image
                src="/img/noted.png"
                alt="Tidak ada notifikasi"
                width={80}
                height={80}
                className="w-20 h-20 opacity-50"
                priority
              />
            </div>
            <p className="text-gray-500 text-lg font-medium">Tidak ada notifikasi</p>
            <p className="text-gray-400 text-sm mt-1">Anda belum memiliki notifikasi</p>
          </div>
        )}
      </div>
    </div>
  );
}
