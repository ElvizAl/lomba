import { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import Navbar from '@/components/lp/navbar';
import Footer from '@/components/lp/footer';

export const metadata: Metadata = {
    title: 'Hubungi Kami - Glofin',
    description: 'Hubungi tim Glofin untuk pertanyaan, dukungan, atau informasi lebih lanjut tentang layanan kami.',
};

const contactInfo = [
    {
        icon: <Mail className="w-6 h-6 text-blue-600" />,
        title: 'Email',
        description: '1124160218@global.ac.id',
        link: 'mailto:1124160218@global.ac.id'
    },
    {
        icon: <Phone className="w-6 h-6 text-blue-600" />,
        title: 'Telepon',
        description: '+62 895 3937 25633',
        link: 'whatsapp://send?phone=62895393725633'
    },
    {
        icon: <MapPin className="w-6 h-6 text-blue-600" />,
        title: 'Alamat',
        description: 'Jl. Aria Santika No.43, Margasari, Kec. Karawaci, Kota Tangerang, Banten 15113',
        link: 'https://maps.google.com'
    },
    {
        icon: <Clock className="w-6 h-6 text-blue-600" />,
        title: 'Jam Operasional',
        description: 'Senin - Jumat: 09.00 - 17.00 WIB',
        link: ''
    }
];

export default function KontakKami() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative py-20 md:py-28 bg-gradient-to-b from-blue-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Hubungi <span className="text-blue-600">Kami</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Kami siap membantu Anda. Kirimkan pesan atau hubungi kami melalui informasi kontak di bawah ini.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Informasi Kontak</h2>
                            <div className="space-y-6">
                                {contactInfo.map((item, index) => (
                                    <div key={index} className="flex items-start space-x-4">
                                        <div className="p-2 bg-blue-50 rounded-lg">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">{item.title}</h3>
                                            {item.link ? (
                                                <a
                                                    href={item.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-gray-600 hover:text-blue-600 transition-colors"
                                                >
                                                    {item.description}
                                                </a>
                                            ) : (
                                                <p className="text-gray-600">{item.description}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div>

                            {/* Map */}
                            <div className="mt-12 rounded-xl overflow-hidden shadow-lg">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.6379567607332!2d106.6080643!3d-6.179191899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fed8e67cb0ad%3A0x2888b42a70065bd2!2sGlobal%20Institute%20%7C%20Institut%20Teknologi%20dan%20Bisnis%20Bina%20Sarana%20Global!5e0!3m2!1sid!2sid!4v1762497289362!5m2!1sid!2sid" width="600" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>    
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
