import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import {getAllActivities} from '../Actions/Actions.js'

export default function Activities() {
 
let dispatch = useDispatch();

let actividades = useSelector(state => state.activities);

React.useEffect( () => {
    dispatch(getAllActivities());},[dispatch])
  
 console.log(actividades);
 
    return (
    <div>
 { actividades && actividades.map((a)=> <div> {a.name} </div>
    
    
    )}

    </div>
  )
}
