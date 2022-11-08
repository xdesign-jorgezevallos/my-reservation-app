
// ---------------------------------
// USING
// ---------------------------------
// "@reduxjs/toolkit": "1.5.0",
// "@testing-library/react": "11.2.5",
// "typescript": "3.7.2"
// "react": "16.13.1"
// "react-redux": "7.2.0",
// "react-router-dom": "5.2.0",

//import { configureStore } from '@reduxjs/toolkit';
import { render as rtlRender } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../store'

interface WrapperProps {
    children?: React.ReactNode;
}

function render(ui: any, { route = '/', initialState = {} } = {}) {
    window.history.pushState({}, 'Test page', route);
    
    const Wrapper = ({ children }: WrapperProps) => {
        return (
            <Provider store={store}>
                <BrowserRouter>{children}</BrowserRouter>
            </Provider>
        );
    };

    return rtlRender(ui, { wrapper: Wrapper });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };