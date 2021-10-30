import React from 'react'

const Prompt = (props) => {
    return (
        <div className='alert' onClick={ (e)=> {e.stopPropagation();} }>
            <div className='block'>
                <button onClick={ () => props.remove(props.id) } >Confirmer</button>
                <button onClick={ props.toggle } >Annuler</button>
            </div>
        </div>
    )
}

export default Prompt
