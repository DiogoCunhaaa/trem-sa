import styles from './Navbar.modules.css'

function Navbar (props) {
    return (
        <div>
            <div className="row">
                <div className="col-12">
                <nav className={styles.Navbar}
                style={{
                    backgroundImage: `url(${props.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: `${props.corTexto}`
                }}>
                   
                    <div><h1>{props.title}</h1></div>
                    <div><button><i class="bi bi-arrow-left"></i></button></div>
                </nav> 
                </div>
            </div>  
        </div>
    )
}

export default Navbar