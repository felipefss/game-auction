import React from 'react';
import Panel from './Panel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function Login() {
    return (
        <Panel title="Login">
            <Grid container style={styles.gridStyle} justify="center" alignItems="center" spacing={2}>
                <Grid item>
                    <TextField id="username" label="Username" placeholder="Type a username..." required />
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary">Enter</Button>
                </Grid>
            </Grid>
        </Panel>
    );
}

const styles = {
    gridStyle: {
        padding: 15
    }
};

export default Login;
