// data/qrCategories.ts
import { FaLink, FaPhone, FaEnvelope, FaSms, FaWhatsapp, FaImage, FaVideo, FaAppStoreIos, FaWifi, FaFilePdf, FaUser } from 'react-icons/fa';
import { SiFacebook} from 'react-icons/si';

export const qrCategories = [
  { key: 'link', name: 'Link', icon: FaLink },
  { key: 'call', name: 'Call', icon: FaPhone },
  { key: 'contact', name: 'Contact', icon: FaUser },
  { key: 'mail', name: 'Mail', icon: FaEnvelope },
  { key: 'sms', name: 'SMS', icon: FaSms },
  { key: 'whatsapp', name: 'WhatsApp', icon: FaWhatsapp },
  { key: 'image', name: 'Image', icon: FaImage },
  { key: 'video', name: 'Video', icon: FaVideo },
  { key: 'app', name: 'App', icon: FaAppStoreIos },
  { key: 'wifi', name: 'Wi-Fi', icon: FaWifi },
  { key: 'pdf', name: 'PDF', icon: FaFilePdf },
  { key: 'social', name: 'Social Media', icon: SiFacebook }, // You can enhance this later
];
