'use client';

import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
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
          '&:hover': {
            borderColor: 'black',
          },
          '&.Mui-focused': {
            borderColor: 'black',
            backgroundColor: '#e8e8e8',
          },
        },
      },
    },
  },
});

interface LinkFormProps {
  linkContent: (info: {
    url: string;
    description: string;
    imageUrl: string;
  }) => void;
}

const LinkForm = ({ linkContent }: LinkFormProps) => {
  const [formInfo, setFormInfo] = useState({
    url: '',
    description: '',
    imageUrl: '',
  });

  const [uploadType, setUploadType] = useState<'file' | 'url'>('file');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedFormInfo = {
      ...formInfo,
      [name]: value,
    };
    setFormInfo(updatedFormInfo);
    linkContent(updatedFormInfo);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const updatedFormInfo = {
        ...formInfo,
        imageUrl,
      };
      setFormInfo(updatedFormInfo);
      linkContent(updatedFormInfo);
    }
  };

  const handleUploadTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadType(e.target.value as 'file' | 'url');
    setFormInfo({ ...formInfo, imageUrl: '' });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className="link-form" component="form" noValidate autoComplete="off">
        <TextField
          id="link-field"
          label="URL"
          variant="filled"
          color="primary"
          type="text"
          name="url"
          placeholder="https://example.com"
          value={formInfo.url}
          onChange={handleChange}
          required
        />
        <br />
        <TextField
          id="description-field"
          label="Description"
          variant="filled"
          color="primary"
          multiline
          rows={2}
          placeholder="Enter your text here..."
          name="description"
          value={formInfo.description}
          onChange={handleChange}
          required
        />
        <br />
        <RadioGroup value={uploadType} onChange={handleUploadTypeChange} row>
          <FormControlLabel value="file" control={<Radio />} label="Upload Image File" />
          <FormControlLabel value="url" control={<Radio />} label="Enter Image URL" />
        </RadioGroup>

        {uploadType === 'file' ? (
          <input
            type="file"
            name="imageUrl"
            onChange={handleFileChange}
            accept="image/*"
          />
        ) : (
          <TextField
            id="image-url-field"
            label="Image URL"
            variant="filled"
            color="primary"
            type="text"
            name="imageUrl"
            placeholder="https://example.com/image.jpg"
            value={formInfo.imageUrl}
            onChange={handleChange}
            required
          />
        )}
      </Box>
    </ThemeProvider>
  );
};

export default LinkForm;
