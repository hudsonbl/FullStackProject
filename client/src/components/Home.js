import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link'
import {useDispatch, useSelector} from 'react-redux'
import {logoutUser} from '../cache/actions'
import WorkOrderPage from './WorkOrderPage';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
}));

const Home = () => {
    const classes = useStyles()
    const userInfo = useSelector(state => state.userReducer)

    return (
        <div className={classes.root}>
            <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" align="center" className={classes.title}>
                    Work-Orders.com
                </Typography>
                <Link color="inherit" style={{ textDecoration: 'none' }} href='/login'>
                    <Button color="inherit">Login</Button>
                </Link>
                <Link color="inherit" style={{ textDecoration: 'none' }} href='/users'>
                    <Button color="inherit">Create</Button>
                </Link>
                {userInfo.isLoggedIn ? <LogOutButton /> : ''}
            </Toolbar>
            </AppBar> 
            {userInfo.isLoggedIn ? <WorkOrderPage /> : <HomePage />}
        </div>
    )
}

export default Home

const LogOutButton = () => {
    const dispatch = useDispatch()
    return (
        <Link color="inherit" style={{ textDecoration: 'none' }} onClick={() => dispatch(logoutUser())} href='/'>
            <Button color="inherit">Log out</Button>
        </Link>
    )
}

const HomePage = () => {
    return (
        <>
            <Typography variant="h3" align="center" style={{padding: '20px'}}>
                Welcome!
            </Typography>
            <Typography align="center" variant="h6">
                This is a work order website to track your daily, weekly or monthly tasks!
            </Typography>
        </>
    )
}