export const TIMES = [
  "17:00", "17:30", "18:00", "18:30", "19:00",
  "19:30", "20:00", "20:30", "21:00"
];

export function getAvailableTimes(dateValue) {
  if (!dateValue) return TIMES;
  // Demonstration availability: vary times by date while keeping at least one option.
  const day = new Date(`${dateValue}T12:00:00`).getDate();
  return TIMES.filter((_, index) => (index + day) % 4 !== 0);
}

export function validateBooking({ date, time, guests, occasion }) {
  const errors = {};
  if (!date) errors.date = "Please choose a date.";
  else {
    const selected = new Date(`${date}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (Number.isNaN(selected.getTime())) errors.date = "Please enter a valid date.";
    else if (selected < today) errors.date = "Choose today or a future date.";
  }
  if (!time) errors.time = "Please select a time.";
  if (!guests) errors.guests = "Please choose the number of guests.";
  else if (!Number.isInteger(Number(guests)) || Number(guests) < 1 || Number(guests) > 10) {
    errors.guests = "Choose between 1 and 10 guests.";
  }
  if (!occasion) errors.occasion = "Please choose an occasion.";
  return errors;
}