import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default function Header(props) {
    const styles = {
        gridStyle: {
            width: '100%',
            padding: 10
        }
    }

    return (
        <Grid container justify="center" alignItems="center" style={styles.gridStyle}>
            <Grid item>
                <Typography variant="h4">
                    {props.title}
                </Typography>
            </Grid>
        </Grid>
    );
}
