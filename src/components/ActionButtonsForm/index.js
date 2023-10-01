import styles from './ActionButtonsForms.module.css'
import { Button } from "@mui/material";

export default function ActionButtonsForms({ bgColor,textColor, onClick, handleClose, textBtnSubmit, hover, type }) {
  return (
    <div className={styles.flex}>
      <Button
        type={type}
        variant="outlined"
        size="large"
        sx={{
          backgroundColor: bgColor,
          color: textColor,
          ":hover": {backgroundColor: hover, borderColor: hover}
        }}
        onClick={onClick}
        fullWidth
      >
        {textBtnSubmit}
      </Button>
      <Button
        type="reset"
        onClick={handleClose}
        variant="outlined"
        size="large"
        fullWidth
      >
        Cancelar
      </Button>
    </div>
  );
}
