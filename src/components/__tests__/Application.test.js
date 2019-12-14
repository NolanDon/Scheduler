import React from 'react';

import {
  cleanup,
  fireEvent,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  getByText,
  prettyDOM,
  queryByAltText,
  queryByText,
  render,
  waitForElement,
} from '@testing-library/react';

import Application from 'components/Application';

import axios from "axios"

afterEach(cleanup);

describe('Appointment', () => {
  it('{1} defaults to Monday and changes the schedule when a new day is selected (promise)', () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText('Monday')).then(() => {
      fireEvent.click(getByText('Tuesday'));
      expect(getByText('Leopold Silvers')).toBeInTheDocument();
    });
  });

   // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  it('{2} changes the schedule when a new day is selected', async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText('Monday'));

    fireEvent.click(getByText('Tuesday'));

    expect(getByText('Leopold Silvers')).toBeInTheDocument();
  });

   // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  it('{3} loads data, books an interview and reduces the spots remaining for the first day by 1', async () => {

    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, 'appointment');
    const appointment = appointments[0];
    

    fireEvent.click(getByAltText(appointment, 'Add'));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: 'Lydia Miller-Jones' }
    });
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

    fireEvent.click(getByText(appointment, 'Save'));

    expect(getByText(appointment, 'Saving')).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, 'Lydia Miller-Jones'));

    const day = getAllByTestId(container, 'day').find(day =>
      queryByText(day, 'Monday')
    );

    expect(getByText(day, 'no spots remaining')).toBeInTheDocument();
  });


    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  it('{4} loads data, edits an interview and keeps the spots remaining for Monday the same', async () => {
    // {1} Render application
    const { container } = render(<Application />);

    // {2} Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    prettyDOM(container)
    // {3} Click Edit button on the Appointment
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
      
    );

    fireEvent.click(queryByAltText(appointment, 'Edit'));

    // {4} Target the field with enter student name
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: 'Lydia Miller-Jones' }
    });

    // {5} Click save button
    fireEvent.click(getByText(appointment, 'Save'));

    // {6} Saving Hook
    expect(getByText(appointment, 'Saving')).toBeInTheDocument();

    // 7. Once saved, wait for appointment "Lydia Miller-Jones" to display
    await waitForElement(() => getByText(appointment, 'Lydia Miller-Jones'));

    // 8. For Monday
    const day = getAllByTestId(container, 'day').find(day =>
      queryByText(day, 'Monday')
    );

    // 9. Make sure that the amount of spots is still at one
    expect(getByText(day, '1 spot remaining')).toBeInTheDocument();
  });

 // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  it('{5} shows the save error when failing to save an appointment', async () => {
    // {1} Fake an error with axios
    axios.put.mockRejectedValueOnce();

    // {2} Render <Application>
    const { container } = render(<Application />);

    // {3] Wait for Archie Cohen to show up
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // {4} Get the first appointment in Array [0]
    const appointments = getAllByTestId(container, 'appointment');
    const appointment = appointments[0];
    

    // {5} Click Add button
    fireEvent.click(getByAltText(appointment, 'Add'));

    // {6} Enters name for appointment
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: 'Lydia Miller-Jones' }
    });
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

    // {7} Click Save button on the confirmation
    fireEvent.click(getByText(appointment, 'Save'));

    // {8} Check that element with "Saving" is displayed.
    expect(getByText(appointment, 'Saving')).toBeInTheDocument();

    // {9} An error should show up
    await waitForElement(() =>
      getByText(appointment, 'Could not save appointment.')
    );
  });

   // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  it('{6} shows the delete error when failing to delete an existing appointment', async () => {
    // {1} Fake an error 
    axios.delete.mockRejectedValueOnce();

    // {2} Render <Application>
    const { container,debug } = render(<Application />);
    debug()
    // {3} Wait for "Leopold Silvers" to display
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // {4} Click "Delete" button on the appointment
    const appointment = getAllByTestId(container, 'appointment').find(
      appointments => queryByText(appointments, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, 'Delete'));

    // {5} Check that the confirmation shows
    expect(
      getByText(appointment, 'Are you sure you want to delete your appointment?')
    ).toBeInTheDocument();

    // {6} Click "Confirm" button on confirmation
    fireEvent.click(getByText(appointment, 'Confirm'));

    // {7} Check that element with "Deleting" displays
    expect(getByText(appointment, 'Deleting')).toBeInTheDocument();

    // {8} An error should render
    await waitForElement(() =>
      getByText(appointment, 'Could not delete appointment.')
    );
  });

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  it('{7} loads data, cancels an interview and increases the spots remaining for Monday by 1', async () => {
  // {1} Render <Application>
  const { container } = render(<Application />);

  // {2} Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // {3} Click "Delete" button on the booked appointment.
  const appointment = getAllByTestId(container, 'appointment').find(
    appointment => queryByText(appointment, "Archie Cohen")
  );
  
  fireEvent.click(queryByAltText(appointment, 'Delete'));

  // {4} Check that the confirmation message is shown.
  expect(
    getByText(appointment, 'Are you sure you want to delete your appointment?')
  ).toBeInTheDocument();

  // {5} Click Confirm button on confirmation 
  fireEvent.click(getByText(appointment, 'Confirm'));

  // {6} Check element with "Deleting" is displayed.
  expect(getByText(appointment, 'Deleting')).toBeInTheDocument();

  // {7} Wait for lement with "Add" button 
  await waitForElement(() => getByAltText(appointment, 'Add'));

  // {8} Check that DayListItem with text "Monday" displays "2 spots remaining".
  const day = getAllByTestId(container, 'day').find(day =>
    queryByText(day, 'Monday')
  );

  expect(getByText(day, '2 spots remaining')).toBeInTheDocument();

  });
});