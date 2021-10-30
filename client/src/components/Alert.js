const Alert = (props) => {
    return (
        <div className='alert' onClick={ (e)=> {e.stopPropagation();} }>
            <div className='block'>
                <p> {props.msg} </p>
                <button onClick={ props.toggle } >OK</button>
            </div>
        </div>
    )
}

export default Alert
