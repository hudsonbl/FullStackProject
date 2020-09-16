import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignUp() {
	const classes = useStyles();
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const registerAccount = (event) => {
		event.preventDefault() 
		// This will be our http payload
		const requestOptions = {
			method: 'POST',
			headers: {'Content-Type': 'application/json',
					  'accept': 'application/json'},
			body: JSON.stringify({
				name: name,
				email: email,
				password: password
			})
		}

		console.log("name: ", name, " email: ", email)
		// Create a fetch request to our server
		fetch(`http://localhost:5000/users`, requestOptions)
			.then(async response => {
				const data = await response.json();

				if(!response.ok) {
					const error = (data && data.message) || response.status;
					return Promise.reject(error);
				}
				// If successful, successStatus == true
				if(data.successStatus){
					// Upon creating a user, redirect them to the login page
					setTimeout(() => window.location.href='/login', 200);
				} 
			})
			.catch(error => {
				console.log(error)
		
			});
	}
		
	return (
		<Container component="main" maxWidth="xs">
		<CssBaseline />
		<div className={classes.paper}>
			<Avatar className={classes.avatar}>
			<LockOutlinedIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
			Sign up
			</Typography>
			<form className={classes.form} noValidate>
			<Grid container spacing={2}>
				<Grid item xs={12}>
				<TextField
					autoComplete="name"
					name="Name"
					variant="outlined"
					required
					fullWidth
					id="firstName"
					label="Name"
					onChange={e => setName(e.target.value)}
					autoFocus
				/>
				</Grid>
				<Grid item xs={12}>
				<TextField
					variant="outlined"
					required
					fullWidth
					id="email"
					label="Email Address"
					name="email"
					onChange={e => setEmail(e.target.value)}
					autoComplete="email"
				/>
				</Grid>
				<Grid item xs={12}>
				<TextField
					variant="outlined"
					required
					fullWidth
					name="password"
					label="Password"
					type="password"
					id="password"
					onChange={e => setPassword(e.target.value)}
					autoComplete="current-password"
				/>
				</Grid>
			</Grid>
			<Button
				type="submit"
				fullWidth
				variant="contained"
				color="primary"
				className={classes.submit}
				onClick={registerAccount}
			>
				Sign Up
			</Button>
			<Grid container justify="flex-end">
				<Grid item>
				<Link href="/login" variant="body2">
					Already have an account? Sign in
				</Link>
				</Grid>
			</Grid>
			</form>
		</div>
		</Container>
	);
}