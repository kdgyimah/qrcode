import { supabase } from '@/lib/supabase';

export const uploadImageAndGetURL = async (file: File): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `uploads/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('qr-images') 
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data: publicUrlData } = supabase.storage
    .from('qr-images')
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
};
