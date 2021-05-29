import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
export const Login = () => {
  let history = useHistory();

  const handleLogin = () => {
    history.push("/dashboard")
  }

  return (
    <>
      <TextField
        label="Email"
      />
      <TextField
        label="Password"
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Submit
      </Button>
      </>
  )
}