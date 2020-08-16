import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { configure, shallow } from "enzyme";

import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });


import App from './App';

const user = {
  firstname: "Joe",
  lastname: "Blow",
  email: "joe@gmail.com",
  ev_date: "08/16/2020",
};
 
describe('Event App', () => {

  test('renders App component', () => {
    render(<App />);

    //screen.getByRole('');
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  test('submit button handler', async () => {

    const promise = Promise.resolve({ data: { firstname: 'Joe', lastname: 'Blow', email: 'joe@gmail.com', ev_date: '08/16/2020' } });

    render(<App />);
    const button = screen.getByRole("button");
  
    //screen.debug();
 
    
    await userEvent.click(screen.getByRole('button'));

    await act(() => promise);
 
    //screen.debug();

    // initialise an event, and assign your own preventDefault
    /*
    const clickEvent = new MouseEvent('click');
    Object.assign(clickEvent, {preventDefault: jest.fn()});
  
    fireEvent(button, clickEvent);
  
    expect(clickEvent.preventDefault).toHaveBeenCalledTimes(1);
    */
  });

});