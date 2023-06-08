import { React, useState } from 'react'
import { Grid, TextField, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Search } from "@mui/icons-material";

function SearchForm(props) {
    const { t } = useTranslation();
    const [child, setChild] = useState({
        search_key: ''
    });
    const searchSchema = yup.object({
        search_key: yup
            .string('')
            .required(t('search_key')),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(searchSchema)
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        //setIssearch(true);
        setChild((prevState) => ({
          ...prevState,
          [name]: value
        }));
      };

    const onSubmit = (data) => { }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container style={{ borderColor: '#fff', padding: 5 }}>
                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        sx={{
                            marginLeft: 1, marginRight: 10, marginTop: 1, marginBottom: 0, "& .MuiInputBase-root": {
                                height: 40,
                            }
                        }}
                        label={t('search_key')}
                        id='search_key'
                        name='search_key'
                        {...register('search_key', { required: true })}
                        onChange={handleInputChange}
                        value={child.search_key}
                    />
                </Grid>
                <Grid item sm={6}>
                    <Button style={{ marginLeft: 20, marginBottom: 20, marginTop: 10 }} variant="outlined" color="primary" type="submit">
                        <Search style={{ marginRight: 10 }} />{t('search')}
                    </Button>
                    <Button style={{ marginLeft: 20, marginBottom: 20, marginTop: 10 }} variant="outlined" color="primary" type="submit">
                        <Search style={{ marginRight: 10 }} />{t(props.allpayment)}
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default SearchForm