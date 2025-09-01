import { QRCategory } from '@/types/qr-generator';

export const QR_CATEGORIES: QRCategory[] = [
  {
    id: 'link',
    name: 'Website',
    icon: 'Globe',
    description: 'Link to any website',
    color: 'bg-blue-500'
  },
  {
    id: 'call',
    name: 'Call',
    icon: 'Phone',
    description: 'Click to call directly',
    color: 'bg-green-500'
  },
  {
    id: 'mail',
    name: 'Mail',
    icon: 'Mail',
    description: 'Send email with one click',
    color: 'bg-red-500'
  },
  {
    id: 'sms',
    name: 'SMS',
    icon: 'MessageSquare',
    description: 'Send SMS Easily',
    color: 'bg-yellow-500'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: 'MessageCircle',
    description: 'Link to my WhatsApp',
    color: 'bg-green-600'
  },
  {
    id: 'pdf',
    name: 'PDF',
    icon: 'FileText',
    description: 'Perfectly download shared file',
    color: 'bg-orange-500'
  },
  {
    id: 'image',
    name: 'Image',
    icon: 'Image',
    description: 'Link to my website',
    color: 'bg-pink-500'
  },
  {
    id: 'video',
    name: 'Video',
    icon: 'Video',
    description: 'Link to any website',
    color: 'bg-indigo-500'
  },
  {
    id: 'app',
    name: 'App',
    icon: 'Smartphone',
    description: 'Redirect to app Store',
    color: 'bg-gray-500'
  },
  {
    id: 'contact',
    name: 'VCard',
    icon: 'CreditCard',
    description: 'Save contact with one tap',
    color: 'bg-teal-500'
  },
  {
    id: 'social',
    name: 'Social Media',
    icon: 'Share2',
    description: 'Link to my website',
    color: 'bg-blue-600'
  },
  {
    id: 'wifi',
    name: 'WiFi',
    icon: 'Wifi',
    description: 'Connect without typing password',
    color: 'bg-cyan-500'
  },
  {
    id: 'event',
    name: 'Event Info',
    icon: 'Calendar',
    description: 'Link to my website',
    color: 'bg-violet-500'
  },
  {
    id: 'barcode2d',
    name: 'Location',
    icon: 'MapPin',
    description: 'Link to any location',
    color: 'bg-emerald-500'
  },
];