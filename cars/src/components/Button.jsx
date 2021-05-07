import './Button.css';

export default function Button(props){
    return (
        <button 
            className="btn" 
            onClick={props.handler}
            disabled={props.disabled}
        >
            {props.label}
        </button>
        )
}

