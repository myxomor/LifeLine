import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles({
    menuElement: {
        color: "#ffffff",
        marginLeft: "30px",
        marginTop: "38px",
        marginBottom: "38px",
        fontFamily: "MyriadProRegular",
        fontSize: "14pt"
    },
    list: {
        width: 300,
        backgroundColor: "#A1568B",
        height: "100vh"

    },
    menuIcon: {
        height: "50px",
        width: "50px"
    },
    fullList: {
        width: 'auto',
    },
});

export default function SwipeableTemporaryDrawer() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false
    });

    const toggleDrawer = (side, open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <div className={classes.menuElement}>Главная</div>
            <div className={classes.menuElement}>Календарь</div>
            <div className={classes.menuElement}>Прогресс</div>
            <div className={classes.menuElement}>Треки</div>
            <div className={classes.menuElement}>Задания</div>
            <div className={classes.menuElement}>Поддержать</div>
        </div>
    );



    return (
        <div>
            <div
                onClick={toggleDrawer('left', true)}
                 className="navBtn"
            ></div>


            <SwipeableDrawer
                open={state.left}
                onClose={toggleDrawer('left', false)}
                onOpen={toggleDrawer('left', true)}
            >
                {sideList('left')}
            </SwipeableDrawer>

        </div>
    );
}