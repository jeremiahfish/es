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

/* Action Icon */
import IconButton from "@mui/material/IconButton";
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone';

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




export default function Equipment(props) {


	const { data } = props;
	//console.log(props.map);

	const [selectedIndex, setSelectedIndex] = React.useState(-1);

	const handleListItemClick = (event, index, obj) => {

		if( props.map.getZoom() > 16 )
			props.map.setZoom(16);

		setTimeout(function () {
			props.map.panTo({
				lat: parseFloat(obj.location[0].lat) - 0.000,
				lng: parseFloat(obj.location[0].lng)
			})}, 500);

		setTimeout(function () { 
			props.map.setZoom(18)}, 1100);

		setSelectedIndex(index);
	};



	if (!data) return null;

	return (
		<List >
			{data.equipment.map((equipment) => (
                <>
				<ListItem
					key={`equipment-${equipment.equipment_id}`}
					alignItems="flex-start"
					selected={selectedIndex === `equipment-${equipment.equipment_id}`}
					onClick={(event) => handleListItemClick(event, `equipment-${equipment.equipment_id}`, equipment)}
					secondaryAction={
                        <IconButton  edge="end">
                            <ArrowForwardIosTwoToneIcon sx={{ color: "#69797E " }} />
                        </IconButton>
                }>

					<ListItemAvatar>
						<StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
							<Avatar src={equipment.avatar} />
						</StyledBadge>
					</ListItemAvatar>

					<ListItemText
						sx={{ width: "44vw", textOverflow: "ellipsis" }}
						primary={equipment.label }
						secondary={equipment.location.length > 0 ? equipment.location[0].description : 'Unknown'}
					/>
				</ListItem>
                <Divider variant="inset" component="li" />
                </>
			))}

		</List>
	);
}