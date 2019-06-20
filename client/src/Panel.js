import React from 'react';
import Body from './Body';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Header from './Header';
import Paper from '@material-ui/core/Paper';

export default function Panel(props) {
    const styles = {
        gridStyle: {
            margin: 20
        }
    };

    return (
        <Grid container direction="row" justify="center" alignItems="center" style={styles.gridStyle}>
            <Paper>
                <Header title={props.title} />
                <Divider component={Paper} />
                <Body list={props.list}>
                    {props.children}
                </Body>
            </Paper>
        </Grid>
    );
}
