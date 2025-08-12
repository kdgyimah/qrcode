"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  ChangeEvent,
} from "react";
import { z } from "zod";

// ---------- types ----------
export type Category =
  | "link"
  | "call"
  | "mail"
  | "sms"
  | "whatsapp"
  | "wifi"
  | "image"
  | "video"
  | "bulkqr"
  | "app"
  | "social"
  | "event"
  | "barcode2d"
  | "contact"
  | "pdf";

export interface FormDataType {
  url?: string;
  smsPhone?: string;
  smsBody?: string;
  waPhone?: string;
  waBody?: string;
  email?: string;
  phone?: string;
  ssid?: string;
  password?: string;
  encryption?: "WPA" | "WEP" | "None" | string;
  imageUrl?: string;
  videoUrl?: string;
  bulkList?: string;
  appUrl?: string;
  socialUrl?: string;
  eventTitle?: string;
  eventStart?: string;
  eventEnd?: string;
  eventLocation?: string;
  eventDesc?: string;
  barcodeValue?: string;
  name?: string;
  pdfUrl?: string;
  subject?: string;
  message?: string;
}

export interface QRFormRendererProps {
  category: Category;
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  onValidityChange?: (valid: boolean, errors: Record<string, string>) => void;
}

// ---------- Country data with flags ----------
const countries = [
  { code: "+1", name: "United States", flag: "🇺🇸", iso: "US" },
  { code: "+1", name: "Canada", flag: "🇨🇦", iso: "CA" },
  { code: "+7", name: "Russia", flag: "🇷🇺", iso: "RU" },
  { code: "+20", name: "Egypt", flag: "🇪🇬", iso: "EG" },
  { code: "+27", name: "South Africa", flag: "🇿🇦", iso: "ZA" },
  { code: "+30", name: "Greece", flag: "🇬🇷", iso: "GR" },
  { code: "+31", name: "Netherlands", flag: "🇳🇱", iso: "NL" },
  { code: "+32", name: "Belgium", flag: "🇧🇪", iso: "BE" },
  { code: "+33", name: "France", flag: "🇫🇷", iso: "FR" },
  { code: "+34", name: "Spain", flag: "🇪🇸", iso: "ES" },
  { code: "+36", name: "Hungary", flag: "🇭🇺", iso: "HU" },
  { code: "+39", name: "Italy", flag: "🇮🇹", iso: "IT" },
  { code: "+40", name: "Romania", flag: "🇷🇴", iso: "RO" },
  { code: "+41", name: "Switzerland", flag: "🇨🇭", iso: "CH" },
  { code: "+43", name: "Austria", flag: "🇦🇹", iso: "AT" },
  { code: "+44", name: "United Kingdom", flag: "🇬🇧", iso: "GB" },
  { code: "+45", name: "Denmark", flag: "🇩🇰", iso: "DK" },
  { code: "+46", name: "Sweden", flag: "🇸🇪", iso: "SE" },
  { code: "+47", name: "Norway", flag: "🇳🇴", iso: "NO" },
  { code: "+48", name: "Poland", flag: "🇵🇱", iso: "PL" },
  { code: "+49", name: "Germany", flag: "🇩🇪", iso: "DE" },
  { code: "+51", name: "Peru", flag: "🇵🇪", iso: "PE" },
  { code: "+52", name: "Mexico", flag: "🇲🇽", iso: "MX" },
  { code: "+53", name: "Cuba", flag: "🇨🇺", iso: "CU" },
  { code: "+54", name: "Argentina", flag: "🇦🇷", iso: "AR" },
  { code: "+55", name: "Brazil", flag: "🇧🇷", iso: "BR" },
  { code: "+56", name: "Chile", flag: "🇨🇱", iso: "CL" },
  { code: "+57", name: "Colombia", flag: "🇨🇴", iso: "CO" },
  { code: "+58", name: "Venezuela", flag: "🇻🇪", iso: "VE" },
  { code: "+60", name: "Malaysia", flag: "🇲🇾", iso: "MY" },
  { code: "+61", name: "Australia", flag: "🇦🇺", iso: "AU" },
  { code: "+62", name: "Indonesia", flag: "🇮🇩", iso: "ID" },
  { code: "+63", name: "Philippines", flag: "🇵🇭", iso: "PH" },
  { code: "+64", name: "New Zealand", flag: "🇳🇿", iso: "NZ" },
  { code: "+65", name: "Singapore", flag: "🇸🇬", iso: "SG" },
  { code: "+66", name: "Thailand", flag: "🇹🇭", iso: "TH" },
  { code: "+81", name: "Japan", flag: "🇯🇵", iso: "JP" },
  { code: "+82", name: "South Korea", flag: "🇰🇷", iso: "KR" },
  { code: "+84", name: "Vietnam", flag: "🇻🇳", iso: "VN" },
  { code: "+86", name: "China", flag: "🇨🇳", iso: "CN" },
  { code: "+90", name: "Turkey", flag: "🇹🇷", iso: "TR" },
  { code: "+91", name: "India", flag: "🇮🇳", iso: "IN" },
  { code: "+92", name: "Pakistan", flag: "🇵🇰", iso: "PK" },
  { code: "+93", name: "Afghanistan", flag: "🇦🇫", iso: "AF" },
  { code: "+94", name: "Sri Lanka", flag: "🇱🇰", iso: "LK" },
  { code: "+95", name: "Myanmar", flag: "🇲🇲", iso: "MM" },
  { code: "+98", name: "Iran", flag: "🇮🇷", iso: "IR" },
  { code: "+212", name: "Morocco", flag: "🇲🇦", iso: "MA" },
  { code: "+213", name: "Algeria", flag: "🇩🇿", iso: "DZ" },
  { code: "+216", name: "Tunisia", flag: "🇹🇳", iso: "TN" },
  { code: "+218", name: "Libya", flag: "🇱🇾", iso: "LY" },
  { code: "+220", name: "Gambia", flag: "🇬🇲", iso: "GM" },
  { code: "+221", name: "Senegal", flag: "🇸🇳", iso: "SN" },
  { code: "+222", name: "Mauritania", flag: "🇲🇷", iso: "MR" },
  { code: "+223", name: "Mali", flag: "🇲🇱", iso: "ML" },
  { code: "+224", name: "Guinea", flag: "🇬🇳", iso: "GN" },
  { code: "+225", name: "Ivory Coast", flag: "🇨🇮", iso: "CI" },
  { code: "+226", name: "Burkina Faso", flag: "🇧🇫", iso: "BF" },
  { code: "+227", name: "Niger", flag: "🇳🇪", iso: "NE" },
  { code: "+228", name: "Togo", flag: "🇹🇬", iso: "TG" },
  { code: "+229", name: "Benin", flag: "🇧🇯", iso: "BJ" },
  { code: "+230", name: "Mauritius", flag: "🇲🇺", iso: "MU" },
  { code: "+231", name: "Liberia", flag: "🇱🇷", iso: "LR" },
  { code: "+232", name: "Sierra Leone", flag: "🇸🇱", iso: "SL" },
  { code: "+233", name: "Ghana", flag: "🇬🇭", iso: "GH" },
  { code: "+234", name: "Nigeria", flag: "🇳🇬", iso: "NG" },
  { code: "+235", name: "Chad", flag: "🇹🇩", iso: "TD" },
  { code: "+236", name: "Central African Republic", flag: "🇨🇫", iso: "CF" },
  { code: "+237", name: "Cameroon", flag: "🇨🇲", iso: "CM" },
  { code: "+238", name: "Cape Verde", flag: "🇨🇻", iso: "CV" },
  { code: "+239", name: "São Tomé and Príncipe", flag: "🇸🇹", iso: "ST" },
  { code: "+240", name: "Equatorial Guinea", flag: "🇬🇶", iso: "GQ" },
  { code: "+241", name: "Gabon", flag: "🇬🇦", iso: "GA" },
  { code: "+242", name: "Republic of the Congo", flag: "🇨🇬", iso: "CG" },
  {
    code: "+243",
    name: "Democratic Republic of the Congo",
    flag: "🇨🇩",
    iso: "CD",
  },
  { code: "+244", name: "Angola", flag: "🇦🇴", iso: "AO" },
  { code: "+245", name: "Guinea-Bissau", flag: "🇬🇼", iso: "GW" },
  { code: "+248", name: "Seychelles", flag: "🇸🇨", iso: "SC" },
  { code: "+249", name: "Sudan", flag: "🇸🇩", iso: "SD" },
  { code: "+250", name: "Rwanda", flag: "🇷🇼", iso: "RW" },
  { code: "+251", name: "Ethiopia", flag: "🇪🇹", iso: "ET" },
  { code: "+252", name: "Somalia", flag: "🇸🇴", iso: "SO" },
  { code: "+253", name: "Djibouti", flag: "🇩🇯", iso: "DJ" },
  { code: "+254", name: "Kenya", flag: "🇰🇪", iso: "KE" },
  { code: "+255", name: "Tanzania", flag: "🇹🇿", iso: "TZ" },
  { code: "+256", name: "Uganda", flag: "🇺🇬", iso: "UG" },
  { code: "+257", name: "Burundi", flag: "🇧🇮", iso: "BI" },
  { code: "+258", name: "Mozambique", flag: "🇲🇿", iso: "MZ" },
  { code: "+260", name: "Zambia", flag: "🇿🇲", iso: "ZM" },
  { code: "+261", name: "Madagascar", flag: "🇲🇬", iso: "MG" },
  { code: "+262", name: "Réunion", flag: "🇷🇪", iso: "RE" },
  { code: "+263", name: "Zimbabwe", flag: "🇿🇼", iso: "ZW" },
  { code: "+264", name: "Namibia", flag: "🇳🇦", iso: "NA" },
  { code: "+265", name: "Malawi", flag: "🇲🇼", iso: "MW" },
  { code: "+266", name: "Lesotho", flag: "🇱🇸", iso: "LS" },
  { code: "+267", name: "Botswana", flag: "🇧🇼", iso: "BW" },
  { code: "+268", name: "Eswatini", flag: "🇸🇿", iso: "SZ" },
  { code: "+269", name: "Comoros", flag: "🇰🇲", iso: "KM" },
  { code: "+290", name: "Saint Helena", flag: "🇸🇭", iso: "SH" },
  { code: "+291", name: "Eritrea", flag: "🇪🇷", iso: "ER" },
  { code: "+297", name: "Aruba", flag: "🇦🇼", iso: "AW" },
  { code: "+298", name: "Faroe Islands", flag: "🇫🇴", iso: "FO" },
  { code: "+299", name: "Greenland", flag: "🇬🇱", iso: "GL" },
  { code: "+350", name: "Gibraltar", flag: "🇬🇮", iso: "GI" },
  { code: "+351", name: "Portugal", flag: "🇵🇹", iso: "PT" },
  { code: "+352", name: "Luxembourg", flag: "🇱🇺", iso: "LU" },
  { code: "+353", name: "Ireland", flag: "🇮🇪", iso: "IE" },
  { code: "+354", name: "Iceland", flag: "🇮🇸", iso: "IS" },
  { code: "+355", name: "Albania", flag: "🇦🇱", iso: "AL" },
  { code: "+356", name: "Malta", flag: "🇲🇹", iso: "MT" },
  { code: "+357", name: "Cyprus", flag: "🇨🇾", iso: "CY" },
  { code: "+358", name: "Finland", flag: "🇫🇮", iso: "FI" },
  { code: "+359", name: "Bulgaria", flag: "🇧🇬", iso: "BG" },
  { code: "+370", name: "Lithuania", flag: "🇱🇹", iso: "LT" },
  { code: "+371", name: "Latvia", flag: "🇱🇻", iso: "LV" },
  { code: "+372", name: "Estonia", flag: "🇪🇪", iso: "EE" },
  { code: "+373", name: "Moldova", flag: "🇲🇩", iso: "MD" },
  { code: "+374", name: "Armenia", flag: "🇦🇲", iso: "AM" },
  { code: "+375", name: "Belarus", flag: "🇧🇾", iso: "BY" },
  { code: "+376", name: "Andorra", flag: "🇦🇩", iso: "AD" },
  { code: "+377", name: "Monaco", flag: "🇲🇨", iso: "MC" },
  { code: "+378", name: "San Marino", flag: "🇸🇲", iso: "SM" },
  { code: "+380", name: "Ukraine", flag: "🇺🇦", iso: "UA" },
  { code: "+381", name: "Serbia", flag: "🇷🇸", iso: "RS" },
  { code: "+382", name: "Montenegro", flag: "🇲🇪", iso: "ME" },
  { code: "+383", name: "Kosovo", flag: "🇽🇰", iso: "XK" },
  { code: "+385", name: "Croatia", flag: "🇭🇷", iso: "HR" },
  { code: "+386", name: "Slovenia", flag: "🇸🇮", iso: "SI" },
  { code: "+387", name: "Bosnia and Herzegovina", flag: "🇧🇦", iso: "BA" },
  { code: "+389", name: "North Macedonia", flag: "🇲🇰", iso: "MK" },
  { code: "+420", name: "Czech Republic", flag: "🇨🇿", iso: "CZ" },
  { code: "+421", name: "Slovakia", flag: "🇸🇰", iso: "SK" },
  { code: "+423", name: "Liechtenstein", flag: "🇱🇮", iso: "LI" },
  { code: "+500", name: "Falkland Islands", flag: "🇫🇰", iso: "FK" },
  { code: "+501", name: "Belize", flag: "🇧🇿", iso: "BZ" },
  { code: "+502", name: "Guatemala", flag: "🇬🇹", iso: "GT" },
  { code: "+503", name: "El Salvador", flag: "🇸🇻", iso: "SV" },
  { code: "+504", name: "Honduras", flag: "🇭🇳", iso: "HN" },
  { code: "+505", name: "Nicaragua", flag: "🇳🇮", iso: "NI" },
  { code: "+506", name: "Costa Rica", flag: "🇨🇷", iso: "CR" },
  { code: "+507", name: "Panama", flag: "🇵🇦", iso: "PA" },
  { code: "+508", name: "Saint Pierre and Miquelon", flag: "🇵🇲", iso: "PM" },
  { code: "+509", name: "Haiti", flag: "🇭🇹", iso: "HT" },
  { code: "+590", name: "Guadeloupe", flag: "🇬🇵", iso: "GP" },
  { code: "+591", name: "Bolivia", flag: "🇧🇴", iso: "BO" },
  { code: "+592", name: "Guyana", flag: "🇬🇾", iso: "GY" },
  { code: "+593", name: "Ecuador", flag: "🇪🇨", iso: "EC" },
  { code: "+594", name: "French Guiana", flag: "🇬🇫", iso: "GF" },
  { code: "+595", name: "Paraguay", flag: "🇵🇾", iso: "PY" },
  { code: "+596", name: "Martinique", flag: "🇲🇶", iso: "MQ" },
  { code: "+597", name: "Suriname", flag: "🇸🇷", iso: "SR" },
  { code: "+598", name: "Uruguay", flag: "🇺🇾", iso: "UY" },
  { code: "+599", name: "Curaçao", flag: "🇨🇼", iso: "CW" },
  { code: "+670", name: "East Timor", flag: "🇹🇱", iso: "TL" },
  { code: "+672", name: "Antarctica", flag: "🇦🇶", iso: "AQ" },
  { code: "+673", name: "Brunei", flag: "🇧🇳", iso: "BN" },
  { code: "+674", name: "Nauru", flag: "🇳🇷", iso: "NR" },
  { code: "+675", name: "Papua New Guinea", flag: "🇵🇬", iso: "PG" },
  { code: "+676", name: "Tonga", flag: "🇹🇴", iso: "TO" },
  { code: "+677", name: "Solomon Islands", flag: "🇸🇧", iso: "SB" },
  { code: "+678", name: "Vanuatu", flag: "🇻🇺", iso: "VU" },
  { code: "+679", name: "Fiji", flag: "🇫🇯", iso: "FJ" },
  { code: "+680", name: "Palau", flag: "🇵🇼", iso: "PW" },
  { code: "+681", name: "Wallis and Futuna", flag: "🇼🇫", iso: "WF" },
  { code: "+682", name: "Cook Islands", flag: "🇨🇰", iso: "CK" },
  { code: "+683", name: "Niue", flag: "🇳🇺", iso: "NU" },
  { code: "+684", name: "American Samoa", flag: "🇦🇸", iso: "AS" },
  { code: "+685", name: "Samoa", flag: "🇼🇸", iso: "WS" },
  { code: "+686", name: "Kiribati", flag: "🇰🇮", iso: "KI" },
  { code: "+687", name: "New Caledonia", flag: "🇳🇨", iso: "NC" },
  { code: "+688", name: "Tuvalu", flag: "🇹🇻", iso: "TV" },
  { code: "+689", name: "French Polynesia", flag: "🇵🇫", iso: "PF" },
  { code: "+690", name: "Tokelau", flag: "🇹🇰", iso: "TK" },
  { code: "+691", name: "Micronesia", flag: "🇫🇲", iso: "FM" },
  { code: "+692", name: "Marshall Islands", flag: "🇲🇭", iso: "MH" },
  { code: "+850", name: "North Korea", flag: "🇰🇵", iso: "KP" },
  { code: "+852", name: "Hong Kong", flag: "🇭🇰", iso: "HK" },
  { code: "+853", name: "Macau", flag: "🇲🇴", iso: "MO" },
  { code: "+855", name: "Cambodia", flag: "🇰🇭", iso: "KH" },
  { code: "+856", name: "Laos", flag: "🇱🇦", iso: "LA" },
  { code: "+880", name: "Bangladesh", flag: "🇧🇩", iso: "BD" },
  { code: "+886", name: "Taiwan", flag: "🇹🇼", iso: "TW" },
  { code: "+960", name: "Maldives", flag: "🇲🇻", iso: "MV" },
  { code: "+961", name: "Lebanon", flag: "🇱🇧", iso: "LB" },
  { code: "+962", name: "Jordan", flag: "🇯🇴", iso: "JO" },
  { code: "+963", name: "Syria", flag: "🇸🇾", iso: "SY" },
  { code: "+964", name: "Iraq", flag: "🇮🇶", iso: "IQ" },
  { code: "+965", name: "Kuwait", flag: "🇰🇼", iso: "KW" },
  { code: "+966", name: "Saudi Arabia", flag: "🇸🇦", iso: "SA" },
  { code: "+967", name: "Yemen", flag: "🇾🇪", iso: "YE" },
  { code: "+968", name: "Oman", flag: "🇴🇲", iso: "OM" },
  { code: "+970", name: "Palestine", flag: "🇵🇸", iso: "PS" },
  { code: "+971", name: "United Arab Emirates", flag: "🇦🇪", iso: "AE" },
  { code: "+972", name: "Israel", flag: "🇮🇱", iso: "IL" },
  { code: "+973", name: "Bahrain", flag: "🇧🇭", iso: "BH" },
  { code: "+974", name: "Qatar", flag: "🇶🇦", iso: "QA" },
  { code: "+975", name: "Bhutan", flag: "🇧🇹", iso: "BT" },
  { code: "+976", name: "Mongolia", flag: "🇲🇳", iso: "MN" },
  { code: "+977", name: "Nepal", flag: "🇳🇵", iso: "NP" },
  { code: "+992", name: "Tajikistan", flag: "🇹🇯", iso: "TJ" },
  { code: "+993", name: "Turkmenistan", flag: "🇹🇲", iso: "TM" },
  { code: "+994", name: "Azerbaijan", flag: "🇦🇿", iso: "AZ" },
  { code: "+995", name: "Georgia", flag: "🇬🇪", iso: "GE" },
  { code: "+996", name: "Kyrgyzstan", flag: "🇰🇬", iso: "KG" },
  { code: "+998", name: "Uzbekistan", flag: "🇺🇿", iso: "UZ" },
];

const inputBase =
  "w-full px-4 py-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500";

const Label: React.FC<{ children: React.ReactNode; htmlFor?: string }> = ({
  children,
  htmlFor,
}) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
    {children}
  </label>
);

const ErrorText: React.FC<{ children: string }> = ({ children }) => (
  <p className="text-xs text-red-600 mt-1">{children}</p>
);

// ---------- inline debounce ----------
function debounce<T extends (...args: string[]) => void>(fn: T, wait = 300) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, wait);
  };

  (debounced as any).cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  return debounced as ((...args: Parameters<T>) => void) & {
    cancel: () => void;
  };
}

// ---------- Country detection hook ----------
const useCountryDetection = () => {
  const [detectedCountry, setDetectedCountry] = useState<string>("+233"); // Default to Ghana
  const [isDetecting, setIsDetecting] = useState(true);

  useEffect(() => {
    const detectCountry = async () => {
      try {
        // Try to detect country using timezone
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const timezoneCountryMap: Record<string, string> = {
          "Africa/Accra": "+233",
          "America/New_York": "+1",
          "America/Los_Angeles": "+1",
          "America/Chicago": "+1",
          "Europe/London": "+44",
          "Europe/Paris": "+33",
          "Europe/Berlin": "+49",
          "Europe/Rome": "+39",
          "Asia/Tokyo": "+81",
          "Asia/Shanghai": "+86",
          "Asia/Kolkata": "+91",
          "Australia/Sydney": "+61",
          // Add more timezone mappings as needed
        };

        const countryCode = timezoneCountryMap[timezone];
        if (countryCode) {
          setDetectedCountry(countryCode);
        }
      } catch (error) {
        console.log("Could not detect country, using default");
      } finally {
        setIsDetecting(false);
      }
    };

    detectCountry();
  }, []);

  return { detectedCountry, isDetecting };
};

// ---------- Enhanced Phone Input Component ----------
const PhoneInput: React.FC<{
  name: string;
  value?: string;
  onChange: (val: string) => void;
  error?: string;
  label?: string;
}> = ({ name, value = "", onChange, error, label }) => {
  const { detectedCountry, isDetecting } = useCountryDetection();
  const [code, setCode] = useState(detectedCountry);
  const [local, setLocal] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Update code when detection completes
  useEffect(() => {
    if (!isDetecting && !value) {
      setCode(detectedCountry);
    }
  }, [detectedCountry, isDetecting, value]);

  // Sync internal state from prop
  useEffect(() => {
    if (!value) {
      setLocal("");
      return;
    }

    // Find matching country code
    const sortedCountries = [...countries].sort(
      (a, b) => b.code.length - a.code.length
    );
    const matchingCountry = sortedCountries.find((c) =>
      value.startsWith(c.code + " ")
    );

    if (matchingCountry) {
      setCode(matchingCountry.code);
      setLocal(value.substring(matchingCountry.code.length + 1));
    } else {
      setLocal(value);
    }
  }, [value]);

  // Emit combined value only if different
  useEffect(() => {
    const combined = local.trim() ? `${code} ${local.trim()}` : "";
    if (combined !== value) {
      onChange(combined);
    }
  }, [code, local, onChange, value]);

  // Filter countries based on search
  const filteredCountries = useMemo(() => {
    if (!searchTerm) return countries;
    const term = searchTerm.toLowerCase();
    return countries.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.code.includes(term) ||
        c.iso.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  const selectedCountry = countries.find((c) => c.code === code);

  return (
    <div>
      {label && <Label>{label}</Label>}
      <div className="flex gap-0 mt-1">
        {/* Country Code Selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className={`flex items-center gap-2 px-3 py-3 border border-r-0 border-gray-300 rounded-l-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[120px] ${
              error ? "border-red-500" : ""
            }`}
          >
            <span className="text-lg">{selectedCountry?.flag || "🌍"}</span>
            <span className="text-sm font-medium">{code}</span>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute z-50 w-80 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-hidden">
              {/* Search */}
              <div className="p-3 border-b border-gray-200">
                <input
                  type="text"
                  placeholder="Search countries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Country List */}
              <div className="overflow-y-auto max-h-48">
                {filteredCountries.map((country, index) => (
                  <button
                    key={`${country.code}-${country.iso}-${index}`}
                    type="button"
                    onClick={() => {
                      setCode(country.code);
                      setShowDropdown(false);
                      setSearchTerm("");
                    }}
                    className={`w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none flex items-center gap-3 ${
                      code === country.code ? "bg-blue-50 text-blue-600" : ""
                    }`}
                  >
                    <span className="text-lg">{country.flag}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {country.name}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 font-mono">
                      {country.code}
                    </span>
                  </button>
                ))}
                {filteredCountries.length === 0 && (
                  <div className="px-3 py-4 text-sm text-gray-500 text-center">
                    No countries found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Phone Number Input */}
        <input
          type="tel"
          name={name}
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          placeholder="Phone number"
          className={`
    w-full sm:w-auto
    px-4 py-3
    border border-gray-300 rounded-r-lg
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
    text-sm sm:text-base
    ${error ? "border-red-500" : ""}
  `}
        />
      </div>

      {/* Auto-detection indicator */}
      {isDetecting && (
        <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
          <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Detecting your country...
        </p>
      )}

      {error && <ErrorText>{error}</ErrorText>}

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
};

// ---------- schemas ----------
const baseSchemas: Record<Category, z.ZodTypeAny> = {
  link: z.object({ url: z.string().url({ message: "Invalid URL" }) }),
  call: z.object({
    phone: z.string().min(1, "Phone is required"),
  }),
  mail: z.object({
    email: z.string().email("Invalid email"),
    subject: z.string().min(1, "Subject required"),
    message: z.string().min(1, "Message required"),
  }),
  sms: z.object({
    smsPhone: z.string().min(1, "Phone required"),
    smsBody: z.string().min(1, "Message required"),
  }),
  whatsapp: z.object({
    waPhone: z.string().min(1, "WhatsApp number required"),
    waBody: z.string().min(1, "Message required"),
  }),
  wifi: z.object({
    ssid: z.string().min(1, "SSID required"),
    password: z.string().min(1, "Password required"),
    encryption: z.union([
      z.literal("WPA"),
      z.literal("WEP"),
      z.literal("None"),
      z.string(),
    ]),
  }),
  image: z.object({ imageUrl: z.string().url("Invalid image URL") }),
  video: z.object({ videoUrl: z.string().url("Invalid video URL") }),
  bulkqr: z.object({
    bulkList: z.string().min(1, "Bulk list cannot be empty"),
  }),
  app: z.object({ appUrl: z.string().url("Invalid app URL") }),
  social: z.object({ socialUrl: z.string().url("Invalid social URL") }),
  event: z.object({
    eventTitle: z.string().min(1, "Title required"),
    eventStart: z.string().min(1, "Start datetime required"),
    eventLocation: z.string().min(1, "Location required"),
    eventEnd: z.string().optional(),
    eventDesc: z.string().optional(),
  }),
  barcode2d: z.object({
    barcodeValue: z.string().min(1, "Value is required"),
  }),
  contact: z.object({
    name: z.string().min(1, "Name required"),
    phone: z.string().min(1, "Phone required"),
    email: z.string().optional(),
  }),
  pdf: z.object({ pdfUrl: z.string().url("Invalid PDF URL") }),
};

const getSchemaFor = (category: Category) => baseSchemas[category];

// ---------- helpers ----------
const extractErrors = (
  result: ReturnType<z.ZodTypeAny["safeParse"]>
): Record<string, string> => {
  if (result.success) return {};
  const errs: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const path = issue.path[0];
    if (typeof path === "string") {
      errs[path] = issue.message;
    }
  }
  return errs;
};

// ---------- suggestion helpers ----------
const socialSuggestions = [
  "https://instagram.com/",
  "https://facebook.com/",
  "https://twitter.com/",
  "https://linkedin.com/in/",
  "https://tiktok.com/@",
];

const EventTitleSuggestions: string[] = [
  "Annual Meetup",
  "Product Launch",
  "Community Outreach",
  "Webinar",
  "Fundraiser",
];

// ---------- main component ----------
export default function QrFormRenderer({
  category,
  formData,
  setFormData,
  onValidityChange,
}: QRFormRendererProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSocialDropdown, setShowSocialDropdown] = useState(false);
  const [filteredSocial, setFilteredSocial] = useState<string[]>([]);

  // validate debounced
  const runValidation = useCallback(() => {
    const schema = getSchemaFor(category);
    if (!schema) return;
    const result = schema.safeParse(formData);
    const extracted = extractErrors(result);
    setErrors(extracted);
    const valid = Object.keys(extracted).length === 0;
    onValidityChange?.(valid, extracted);
  }, [category, formData, onValidityChange]);

  const debouncedValidation = useMemo(
    () => debounce(runValidation, 300),
    [runValidation]
  );

  useEffect(() => {
    debouncedValidation();
    return () => {
      debouncedValidation.cancel();
    };
  }, [formData, category, debouncedValidation]);

  // handle raw field change
  const handleChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [setFormData]
  );

  // phone change wrapper
  const handlePhoneUpdate = (
    fieldName: keyof FormDataType,
    combined: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: combined,
    }));
  };

  // social suggestions logic
  useEffect(() => {
    if (category === "social") {
      const current = formData.socialUrl || "";
      if (!current) {
        setFilteredSocial(socialSuggestions);
      } else {
        setFilteredSocial(
          socialSuggestions.filter((s) =>
            s.toLowerCase().includes(current.toLowerCase())
          )
        );
      }
    }
  }, [category, formData.socialUrl]);

  function renderFields() {
    switch (category) {
      case "link":
        return (
          <>
            <Label>URL</Label>
            <input
              name="url"
              value={formData.url || ""}
              placeholder="https://example.com"
              onChange={handleChange}
              className={`${inputBase} ${errors.url ? "border-red-500" : ""}`}
              aria-invalid={!!errors.url}
            />
            {errors.url && <ErrorText>{errors.url}</ErrorText>}
          </>
        );

      case "call":
        return (
          <>
            <PhoneInput
              name="phone"
              value={formData.phone}
              onChange={(v) => handlePhoneUpdate("phone", v)}
              label="Phone"
              error={errors.phone}
            />
          </>
        );

      case "mail":
        return (
          <>
            <Label>Recipient Email</Label>
            <input
              name="email"
              type="email"
              value={formData.email || ""}
              placeholder="recipient@example.com"
              onChange={handleChange}
              className={`${inputBase} ${errors.email ? "border-red-500" : ""}`}
              aria-invalid={!!errors.email}
            />
            {errors.email && <ErrorText>{errors.email}</ErrorText>}

            <Label>Subject</Label>
            <input
              name="subject"
              value={formData.subject || ""}
              placeholder="Subject"
              onChange={handleChange}
              className={`${inputBase} ${
                errors.subject ? "border-red-500" : ""
              }`}
              aria-invalid={!!errors.subject}
            />
            {errors.subject && <ErrorText>{errors.subject}</ErrorText>}

            <Label>Message</Label>
            <textarea
              name="message"
              value={formData.message || ""}
              placeholder="Email content"
              onChange={handleChange}
              rows={4}
              className={`${inputBase} resize-none ${
                errors.message ? "border-red-500" : ""
              }`}
              aria-invalid={!!errors.message}
            />
            {errors.message && <ErrorText>{errors.message}</ErrorText>}
          </>
        );
      case "sms":
        return (
          <>
            <PhoneInput
              name="smsPhone"
              value={formData.smsPhone}
              onChange={(v) => handlePhoneUpdate("smsPhone", v)}
              error={errors.smsPhone}
              label="Recipient Phone"
            />
            <Label>Message</Label>
            <textarea
              name="smsBody"
              value={formData.smsBody || ""}
              placeholder="SMS content"
              onChange={handleChange}
              rows={3}
              className={`${inputBase} resize-none ${
                errors.smsBody ? "border-red-500" : ""
              }`}
              aria-invalid={!!errors.smsBody}
            />
            {errors.smsBody && <ErrorText>{errors.smsBody}</ErrorText>}
          </>
        );
      case "whatsapp":
        return (
          <>
            <PhoneInput
              name="waPhone"
              value={formData.waPhone}
              onChange={(v) => handlePhoneUpdate("waPhone", v)}
              error={errors.waPhone}
              label="WhatsApp Number"
            />
            <Label>Message</Label>
            <textarea
              name="waBody"
              value={formData.waBody || ""}
              placeholder="WhatsApp message"
              onChange={handleChange}
              rows={3}
              className={`${inputBase} resize-none ${
                errors.waBody ? "border-red-500" : ""
              }`}
              aria-invalid={!!errors.waBody}
            />
            {errors.waBody && <ErrorText>{errors.waBody}</ErrorText>}
          </>
        );
      case "wifi":
        return (
          <>
            <Label>WiFi Configuration</Label>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label>SSID</Label>
                <input
                  name="ssid"
                  value={formData.ssid || ""}
                  placeholder="Network name"
                  onChange={handleChange}
                  className={`${inputBase} ${
                    errors.ssid ? "border-red-500" : ""
                  }`}
                  aria-invalid={!!errors.ssid}
                />
                {errors.ssid && <ErrorText>{errors.ssid}</ErrorText>}
              </div>
              <div>
                <Label>Password</Label>
                <input
                  name="password"
                  type="password"
                  value={formData.password || ""}
                  placeholder="Password"
                  onChange={handleChange}
                  className={`${inputBase} ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  aria-invalid={!!errors.password}
                />
                {errors.password && <ErrorText>{errors.password}</ErrorText>}
              </div>
              <div>
                <Label>Encryption</Label>
                <select
                  name="encryption"
                  value={formData.encryption || "WPA"}
                  onChange={handleChange}
                  className={`${inputBase} appearance-none`}
                >
                  <option value="WPA">WPA</option>
                  <option value="WEP">WEP</option>
                  <option value="None">None</option>
                </select>
              </div>
            </div>
          </>
        );
      case "image":
        return (
          <>
            <Label>Image URL</Label>
            <input
              name="imageUrl"
              type="url"
              value={formData.imageUrl || ""}
              placeholder="https://example.com/image.jpg"
              onChange={handleChange}
              className={`${inputBase} ${
                errors.imageUrl ? "border-red-500" : ""
              }`}
              aria-invalid={!!errors.imageUrl}
            />
            {errors.imageUrl && <ErrorText>{errors.imageUrl}</ErrorText>}
          </>
        );
      case "video":
        return (
          <>
            <Label>Video URL</Label>
            <input
              name="videoUrl"
              type="url"
              value={formData.videoUrl || ""}
              placeholder="https://example.com/video.mp4"
              onChange={handleChange}
              className={`${inputBase} ${
                errors.videoUrl ? "border-red-500" : ""
              }`}
              aria-invalid={!!errors.videoUrl}
            />
            {errors.videoUrl && <ErrorText>{errors.videoUrl}</ErrorText>}
          </>
        );
      case "bulkqr":
        return (
          <>
            <Label>Bulk List</Label>
            <textarea
              name="bulkList"
              value={formData.bulkList || ""}
              placeholder="One value per line"
              onChange={handleChange}
              rows={5}
              className={`${inputBase} resize-none ${
                errors.bulkList ? "border-red-500" : ""
              }`}
              aria-invalid={!!errors.bulkList}
            />
            {errors.bulkList && <ErrorText>{errors.bulkList}</ErrorText>}
          </>
        );
      case "app":
        return (
          <>
            <Label>App URL</Label>
            <input
              name="appUrl"
              type="url"
              value={formData.appUrl || ""}
              placeholder="https://app.link"
              onChange={handleChange}
              className={`${inputBase} ${
                errors.appUrl ? "border-red-500" : ""
              }`}
              aria-invalid={!!errors.appUrl}
            />
            {errors.appUrl && <ErrorText>{errors.appUrl}</ErrorText>}
          </>
        );
      case "social":
        return (
          <>
            <Label>Social Media URL</Label>
            <div className="relative">
              <input
                name="socialUrl"
                type="url"
                value={formData.socialUrl || ""}
                placeholder="https://instagram.com/you"
                onChange={handleChange}
                className={`${inputBase} ${
                  errors.socialUrl ? "border-red-500" : ""
                }`}
                aria-invalid={!!errors.socialUrl}
                onFocus={() => setShowSocialDropdown(true)}
                onBlur={() =>
                  setTimeout(() => setShowSocialDropdown(false), 150)
                }
              />
              {showSocialDropdown && filteredSocial.length > 0 && (
                <div className="absolute z-10 bg-white border w-full mt-1 rounded shadow-sm max-h-40 overflow-auto">
                  {filteredSocial.map((s) => (
                    <div
                      key={s}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setFormData((prev) => ({ ...prev, socialUrl: s }));
                      }}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {errors.socialUrl && <ErrorText>{errors.socialUrl}</ErrorText>}
          </>
        );
      case "event":
        return (
          <>
            <Label>Event Title</Label>
            <div className="relative">
              <input
                name="eventTitle"
                value={formData.eventTitle || ""}
                placeholder="Event Title"
                onChange={handleChange}
                className={`${inputBase} ${
                  errors.eventTitle ? "border-red-500" : ""
                }`}
                aria-invalid={!!errors.eventTitle}
              />
              {formData.eventTitle && (
                <div className="absolute z-10 bg-white border w-full mt-1 rounded shadow-sm">
                  {EventTitleSuggestions.filter((t) =>
                    t
                      .toLowerCase()
                      .includes((formData.eventTitle || "").toLowerCase())
                  ).map((s) => (
                    <div
                      key={s}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setFormData((prev) => ({ ...prev, eventTitle: s }));
                      }}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {errors.eventTitle && <ErrorText>{errors.eventTitle}</ErrorText>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Start</Label>
                <input
                  type="datetime-local"
                  name="eventStart"
                  value={formData.eventStart || ""}
                  onChange={handleChange}
                  className={`${inputBase} ${
                    errors.eventStart ? "border-red-500" : ""
                  }`}
                  aria-invalid={!!errors.eventStart}
                />
                {errors.eventStart && (
                  <ErrorText>{errors.eventStart}</ErrorText>
                )}
              </div>
              <div>
                <Label>End</Label>
                <input
                  type="datetime-local"
                  name="eventEnd"
                  value={formData.eventEnd || ""}
                  onChange={handleChange}
                  className={inputBase}
                />
              </div>
            </div>

            <div>
              <Label>Location</Label>
              <input
                name="eventLocation"
                value={formData.eventLocation || ""}
                placeholder="Location"
                onChange={handleChange}
                className={`${inputBase} ${
                  errors.eventLocation ? "border-red-500" : ""
                }`}
                aria-invalid={!!errors.eventLocation}
              />
              {errors.eventLocation && (
                <ErrorText>{errors.eventLocation}</ErrorText>
              )}
            </div>

            <div>
              <Label>Description</Label>
              <textarea
                name="eventDesc"
                value={formData.eventDesc || ""}
                placeholder="Details"
                onChange={handleChange}
                rows={3}
                className={inputBase}
              />
            </div>
          </>
        );
      case "barcode2d":
        return (
          <>
            <Label>Value to Encode</Label>
            <input
              name="barcodeValue"
              value={formData.barcodeValue || ""}
              placeholder="Any text or code"
              onChange={handleChange}
              className={`${inputBase} ${
                errors.barcodeValue ? "border-red-500" : ""
              }`}
              aria-invalid={!!errors.barcodeValue}
            />
            {errors.barcodeValue && (
              <ErrorText>{errors.barcodeValue}</ErrorText>
            )}
          </>
        );
      case "contact":
        return (
          <>
            <Label>Contact Info</Label>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label>Name</Label>
                <input
                  name="name"
                  value={formData.name || ""}
                  placeholder="Full name"
                  onChange={handleChange}
                  className={`${inputBase} ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  aria-invalid={!!errors.name}
                />
                {errors.name && <ErrorText>{errors.name}</ErrorText>}
              </div>
              <div>
                <PhoneInput
                  name="phone"
                  value={formData.phone}
                  onChange={(v) => handlePhoneUpdate("phone", v)}
                  error={errors.phone}
                  label="Phone"
                />
              </div>
              <div>
                <Label>Email (optional)</Label>
                <input
                  name="email"
                  type="email"
                  value={formData.email || ""}
                  placeholder="email@example.com"
                  onChange={handleChange}
                  className={`${inputBase} ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  aria-invalid={!!errors.email}
                />
                {errors.email && <ErrorText>{errors.email}</ErrorText>}
              </div>
            </div>
          </>
        );
      case "pdf":
        return (
          <>
            <Label>PDF URL</Label>
            <input
              name="pdfUrl"
              type="url"
              value={formData.pdfUrl || ""}
              placeholder="https://example.com/doc.pdf"
              onChange={handleChange}
              className={`${inputBase} ${
                errors.pdfUrl ? "border-red-500" : ""
              }`}
              aria-invalid={!!errors.pdfUrl}
            />
            {errors.pdfUrl && <ErrorText>{errors.pdfUrl}</ErrorText>}
          </>
        );
      default:
        return (
          <p className="text-gray-500 italic">
            Select a category to get started.
          </p>
        );
    }
  }

  return (
    <div className="mt-8 w-full max-w-xl">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Enter Content
      </h2>
      <div className="rounded-2xl p-6 border border-gray-200 bg-white space-y-6">
        {renderFields()}
      </div>
    </div>
  );
}
