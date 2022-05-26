import React from "react";
import axios from "axios";

/* MUI Drawer */
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { styled } from '@mui/material/styles';

/* MUI Tabs  */
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

/* Google Maps */
import { useJsApiLoader } from "@react-google-maps/api";

/* Components */
import People from "../components/people";
import Tags from "../components/tags";
import Equipment from "../components/equipment";
import Location from "../components/location";

import Map from "../components/map/map";
import TabPanel from "../components/tabPanel";

/* Tween */
import { Easing, Tween, update } from "@tweenjs/tween.js";



const center = { lat: 38.90,  lng: -92.31  };
const zoom = 11.3;


function Locate() {

    const [data, setData] = React.useState(null);
    const [currentTab, setCurrentTab] = React.useState(0);
    const Puller = styled(Box)(({ }) => ({}));
    
    
    /* Load Google Maps API */
    const [map, setMap] = React.useState(null);
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        v: 'weekly',
        libraries: ['drawing']
    })

    const onLoad = React.useCallback(function callback(map) {
        setMap(map);
        map.setCenter(center);
        map.setZoom(zoom);
    }, [])

    const onUnmount = React.useCallback(function callback(map) { setMap(null) }, []);

    const mapCamera = (options) => {

        const cameraOptions: google.maps.CameraOptions = {
            tilt: options.from.tilt,
            heading: options.from.heading,
            zoom: options.from.zoom,
            center: options.center,
        };
        
        const mapOptions = { ...cameraOptions, mapId: '15431d2b469f209e',};

        new Tween(cameraOptions) 
            .to({ tilt: options.to.tilt, heading: options.to.heading, zoom: options.to.zoom }, options.seconds * 1000) 
            .easing(Easing.Quadratic.Out).onUpdate(() => { map.moveCamera(cameraOptions); }).start();

        function animate(time: number) {
            requestAnimationFrame(animate);
            update(time);
        }
        requestAnimationFrame(animate);
    }


    /* Tab Change */
    const handleChange = (event, newValue) => {

        setCurrentTab(newValue);

        // Inital Map Camera Pos (People, Equipment, Tags, Locations)
        if ( newValue == 0 ) {
            mapCamera({
                center:  { lat: 38.90,  lng: -92.31 },
                from:    { tilt: 0,     heading: 0,     zoom: 10  },
                to:      { tilt: 0,     heading: 0,     zoom: 11.3 },
                seconds: 0.6,
            });
        }  
        if ( newValue == 1 ) {
            mapCamera({
                center:  { lat: 39.44,  lng: -92.443 },
                from:    { tilt: 20,     heading: 0,    zoom: 13 },
                to:      { tilt: 45,    heading: 45,    zoom: 16 },
                seconds: 1.6,
            });
        } 

        if (  newValue == 2  || newValue == 3 ) {
            mapCamera({
                center:  { lat: 39.086,  lng: -94.585 },
                from:    { tilt: 0,     heading: -180,     zoom: 12},
                to:      { tilt: 45,    heading: -220,     zoom: 17.2 },
                seconds: 3,
            });
        }
      
    };


    /* REST API */
    const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://10.0.0.181:8080';
    React.useEffect(() => {
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.get(SERVER_URL + '/api/locate?ordering=first_name').then((response) => {
            setData(response.data);
        });
    }, []);


    if (!isLoaded) return <></>;
    if (!data) return <></>;
    return (
        <>
            <Box className='boxMap'>
                    <Map data={data} onLoad={onLoad} onUnmount={onUnmount} currentTab={currentTab} mapId={data.mapID} /> :
            </Box>

            <SwipeableDrawer
                anchor="bottom"
                open={true}
                swipeAreaWidth={30}
                disableSwipeToOpen={false}
                hideBackdrop={true}
                disableDiscovery={true}
                ModalProps={{ keepMounted: true }}
                sx={{ position: 'sticky', top: '66%', left: '0px', height: '44%', overflow: 'hidden' }}
            >
                <Box sx={{ top: 0, visibility: 'visible', right: 0, left: 0, }}>

                    <Puller className="puller" />

                    <Tabs value={currentTab} onChange={handleChange} sx={{ borderBottom: 1, borderColor: 'divider', padding: '0', margin: '18px 10px 0px 10px' }}>
                        <Tab label="People" />
                        <Tab label="Equipment" />
                        <Tab label="Tags" />
                        <Tab label="Locations" />
                    </Tabs>
                </Box>

                <Box sx={{ m: 0, p: 0, width: '100%', height: '100%', overflow: 'auto' }}>

                    <TabPanel value={currentTab} index={0}>
                        <People data={data} map={map} />
                    </TabPanel>

                    <TabPanel value={currentTab} index={1}>
                        <Equipment data={data} map={map} />
                    </TabPanel>

                    <TabPanel value={currentTab} index={2}>
                        <Tags data={data} map={map} />
                    </TabPanel>

                    <TabPanel value={currentTab} index={3}>
                        <Location />
                    </TabPanel>

                </Box>

            </SwipeableDrawer>
        </>
    );
}

export default React.memo(Locate);
