import React from 'react';
import Paper from '@material-ui/core/Paper';
import Header from './Header';
import Divider from '@material-ui/core/Divider';

export default function Panel() {
    const styles = {
        paperStyle: {
            width: 300
        }
    };

    return (
        <Paper style={styles.paperStyle}>
            <Header title="Title" />
            <Divider />
        </Paper>
    );
}
