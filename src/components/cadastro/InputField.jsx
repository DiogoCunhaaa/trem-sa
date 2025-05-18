import { useState } from 'react';
import styles from './InputField.module.css'

function InputField({ whatFor, whatValue, onChange, password = false }) {
    const isPassword = whatFor.toLowerCase().includes('senha');

    return(
        <div className="container">
            <div className={styles.customInput}>
            <div className={styles.iconCircle}>
                <i className={`bi ${isPassword ? 'bi-lock' : 'bi-person'}`}></i>
            </div>
            <input
                type={isPassword ? 'password' : 'text'}
                placeholder={whatFor} 
                value={whatValue}
                onChange={onChange} 
            />
        </div>
        </div>
    )
}

export default InputField