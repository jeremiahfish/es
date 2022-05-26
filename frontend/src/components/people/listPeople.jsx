import axios from "axios";
import React from "react";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";


import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';



export default function ListPeople(props) {

    const navigate = useNavigate();

    const [data, setData] = React.useState(null);
    const selectedIndex = props.selectedId;

    const handleListItemClick = (event, index, obj) => {
        navigate(`/PeopleDetail/${obj.employee_id}`, { replace: true });
    };


    /* REST API */
    const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://10.0.0.181:8080';
    React.useEffect(() => {
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.get(SERVER_URL + '/api/locate?ordering=first_name').then((response) => {
            setData(response.data);
        });
    }, []);



    if (!data) return <></>;
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: 3 }} >
            <Box className="listViewToolbar">
                    <Button onClick={() => navigate(-1)} color="primary"  variant="text" startIcon={<ArrowBackIosNewIcon />} >
                        <span style={{color: '#333'}}>People</span>
                    </Button>
            </Box>

            <Box sx={{ m: 0, p: 0, width: '100%', height: '100%', overflow: 'auto' }}>
                <List sx={{ m: 0, p: 0}}>
                    {data.people.map((employee) => (

                        <ListItem className="list-item"
                            key={employee.employee_id}
                            alignItems="flex-start"
                            selected={selectedIndex === `${employee.employee_id}`}
                            onClick={(event) => handleListItemClick(event, employee.employee_id, employee)}
                        >

                            <ListItemAvatar>
                                <Avatar src={employee.avatar} sx={{ width: 48, height: 48, mr: 1.4 }} />
                            </ListItemAvatar>

                            <ListItemText
                                sx={{ textOverflow: "ellipsis" }}
                                primary={employee.first_name + " " + employee.last_name}
                                secondary={employee.job_title}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box >
    );
}

/*


                	

                    */