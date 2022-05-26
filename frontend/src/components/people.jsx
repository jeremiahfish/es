import React from "react";
import { Link } from 'react-router-dom';

import Moment from 'react-moment';
import 'moment-timezone';

import axios from "axios";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from '@mui/material/ListSubheader';
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';


/* Action Icon */
import IconButton from "@mui/material/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AccessTimeIcon from '@mui/icons-material/AccessTime';


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        margin: '0px',
        borderRadius: '50%',
        border: '2px solid white',
        padding: '0px',
        width: '14px',
        height: '14px'
    },
    '&. .IN .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
    },
    '& .OUT > .MuiBadge-badge': {
        backgroundColor: '#aaa',
        color: '#aaa',
    }
}));


export default function People(props) {
  
    const { data } = props;
    const [selectedIndex, setSelectedIndex] = React.useState(-1);

    
    const handleListItemClick = (event, index, obj) => {

        if (props.map.getZoom() > 13) props.map.setZoom(13);
        setTimeout(function () {
            props.map.panTo({
                lat: parseFloat(obj.location[0].lat) - 0.0007,
                lng: parseFloat(obj.location[0].lng)
            })}, 500);
        setTimeout(function () { props.map.setZoom(16) }, 1100);
        
        setSelectedIndex(index);
    };

 
    if (!data) return null;

    // Sort on Status, then First Name
    let _ = require('underscore');
    const people =  _(data.people).chain()
                    .sortBy( (employee) => employee.first_name)
                    .sortBy( (employee) => employee.location[0].time_action)
                    .value();
   
    return (
        <List >
            {people.map((employee) => (
                <>
                    <ListItem className="mui-list"
                        key={`people-${employee.employee_id}`}
                        alignItems="flex-start"
                        selected={selectedIndex === `people-${employee.employee_id}`}
                        onClick={(event) => handleListItemClick(event, `people-${employee.employee_id}`, employee)}
                        secondaryAction={
                            <Link to={`/PeopleDetail/${employee.employee_id}`}>
                                <IconButton edge="end" aria-label="info" >
                                    <AccessTimeIcon sx={{ color: "#01579b" }} />
                                </IconButton>
                            </Link>
                        }>

                        <ListItemAvatar>

                            <StyledBadge 
                                overlap="circular" 
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} 
                                variant="dot" 
                                color={employee.location.length > 0 && employee.location[0].time_action == 'IN' ? 'success' : 'error'}
                            >
                                <Avatar src={employee.avatar} />
                            </StyledBadge>

                        </ListItemAvatar>

                        <ListItemText
                            sx={{ width: "44vw", textOverflow: "ellipsis" }}
                            primary={employee.first_name + " " + employee.last_name}
                            secondary={
                                employee.location.length > 0 && employee.location[0].time_action == 'IN' 
                                ? employee.location[0].description 
                                : <Moment date={employee.location[0].last_seen} tz="UTC" format="[Offline since] LT" />
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </>
            ))}
        </List>
    );
}

/*
<Moment date={employee.location[0].last_seen}  tz="UTC" format="HH:mm" durationFromNow/>
*/