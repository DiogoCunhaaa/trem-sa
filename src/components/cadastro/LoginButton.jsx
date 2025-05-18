import styles from './LoginButton.module.css'

function LoginButton({ whatFor, onLoginClick }) {
    return(
        <>
            <button className= {`custom-button ${styles.customButton}`} onClick={onLoginClick}>{whatFor}</button>
        </>
    )
}

export default LoginButton;