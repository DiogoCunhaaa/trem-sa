import styles from './ForgotPasswordModal.module.css'

function ForgotPasswordModal({ show, onClose}) {
    if (!show) return null;

    return(
        <div className="modal d-block" tabIndex={1} style={{backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">Reset Password</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>

                    <div className="modal-body">
                        <label htmlFor="resetEmail" className='form-label'>Digite seu email: </label>
                        <input type="email" id="resetEmail" className={`w-100 ${styles.customInput}`} placeholder='exemplo@exemplo.com' />
                    </div>

                    <div className="modal-footer">
                        <button className={`custom-button ${styles.customButton}`} onClick={onClose}>Cancel</button>
                        <button className={`custom-button ${styles.customButton}`} style={{backgroundColor: '#000000', color: '#ffffff'}}>Send Reset Link</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ForgotPasswordModal;