import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

export default function FormStep(props: {
  title: string;
  number: number;
  children: ReactNode;
}) {
  return (
    <Paper elevation={4} sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            // justifyContent: "center",
          }}
        >
          <Avatar sx={{ mr: 1 }}>{props.number}</Avatar>
          <Typography variant="h2" fontSize={24}>
            {props.title}
          </Typography>
        </Box>
        {props.children}
      </Stack>
    </Paper>
  );
}
