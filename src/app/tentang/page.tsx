import { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Footer from '@/components/lp/footer';
import Navbar from '@/components/lp/navbar';

export const metadata: Metadata = {
    title: 'Tentang Kami - Glofin',
    description: 'Kenali lebih dalam tentang Glofin dan tim di balik layanan keuangan yang memudahkan UMKM Indonesia.',
};


export default function TentangKami() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            {/* Hero Section */}
            <section className="relative py-20 md:py-28 bg-gradient-to-b from-blue-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Tentang <span className="text-blue-600">Glofin</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Membantu UMKM Indonesia untuk tumbuh dan berkembang melalui solusi keuangan yang inovatif, mudah, & gratis.
                        </p>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Siapa Kami</h2>
                            <p className="text-gray-600 mb-6">
                                Glofin hadir untuk memberikan solusi keuangan yang mudah, aman, dan terjangkau bagi pelaku UMKM di seluruh Indonesia.
                                Didirikan pada tahun 2025, kami berkomitmen untuk memberdayakan bisnis kecil dan menengah dengan teknologi keuangan terkini.
                            </p>
                            <p className="text-gray-600 mb-8">
                                Dengan tim yang berpengalaman di bidang teknologi dan keuangan, kami menghadirkan platform yang dirancang khusus
                                untuk memenuhi kebutuhan unik UMKM Indonesia.
                            </p>
                        </div>
                        <div className="relative h-screen">
                            <Image
                                src="/img/mockups.png"
                                alt="Tentang Glofin"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
