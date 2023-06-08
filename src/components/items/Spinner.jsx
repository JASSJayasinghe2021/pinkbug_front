import { Box } from '@mui/material';
import React from 'react';
import { Blocks } from 'react-loader-spinner';

function Spinner({ message }) {
    return (
        <Box
            sx={{
                margin: 0,
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
            }}>
            <Blocks
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
            />
            <p className='text-lg text-center px-2'>{message}</p>
        </Box>


    )
}

export default Spinner