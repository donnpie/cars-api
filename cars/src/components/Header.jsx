import './Header.css';
import Link from './Link.jsx';

const Header = (props) => {
    return (
        <div className="header-container">
            <Link title="Home" href="/" />
            <Link title="View a car" href="/view" />
            <Link title="Edit a car" href="/edit" />
            <Link title="Add a car" href="/add" />
            <Link title="Delete a car" href="/delete" />
        </div>
    );
}

export default Header;