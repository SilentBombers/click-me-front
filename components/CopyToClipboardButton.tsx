import { Button, Snackbar } from '@mui/material';
import React, { useState, useEffect } from 'react';

interface PropType {
    siteText: string;
}

const CopyToClipboardButton = (props: PropType) => {
    const { siteText } = props;
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        navigator.clipboard.writeText(siteText)
            .then(() => {
                setOpen(true);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };

    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                setOpen(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [open]);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button
                variant="contained"
                size="medium"
                sx={{ borderRadius: 2, fontWeight: 'bold' }}
                onClick={handleClick}
            >
                Copy
            </Button>
            <Snackbar
                open={open}
                onClose={handleClose}
                message="Copied!"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
            />
        </>
    );
};

export default CopyToClipboardButton;
