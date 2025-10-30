import { supabase } from '@/lib/supabase';
import type { Folder, CreateFolder, UpdateFolder } from '@/types/database';

export const folderService = {
  /**
   * Get all folders for the current user
   */
  async getFolders(): Promise<Folder[]> {
    const { data, error } = await supabase
      .from('folders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching folders:', error);
      throw error;
    }
    
    return data || [];
  },

  /**
   * Get a single folder by ID
   */
  async getFolder(id: string): Promise<Folder> {
    const { data, error } = await supabase
      .from('folders')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching folder:', error);
      throw error;
    }
    
    return data;
  },

  /**
   * Create a new folder
   */
  async createFolder(folderData: CreateFolder): Promise<Folder> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('folders')
      .insert({
        ...folderData,
        user_id: user.id,
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating folder:', error);
      throw error;
    }
    
    return data;
  },

  /**
   * Update a folder
   */
  async updateFolder(id: string, updates: UpdateFolder): Promise<Folder> {
    const { data, error } = await supabase
      .from('folders')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating folder:', error);
      throw error;
    }
    
    return data;
  },

  /**
   * Delete a folder
   */
  async deleteFolder(id: string): Promise<void> {
    const { error } = await supabase
      .from('folders')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting folder:', error);
      throw error;
    }
  },

  /**
   * Get QR codes count for a folder
   */
  async getFolderQRCount(folderId: string): Promise<number> {
    const { count, error } = await supabase
      .from('qr_codes')
      .select('*', { count: 'exact', head: true })
      .eq('folder_id', folderId);
    
    if (error) {
      console.error('Error counting QR codes:', error);
      throw error;
    }
    
    return count || 0;
  },
};