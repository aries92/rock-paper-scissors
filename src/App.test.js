import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {render, fireEvent, waitForElement, wait} from 'react-testing-library'

describe('Game', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("should click button, disable button, run animation, show game result", async () => {
        const {getByTestId} = render(<App/>);

        fireEvent.click(getByTestId('button'));

        expect(getByTestId('body').classList[1]).toBe('active');
        expect(getByTestId('button').disabled).toBe(true)

        await waitForElement(() =>
            getByTestId('result'),
        )

        expect(getByTestId('result')).toBeTruthy()
    });

})