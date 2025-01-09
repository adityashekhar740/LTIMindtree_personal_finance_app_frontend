import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Have questions? We're here to help you with anything you need
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="glass-card rounded-xl p-8">
            <form className="space-y-6">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full rounded-lg glass-input py-3 px-4"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full rounded-lg glass-input py-3 px-4"
                  placeholder="Your email"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Message</label>
                <textarea
                  className="w-full rounded-lg glass-input py-3 px-4 min-h-[150px]"
                  placeholder="Your message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Email Us</h3>
                  <p className="text-gray-400">support@ltimindtree.com</p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Call Us</h3>
                  <p className="text-gray-400">+91 (800) 123-4567</p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Visit Us</h3>
                  <p className="text-gray-400">
                    Candor Techspace , Noida Sector - 62
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}