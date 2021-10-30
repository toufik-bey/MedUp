
const Input = (props) => {


    return (
       <div className='onner' > 
         <input onChange = {props.handleChange} name={props.name} type={props.type} value={props.value}/> 
         <span>{props.name}</span>
          
       </div>
    )
};

export default Input;