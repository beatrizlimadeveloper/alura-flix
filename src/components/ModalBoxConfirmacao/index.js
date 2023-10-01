import { CheckCircleOutlineOutlined } from "@mui/icons-material";
import { Box, Grow, Typography } from "@mui/material";

export default function BoxConfirmacao({
  confirmacao,
  textConfirmacao,
  children,
}) {
  return (
    <>
      {!confirmacao ? (
        children
      ) : (
        <Grow in={confirmacao}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <CheckCircleOutlineOutlined sx={{ fontSize: 64, color: "green" }} />
            <Typography variant="h6" color="textSecondary">
              {textConfirmacao}
            </Typography>
          </Box>
        </Grow>
      )}
    </>
  );
}
