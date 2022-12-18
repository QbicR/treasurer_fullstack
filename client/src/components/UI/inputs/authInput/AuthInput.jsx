import React from 'react';
import classes from './AuthInput.module.scss'

const AuthInput = React.forwardRef((props, ref) => {
    return (
        <input ref={ref} className={classes.input} {...props} />
    );
});

export default AuthInput;