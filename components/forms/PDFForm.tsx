'use client';

import { useState, ChangeEvent } from 'react';
import { supabase } from '@/lib/superbase';
import { HandleContentCreateData } from '@/types/qr-generator';
import {
  Box,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  createTheme,
  ThemeProvider,
} from '@mui/material';

// Theme
const theme = createTheme({
  typography: {
    fontFamily: '"Sen", sans-serif',
  },
  components: {
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderColor: 'black',
          '&:hover': { borderColor: 'black' },
          '&.Mui-focused': {
            borderColor: 'black',
            backgroundColor: '#e8e8e8',
          },
        },
      },
    },
  },
});

// Use unified interface
interface FormProps {
  linkContent: (data: HandleContentCreateData) => void;
}

// Component
const PDFForm: React.FC<FormProps> = ({ linkContent }) => {
  const [pdfContent, setPdfContent] = useState('');
  const [uploadType, setUploadType] = useState<'file' | 'url'>('file');
  const [errorMessage, setErrorMessage] = useState('');

  const updatePdfContent = (content: string, type = uploadType) => {
    setPdfContent(content);
    linkContent({
      type: 'pdf',
      data: {
        pdfContent: content,
        uploadType: type,
      },
    });
  };

  const handleUploadTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedType = e.target.value as 'file' | 'url';
    setUploadType(selectedType);
    setPdfContent('');
    setErrorMessage('');
  };

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    updatePdfContent(e.target.value);
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setErrorMessage('You must be logged in to upload files.');
      return;
    }

    const filePath = `pdfs/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from('pdf-uploads')
      .upload(filePath, file);

    if (uploadError) {
      console.error(uploadError);
      setErrorMessage('Error uploading file: ' + uploadError.message);
      return;
    }

    const { data: urlData } = supabase.storage
      .from('pdf-uploads')
      .getPublicUrl(filePath);

    updatePdfContent(urlData.publicUrl, 'file');
    setErrorMessage('');
  };

  const handleGenerateQR = () => {
    if (!pdfContent.trim()) {
      setErrorMessage('Please provide a valid PDF file or URL.');
      return;
    }
    updatePdfContent(pdfContent, uploadType);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box component="form" noValidate autoComplete="off">
        {/* Error */}
        {errorMessage && (
          <Box
            sx={{
              backgroundColor: '#f44336',
              color: '#fff',
              padding: 2,
              borderRadius: 1,
              marginBottom: 2,
            }}
          >
            {errorMessage}
          </Box>
        )}

        {/* Upload Type */}
        <RadioGroup value={uploadType} onChange={handleUploadTypeChange} row>
          <FormControlLabel
            value="file"
            control={<Radio />}
            label="Upload PDF File"
          />
          <FormControlLabel
            value="url"
            control={<Radio />}
            label="Enter PDF URL"
          />
        </RadioGroup>

        {/* Input Field */}
        {uploadType === 'file' ? (
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            style={{ marginTop: '16px' }}
          />
        ) : (
          <TextField
            label="PDF URL"
            variant="filled"
            type="url"
            placeholder="https://example.com/document.pdf"
            value={pdfContent}
            onChange={handleUrlChange}
            required
            fullWidth
            margin="normal"
          />
        )}

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateQR}
          sx={{ mt: 2 }}
        >
          Generate QR Code
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default PDFForm;
