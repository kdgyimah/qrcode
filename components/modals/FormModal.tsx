'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: { [key: string]: string }) => void;
  title?: string;
  submitLabel?: string;
}

const FormModal = ({
  isOpen,
  onClose,
  onSubmit,
  title = "Fill Form",
  submitLabel = "Submit"
}: FormModalProps) => {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300" leave="ease-in duration-200"
          enterFrom="opacity-0" enterTo="opacity-100"
          leaveFrom="opacity-100" leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300" leave="ease-in duration-200"
            enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
            leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
              <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">{title}</Dialog.Title>

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {submitLabel}
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default FormModal;
