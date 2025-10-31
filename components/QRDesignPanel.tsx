'use client';

import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface QRDesignPanelProps {
  design: {
    frame: string;
    shape: "square" | "circle" | "rounded";
    color: string;
    logo: File | null;
    logoSize?: number;
  };
  setDesign: React.Dispatch<React.SetStateAction<{
    frame: string;
    shape: "square" | "circle" | "rounded";
    color: string;
    logo: File | null;
    logoSize?: number;
  }>>;
}

// Beautiful Frame Components
const QRSquare = ({ selected, color = "#000" }: { selected: boolean; color?: string }) => (
  <div className={`w-full h-full rounded-lg border-2 ${selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'} p-2 hover:border-blue-400 transition`}>
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Simple QR pattern */}
      <rect x="10" y="10" width="20" height="20" fill={color} rx="2"/>
      <rect x="70" y="10" width="20" height="20" fill={color} rx="2"/>
      <rect x="10" y="70" width="20" height="20" fill={color} rx="2"/>
      {[...Array(5)].map((_, i) => 
        [...Array(5)].map((_, j) => (
          <rect key={`${i}-${j}`} x={40 + j * 6} y={40 + i * 6} width="4" height="4" fill={color}/>
        ))
      )}
    </svg>
  </div>
);

const QRRounded = ({ selected, color = "#000" }: { selected: boolean; color?: string }) => (
  <div className={`w-full h-full rounded-lg border-2 ${selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'} p-2 hover:border-blue-400 transition`}>
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id={`gradient-rounded-${selected}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: color, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: color, stopOpacity: 0.5 }} />
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15"/>
        </filter>
      </defs>
      
      {/* Gradient border with shadow */}
      <rect x="5" y="5" width="90" height="90" fill="none" stroke={`url(#gradient-rounded-${selected})`} strokeWidth="4" rx="18" filter="url(#shadow)"/>
      
      {/* QR pattern */}
      <rect x="15" y="15" width="18" height="18" fill={color} rx="2"/>
      <rect x="67" y="15" width="18" height="18" fill={color} rx="2"/>
      <rect x="15" y="67" width="18" height="18" fill={color} rx="2"/>
      {[...Array(4)].map((_, i) => 
        [...Array(4)].map((_, j) => (
          <rect key={`${i}-${j}`} x={43 + j * 6} y={43 + i * 6} width="4" height="4" fill={color} rx="1"/>
        ))
      )}
    </svg>
  </div>
);

const QRBadge = ({ selected, color = "#000" }: { selected: boolean; color?: string }) => (
  <div className={`w-full h-full rounded-lg border-2 ${selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'} p-2 hover:border-blue-400 transition`}>
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Background tint */}
      <rect x="0" y="0" width="100" height="100" fill={color} opacity="0.08" rx="15"/>
      
      {/* Corner badges */}
      <rect x="8" y="8" width="22" height="22" fill={color} rx="6"/>
      <rect x="70" y="8" width="22" height="22" fill={color} rx="6"/>
      <rect x="8" y="70" width="22" height="22" fill={color} rx="6"/>
      <rect x="70" y="70" width="22" height="22" fill={color} rx="6"/>
      
      {/* QR pattern */}
      {[...Array(4)].map((_, i) => 
        [...Array(4)].map((_, j) => (
          <rect key={`${i}-${j}`} x={43 + j * 6} y={43 + i * 6} width="4" height="4" fill={color} rx="1"/>
        ))
      )}
    </svg>
  </div>
);

const QRCurved = ({ selected, color = "#000" }: { selected: boolean; color?: string }) => (
  <div className={`w-full h-full rounded-lg border-2 ${selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'} p-2 hover:border-blue-400 transition`}>
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Organic curved frame */}
      <path d="M 30 5 Q 5 5 5 30 L 5 70 Q 5 95 30 95 L 70 95 Q 95 95 95 70 L 95 30 Q 95 5 70 5 Z" 
            fill="none" stroke={color} strokeWidth="5" strokeLinecap="round"/>
      
      {/* QR pattern with curves */}
      <path d="M 15 15 Q 15 12 18 12 L 28 12 Q 31 12 31 15 L 31 25 Q 31 28 28 28 L 18 28 Q 15 28 15 25 Z" fill={color}/>
      <path d="M 69 15 Q 69 12 72 12 L 82 12 Q 85 12 85 15 L 85 25 Q 85 28 82 28 L 72 28 Q 69 28 69 25 Z" fill={color}/>
      <path d="M 15 69 Q 15 66 18 66 L 28 66 Q 31 66 31 69 L 31 79 Q 31 82 28 82 L 18 82 Q 15 82 15 79 Z" fill={color}/>
      
      {[...Array(4)].map((_, i) => 
        [...Array(4)].map((_, j) => (
          <circle key={`${i}-${j}`} cx={45 + j * 6} cy={45 + i * 6} r="2" fill={color}/>
        ))
      )}
    </svg>
  </div>
);

const QRClassic = ({ selected, color = "#000" }: { selected: boolean; color?: string }) => (
  <div className={`w-full h-full rounded-lg border-2 ${selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'} p-2 hover:border-blue-400 transition`}>
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Double border frame */}
      <rect x="5" y="5" width="90" height="90" fill="none" stroke={color} strokeWidth="2"/>
      <rect x="10" y="10" width="80" height="80" fill="none" stroke={color} strokeWidth="1"/>
      
      {/* Classic corner patterns */}
      <rect x="18" y="18" width="16" height="16" fill="none" stroke={color} strokeWidth="2"/>
      <rect x="22" y="22" width="8" height="8" fill={color}/>
      
      <rect x="66" y="18" width="16" height="16" fill="none" stroke={color} strokeWidth="2"/>
      <rect x="70" y="22" width="8" height="8" fill={color}/>
      
      <rect x="18" y="66" width="16" height="16" fill="none" stroke={color} strokeWidth="2"/>
      <rect x="22" y="70" width="8" height="8" fill={color}/>
      
      {[...Array(5)].map((_, i) => 
        [...Array(5)].map((_, j) => (
          <rect key={`${i}-${j}`} x={42 + j * 5} y={42 + i * 5} width="3" height="3" fill={color}/>
        ))
      )}
    </svg>
  </div>
);

const QRMinimal = ({ selected, color = "#000" }: { selected: boolean; color?: string }) => (
  <div className={`w-full h-full rounded-lg border-2 ${selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'} p-2 hover:border-blue-400 transition`}>
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Corner brackets */}
      <path d="M 30 8 L 8 8 L 8 30" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M 70 8 L 92 8 L 92 30" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M 8 70 L 8 92 L 30 92" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M 92 70 L 92 92 L 70 92" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
      
      {/* QR pattern */}
      <rect x="20" y="20" width="16" height="16" fill={color} rx="2"/>
      <rect x="64" y="20" width="16" height="16" fill={color} rx="2"/>
      <rect x="20" y="64" width="16" height="16" fill={color} rx="2"/>
      
      {[...Array(4)].map((_, i) => 
        [...Array(4)].map((_, j) => (
          <circle key={`${i}-${j}`} cx={45 + j * 6} cy={45 + i * 6} r="2" fill={color}/>
        ))
      )}
    </svg>
  </div>
);

const QRGradient = ({ selected, color = "#000" }: { selected: boolean; color?: string }) => (
  <div className={`w-full h-full rounded-lg border-2 ${selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'} p-2 hover:border-blue-400 transition`}>
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id={`grad-frame-${selected}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: color, stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: color, stopOpacity: 0.8 }} />
          <stop offset="100%" style={{ stopColor: color, stopOpacity: 0.4 }} />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Glowing gradient border */}
      <rect x="5" y="5" width="90" height="90" fill="none" stroke={`url(#grad-frame-${selected})`} 
            strokeWidth="6" rx="16" filter="url(#glow)"/>
      
      {/* QR pattern with gradient */}
      <rect x="18" y="18" width="16" height="16" fill={`url(#grad-frame-${selected})`} rx="3"/>
      <rect x="66" y="18" width="16" height="16" fill={`url(#grad-frame-${selected})`} rx="3"/>
      <rect x="18" y="66" width="16" height="16" fill={`url(#grad-frame-${selected})`} rx="3"/>
      
      {[...Array(4)].map((_, i) => 
        [...Array(4)].map((_, j) => (
          <rect key={`${i}-${j}`} x={44 + j * 6} y={44 + i * 6} width="4" height="4" 
                fill={color} opacity={0.7 + (i + j) * 0.05} rx="1"/>
        ))
      )}
    </svg>
  </div>
);

const QRDots = ({ selected, color = "#000" }: { selected: boolean; color?: string }) => (
  <div className={`w-full h-full rounded-lg border-2 ${selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'} p-2 hover:border-blue-400 transition`}>
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Circular corner markers */}
      <circle cx="20" cy="20" r="10" fill={color}/>
      <circle cx="80" cy="20" r="10" fill={color}/>
      <circle cx="20" cy="80" r="10" fill={color}/>
      
      {/* Dot pattern */}
      {[...Array(5)].map((_, i) => 
        [...Array(5)].map((_, j) => (
          <circle key={`${i}-${j}`} cx={44 + j * 6} cy={44 + i * 6} r="2.5" fill={color}/>
        ))
      )}
    </svg>
  </div>
);

const frames = [
  { id: 'square', label: 'Square', Component: QRSquare },
  { id: 'rounded', label: 'Rounded', Component: QRRounded },
  { id: 'badge', label: 'Badge', Component: QRBadge },
  { id: 'curved', label: 'Curved', Component: QRCurved },
  { id: 'classic', label: 'Classic', Component: QRClassic },
  { id: 'minimal', label: 'Minimal', Component: QRMinimal },
  { id: 'gradient', label: 'Gradient', Component: QRGradient },
  { id: 'dots', label: 'Dots', Component: QRDots },
];

type ShapeType = "square" | "rounded" | "circle";

const shapes: { id: ShapeType; label: string; preview: string }[] = [
  { id: 'square', label: 'Square', preview: '■' },
  { id: 'rounded', label: 'Rounded', preview: '●' },
  { id: 'circle', label: 'Circle', preview: '•' },
];

const colors = [
  { label: 'Black', color: '#000000' },
  { label: 'Blue', color: '#3b82f6' },
  { label: 'Indigo', color: '#6366f1' },
  { label: 'Purple', color: '#a855f7' },
  { label: 'Pink', color: '#ec4899' },
  { label: 'Red', color: '#ef4444' },
  { label: 'Orange', color: '#f97316' },
  { label: 'Green', color: '#22c55e' },
  { label: 'Teal', color: '#14b8a6' },
  { label: 'Cyan', color: '#06b6d4' },
];

export default function QRDesignPanel({ design, setDesign }: QRDesignPanelProps) {
  const handleFrame = (frame: string) => setDesign({ ...design, frame });
 const handleShape = (shape: "square" | "circle" | "rounded") =>
  setDesign({ ...design, shape });
  const handleColor = (color: string) => setDesign({ ...design, color });
  const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesign({ ...design, logo: e.target.files?.[0] ?? null });
  };

  return (
    <div className="mt-6 w-full max-w-3xl">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Design Your QR Code</h2>
      <Tabs defaultValue="frame" className="w-full">
        <TabsList className="bg-white border-b border-gray-200 px-2 gap-x-1">
          <TabsTrigger value="frame" className="bg-white text-black hover:bg-gray-100 hover:text-blue-600 data-[state=active]:bg-gray-100 data-[state=active]:text-blue-600 rounded-sm px-3 py-1.5 text-sm transition">
            Frame Style
          </TabsTrigger>
          <TabsTrigger value="shape" className="bg-white text-black hover:bg-gray-100 hover:text-blue-600 data-[state=active]:bg-gray-100 data-[state=active]:text-blue-600 rounded-sm px-3 py-1.5 text-sm transition">
            Shape
          </TabsTrigger>
          <TabsTrigger value="color" className="bg-white text-black hover:bg-gray-100 hover:text-blue-600 data-[state=active]:bg-gray-100 data-[state=active]:text-blue-600 rounded-sm px-3 py-1.5 text-sm transition">
            Color
          </TabsTrigger>
          <TabsTrigger value="logo" className="bg-white text-black hover:bg-gray-100 hover:text-blue-600 data-[state=active]:bg-gray-100 data-[state=active]:text-blue-600 rounded-sm px-3 py-1.5 text-sm transition">
            Logo
          </TabsTrigger>
        </TabsList>

        <TabsContent value="frame" className="mt-0">
          <div className="p-4 bg-gray-50 rounded-b-lg">
            <p className="text-xs text-gray-600 mb-3">Choose a beautiful frame style for your QR code</p>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
              {frames.map(({ id, label, Component }) => (
                <button
                  key={id}
                  className="flex flex-col items-center gap-1 focus:outline-none group"
                  onClick={() => handleFrame(id)}
                  type="button"
                  aria-pressed={design.frame === id}
                >
                  <div className="w-16 h-16">
                    <Component selected={design.frame === id} color={design.color} />
                  </div>
                  <span className={`text-[10px] font-medium ${design.frame === id ? 'text-blue-600' : 'text-gray-600'} group-hover:text-blue-500`}>
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="shape" className="mt-0">
          <div className="p-4 bg-gray-50 rounded-b-lg">
            <p className="text-xs text-gray-600 mb-3">Choose the dot shape for your QR code</p>
            <div className="grid grid-cols-3 gap-3">
              {shapes.map(({ id, label, preview }) => (
                <button
                  key={id}
                  className={`p-4 rounded-lg border-2 ${
                    design.shape === id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-blue-400'
                  } transition flex flex-col items-center gap-2`}
                  onClick={() => handleShape(id)}
                  type="button"
                >
                  <span className="text-3xl" style={{ color: design.color }}>{preview}</span>
                  <span className={`text-xs font-medium ${design.shape === id ? 'text-blue-600' : 'text-gray-600'}`}>
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="color" className="mt-0">
          <div className="p-4 bg-gray-50 rounded-b-lg">
            <p className="text-xs text-gray-600 mb-3">Select your QR code color</p>
            <div className="flex flex-wrap gap-2">
              {colors.map(({ label, color }) => (
                <button
                  key={label}
                  className={`w-10 h-10 rounded-lg border-2 ${
                    design.color === color ? 'ring-2 ring-blue-500 ring-offset-1 border-transparent' : 'border-gray-300 hover:border-gray-400'
                  } transition-all shadow-sm hover:shadow-md`}
                  style={{ background: color }}
                  title={label}
                  onClick={() => handleColor(color)}
                  type="button"
                  aria-label={label}
                >
                  {design.color === color && (
                    <svg className="w-full h-full p-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
            <div className="mt-4">
              <label className="block text-xs font-medium text-gray-700 mb-2">Custom Color</label>
              <div className="flex gap-2 items-center">
                <input type="color" value={design.color} onChange={(e) => handleColor(e.target.value)} className="w-10 h-10 rounded-lg border-2 border-gray-300 cursor-pointer"/>
                <input type="text" value={design.color} onChange={(e) => handleColor(e.target.value)} placeholder="#000000" className="flex-1 px-2 py-1.5 text-xs border border-gray-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="logo" className="mt-0">
          <div className="p-4 bg-gray-50 rounded-b-lg">
            <label className="block mb-2 text-xs font-medium text-gray-700">Upload Logo</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition cursor-pointer bg-white">
              <input type="file" accept="image/*" className="hidden" onChange={handleLogo} id="logo-upload"/>
              <label htmlFor="logo-upload" className="cursor-pointer">
                {design.logo ? (
                  <div className="space-y-1">
                    <div className="w-12 h-12 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-xs font-medium text-gray-700">{design.logo.name}</p>
                    <p className="text-[10px] text-gray-500">{(design.logo.size / 1024).toFixed(1)} KB</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="w-12 h-12 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <p className="text-xs font-medium text-gray-700">Click to upload logo</p>
                    <p className="text-[10px] text-gray-500">PNG, JPG, SVG up to 2MB</p>
                  </div>
                )}
              </label>
            </div>
            {design.logo && (
  <div className="mt-4">
    <label className="block text-xs font-medium text-gray-700 mb-1">
      Logo Size
    </label>
    <div className="flex items-center gap-3">
      <input
        type="range"
        min="20"
        max="100"
        step="5"
        value={design.logoSize}
        onChange={(e) =>
          setDesign({ ...design, logoSize: Number(e.target.value) })
        }
        className="flex-1 accent-blue-500"
      />
      <span className="text-xs text-gray-700 w-8 text-right">
        {design.logoSize}%
      </span>
    </div>
  </div>
)}

            {design.logo && (
              <button type="button" onClick={() => setDesign({ ...design, logo: null })} className="mt-2 w-full px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition">
                Remove Logo
              </button>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}