import { Box, Stack } from "@mui/material";
import { ReactNode } from "react";

export default function FormActions(props: { children: ReactNode }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        py: 1,
        width: "100%",
      }}
    >
      <Stack spacing={1} direction={"row"}>
        {props.children}
      </Stack>
    </Box>
  );
}
