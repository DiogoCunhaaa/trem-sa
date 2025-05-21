import styles from './InputField.module.css';

function InputField({ whatFor, whatValue, onChange }) {
    const label = whatFor.toLowerCase();
    const isPassword = label.includes('senha');
    const isEmail = label.includes('email');

    const inputType = isPassword ? 'password' : isEmail ? 'email' : 'text';
    const iconClass = isPassword ? 'bi-lock' : isEmail ? 'bi-envelope' : 'bi-person';

    return (
        <div className="container">
            <div className={styles.customInput}>
                <div className={styles.iconCircle}>
                    <i className={`bi p-5 ${iconClass}`}></i>
                </div>
                <input
                    type={inputType}
                    placeholder={whatFor}
                    value={whatValue}
                    onChange={onChange}
                />
            </div>
        </div>
    );
}

export default InputField;