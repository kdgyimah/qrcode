'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await new Promise((res) => setTimeout(res, 1000));
      toast.success('Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl p-6 sm:p-8 shadow-md">
      <div className="mb-6 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Get In Touch With Us</h1>
        <p className="text-gray-600 text-md sm:text-lg">We’d love to hear from you. Send us a message!</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="name"
          placeholder="First Name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          rows={5}
          className="w-full px-4 py-3 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <div className="flex justify-center sm:justify-start">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Send your Message
          </button>
        </div>
      </form>
    </div>
  );
}
