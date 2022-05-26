import React from "react";
import moment from 'moment';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const options = {
    indexAxis: 'x',
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom',
            display: false,
        },
        title: {
            display: false,
            text: '',
        },
    },
    scales: {
        yAxis: {
            title: { display: false },
        }
    }
};



export default function ChartHoursWorkede(props) {

    const hours = props.data.hours_worked;
    // Sort on Status, then First Name
    let _ = require('underscore');
    var day = _.groupBy(hours, (hour) => moment(hour.last_seen).format("DDD"));

    const labels = [];
    const totalHours = [];

    _.each(day, function (d) {

        if( d.length == 2){
            var duration = moment.duration(moment(d[0].last_seen).diff(moment(d[1].last_seen)));
            var h = duration.asHours();
            
            labels.push(  moment(d[0].last_seen).format("MMM D") );
            totalHours.push(duration.asHours());
        }
    });

    const chartdata = {
        labels,
        datasets: [
            {
                label: 'Hours Worked',
                data: totalHours,
                borderColor: '#0063B1',
                backgroundColor: '#0063B1cc',
            }
        ]
    };
    

    return (
        <Bar options={options} data={chartdata} height="220px" />
    );
}
