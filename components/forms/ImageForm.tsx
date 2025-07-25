"use client";

import { useState, ChangeEvent } from "react";
import { uploadImageAndGetURL } from "../../lib/uploadImage";
import { supabase } from "@/lib/superbase";
import {
  Box,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { HandleContentCreateData } from "@/types/qr-generator";

// ------------------
// Theme
// ------------------
const theme = createTheme({
  typography: {
    fontFamily: '"Sen", sans-serif',
  },
  components: {
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderColor: "black",
          "&:hover": {
            borderColor: "black",
          },
          "&.Mui-focused": {
            borderColor: "black",
            backgroundColor: "#e8e8e8",
          },
        },
      },
    },
  },
});


// Types
interface ImageFormProps {
  linkContent: (info: HandleContentCreateData) => void;
}


// Component001
const ImageForm: React.FC<ImageFormProps> = ({ linkContent }) => {
  const [imageContent, setImageContent] = useState<string>("");
  const [uploadType, setUploadType] = useState<"file" | "url">("file");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const updateImageContent = (content: string, type = uploadType) => {
    setImageContent(content);
    linkContent({
      type: "image",
      data: {
        imageContent: content,
        uploadType: type,
      },
    });
  };

  const handleUploadTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedType = e.target.value as "file" | "url";
    setUploadType(selectedType);
    setImageContent("");
    setErrorMessage("");
  };

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateImageContent(e.target.value);
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (!user || error) {
      console.error("User is not authenticated.");
      setErrorMessage("You must be logged in to upload files.");
      return;
    }

    try {
      const downloadURL = await uploadImageAndGetURL(file);
      updateImageContent(downloadURL, "file");
      setErrorMessage("");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unknown error occurred.";
      console.error("Upload failed:", message);
      setErrorMessage("Error uploading file: " + message);
    }
  };

  const handleGenerateQR = () => {
    if (!imageContent.trim()) {
      setErrorMessage("Please provide an image URL or upload a file.");
      return;
    }
    updateImageContent(imageContent, uploadType);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box component="form" noValidate autoComplete="off">
        {/* Error Message */}
        {errorMessage && (
          <Box
            sx={{
              backgroundColor: "#f44336",
              color: "#fff",
              padding: 2,
              borderRadius: 1,
              marginBottom: 2,
            }}
          >
            {errorMessage}
          </Box>
        )}

        {/* Upload Type Radio */}
        <RadioGroup value={uploadType} onChange={handleUploadTypeChange} row>
          <FormControlLabel
            value="file"
            control={<Radio />}
            label="Upload Image File"
          />
          <FormControlLabel
            value="url"
            control={<Radio />}
            label="Enter Image URL"
          />
        </RadioGroup>

        {/* File Input or URL TextField */}
        {uploadType === "file" ? (
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ marginTop: "16px" }}
          />
        ) : (
          <TextField
            label="Image URL"
            variant="filled"
            type="url"
            value={imageContent}
            onChange={handleUrlChange}
            placeholder="https://example.com/image.jpg"
            fullWidth
            required
            margin="normal"
          />
        )}

        {/* Generate Button */}
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

export default ImageForm;
