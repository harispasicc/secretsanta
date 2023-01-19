import React, { useState, useContext } from 'react';
import { Button, Modal, Box, IconButton, Typography, TextField, } from '@mui/material';
import { useFormik } from 'formik';
import Close from '@mui/icons-material/Close';
import { StateContext } from '../../contexts/StateContext';
import { confirmPassword } from '../../api/api-auth';

const PasswordModal = () => {
    const [openModal, setOpenModal] = useState(false);
    const [error, setError] = useState('');
    const { user, setChildMode } = useContext(StateContext);

    const formik = useFormik({
        initialValues: {
            password: ''
        }
    })
    const cancel = () => {
        setOpenModal(false);
        formik.handleReset();
        setError('');
    }

    const onChange = (e) => {
        formik.handleChange(e);
        setError('');
    }

    const submit = async () => {
        const confirmPass = { userId: user._id, password: formik.values.password }

        const res = await confirmPassword(confirmPass);
        if (res.error) {
            setError(res.error);
        } else {
            setChildMode(false);
        }
    }

    return (
        <>
            <Button className="submit-button" variant="contained" color="primary" size="large" sx={{marginLeft:'10px'}}
                onClick={() => setOpenModal(true)}>
                Get Parent
            </Button>
            <Modal open={openModal} onClose={cancel} aria-labelledby="modal-modal-title" >
                <Box className='modalLetter'>
                    <Box sx={{
                        textAlign: 'right', marginRight: "-25px" }}>
                        <IconButton color="inherit" onClick={cancel} aria-label="close">
                            <Close />
                        </IconButton>
                    </Box>
                    <div style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        marginBottom: "20px",
                    }}
                    >
                        <Typography id="modal-modal-title" variant="h5" component="h2" sx={{fontFamily:"Satisfy"}}>
                            Enter password
                        </Typography>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            label="Password"
                            name="password"
                            type='password'
                            value={formik.values.password}
                            onChange={onChange}
                            sx={{ width: "220px", borderRadius: "6px" }}
                        />
                    </form>
                    <Box className='error'>
                        {error &&
                            <Typography color='error' sx={{ fontSize: '12px', paddingTop: '10px' }}>{error}</Typography>
                        }</Box>
                    <div className="modal-buttons">
                        <Button className="submit-button" variant="contained" color="success" type="submit"
                            onClick={submit} >
                            Submit
                        </Button>
                        <Button onClick={cancel} variant="contained" style={{ backgroundColor: "gray" }}>
                            Cancel
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>

    )
}

export default PasswordModal
