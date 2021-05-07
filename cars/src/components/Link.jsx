import './Link.css';

const Link = (props) => {
    return (
        <div className="link-container">
            <a href={props.href}>{props.title}</a>
        </div>
    );
}

export default Link;