"use client";

import { useState } from "react";
import { uploadImageAndGetURL } from "../../lib/uploadImage";
import { supabase } from "@/lib/superbase";
import PropTypes from "prop-types";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import "../QRInterface/QR-Interface.css";

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

interface ImageFormProps {
  linkContent: (info: { imageContent: string; uploadType?: string }) => void;
}

const ImageForm = ({ linkContent }: ImageFormProps) => {
  const [formInfo, setFormInfo] = useState({
    imageContent: "",
  });
  const [uploadType, setUploadType] = useState("file");
  const [errorMessage, setErrorMessage] = useState("");


  interface ChangeEvent {
    target: {
      name: string;
      value: string;
    };
  }

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target;
    setFormInfo({
      ...formInfo,
      [name]: value,
    });
  };

  interface UploadTypeChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

  const handleUploadTypeChange = (e: UploadTypeChangeEvent): void => {
    setUploadType(e.target.value);
    setErrorMessage(""); // Reset error message on type change
  };

  interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

  const handleFileChange = async (e: FileChangeEvent): Promise<void> => {
    const file: File | undefined = e.target.files?.[0];

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (!user || authError) {
      console.error("User is not authenticated.");
      setErrorMessage("You must be logged in to upload files.");
      return;
    }

    if (file) {
      try {
        const downloadURL = await uploadImageAndGetURL(file);
        setFormInfo({ ...formInfo, imageContent: downloadURL });
        linkContent({ ...formInfo, imageContent: downloadURL });
        setErrorMessage("");
      } catch (error: any) {
        console.error("Upload failed:", error.message);
        setErrorMessage("Error uploading file: " + error.message);
      }
    }
  };

  const handleGenerateQR = () => {
    console.log("Form Info Submitted:", formInfo);
    linkContent({ ...formInfo, uploadType });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        className="image-form"
        component="form"
        noValidate
        autoComplete="off"
      >
        {errorMessage && (
          <div className="tw-bg-red-500 tw-text-white tw-p-3 tw-rounded tw-mb-4">
            {errorMessage}
          </div>
        )}

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

        {uploadType === "file" ? (
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
            value={formInfo.imageContent}
            onChange={handleChange}
            required
          />
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateQR}
          style={{ marginTop: "10px" }}
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
