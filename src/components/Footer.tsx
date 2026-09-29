import Link from 'next/link';
import React from 'react';
import { Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="grid justify-center p-6 gap-8 bg-[#171717] text-white">
      {/* Footer Links */}
      <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-10">
        <Link href="#" className="text-gray-300 hover:text-white hover:underline transition">
          About Us
        </Link>

        <Link href="#" className="text-gray-300 hover:text-white hover:underline transition">
          Contact
        </Link>

        <Link href="#" className="text-gray-300 hover:text-white hover:underline transition">
          Jobs
        </Link>

        <Link href="#" className="text-gray-300 hover:text-white hover:underline transition">
          Press Kit
        </Link>
      </div>

      {/* Social Links */}
      <div>
        <div className="flex items-center justify-center gap-8">
          <Link href="#" target="_blank" className="text-gray-300 hover:text-white transition">
            <Instagram size={20} />
          </Link>

          <Link href="#" target="_blank" className="text-gray-300 hover:text-white transition">
            <Twitter size={20} />
          </Link>

          <Link href="#" target="_blank" className="text-gray-300 hover:text-white transition">
            <Linkedin size={20} />
          </Link>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center">
        <p className="text-sm text-gray-400">
          Copyright © 2026 - All rights reserved by{' '}
          <span className="text-white font-medium">Priyanka Mandal</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
