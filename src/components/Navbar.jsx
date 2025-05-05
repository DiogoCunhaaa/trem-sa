import styles from './Navbar.modules.css'

function Navbar (props) {
    return (
        <div>
            <nav className="navbar">
                <h1>{props.title}</h1>
            </nav>  
        </div>
    )
}

export default Navbar