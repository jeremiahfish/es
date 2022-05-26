import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Moment from 'react-moment';
import 'moment-timezone';
import uuid from 'react-uuid';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '& td .tableTdDateWeekday': {
        fontWeight: 500,
        color: '#0063B1'
    },

}));

export default function TableHoursWorked(props) {

    const hours = props.data.hours_worked;
    return (
        <Table>

            <TableHead>
                <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="left" sx={{ display: { xs: 'none', md: 'table-cell' } }}>Location</TableCell>
                    <TableCell align="right">Action</TableCell>
                    <TableCell align="right">Time</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {hours.map((row) => (
                    <StyledTableRow
                        key={uuid()}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        className={row.time_action}
                    >

                        <TableCell align="left" className="tableTdDate"  width="200px">
                            <Moment format="dddd" tz="UTC" className="tableTdDateWeekday">{row.last_seen}</Moment> &nbsp;
                            <Moment format="MMM Do" tz="UTC">{row.last_seen}</Moment>
                        </TableCell>

                        <TableCell align="left" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                            {row.description}
                        </TableCell>

                        <TableCell align="right" width="40px">
                            {row.time_action}
                        </TableCell>

                        <TableCell align="right" width="100px">
                            <Moment format="LT" tz="UTC">{row.last_seen}</Moment>
                        </TableCell>


                    </StyledTableRow>
                ))}
            </TableBody>
        </Table>
    );
}
