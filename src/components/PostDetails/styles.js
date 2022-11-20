import makeStyles from '@mui/styles/makeStyles';
export default makeStyles((theme) => ({
    media: {
        borderRadius: '20px',
        objectFit: 'cover',
        width: '100%',
        maxHeight: '400px',
        minHeight: "100px",

    },
    overlay: {
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: 'white',
    },

    media2: {
        height: "100%",
        width: "250px",
        paddingTop: '56.25%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlendMode: 'darken',
    },

    card: {
        display: 'flex',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap',
            flexDirection: 'column',
        },
        [theme.breakpoints.down('xs')]: {
            flexWrap: 'wrap',
            flexDirection: 'column',
        },
        [theme.breakpoints.down('md')]: {
            flexWrap: 'wrap',
            flexDirection: 'column',
        },
        [theme.breakpoints.down('lg')]: {
            flexWrap: 'wrap',
            flexDirection: 'column',
        },
    },
    card2: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '15px',
        height: '100%',
        position: 'relative',
        transition: "all ease 0.2s",
        "&:hover": {
            transform: "scale(1.02, 1.02)"
        }
    },
    title: {
        padding: '0 16px',
    },

    hover: {
        transition: "all ease 0.2s",
        "&:hover": {
            transform: "scale(1.02, 1.02)"
        }
    },

    section: {
        borderRadius: '20px',
        margin: '10px',
        flex: 1,
    },
    imageSection: {
        // marginLeft: '20px',
        minWidth: "50px",
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
        },
    },
    recommendedPosts: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    loadingPaper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '15px',
        height: '39vh',
    },
    commentsOuterContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        width: "100%"
    },
    commentsInnerContainer: {
        height: '200px',
        overflowY: 'auto',
        marginRight: '30px',
        width: "500px"
    },
}));