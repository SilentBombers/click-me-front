"use client";

import React, { useState, useRef } from "react";
import {
    Box,
    Button,
    Typography,
    CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const HiddenInput = styled("input")({
    display: "none",
});

interface PropType {
    onUpload: (svgUrl: string) => void;
}

const UploadGif = ({ onUpload }: PropType) => {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setIsCompleted(false);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setIsUploading(true);
        const formData = new FormData();
        formData.append("gif", file);

        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/convert`, {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                const { svgUrl } = await response.json();
                onUpload(svgUrl);
                setIsCompleted(true);
            } else {
                alert("Error uploading file");
            }
        } catch (error) {
            console.error("Upload error:", error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Box sx={{ textAlign: "center", padding: "20px" }}>
            <Typography variant="h5">Upload GIF to Convert</Typography>
            <Button
                variant="contained"
                sx={{
                    marginTop: 2,
                    fontSize: "18px",
                    fontWeight: "bold",
                    backgroundColor: "rgba(242, 162, 41)",
                    "&:hover": { backgroundColor: "rgba(242, 162, 41, 0.8)" },
                }}
                onClick={() => fileInputRef.current?.click()}
            >
                {file ? file.name : "File Select"}
            </Button>
            <HiddenInput
                ref={fileInputRef}
                type="file"
                accept="image/gif"
                onChange={handleFileChange}
            />
            <Button
                variant="contained"
                onClick={handleUpload}
                disabled={isUploading || isCompleted || !file}
                sx={{
                    marginTop: 2,
                    marginLeft: 2,
                    fontSize: "18px",
                    fontWeight: "bold",
                    backgroundColor: isCompleted ? "gray" : "rgba(242, 162, 41)",
                    "&:hover": {
                        backgroundColor: isCompleted
                            ? "gray"
                            : "rgba(242, 162, 41, 0.8)",
                    },
                }}
            >
                {isUploading ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                ) : isCompleted ? (
                    "Completed"
                ) : (
                    "Convert"
                )}
            </Button>
        </Box>
    );
};

export default UploadGif;
