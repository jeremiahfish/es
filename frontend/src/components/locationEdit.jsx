import * as React from 'react';

import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import { useTheme } from '@mui/material/styles';
import { lightBlue, indigo, orange, amber, deepOrange, teal } from '@mui/material/colors';

import { GoogleMap, Marker, DrawingManager } from "@react-google-maps/api";
import { useJsApiLoader } from "@react-google-maps/api";


/* components */
import MapEditor from "../components/map/mapEditor";

const containerStyle = {
    width: '100%',
    height: '38vh',
};


export default function LocationEdit(props) {

    const { onClose, selectedValue, open } = props;
    const [selectedColorValue, setSelectedColorValue] = React.useState('a');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedColorValue(event.target.value);
    };

    const controlProps = (item: string) => ({
        checked: selectedColorValue === item,
        onChange: handleChange,
        value: item,
        style: { margin: '5px 8px' },
        name: 'color-radio-button-demo',
        inputProps: { 'aria-label': item },
    });

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };
    
    /* Google Maps Editor */
    const [map, setMap] = React.useState(null);
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        v: 'weekly',
        libraries: ['drawing']
    })

    const onLoad = React.useCallback(function callback(map) {
        setMap(map);
        map.setCenter({ lat: 38.90, lng: -92.31 });
        map.setZoom(10);
    }, [])


    if (!isLoaded) return <></>;
    return (
        <Dialog fullScreen={fullScreen} onClose={handleClose} open={open} >
            
            <DialogTitle>Edit Location</DialogTitle>

            <DialogContent>
       
                <TextField variant="standard" margin="normal" id="name" label="Label" type="email" value="Highpointe Park Project" fullWidth />
                <TextField variant="standard" margin="normal" id="name" label="Location" type="email" value="Kansas City, MO" fullWidth />
        
                <FormLabel id="demo-radio-buttons-group-label" sx={{ p: 0.3, fontSize: '12.2px', display: 'block' }} >Area Color</FormLabel>
                <Radio {...controlProps('indigo')}      sx={{ color: indigo[800], '&.Mui-checked': {color: indigo[600],} }} />
                <Radio {...controlProps('orange')}      sx={{ color: orange[800], '&.Mui-checked': {color: orange[600],} }} />
                <Radio {...controlProps('lightBlue')}   sx={{ color: lightBlue[800], '&.Mui-checked': {color: lightBlue[600],} }} />
                <Radio {...controlProps('teal')}        sx={{ color: teal[800], '&.Mui-checked': {color: teal[600],} }} />
                <Radio {...controlProps('amber')}       sx={{ color: amber[800], '&.Mui-checked': {color: amber[600],} }} />
                <Radio {...controlProps('deepOrange')}  sx={{ color: deepOrange[800], '&.Mui-checked': {color: deepOrange[600],} }} />

                <GoogleMap options={{ mapId: '15431d2b469f209e', disableDefaultUI: true }} onLoad={onLoad} mapContainerStyle={containerStyle} >
                    <DrawingManager />
                </GoogleMap>

            </DialogContent>

            <DialogActions sx={{ p: 3, mb: 1 }}>
                <Button onClick={handleClose} variant="outlined" color="primary" sx={{ mr: 1 }}>Cancel</Button>
                <Button onClick={handleClose} variant="contained" color="primary">Save</Button>
            </DialogActions>

        </Dialog>
    );
}

