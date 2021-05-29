import { makeStyles } from '@material-ui/core/styles';

import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
interface IGraph {
    user: any
}
const useStyles = makeStyles({
    container: {
        '& .recharts-wrapper': {
            background: '#FFF',
            margin: 'auto',
            position: 'relative',
            top: 200
          }
    }
    
  });

export const AccessGraph = ({ user }: IGraph) => {
    console.log(user)
    const classes = useStyles();
    return (
        <div className={classes.container}>
        
        <LineChart
          width={500}
          height={300}
          data={user.access}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line dataKey="times" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
 
        </div>
    )
}