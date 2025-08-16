"use client";

import { useState, ChangeEvent } from "react";
import { uploadImageAndGetURL } from "@/lib/uploadImage";
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
import type { FormProps } from "@/types/qr-generator";
import type { ImageFormData } from "@/types/qr-generator";

// --------------------------------------------------
// Theme
// --------------------------------------------------
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

// --------------------------------------------------
// Component
// --------------------------------------------------
export const ImageForm: React.FC<FormProps<ImageFormData>> = ({
  formData,
  errors,
  onChange,
  onContentCreate,
}) => {
  const [uploadType, setUploadType] = useState<"file" | "url">(
    formData.uploadType || "file"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const updateImageContent = (content: string, type = uploadType) => {
    onContentCreate({
      ...formData,
      imageUrl: content,
      uploadType: type,
    });
  };

  const handleUploadTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedType = e.target.value as "file" | "url";
    setUploadType(selectedType);
    onChange("uploadType", selectedType);
    updateImageContent("");
    setErrorMessage("");
  };

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange("imageUrl", value);
    updateImageContent(value);
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

      onChange("file", file);
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
    if (!formData.imageUrl?.trim()) {
      setErrorMessage("Please provide an image URL or upload a file.");
      return;
    }
    updateImageContent(formData.imageUrl, uploadType);
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
            name="imageUrl"
            value={formData.imageUrl || ""}
            onChange={handleUrlChange}
            placeholder="https://example.com/image.jpg"
            fullWidth
            required
            margin="normal"
            error={!!errors.imageUrl}
            helperText={errors.imageUrl}
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
