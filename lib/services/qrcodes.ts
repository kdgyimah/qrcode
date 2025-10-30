import { supabase } from '@/lib/supabase';
import type { QRCode, CreateQRCode, UpdateQRCode } from '@/types/database';

export const qrCodeService = {
  /**
   * Get all QR codes for the current user
   */
  async getQRCodes(folderId?: string | null): Promise<QRCode[]> {
    let query = supabase
      .from('qr_codes')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (folderId !== undefined) {
      if (folderId === null) {
        // Get QR codes without folder
        query = query.is('folder_id', null);
      } else {
        // Get QR codes in specific folder
        query = query.eq('folder_id', folderId);
      }
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching QR codes:', error);
      throw error;
    }
    
    return data || [];
  },

  /**
   * Get a single QR code by ID
   */
  async getQRCode(id: string): Promise<QRCode> {
    const { data, error } = await supabase
      .from('qr_codes')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching QR code:', error);
      throw error;
    }
    
    return data;
  },

  /**
   * Create a new QR code
   */
  async createQRCode(qrData: CreateQRCode): Promise<QRCode> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('qr_codes')
      .insert({
        ...qrData,
        user_id: user.id,
        scans_count: 0,
        is_active: true,
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating QR code:', error);
      throw error;
    }
    
    return data;
  },

  /**
   * Update a QR code
   */
  async updateQRCode(id: string, updates: UpdateQRCode): Promise<QRCode> {
    const { data, error } = await supabase
      .from('qr_codes')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating QR code:', error);
      throw error;
    }
    
    return data;
  },

  /**
   * Delete a QR code
   */
  async deleteQRCode(id: string): Promise<void> {
    const { error } = await supabase
      .from('qr_codes')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting QR code:', error);
      throw error;
    }
  },

  /**
   * Toggle QR code active status
   */
  async toggleActive(id: string, isActive: boolean): Promise<QRCode> {
    return this.updateQRCode(id, { is_active: isActive });
  },

  /**
   * Move QR code to a folder
   */
  async moveToFolder(id: string, folderId: string | null): Promise<QRCode> {
    return this.updateQRCode(id, { folder_id: folderId });
  },

  /**
   * Increment scan count
   */
  async incrementScans(id: string): Promise<void> {
    // First try using the database function if you've created it
    const { error: rpcError } = await supabase.rpc('increment_scans', { qr_id: id });
    
    if (rpcError) {
      // Fallback: manual increment if function doesn't exist
      const qr = await this.getQRCode(id);
      await this.updateQRCode(id, { scans_count: qr.scans_count + 1 });
    }
  },

  /**
   * Get QR codes statistics
   */
  async getStats(): Promise<{
    total: number;
    active: number;
    inactive: number;
    totalScans: number;
  }> {
    const qrCodes = await this.getQRCodes();
    
    return {
      total: qrCodes.length,
      active: qrCodes.filter(qr => qr.is_active).length,
      inactive: qrCodes.filter(qr => !qr.is_active).length,
      totalScans: qrCodes.reduce((sum, qr) => sum + qr.scans_count, 0),
    };
  },

  /**
   * Search QR codes
   */
  async searchQRCodes(searchTerm: string): Promise<QRCode[]> {
    const { data, error } = await supabase
      .from('qr_codes')
      .select('*')
      .or(`name.ilike.%${searchTerm}%,type.ilike.%${searchTerm}%`)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error searching QR codes:', error);
      throw error;
    }
    
    return data || [];
  },
};