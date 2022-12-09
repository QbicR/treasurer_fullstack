import React from 'react';
import classes from './Modal.module.css'

const Modal = ({ visible, setVisible, children }) => {

    const rootClasses = [classes.myModal]

    if (visible) {
        rootClasses.push(classes.active)
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div onClick={(event) => event.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;