import React from 'react';
import Panel from './Panel';
import Grid from '@material-ui/core/Grid';

function Login() {
    return (
        <Grid container
            direction="row" 
            justify="center" 
            alignItems="center"
            style={styles.gridStyle}>
            <Panel />
        </Grid>
    );
}

const styles = {
    gridStyle: {
        height: '400px'
    }
};

export default Login;
