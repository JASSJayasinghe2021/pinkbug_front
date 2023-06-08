import * as React from 'react';
import { Box, Button, Modal, TextField } from '@mui/material';
import { useTranslation } from "react-i18next";
import { Add } from "@mui/icons-material";
import Loanform from './Loanform';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '0px solid #4A148C',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export default function Loanmodel(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { t, i18n } = useTranslation();

  return (
    <div>
      <Button style={{ marginLeft: 10, marginTop: 10, marginBottom: 5 }} variant="outlined" color="primary" onClick={handleOpen}>
        <Add style={{ marginRight: 10 }} />{t('loan')}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Loanform close={handleClose} id={props.id} item={props.item} formclose={props.close} />
        </Box>
      </Modal>
    </div>
  );
}