"use client";

import { useState, ChangeEvent, FocusEvent } from "react";
import { uploadImageAndGetURL } from "@/lib/uploadImage";
import { supabase } from "@/lib/supabase";
import {
  Box,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import type { FormProps, ImageFormData } from "@/types/qr-generator";

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
  onChange,
  onContentCreate,
}) => {
  const [uploadType, setUploadType] = useState<"file" | "url">(
    formData.uploadType || "file"
  );
  const [localError, setLocalError] = useState<string>("");
  const [touched, setTouched] = useState(false); // track interaction

  // Update helper
  const updateImageContent = (content: string, type = uploadType) => {
    onContentCreate({
      ...formData,
      imageUrl: content,
      uploadType: type,
    });
  };

  // Upload type switch
  const handleUploadTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedType = e.target.value as "file" | "url";
    setUploadType(selectedType);
    onChange("uploadType", selectedType);
    updateImageContent("");
    setLocalError("");
    setTouched(false);
  };

  // URL input
  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.trim();

    // Auto-add https:// if missing
    if (value && !/^https?:\/\//i.test(value)) {
      value = "https://" + value;
    }

    onChange("imageUrl", value);
    updateImageContent(value);

    if (touched) validateUrl(value); 
  };

  // Mark as touched on blur
  const handleUrlBlur = (e: FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    validateUrl(e.target.value.trim());
  };

  // Validate URL
  const validateUrl = (value: string) => {
    if (!value) {
      setLocalError("This field is required.");
    } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(value)) {
      setLocalError("Please enter a valid image URL.");
    } else {
      setLocalError(""); // clear if fixed
    }
  };

  // File input
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (!user || error) {
      setLocalError("You must be logged in to upload files.");
      return;
    }

    try {
      const downloadURL = await uploadImageAndGetURL(file);
      onChange("file", file);
      updateImageContent(downloadURL, "file");
      setLocalError("");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unknown error occurred.";
      setLocalError("Error uploading file: " + message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box component="form" noValidate autoComplete="off">
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
            type="url"
            name="imageUrl"
            value={formData.imageUrl || ""}
            onChange={handleUrlChange}
            onBlur={handleUrlBlur}
            placeholder="https://example.com/image.jpg"
            fullWidth
            required
            margin="normal"
            error={!!localError}
            helperText={localError}
          />
        )}
      </Box>
    </ThemeProvider>
  );
};
