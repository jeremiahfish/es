import React from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from "@mui/material/Avatar";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';

import CssBaseline from '@mui/material/CssBaseline';

import ChartHoursWorked from "../components/people/chartHoursWorked";
import TableHoursWorked from "../components/people/tableHoursWorked";
import ListPeople from "../components/people/listPeople";


const drawerWidth = 360;


export default function PeopleDetail() {


    const { id } = useParams();
    const [person, setPerson] = React.useState(null);
    const [mobileOpen, setMobileOpen] = React.useState(false);


    /* REST API */
    const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://10.0.0.181:8080';
    React.useEffect(() => {
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.get(SERVER_URL + '/api/people/' + id + '/').then((response) => {
            setPerson(response.data);
        });
    }, [id]);

    const container = window !== undefined ? () => window().document.body : undefined;

    if (!person) return <></>;
    return (
        <>
     
        <Box className="detailView" sx={{ display: 'flex' }}>
           
            
            <Drawer variant="permanent"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}>

                <ListPeople selectedId={id} />

            </Drawer>
          
            <Box component="main" sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>

                <Grid container sx={{ p: 4 }} rowSpacing={0} columnSpacing={{ xs: 1, sm: 1, md: 1 }} style={{maxWidth: '1200px'}}>

                    <Grid item xs={12} sx={{ mb: 1 }}>

                        <Avatar sx={{ width: 70, height: 70, marginRight: '20px', float: 'left', display: 'inline-block', }} src={person.avatar} />

                        <Typography variant="h5" component="div" sx={{ p: 0, m: 0, paddingTop: '13px', lineHeight: '0.8' }}>
                            {person.first_name} {person.last_name}
                        </Typography>

                        <Typography variant="overline" sx={{ fontSize: '0.92rem' }}>
                            {person.job_title}
                        </Typography>

                    </Grid>

                    <Grid item xs={12} md={6}>
                        <p style={{ paddingLeft: "90px" }}>
                            <span className="subtitle">WORK</span> {person.phone_work}
                        </p>
                        <p style={{ paddingLeft: "90px" }}>
                            <span className="subtitle">HOME</span> {person.phone_home}
                        </p>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <p style={{ paddingLeft: "90px" }}>
                            <span className="subtitle">EMAIL</span> {person.email}
                        </p>
                    </Grid>

                    <Grid item xs={12} md={12} sx={{ mt: 2 }}>
                        <ChartHoursWorked data={person} />
                    </Grid>

                    <Grid item xs={12} md={12} sx={{ mt: 2 }}>
                        <Paper>
                            <TableHoursWorked data={person} />
                        </Paper>
                    </Grid>

                </Grid>
            </Box>
        </Box>
        </>
    );
}


/* backgroundColor: '#F7F9FC' */