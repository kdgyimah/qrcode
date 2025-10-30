import { supabase } from '@/lib/supabase';
import type { Scan, CreateScan } from '@/types/database';

export const scanService = {
  /**
   * Get all scans for a specific QR code
   */
  async getScansForQR(qrId: string): Promise<Scan[]> {
    const { data, error } = await supabase
      .from('scans')
      .select('*')
      .eq('qr_id', qrId)
      .order('scanned_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching scans:', error);
      throw error;
    }
    
    return data || [];
  },

  /**
   * Get all scans for user's QR codes
   */
  async getAllScans(): Promise<Scan[]> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Get all QR codes for the user first
    const { data: qrCodes, error: qrError } = await supabase
      .from('qr_codes')
      .select('id')
      .eq('user_id', user.id);
    
    if (qrError) {
      console.error('Error fetching QR codes:', qrError);
      throw qrError;
    }

    const qrIds = qrCodes.map(qr => qr.id);

    // Get all scans for these QR codes
    const { data, error } = await supabase
      .from('scans')
      .select('*')
      .in('qr_id', qrIds)
      .order('scanned_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching scans:', error);
      throw error;
    }
    
    return data || [];
  },

  /**
   * Record a new scan
   */
  async recordScan(scanData: CreateScan): Promise<Scan> {
    const { data, error } = await supabase
      .from('scans')
      .insert(scanData)
      .select()
      .single();
    
    if (error) {
      console.error('Error recording scan:', error);
      throw error;
    }
    
    return data;
  },

  /**
   * Get scan statistics for a QR code
   */
  async getQRScanStats(qrId: string): Promise<{
    total: number;
    today: number;
    thisWeek: number;
    thisMonth: number;
    byCountry: Record<string, number>;
    byDevice: Record<string, number>;
  }> {
    const scans = await this.getScansForQR(qrId);
    
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const byCountry: Record<string, number> = {};
    const byDevice: Record<string, number> = {};

    let today = 0;
    let thisWeek = 0;
    let thisMonth = 0;

    scans.forEach(scan => {
      const scanDate = new Date(scan.scanned_at);
      
      if (scanDate >= todayStart) today++;
      if (scanDate >= weekStart) thisWeek++;
      if (scanDate >= monthStart) thisMonth++;

      if (scan.country) {
        byCountry[scan.country] = (byCountry[scan.country] || 0) + 1;
      }
      
      if (scan.device) {
        byDevice[scan.device] = (byDevice[scan.device] || 0) + 1;
      }
    });

    return {
      total: scans.length,
      today,
      thisWeek,
      thisMonth,
      byCountry,
      byDevice,
    };
  },

  /**
   * Get recent scans (last N scans)
   */
  async getRecentScans(limit: number = 10): Promise<Scan[]> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Get all QR codes for the user
    const { data: qrCodes, error: qrError } = await supabase
      .from('qr_codes')
      .select('id')
      .eq('user_id', user.id);
    
    if (qrError) {
      console.error('Error fetching QR codes:', qrError);
      throw qrError;
    }

    const qrIds = qrCodes.map(qr => qr.id);

    // Get recent scans
    const { data, error } = await supabase
      .from('scans')
      .select('*')
      .in('qr_id', qrIds)
      .order('scanned_at', { ascending: false })
      .limit(limit);
    
    if (error) {
      console.error('Error fetching recent scans:', error);
      throw error;
    }
    
    return data || [];
  },
};