import React, {useReducer} from "react";

const initialState = {
    firstName: {
        value:  "",
        error: null
    },
    lastName: {
        value: "",
        error: null
    },
    email: {
        value: "",
        error: null
    },
    hasBeenSubmitted: false
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_FIRST_NAME":
            return {
                ...state,
                firstName: {
                    ...state.firstName,
                    value: action.payload
                }
            };
        case "SET_FIRST_NAME_ERROR":
            return {
                ...state,
                firstName: {
                    ...state.firstName.value,
                    error: action.payload
                }
            };
        case "SET_LAST_NAME":
            return {
                ...state,
                lastName: {
                    ...state.lastName.value,
                    value: action.payload
                }
            };
            
        case "SET_LAST_NAME_ERROR":
            return {
                ...state,
                lastName: {
                    ...state.lastName.value,
                    error: action.payload
                }
            };

        case "SET_EMAIL":
            return {
                ...state,
                email: {
                    ...state.email.value,
                    value: action.payload
                }
            };
        case "SET_EMAIL_ERROR":
            return {
                ...state,
                email: {
                    ...state.email.value,
                    error: action.payload
                }
            };

        case "SET_HAS_BEEN_SUBMITTED":
            return {
                ...state,
                hasBeenSubmitted: action.payload
            };
        default:
            return state;
    }
};

export default () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleFirstNameChange = (e) => {
        if (e.target.value.length < 2) {
            dispatch({
                type: "SET_FIRST_NAME_ERROR",
                payload: "First name must be at least 2 characters"
            });
        } else {

            dispatch({
                type: "SET_FIRST_NAME_ERROR",
                payload: null
                
            });
            dispatch({
                type: "SET_FIRST_NAME",
                payload: e.target.value
            });
        }
    };

    const handleLastNameChange = (e) => {
        if (e.target.value.length < 2) {
            dispatch({
                type: "SET_LAST_NAME_ERROR",
                payload: "Last name must be at least 2 characters"

            });
        } else {

            dispatch({
                type: "SET_LAST_NAME_ERROR",
                payload: null
            });
            dispatch({
                type: "SET_LAST_NAME",
                payload: e.target.value
            });
        }
    };

    const handleEmailChange = (e) => {
        // validate email using regex
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(e.target.value)) {
            dispatch({
                type: "SET_EMAIL_ERROR",
                payload: "Email must be valid"
                
            });
        }
        else {
            dispatch({
                type: "SET_EMAIL_ERROR",
                payload: null

            });

            dispatch({
                type: "SET_EMAIL",
                payload: e.target.value
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: "SET_HAS_BEEN_SUBMITTED",
            payload: true
        });

    };


    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1 className="mt-3">Form</h1>
                <h2>{JSON.stringify(state)}</h2>
                {state.firstName.error !== null && <p className="text-danger">{state.firstName.error}</p>}

                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="firstName" placeholder="First Name" onChange={handleFirstNameChange}/>
                    <label htmlFor="firstName">First Name</label>
                </div>
                {state.lastName.error !== null && <p className="text-danger">{state.lastName.error}</p>}
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="lastName" placeholder="Last Name" onChange={handleLastNameChange}/>
                    <label htmlFor="lastName">Last Name</label>
                </div>
                {state.email.error !== null && <p className="text-danger">{state.email.error}</p>}
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="email" placeholder="Email" onChange={handleEmailChange}/>
                    <label htmlFor="email">Email</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
    }

