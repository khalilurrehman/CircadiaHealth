import React, { useState} from 'react';
import axios from 'axios';

const Getroot = () =>{

    const [loading,setLoading] = useState(false);
    const [val,setVal] = useState();
    const [result, setResult] = useState();

    const onChangeHandler = e =>{
        setVal(Math.round(e.target.value));
    }

    const onClickHandler = async () =>{
        setLoading(true);
        const {data} = await axios.get('https://cors-anywhere.herokuapp.com/https://gxxph4h9l6.execute-api.us-east-1.amazonaws.com/default/front_end_hiring', {
            params:{
                input: val
            }
        });
        setLoading(false);
        setResult(data.result);
        setVal('');
    }
    return(
        <div>
           {
               loading ?

               "Loading..." :
               <div>
                    <input type="text" value={val} onChange={onChangeHandler} />
                    <button onClick={onClickHandler}>Calculate</button>
               </div> 
           }
        <h1>{result}</h1>
        </div>
    )

}

export default Getroot;