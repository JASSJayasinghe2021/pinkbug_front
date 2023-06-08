import React from 'react';
import { makeStyles } from '@mui/material';

const useStyles = makeStyles({
    body: {
    },
    root: {
        backgroundColor: '#f8f8f8',
    },
    logo: {
        height: 120,
        width: 120,
        color: '#73056F'
    },
    field_icon: {
        marginRight: 10,
        color: '#82067E'
    },
    title_btn: {
        fontSize: 16,
        color: '#360334',
        marginLeft:20
    },
    navbar: {
        backgroundColor: '#360334',
        '& a': {
            color: '#ffffff',
            marginLeft: 10,
        },
        color: '#ffffff'
    },
    brand: {
        fontWeight: 'bold',
        fontSize: '1.0rem',
        textDecoration: 'none',
    },
    grow: {
        flexGrow: 1
    },
    main: {
        minHeight: '80vh',
        paddingLeft: 5,
        paddingRight: 5,
        marginRight: 10
    },
    footer: {
        textAlign: 'center'
    },
    section: {
        marginTop: 10,
        marginBottom: 10
    },
    section_login_with_mis: {
        marginTop: 10,
        marginBottom: 10,
    },
    loginform: {
        maxWidth: '400px',
        margin: '0 auto'
    },
    navbarButton: {
        color: '#ffffff',
        textTransform: 'initial'
    },
    err_msg: {
        color: '#ff0000',
        fontSize: 12
    },
    transparentbackground: {
        backgroundColor: 'transparent'
    },
    formfield: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
        marginBottom: 15,
        padding: 5
    },
    footer: {
        minHeight: 50,
        backgroundColor: '#360334',
        color: '#ffffff',
        fontSize: 12,
        paddingTop: 15
    },
    title: {
        flexGrow: 1,
        fontSize: 18,
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10,
        textShadow: '1px 2px 3px #666'
    },
    desc: {
        fontSize: 12,
    },
    avatar: {
        height: 140,
        width: 200,
        paddingLeft: 10,
        paddingRight: 10,
    },
    content_margin: {
        marginTop: 60,
        marginLeft: 20
    },
    paper_top: {
        backgroundColor: 'transparent',
        padding: "2px",
    },
    paperlist: {
        marginTop: 20,
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: "20px",
        marginBottom: 10,
        maxWidth: '1024px',
        minWidth: '1024px'
    },
    papersearch: {
        marginTop: 20,
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: "5px",
        marginBottom: 5,
        maxWidth: '1024px',
        minWidth: '1024px'
    },
    paper_block: {
        marginTop: 20,
        flexGrow: 1,
        backgroundColor: '#fff',
        padding: "30px",
        marginBottom: 10,
        maxWidth: '1024px'
    },
    paper: {
        marginTop: 20,
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        maxWidth: '1024px',
        padding:20


    }, title: {
        fontSize: 16,
        color: '#360334',
    },
    textField: {
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10
    },
    textField_small: {
        marginTop: 10,
        marginLeft: 10,
        width: '95%'
    },
    form: {
        minWidth: '600px',
        color: '#ff000'
    },
    btn: {
        marginTop: 30,
        minWidth: 150
    },
    btn_search: {
        marginTop: 20,
        minWidth: 150
    },
    resize: {
        fontSize: 12
    },
    err_msg: {
        color: '#ff0000',
        fontSize: 12
    },
    radioval: {
        fontSize: 12
    },
    label: {
        fontSize: 12
    },
    dropzone: {
        height: 300,
        background: "#efefef",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderStyle: "dashed",
        borderColor: "#aaa"
    },
    preview: {
        width: 250,
        height: 250,
        margin: "auto",
        display: "block",
        marginBottom: 16,
        objectFit: "contain"
    },
    wrapper: {
        margin: 5,
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: '#008000',
        '&:hover': {
            backgroundColor: '#008000',
        },
    },
    fabProgress: {
        color: '#008000',
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonProgress: {
        color: '#008000',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    pagination: {
        display: 'inline-block'
    },
    page_title: {
        fontSize: 12,
        color: '#360334',
    },
    page_body: {
        fontSize: 12,
        color: '#808080'
    },


})

export default useStyles;