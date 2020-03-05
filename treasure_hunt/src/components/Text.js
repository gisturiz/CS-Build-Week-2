import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { axiosWithAuth } from './utils/axiosWithAuth';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    room: {
        margin: "60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        textAlign: "left"
    },
    button: {
        marginTop: '60px'
    },
    status: {
        margin: "60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        textAlign: "left"
    }
}));

export default function SimpleContainer() {
    const classes = useStyles();

    const [room, setRoom] = useState()
    const [player, setPlayer] = useState()
    // const [seconds, setSeconds] = useState()

    // useEffect(() => {
    //     if (room.cooldown !== undefined) {
    //         setTimeout(() => setSeconds(room.cooldown), 1000);
    //     }
    // });

    // Get current room
    const getRoom = () => {
        axiosWithAuth()
            .get('https://lambda-treasure-hunt.herokuapp.com/api/adv/init/')
            .then(res => {
                setRoom(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    // Get current player status
    const getStatus = () => {
        axiosWithAuth()
            .post('https://lambda-treasure-hunt.herokuapp.com/api/adv/status/')
            .then(res => {
                setPlayer(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    // Move player in given direction
    const move = (direction) => {
        axiosWithAuth()
            .post('https://lambda-treasure-hunt.herokuapp.com/api/adv/move/',
                { "direction": direction })
            .then(res => {
                setRoom(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    // Pick up available item/s
    const treasure = () => {
        axiosWithAuth()
            .post('https://lambda-treasure-hunt.herokuapp.com/api/adv/take/',
                { "name": room.items[0] })
            .then(res => {
                setRoom(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    // Drop treasure in inventory
    const drop = (item) => {
        axiosWithAuth()
            .post('https://lambda-treasure-hunt.herokuapp.com/api/adv/drop/',
                { "name": player.inventory[player.inventory.length - 1] })
            .then(res => {
                setRoom(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    console.log(room)
    console.log(player)

    return (
        <React.Fragment>
            <div className={classes.button}>
                <ButtonGroup size="large" color="secondary" aria-label="outlined secondary button group">
                    <Button onClick={() => move("n")}>North</Button>
                    <Button onClick={() => move("e")}>East</Button>
                    <Button onClick={() => move("s")}>South</Button>
                    <Button onClick={() => move("w")}>West</Button>
                </ButtonGroup>
            </div>
            <Container maxWidth="sm">
                {room == null ? (
                    <h1>Please initiate your map</h1>
                ) : (
                        <>
                            <h1>Current Room</h1>
                            <div className={classes.room}>
                                <Typography>
                                    Current Room ID: {room.room_id}
                                </Typography>
                                <Typography>
                                    Current Room Title: {room.title}
                                </Typography>
                                <Typography>
                                    Current Room Desription: {room.description}
                                </Typography>
                                <Typography>
                                    Current Room Exits: {room.exits.map(directions => {
                                        return directions.toUpperCase() + ", "
                                    })}
                                </Typography>
                                <Typography>
                                    Current Room Coordinates: {room.coordinates}
                                </Typography>
                                <Typography>
                                    Current Room Terrain: {room.terrain}
                                </Typography>
                                <Typography>
                                    Current Room Cooldown: {room.cooldown}
                                </Typography>
                                {/* <Typography>
                                    Cooldown Remaining: {seconds}
                                </Typography> */}
                                <Typography>
                                    Current Room Elevation: {room.elevation}
                                </Typography>
                                <Typography>
                                    Current Room Items: {room.items.length === 0 ? (<span>No Items</span>) : (<span>{room.items.map(items => {
                                        return items + ", "
                                    })}</span>)}
                                </Typography>
                                <Typography>
                                    Current Room Message: {room.messages}
                                </Typography>
                            </div>
                        </>
                    )}
                <div className={classes.root}>
                    <Button variant="outlined" color="secondary" onClick={getRoom}>
                        Initiate World
                    </Button>

                    <Button variant="outlined" color="primary" onClick={treasure}>
                        Pick Item Up
                    </Button>

                    <Button variant="outlined" color="primary" onClick={drop}>
                        Drop Item
                    </Button>

                </div>
                <h1>My Status</h1>
                {player == null ? (
                    <h1>Please initiate your status</h1>
                ) : (
                        <div className={classes.status}>
                            <Typography>
                                Items Carrying: {player.encumbrance}
                            </Typography>
                            <Typography>
                                Strength: {player.strength}
                            </Typography>
                            <Typography>
                                Speed: {player.speed}
                            </Typography>
                            <Typography>
                                Gold: {player.gold}
                            </Typography>
                            <Typography>
                                Inventory: {player.inventory.map(items => {
                                    return items.toUpperCase() + ", "
                                })}
                            </Typography>

                        </div>
                    )}
                <Button variant="outlined" color="secondary" onClick={getStatus}>
                    Get Status
                </Button>
            </Container>
        </React.Fragment>
    );
}