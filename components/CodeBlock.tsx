import React from "react";
import { Grid, Paper } from "@mui/material";
import CopyToClipboardButton from "@/components/CopyToClipboardButton";

interface PropType {
    siteText: string;
}

const CodeBlock = ({ siteText }: PropType) => {
    return (
        <Paper
            sx={{
                backgroundColor: "#282a36",
                borderRadius: 5,
                p: 3,
                overflowX: "auto",
            }}
        >
      <pre
          style={{
              color: "white",
              fontSize: "14px",
              margin: 0,
              fontFamily: "monospace",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
          }}
      >
        {siteText}
      </pre>
            <Grid container sx={{ justifyContent: "flex-end", pt: 1 }}>
                <CopyToClipboardButton siteText={siteText} />
            </Grid>
        </Paper>
    );
};

export default CodeBlock;
