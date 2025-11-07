'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

// Menu data
const footerData = {
    company: {
        logo: {
            src: "/logo.png",
            alt: "Glofin",
            text: "Glofin"
        },
        description: "Solusi lengkap untuk mengelola keuangan bisnis Anda dengan mudah dan efisien.",
        social: [
            { name: 'Facebook', icon: Facebook, url: '#' },
            { name: 'Twitter', icon: Twitter, url: '#' },
            { name: 'Instagram', icon: Instagram, url: '#' },
            { name: 'LinkedIn', icon: Linkedin, url: '#' },
        ]
    },
    quickLinks: [
        { title: 'Tentang Kami', url: '/tentang-kami' },
        { title: 'Fitur', url: '/fitur' },
        { title: 'Harga', url: '/harga' },
        { title: 'Blog', url: '/blog' },
        { title: 'Kontak', url: '/kontak' },
    ],
    support: [
        { title: 'Pusat Bantuan', url: '/pusat-bantuan' },
        { title: 'Panduan', url: '/panduan' },
        { title: 'FAQ', url: '/faq' },
        { title: 'Kebijakan Privasi', url: '/kebijakan-privasi' },
        { title: 'Syarat & Ketentuan', url: '/syarat-ketentuan' },
    ],
    contact: [
        {
            type: 'address',
            text: 'Jl. Aria Santika No.43, Margasari, Kec. Karawaci, Kota Tangerang, Banten 15113',
            icon: MapPin,
            url: '#'
        },
        {
            type: 'email',
            text: '1124160218@global.ac.id',
            icon: Mail,
            url: 'mailto:1124160218@global.ac.id'
        },
        {
            type: 'phone',
            text: '+62 895 3937 25633',
            icon: Phone,
            url: 'whatsapp://send?phone=62895393725633'
        }
    ]
};

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { company, quickLinks, support, contact } = footerData;

    // Render social icons
    const renderSocialIcons = () => (
        <div className="flex space-x-4">
            {company.social.map((social, index) => {
                const Icon = social.icon;
                return (
                    <a
                        key={index}
                        href={social.url}
                        className="text-gray-500 hover:text-blue-600 transition-colors"
                        aria-label={social.name}
                    >
                        <Icon className="w-5 h-5" />
                    </a>
                );
            })}
        </div>
    );

    // Render menu items
    const renderMenuItems = (items: { title: string, url: string }[]) => (
        <ul className="space-y-3">
            {items.map((item, index) => (
                <li key={index}>
                    <Link
                        href={item.url}
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                        {item.title}
                    </Link>
                </li>
            ))}
        </ul>
    );

    // Render contact items
    const renderContactItems = () => (
        <ul className="space-y-3">
            {contact.map((item, index) => {
                const Icon = item.icon;
                return (
                    <li key={index} className="flex items-start gap-3">
                        <Icon className={`w-5 h-5 text-blue-600 ${item.type === 'address' ? 'mt-0.5' : ''} flex-shrink-0`} />
                        {item.url ? (
                            <a
                                href={item.url}
                                className="hover:text-blue-600 transition-colors"
                            >
                                {item.text}
                            </a>
                        ) : (
                            <span>{item.text}</span>
                        )}
                    </li>
                );
            })}
        </ul>
    );

    return (
        <footer className="w-full bg-gradient-to-b from-blue-50 to-white text-gray-900 pt-16 pb-8 md:pt-20 md:pb-12 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Image
                                src={company.logo.src}
                                alt={company.logo.alt}
                                width={56}
                                height={56}
                                className="rounded-2xl object-cover w-14 h-14"
                            />
                            <span className="text-gray-900 font-bold text-3xl">{company.logo.text}</span>
                        </div>
                        <p className="text-gray-600">
                            {company.description}
                        </p>
                        {renderSocialIcons()}
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-gray-900 font-semibold text-lg mb-4">Tautan Cepat</h3>
                        {renderMenuItems(quickLinks)}
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-gray-900 font-semibold text-lg mb-4">Dukungan</h3>
                        {renderMenuItems(support)}
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-gray-900 font-semibold text-lg mb-4">Hubungi Kami</h3>
                        {renderContactItems()}
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-sm">
                    <p>{currentYear} {company.logo.text}. Seluruh hak cipta dilindungi.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
