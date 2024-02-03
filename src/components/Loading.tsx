import CircularProgress from "@mui/material/CircularProgress";
import { Box as MuiBox, styled, Stack } from "@mui/material";

export const Box = styled(MuiBox)(
  () => `
        position: fixed;
        width: 100%;
        height: 100%;
        top:0;
        left:0;
        align-items: center;
        justify-content: center;
        background: rgba(0,0,0,0.5);
        z-index: 1200;
        border-radius: 5px;
        display: flex;
        color: white;
    `
);

const Loading = ({ message }: { message: string }) => (
  <Box className="loading">
    <Stack
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <CircularProgress />
      <span>{message}</span>
    </Stack>
  </Box>
);

export default Loading;
