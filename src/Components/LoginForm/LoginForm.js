import React, { useState } from 'react'
import PropTypes from 'prop-types';

function LoginForm(props) {

    const [fieldUsrValue, setFieldUsrValue] = useState("")
    const [fieldPwdValue, setFieldPwdValue] = useState("")

    /* Detects if localStorage is available */
    const storageAvailable = (type) => {
        var storage;
        try {
            storage = window[type];
            var x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                (storage && storage.length !== 0);
        }
    }

    const loginCheck = (event) => {
        event.preventDefault();
        if (storageAvailable('localStorage')) {
            // Yippee! We can use localStorage awesomeness
            if(fieldUsrValue === "luis" && fieldPwdValue === "123") {
                props.authenticate(true)
                localStorage.setItem('username', fieldUsrValue);
                localStorage.setItem('password', fieldPwdValue);
            }
          }
          else {
            // Too bad, no localStorage for us
            props.authenticate(false)
            console.log('localStorage is not avaiable');
          }
    }

    const onChangeValue = (event) => {
        (event.target.name === 'username') ? setFieldUsrValue(event.target.value) : setFieldPwdValue(event.target.value)
        
    }

    return props.auth ? props.children : (
      <div className="searchComponent">
        <form onSubmit={ loginCheck }>
        Username:
        <input
          type="text"
          name="username"
          value={ fieldUsrValue }
          onChange={ onChangeValue }
        />
        &nbsp; 
        Password
        <input
          type="text"
          name="password"
          value={ fieldPwdValue }
          onChange={ onChangeValue }
        />
        <button type="submit">Login</button>
      </form>
      </div>
    )
}

LoginForm.propTypes = {
    fieldUsrValue: PropTypes.string,
    fieldPwdValue: PropTypes.string,
    authenticate: PropTypes.func,
    onChangeValue: PropTypes.func,
    storageAvailable: PropTypes.func,
    loginCheck: PropTypes.func,
}

export default LoginForm

