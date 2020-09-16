import React, { useState } from 'react' 
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { loginUser } from '../cache/actions';
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
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	}));

export default function SignIn() {
	const classes = useStyles();
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	// dispatch uses actions to manipulate data in our reducers
	const dispatch = useDispatch()

	const handleLogin = (event) => {
		event.preventDefault() // 
		// This will be our http payload
		const requestOptions = {
			method: 'POST',
			headers: {'Content-Type': 'application/json',
					  'accept': 'application/json'},
			body: JSON.stringify({
				email: email,
				password: password 
			})
		}
		// Create a fetch request to our server
		fetch(`http://localhost:5000/users/login`, requestOptions)
			.then(async response => {
				const data = await response.json();
				if(!response.ok){
					const error = (data && data.message) || response.status;
					return Promise.reject(error);
				}

				const user = {
					bearerToken: data.bearerToken,
					userId: data.userId
				}

				if(data.successStatus){
					// This appends the userId and bearer token within our cache
					// We will be able to access these values when we need in our other components
					dispatch(loginUser(user)) 
					setTimeout(() => window.location.href='/work-orders', 200);
				}
			}) 
			.catch(error => {
				console.log(error)
			})
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form className={classes.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						onChange={e => setEmail(e.target.value)}
						autoFocus
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						onChange={e => setPassword(e.target.value)}
						autoComplete="current-password"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleLogin}
					>
						Sign In
					</Button>
				</form>
			</div>
		</Container>
	);
}