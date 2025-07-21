"use client";

import { useState } from 'react';
import { uploadImageAndGetURL } from '../../firebase'; // Adjust path as necessary
import { auth } from '../../firebase'; // Ensure you import your auth configuration
import PropTypes from 'prop-types';
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

const ImageForm = ({ linkContent }) => {
  const [formInfo, setFormInfo] = useState({
    imageContent: '',
  });
  const [uploadType, setUploadType] = useState('file');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInfo({
      ...formInfo,
      [name]: value,
    });
  };

  const handleUploadTypeChange = (e) => {
    setUploadType(e.target.value);
    setFormInfo({ imageContent: '' });
    setErrorMessage(''); // Reset error message on type change
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    // Authentication check before file upload
    const user = auth.currentUser; // Get the current user
    console.log("Current User:", user); // Check if user is authenticated

    if (!user) {
      console.error("User is not authenticated. Cannot upload files.");
      setErrorMessage("You must be logged in to upload files."); // Set error message
      return; // Prevent the upload
    }

    if (file) {
      try {
        const downloadURL = await uploadImageAndGetURL(file); // Use the image upload function
        setFormInfo({ ...formInfo, imageContent: downloadURL });
        linkContent({ ...formInfo, imageContent: downloadURL });
        setErrorMessage(''); // Clear error message on success
      } catch (error) {
        console.error("File upload failed:", error);
        setErrorMessage("Error uploading file: " + error.message); // Set error message
      }
    }
  };

  const handleGenerateQR = () => {
    console.log("Form Info Submitted:", formInfo);
    linkContent({ ...formInfo, uploadType });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className='image-form' component="form" noValidate autoComplete="off">
        {errorMessage && (
          <div className="tw-bg-red-500 tw-text-white tw-p-3 tw-rounded tw-mb-4">
            {errorMessage}
          </div>
        )}

        <RadioGroup value={uploadType} onChange={handleUploadTypeChange} row>
          <FormControlLabel value="file" control={<Radio />} label="Upload Image File" />
          <FormControlLabel value="url" control={<Radio />} label="Enter Image URL" />
        </RadioGroup>

        {uploadType === 'file' ? (
          <div>
            <input
              type="file"
              name="imageContent"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
        ) : (
          <TextField
            id="image-url-field"
            label="Image URL"
            variant="filled"
            color="primary"
            type="text"
            name="imageContent"
            placeholder="https://example.com/image.jpg"
            value={formInfo.imageUrl}
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

ImageForm.propTypes = {
  linkContent: PropTypes.func.isRequired,
};

export default ImageForm;
