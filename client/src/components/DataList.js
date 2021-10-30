
const DataList = (props) => {
    return (
        <div id='data-list'>
            <div onClick = {() => {props.choose(props.type ===1? 0: '')}}>
                <span>toutes les {props.type ===1? 'Specialites': 'Wilayas'}</span>
            </div>
            {
                props.type === 1?
                props.data.map(s => 
                    <div onClick = {() => {props.choose(s.id_speciality)}} key = {s.id_speciality}>
                        <span>{s.speciality_name}</span>
                    </div>
                )
                :
                props.data.map((w, index) => 
                    <div onClick = {() => {props.choose(w.wilaya) }} key={index}>
                        <span>{w.wilaya}</span>
                    </div>
                )
            }
        </div>
    )
}

export default DataList;