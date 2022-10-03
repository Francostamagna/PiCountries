import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getAllCountries,postActivity} from '../Actions/Actions';
import '../Styles/Form.css'
import worldlight from '../Images/worldlight.jpg'

function Form() {

  let [input, setInput] = React.useState({
  name: '',
  season:'',
  duration: 1,
  difficulty: 1,
  country:[],

 })

 let [errors, setErrors] = React.useState({
  name:"Name required",
  season:  "Season required",
  country: "Country required"

 })

 const dispatch = useDispatch();
 const history = useHistory();

 React.useEffect( () => {
  dispatch(getAllCountries())
 },[dispatch]);

 let validate = (input) => {
   const errors = {};
   if (!input.name){
    errors.name = "Name required"
   }
   if (input.name.length >= 16){
    errors.name = "Max. 15 letters"
   }

    if (input.duration === 0) {
    errors.duration = "Duration must be greater than 0 and lesser than 8"
   }
    if (!input.season){
    errors.season = "Season required"
   }
  
    if (input.difficulty === 0) {
    errors.difficulty = "Difficulty must be greater than 0 and lesser than 6"
   }
   
    if (input.country.length === 0) {
    errors.country = "Country required"
   }
    if (input.country.length >= 5) {
      errors.country = " Max. 4 Countries"}

   return errors;
 }
 
 
 
 const difficulty = [1,2,3,4,5]

 const seasons = ["Summer", "Winter","Autumn", "Spring" ];

 const allcountriesNames = [];

 const all = useSelector(state => state.countriesAll);

 all.map((c) => allcountriesNames.push( c.name));

 let submit = true;

 if(input.name && input.season && input.difficulty
   && input.country.length >= 1 && input.duration)
 { if (!errors.name && !errors.season && !errors.difficulty && !errors.country  && !errors.duration)
{ submit= false

}}

 let handleChange = (e) => {
  setInput({
    ...input,
    [e.target.name ] : e.target.value
  })
  setErrors(validate({
    ...input,
    [e.target.name ] : e.target.value
  }))

}

var switchCheck = false;

let handleCheck = (e) => {
  
  if (e.target.checked && !input.season){ 
  setInput({
    ...input,
    season : e.target.value
  })
  setErrors(validate({
    ...input,
    season: e.target.value
  }))
  
}

else if (e.target.checked && input.season){
  switchCheck = false;
  e.target.checked = switchCheck;
  switchCheck = true;
  console.log(input)
  
}

else if (!e.target.checked && input.season){
  setInput({
    ...input,
    season : ''
  })
  setErrors(validate({
    ...input,
    season: ''
  }))

}}


let handleSelectCountry = (e) => {
  setInput({
    ...input,
    country : [...input.country, e.target.value]
  })
  setErrors(validate({
    ...input,
    country : [...input.country, e.target.value]
  }))
}

let handleDelete = (e) => {
  setInput({
    ...input,
    country : input.country.filter((c) => c !== e)
  })
  setErrors(validate({
    ...input,
    country :  input.country.filter((c) => c !== e)
  }))
 
}

let handleSubmit = (e) => {
  e.preventDefault();
  dispatch(postActivity(input));
  setInput({name: '',
  season:'',
  duration: '',
  difficulty: '',
  country:[]});
  alert('Activity Created');
  history.push("/countries")

}
 
console.log(input);
console.log(errors);
 
 
  return (
    <div className='imageBackground'>
      <img  className='formImage' src={worldlight} alt='Not found'></img>
      <div className='backgroundFilter'></div>
    <div className='allForm'>
      
      <div className='titleForm'>
        <div>CREATE A NEW ACTIVITY</div>
      </div>
      <div className='formContainer'>
        <form className='form' onSubmit={(e) => {handleSubmit(e)}}>
           <div className='formNameContainer'>
           <label>NAME</label>
           <div><input key={'name'} type='text' name={'name'} value={input.name} 
           onChange={(e) => {handleChange(e)}} /></div>
          
           </div>
           <div className='formSeasonContainer'>
           <label>SEASON</label>
          <div>
           <label><input 
           type="checkbox"
           name="Summer"
           value="Summer"
           onChange={(e) => handleCheck(e)}
           />Summer</label>

          <label><input
           type="checkbox"
           name="Spring"
           value="Spring"
           onChange={(e) => handleCheck(e)}
           />Spring</label> 

          <label><input
           type="checkbox"
           name="Autumn"
           value="Autumn"
           onChange={(e) => handleCheck(e)}
           />Autumn</label>

          <label><input
           type="checkbox"
           name="Winter"
           value="Winter"
           onChange={(e) => handleCheck(e)}
           />Winter</label>

         </div>   
           </div>
           <div className='formDurationContainer'>
           <label>DURATION</label>
           <div><input  type='range' min={1} max={7} name={'duration'} value={input.duration} 
           onChange={(e) => {handleChange(e)}} /></div>
           <div> 
             {input.duration} days
           </div>
          
           </div>
           <div className='formDifficultyContainer'>
           <label>DIFFICULTY</label>
           <div><input   type='range' min={1} max={5}  name={'difficulty'} value={input.difficulty} 
           onChange={(e) => {handleChange(e)}} /></div> 
           <div> 
            level {input.difficulty} 
           </div>
          
           </div>
           <div className='formCountryContainer' >
           <label>COUNTRY</label>
           <div > <select className='formCountrySelect' name='country' value={input.country} onChange={(e) => {handleSelectCountry(e)}}>
           <option className='noShow'>-- Select --</option>
           {allcountriesNames.map((c) => ( <option value={c}>{c}</option> ))  } 
                 </select> 
            </div>
          
           </div>

           <div className='showCountries'>
             {input.country.map((c) =>
               <div className='itemCountry'>
                <p>{c}</p>
                <input type='button' value='X' onClick={() => {handleDelete(c)}}/>
                </div>
             )}
          
           </div>

           <div>
            <button className='formCreateButton' type='submit' disabled={submit} value='Create'>Create!</button>
           </div>
        
        
        </form>

        <div className='formErrors'>

       <div>{ !errors.name? <span className='spanOk'>OK</span> :<span>{errors.name}</span> }  </div>  
       <div >{ !errors.season? <span className='spanOk'>OK</span>: <span>{errors.season}</span>} </div>
       <div>{ !errors.duration? <span className='spanOk'>OK</span> : <span>{errors.duration}</span>} </div>
       <div>{ !errors.difficulty? <span className='spanOk' >OK</span> : <span>{errors.difficulty}</span>} </div>
       <div id='errorSeason' >{ !errors.country? <span className='spanOk'>OK</span> : <span>{errors.country}</span>} </div>
       
        </div>

       <br/>

      </div>

      <div className='formButtonContainer'><Link to={'/countries'}><button className='formBackButton'>BACK</button></Link></div>

    </div>
    </div>
  )
}

export default Form


