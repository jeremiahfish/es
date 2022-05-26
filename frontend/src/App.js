
import React from 'react';
import { BrowserRouter,	Routes,	Route } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";


/* Components */
import AccountMenu from "./components/nav/accountMenu";
import ActionMenu from "./components/nav/actionMenu"
import Locate from "./pages/locate";
import PeopleDetail from "./pages/peopleDetail";

/* Base Styles */
import "./App.css";


export default function App() {

  return (
    <Box sx={{ display: 'flex' }}>
        
        <AppBar position="fixed" className="appBar" elevation={0} sx={{ color: 'rgba(0, 0, 0, 0.87)', backgroundColor: '#f7f7f7' }}>
            <Toolbar>

                <div className="app-icon"></div>

                <Typography sx={{ flexGrow: 1, fontSize: '18px' }}>
                    Locate
                </Typography>

                <ActionMenu open={0} />
                <AccountMenu open={0} />

            </Toolbar>
        </AppBar>           

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Locate />} />
                <Route path="/PeopleDetail/:id" element={<PeopleDetail  />} />
            </Routes>
        </BrowserRouter>

    </Box>
  );
}


