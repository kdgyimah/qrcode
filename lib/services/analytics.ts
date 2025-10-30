import { supabase } from "@/lib/supabase";

export interface ScanRecord {
  qrCodeId: string;
  deviceType?: string;
  os?: string;
  browser?: string;
  country?: string;
  city?: string;
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
}

export const analyticsService = {
  // Track a QR code scan
  async trackScan(scanData: ScanRecord) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Insert scan record
      const { error: insertError } = await supabase
        .from("qr_scans")
        .insert({
          qr_code_id: scanData.qrCodeId,
          user_id: user?.id,
          device_type: scanData.deviceType,
          os: scanData.os,
          browser: scanData.browser,
          country: scanData.country,
          city: scanData.city,
          ip_address: scanData.ipAddress,
          user_agent: scanData.userAgent,
          referrer: scanData.referrer,
        });

      if (insertError) throw insertError;

      // Increment scan count
      const { error: funcError } = await supabase
        .rpc("increment_qr_scan", { qr_id: scanData.qrCodeId });

      if (funcError) throw funcError;

      return { success: true };
    } catch (error) {
      console.error("Error tracking scan:", error);
      return { success: false, error };
    }
  },

  // Get scan analytics for a specific QR code
  async getQrAnalytics(qrCodeId: string, days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data, error } = await supabase
      .from("qr_scans")
      .select("*")
      .eq("qr_code_id", qrCodeId)
      .gte("scanned_at", startDate.toISOString())
      .order("scanned_at", { ascending: true });

    if (error) throw error;
    return data;
  },

  // Get device type distribution
  async getDeviceTypeStats(userId: string, days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data, error } = await supabase
      .from("qr_scans")
      .select("device_type")
      .eq("user_id", userId)
      .gte("scanned_at", startDate.toISOString());

    if (error) throw error;

    // Count occurrences
    const counts: { [key: string]: number } = {};
    data?.forEach(scan => {
      const device = scan.device_type || "Unknown";
      counts[device] = (counts[device] || 0) + 1;
    });

    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  },

  // Get OS distribution
  async getOsStats(userId: string, days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data, error } = await supabase
      .from("qr_scans")
      .select("os")
      .eq("user_id", userId)
      .gte("scanned_at", startDate.toISOString());

    if (error) throw error;

    const counts: { [key: string]: number } = {};
    data?.forEach(scan => {
      const os = scan.os || "Unknown";
      counts[os] = (counts[os] || 0) + 1;
    });

    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  },

  // Get country distribution
  async getCountryStats(userId: string, days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data, error } = await supabase
      .from("qr_scans")
      .select("country")
      .eq("user_id", userId)
      .gte("scanned_at", startDate.toISOString());

    if (error) throw error;

    const counts: { [key: string]: number } = {};
    data?.forEach(scan => {
      const country = scan.country || "Unknown";
      counts[country] = (counts[country] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5); // Top 5 countries
  },

  // Get daily scan activity
  async getDailyScanActivity(userId: string, days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data, error } = await supabase
      .from("qr_scans")
      .select("scanned_at")
      .eq("user_id", userId)
      .gte("scanned_at", startDate.toISOString())
      .order("scanned_at", { ascending: true });

    if (error) throw error;

    // Group by date
    const dateMap: { [key: string]: number } = {};
    
    // Initialize all dates with 0
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (days - 1 - i));
      const dateStr = date.toLocaleDateString("en-US", { 
        month: "short", 
        day: "numeric" 
      });
      dateMap[dateStr] = 0;
    }

    // Count scans per date
    data?.forEach(scan => {
      const date = new Date(scan.scanned_at);
      const dateStr = date.toLocaleDateString("en-US", { 
        month: "short", 
        day: "numeric" 
      });
      if (dateStr in dateMap) {
        dateMap[dateStr]++;
      }
    });

    return Object.entries(dateMap).map(([date, scans]) => ({ date, scans }));
  },
};