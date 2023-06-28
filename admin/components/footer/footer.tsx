import React from "react";
import { Button } from "@keystone-ui/button";

export default function Footer({ save }: { save: () => void }) {
  return (
    <div
      style={{
        WebkitTextSizeAdjust: "100%",
        color: "#374151",
        fontSize: "1rem",
        fontWeight: 400,
        lineHeight: "1.4",
        fontFamily: 'system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",sans-serif',
        textRendering: "optimizeLegibility",
        WebkitFontSmoothing: "antialiased",
        boxSizing: "border-box",
        borderWidth: 0,
        borderStyle: "solid",
        borderColor: "#e1e5e9",
        background: "white",
        borderTop: "1px solid #e1e5e9",
        bottom: 0,
        display: "flex",
        WebkitBoxPack: "justify",
        justifyContent: "space-between",
        marginTop: "24px",
        paddingBottom: "24px",
        paddingTop: "24px",
        position: "sticky",
        zIndex: 20
      }}
    >
      <Button tone='active' size='medium' color='blue' onClick={() => save()}>
        {" "}
        Save Changes{" "}
      </Button>
    </div>
  );
}
