import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import React from 'react';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    button: {
        marginTop: '60px'
    }
}));

export default function GroupSizesColors() {
    const classes = useStyles();

    const move = (direction) => {
        axios
        .post('https://lambda-treasure-hunt.herokuapp.com/api/adv/move/', {
            "direction": direction
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
   }

    return (
        <div className={classes.root}>
            <div className={classes.button}>
                <ButtonGroup size="large" color="secondary" aria-label="outlined secondary button group">
                    <Button onClick={() => move("n")}>North</Button>
                    <Button onClick={() => move("e")}>East</Button>
                    <Button onClick={() => move("s")}>South</Button>
                    <Button onClick={() => move("w")}>West</Button>
                </ButtonGroup>
            </div>
        </div>
    );
}