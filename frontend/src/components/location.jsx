import * as React from 'react';
import { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Badge from '@mui/material/Badge';

import Typography from '@mui/material/Typography';

/* Action Icon */
import IconButton from "@mui/material/IconButton";
import EditLocationOutlinedIcon from "@mui/icons-material/EditLocationOutlined";
import SettingsIcon from '@mui/icons-material/Settings';

/* Components */
import LocationEdit from "../components/locationEdit";

const style = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: '100vh',
    width: '100vw',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    zIndex: '99999999'
};
LocationEdit.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        margin: '0px',
        borderRadius: '50%',
        padding: '6px',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 4s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(0.8)',
            opacity: 1,
            transform: 'translate(-1px, -1px)',
        },
        '20%': {
            transform: 'scale(1.6)',
            opacity: 0,
        },
        '100%': {
            transform: 'scale(2)',
            opacity: 0,
        },
    },
}));



export default function Jobsites(props) {

    const [selectedValue, setSelectedValue] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(-1);

    const handleClickOpen = (event) => {
        event.preventDefault();
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (

        <>
            <List sx={{ width: '100%' }}>

                <ListItem
                    alignItems='flex-start' 
                    selected={selectedIndex === 0}
                    onClick={(event) => handleListItemClick(event, 0,)}
                    secondaryAction={<IconButton  onClick={handleClickOpen} edge="end" aria-label="info"><SettingsIcon sx={{ color: "#01579b" }} /></IconButton>}
                >
                    <ListItemAvatar>
                        <div style={{ marginRight: "18px", height: "80px", width: "110px", overflow: "hidden", border: "1px solid #ccc" }}>
                            <img style={{ height: "100px", width: "120px", }} src="https://maps.googleapis.com/maps/api/staticmap?size=400x400&cer=39.07148094481492,-94.57817919332498&zoom=13&key=AIzaSyBSSFJHcscovaGAQlOwA0_Oeq3Omfwc3f0&map_id=58d070ca458734f0&path=color:0x0078D7aa|weight:1|fillcolor:0x0078D733|enc:oyrmFjai`Q?sbBh_C~M|@h`C{~Byb@" />
                        </div>
                    </ListItemAvatar>

                    <div style={{ height: "100%", overflow: "hidden", position:'relative', top: '0px', left: '0px',}}>

                        <ListItemText
                            primary="Highpointe Park Project"
                            secondary="Kansas City, MO"
                        />
                        <Avatar alt="A" sx={{ ml: 0,     width: 26, height: 26, display: 'inline-block',  border: '2px solid #fff' }}  src="http://jeremiahfish.com/esdemo/avatar/f2.jpg" />
                        <Avatar alt="T" sx={{ ml: -0.8, width: 26, height: 26, display: 'inline-block',  border: '2px solid #fff' }}  src="http://jeremiahfish.com/esdemo/avatar/m2.jpg" />
                        <Avatar alt="C" sx={{ ml: -0.8, width: 26, height: 26, display: 'inline-block',  border: '2px solid #fff' }}  src="http://jeremiahfish.com/esdemo/avatar/m3.jpg" />
                        <Avatar alt="A" sx={{ ml: -0.8, width: 26, height: 26, display: 'inline-block',  border: '2px solid #fff' }}  src="http://jeremiahfish.com/esdemo/avatar/m8.jpg" />
                        <Avatar children={"+", "+7"} sx={{ ml: -0.8, width: 26, height: 26, display: 'inline-block',  border: '2px solid #fff', lineHeight: '24px', paddingLeft:'3px', fontSize:'11.3px', fontWeight: 500, opacity: 0.8, }}   />

                    </div>

                </ListItem>

                <Divider variant="inset" component="li" />

                <ListItem
                    alignItems="flex-start"
                    selected={selectedIndex === 1}
                    onClick={(event) => handleListItemClick(event, 1,)}
                    secondaryAction={<IconButton onClick={handleClickOpen} edge="end" aria-label="info"><SettingsIcon sx={{ color: "#01579b" }} /></IconButton>}
                >
                    <ListItemAvatar>
                        <div style={{ marginRight: "18px", height: "80px", width: "110px", overflow: "hidden", border: "1px solid #ccc" }}>
                            <img style={{ height: "100px", width: "120px", }} src="https://maps.googleapis.com/maps/api/staticmap?size=240x200&cer=38.94855879772096,-92.29830084863487&zoom=12&key=AIzaSyBSSFJHcscovaGAQlOwA0_Oeq3Omfwc3f0&map_id=58d070ca458734f0&path=color:0xE81123aa|weight:1|fillcolor:0xE8112333|enc:{|ulFhvjrPkHaJmDiFqDoL~GkI`LhJg@d^" />
                        </div>
                    </ListItemAvatar>
                    <div style={{ height: "100%", overflow: "hidden", position:'relative', top: '0px', left: '0px', width: '200px'}}>

                    <ListItemText
                        primary="Silversun Valley Project"
                        secondary="Columbia, MO"
                    />

                        <Avatar alt="A" sx={{ ml: 0,    width: 26, height: 26, display: 'inline-block',  border: '2px solid #fff' }}  src="http://jeremiahfish.com/esdemo/avatar/m6.jpg" />
                        <Avatar alt="C" sx={{ ml: -0.8, width: 26, height: 26, display: 'inline-block',  border: '2px solid #fff' }}  src="http://jeremiahfish.com/esdemo/avatar/f1.jpg" />
                        <Avatar alt="C" sx={{ ml: -0.8, width: 26, height: 26, display: 'inline-block',  border: '2px solid #fff' }}  src="http://jeremiahfish.com/esdemo/avatar/f4.jpg" />
                        <Avatar alt="A" sx={{ ml: -0.8, width: 26, height: 26, display: 'inline-block',  border: '2px solid #fff' }}  src="http://jeremiahfish.com/esdemo/avatar/m1.jpg" />
                        <Avatar children={"+", "+2"} sx={{ ml: -0.8, width: 26, height: 26, display: 'inline-block',  border: '2px solid #fff', lineHeight: '24px', paddingLeft:'3px', fontSize:'11.3px', fontWeight: 500, opacity: 0.8, }}   />

                    </div>
                </ListItem>


                <Divider variant="inset" component="li" />


                <ListItem
                    alignItems="flex-start"
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2,)}
                    secondaryAction={<IconButton onClick={handleClickOpen} edge="end" aria-label="info"><SettingsIcon sx={{ color: "#01579b" }} /></IconButton>}
                >
                    <ListItemAvatar>
                        <div style={{ marginRight: "18px", height: "80px", width: "110px", overflow: "hidden", border: "1px solid #ccc" }}>
                            <img style={{ height: "100px", width: "120px", }} src="https://maps.googleapis.com/maps/api/staticmap?size=400x400&cer=39.436489042435774,-92.44613777374325&zoom=13&key=AIzaSyBSSFJHcscovaGAQlOwA0_Oeq3Omfwc3f0&map_id=58d070ca458734f0&path=color:0xFF8C00aa|weight:1|fillcolor:0xFF8C0033|enc:ugwoFnthsPLy|BzzA@k@v~BmzAN" />
                        </div>
                    </ListItemAvatar>
                    <div style={{ height: "100%", overflow: "hidden", position:'relative', top: '0px', left: '0px', width: '200px'}}>

                    <ListItemText
                        primary="Crestview Eagle Project"
                        secondary="Moberly, MO"
                    />
                        <Avatar alt="A" sx={{           width: 26, height: 26, display: 'inline-block',  border: '2px solid #fff' }}  src="http://jeremiahfish.com/esdemo/avatar/f5.jpg" />
                        <Avatar alt="T" sx={{ ml: -0.8, width: 26, height: 26, display: 'inline-block',  border: '2px solid #fff' }}  src="http://jeremiahfish.com/esdemo/avatar/m7.jpg" />
                        <Avatar alt="C" sx={{ ml: -0.8, width: 26, height: 26, display: 'inline-block',  border: '2px solid #fff' }}  src="http://jeremiahfish.com/esdemo/avatar/m5.jpg" />
     
            
                    </div>

                    
                </ListItem>


                <Divider variant="inset" component="li" />

            </List>

            <LocationEdit  fullScreen selectedValue={selectedValue}  open={open}  onClose={handleClose} />
       
        </>
    );
}

