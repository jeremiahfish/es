import axios from "axios";
import React from "react";

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
import Battery5BarIcon from '@mui/icons-material/Battery5Bar';


/* Action Icon */
import IconButton from "@mui/material/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";


const StyledBadge = styled(Badge)(({ theme }) => ({
	'& .MuiBadge-badge': {
		backgroundColor: '#44b700',
		color: '#44b700',
		margin: '0px',
		borderRadius: '50%',
		border: '2px solid white',
		padding: '0px',
		width: '14px',
		height: '14px'

	}
}));




export default function Tags(props) {


	const { data } = props;
	//console.log(props.map);

	const [selectedIndex, setSelectedIndex] = React.useState(-1);

	const handleListItemClick = (event, index, obj) => {

		if( props.map.getZoom() > 17 )
			props.map.setZoom(17);
          
            
		setTimeout(function () {
			
            props.map.setHeading(props.map.getHeading()+ 90); 
            props.map.panTo({
				lat: parseFloat(obj.location[0].lat) ,
				lng: parseFloat(obj.location[0].lng)  
			})}, 500);

		setTimeout(function () { 
			 props.map.setZoom(18)}, 900);

		setSelectedIndex(index);
	};

	


	if (!data) return null;


	
	return (
		<List>
			{data.tags.map((tags) => (
                <>
				<ListItem
					key={`tags-${tags.tag_id}`}
					alignItems="flex-start"
					selected={selectedIndex === `tags-${tags.tag_id}`}
					onClick={(event) => handleListItemClick(event, `tags-${tags.tag_id}`, tags)}
                    secondaryAction={
                        <IconButton  edge="end">
                            <Battery5BarIcon sx={{ color: "#69797E " }} />
                        </IconButton>
                }>

					<ListItemAvatar>
						<StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
							<Avatar src={tags.avatar} />
						</StyledBadge>
					</ListItemAvatar>

					<ListItemText
						sx={{ width: "44vw", textOverflow: "ellipsis" }}
						primary={tags.label }
						secondary={tags.location.length > 0 ? tags.location[0].description : 'Unknown'}
					/>
				</ListItem>
                <Divider variant="inset" component="li" />
                </>

			))}

		</List>
	);
}