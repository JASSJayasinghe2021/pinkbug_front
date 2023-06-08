import React from 'react';
import { Modal, Box, Card, CardActionArea, CardMedia, CardActions, Button, Typography } from '@mui/material';
import { useTranslation } from "react-i18next";
import Passwordform from '../models/Passwordform';

function Passwordcard() {
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        border: '0px solid #4A148C',
        borderRadius: '10px',
        boxShadow: 24,
        p: 4,
    };

    const changePassword = () => {
        window.alert('change_password');
    }
    return (
        <>
            <Card sx={{ maxWidth: 200 }}>
                
                <CardActions>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="button"
                        onClick={handleOpen}
                    >
                        {t("change_password")}
                    </Button>
                </CardActions>
            </Card>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Passwordform formclose={handleClose}/>
                  
                </Box>
            </Modal>
        </>
    )
}

export default Passwordcard