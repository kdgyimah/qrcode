"use client";

import { useState } from 'react';
import { supabase } from '@/lib/superbase';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import '../QRInterface/QR-Interface.css';

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

interface PDFFormProps {
  linkContent: (info: { pdfContent: string; uploadType?: string }) => void;
}

const PDFForm = ({ linkContent }: PDFFormProps) => {
  const [formInfo, setFormInfo] = useState({ pdfContent: '' });
  const [uploadType, setUploadType] = useState('file');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInfo({ ...formInfo, [name]: value });
  };

  const handleUploadTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadType(e.target.value);
    setFormInfo({ pdfContent: '' });
    setErrorMessage('');
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      setErrorMessage("You must be logged in to upload files.");
      return;
    }

    const filePath = `pdfs/${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from('pdf-uploads') // ← your bucket name
      .upload(filePath, file);

    if (error) {
      console.error(error);
      setErrorMessage("Error uploading file: " + error.message);
      return;
    }

    const { data: urlData } = supabase
      .storage
      .from('pdf-uploads')
      .getPublicUrl(filePath);

    const publicUrl = urlData.publicUrl;

    setFormInfo({ pdfContent: publicUrl });
    linkContent({ pdfContent: publicUrl, uploadType });
  };

  const handleGenerateQR = () => {
    linkContent({ ...formInfo, uploadType });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className='pdf-form' component="form" noValidate autoComplete="off">
        {errorMessage && (
          <div className="tw-bg-red-500 tw-text-white tw-p-3 tw-rounded tw-mb-4">
            {errorMessage}
          </div>
        )}

        <RadioGroup value={uploadType} onChange={handleUploadTypeChange} row>
          <FormControlLabel value="file" control={<Radio />} label="Upload PDF File" />
          <FormControlLabel value="url" control={<Radio />} label="Enter PDF URL" />
        </RadioGroup>

        {uploadType === 'file' ? (
          <input
            type="file"
            name="pdfContent"
            onChange={handleFileChange}
            accept="application/pdf"
          />
        ) : (
          <TextField
            id="pdf-url-field"
            label="PDF URL"
            variant="filled"
            color="primary"
            type="text"
            name="pdfContent"
            placeholder="https://example.com/document.pdf"
            value={formInfo.pdfContent}
            onChange={handleChange}
            required
          />
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateQR}
          style={{ marginTop: '10px' }}
        >
          Generate QR Code
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default PDFForm;
