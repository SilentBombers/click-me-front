import {Button, Snackbar} from '@mui/material'
import React, {useState} from "react";

interface PropType {
    siteText: string;
}

const CopyToClipboardButton = (props: PropType) => {
    const {siteText} = props;
    const [open, setOpen] = useState(false)
    const handleClick = () => {
        setOpen(true)
        navigator.clipboard.writeText(siteText)
    }

    return (
        <>
            <Button variant="contained" size="medium" sx={{borderRadius: 2, fontWeight: "bold",}}
                    onClick={handleClick}>Copy</Button>
            <Snackbar
                open={open}
                onClose={() => setOpen(false)}
                autoHideDuration={2000}
                message="Copied!"
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
            />
        </>
    )
}

export default CopyToClipboardButton