import * as React from 'react';
import { Box, Button, Modal, TextField } from '@mui/material';
import { useTranslation } from "react-i18next";
import Form from './Form';
import {Add, Edit } from "@mui/icons-material";

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

export default function Model(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false); props.refresh()}
  const { t, i18n } = useTranslation();
  const title=props.title;

  return (
    <div>
      <Button style={{ marginLeft: 10, marginTop: 10, marginBottom: 5 }} variant="outlined" color="primary" onClick={handleOpen}>
      {!props.edit ? <Add style={{ marginRight: 10 }} /> : <Edit style={{ marginRight: 10 }} />}{t(title)}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Form edit={props.edit} item={props.item} close={handleClose} id={props.id} />
        </Box>
      </Modal>
    </div>
  );
}