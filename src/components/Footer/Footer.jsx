import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-6">
          {/* Logo & Copyright */}
          <div className="w-full px-6 md:w-1/2 lg:w-5/12">
            <div className="flex flex-col justify-between h-full">
              <div className="mb-6">
                <Link to="/">
                  <Logo width="100px" className="transition-smooth hover:opacity-80" />
                </Link>
              </div>
              <p className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} My Blog. All Rights Reserved.
              </p>
            </div>
          </div>

          {/* Company */}
          <div className="w-full px-6 md:w-1/2 lg:w-2/12">
            <h3 className="text-xs font-semibold uppercase text-gray-400 mb-6">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-indigo-400 transition-smooth"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-indigo-400 transition-smooth"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-indigo-400 transition-smooth"
                >
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-indigo-400 transition-smooth"
                >
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="w-full px-6 md:w-1/2 lg:w-2/12">
            <h3 className="text-xs font-semibold uppercase text-gray-400 mb-6">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-indigo-400 transition-smooth"
                >
                  Account
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-indigo-400 transition-smooth"
                >
                  Help
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-indigo-400 transition-smooth"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-indigo-400 transition-smooth"
                >
                  Customer Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legals */}
          <div className="w-full px-6 md:w-1/2 lg:w-3/12">
            <h3 className="text-xs font-semibold uppercase text-gray-400 mb-6">
              Legals
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-indigo-400 transition-smooth"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-indigo-400 transition-smooth"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-indigo-400 transition-smooth"
                >
                  Licensing
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;