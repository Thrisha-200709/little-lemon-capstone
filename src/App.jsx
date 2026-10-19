import React from 'react';
import { useMemo, useState } from "react";
import { getAvailableTimes, validateBooking } from "./booking.js";

const today = new Date();
const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

function FieldError({ id, children }) {
  if (!children) return null;
  return <p className="field-error" id={id} role="alert">{children}</p>;
}

export default function App() {
  const [form, setForm] = useState({
    date: todayString, time: "18:00", guests: "2", occasion: "Birthday"
  });
  const [errors, setErrors] = useState({});
  const [confirmation, setConfirmation] = useState(null);
  const availableTimes = useMemo(() => getAvailableTimes(form.date), [form.date]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm(current => ({
      ...current,
      [name]: value,
      ...(name === "date" ? { time: getAvailableTimes(value)[0] || "" } : {})
    }));
    setErrors(current => ({ ...current, [name]: undefined }));
    setConfirmation(null);
  }

  function submitBooking(event) {
    event.preventDefault();
    const nextErrors = validateBooking(form);
    setErrors(nextErrors);
    setConfirmation(null);
    if (Object.keys(nextErrors).length > 0) return;
    setConfirmation({ ...form });
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Little Lemon home">
          <span className="lemon-mark" aria-hidden="true">●</span>
          <span>LITTLE <b>LEMON</b><small>MEDITERRANEAN KITCHEN</small></span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#home">Home</a><a href="#menu">Menu</a><a href="#about">About</a>
          <a className="nav-active" href="#booking">Reservations</a>
        </nav>
      </header>

      <main id="home">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">FRESH • SEASONAL • MEDITERRANEAN</p>
            <h1 id="hero-title">A little taste<br />of the <em>Mediterranean.</em></h1>
            <p>Gather around our table for bright flavours, fresh ingredients, and the kind of meal that turns an ordinary day into something special.</p>
            <a className="button button-yellow" href="#booking">Reserve a table <span aria-hidden="true">→</span></a>
          </div>
          <div className="hero-art" role="img" aria-label="Illustration of a Mediterranean lemon, leaves, and sun">
            <div className="sun"></div><div className="leaf leaf-one"></div><div className="leaf leaf-two"></div>
            <div className="lemon-illustration"><span></span></div>
            <div className="hero-art-caption">GOOD FOOD. GOOD COMPANY.</div>
          </div>
        </section>

        <section className="booking-section" id="booking" aria-labelledby="booking-title">
          <div className="booking-intro">
            <p className="eyebrow">YOUR TABLE IS WAITING</p>
            <h2 id="booking-title">Make a reservation</h2>
            <p>Plan your next get-together. Choose your date and we'll take care of the rest.</p>
            <div className="info-note"><span aria-hidden="true">✦</span><p><strong>A little note</strong><br />For groups larger than 10, please contact our team directly.</p></div>
          </div>

          <form className="booking-form" onSubmit={submitBooking} noValidate>
            <div className="form-heading"><span>01</span><h3>Your visit</h3></div>
            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="date">Choose date <span aria-hidden="true">*</span></label>
                <input id="date" name="date" type="date" min={todayString} value={form.date} onChange={updateField}
                  aria-invalid={Boolean(errors.date)} aria-describedby={errors.date ? "date-error" : undefined} />
                <FieldError id="date-error">{errors.date}</FieldError>
              </div>
              <div className="form-field">
                <label htmlFor="time">Choose time <span aria-hidden="true">*</span></label>
                <select id="time" name="time" value={form.time} onChange={updateField}
                  aria-invalid={Boolean(errors.time)} aria-describedby={errors.time ? "time-error" : undefined}>
                  {availableTimes.length === 0 && <option value="">No times available</option>}
                  {availableTimes.map(time => <option key={time} value={time}>{time}</option>)}
                </select>
                <FieldError id="time-error">{errors.time}</FieldError>
              </div>
              <div className="form-field">
                <label htmlFor="guests">Number of guests <span aria-hidden="true">*</span></label>
                <select id="guests" name="guests" value={form.guests} onChange={updateField}
                  aria-invalid={Boolean(errors.guests)} aria-describedby={errors.guests ? "guests-error" : undefined}>
                  {Array.from({ length: 10 }, (_, i) => <option key={i + 1} value={String(i + 1)}>{i + 1} {i === 0 ? "guest" : "guests"}</option>)}
                </select>
                <FieldError id="guests-error">{errors.guests}</FieldError>
              </div>
              <div className="form-field">
                <label htmlFor="occasion">Occasion <span aria-hidden="true">*</span></label>
                <select id="occasion" name="occasion" value={form.occasion} onChange={updateField}
                  aria-invalid={Boolean(errors.occasion)} aria-describedby={errors.occasion ? "occasion-error" : undefined}>
                  <option value="Birthday">Birthday</option><option value="Anniversary">Anniversary</option>
                  <option value="Date night">Date night</option><option value="Business">Business</option>
                  <option value="Other">Other</option>
                </select>
                <FieldError id="occasion-error">{errors.occasion}</FieldError>
              </div>
            </div>
            <button className="button button-green submit-button" type="submit">Confirm reservation <span aria-hidden="true">→</span></button>
            {confirmation && (
              <div className="confirmation" role="status" aria-live="polite">
                <span className="confirmation-icon" aria-hidden="true">✓</span>
                <div><h3>You're on our guest list!</h3>
                  <p>Your demo reservation is set for <strong>{confirmation.date}</strong> at <strong>{confirmation.time}</strong> for <strong>{confirmation.guests} {confirmation.guests === "1" ? "guest" : "guests"}</strong> ({confirmation.occasion}).</p>
                  <small>This is a course demo; no real booking has been sent to the restaurant.</small>
                </div>
              </div>
            )}
          </form>
        </section>

        <section className="bottom-strip" id="about">
          <div><span className="strip-icon" aria-hidden="true">✦</span><h3>Fresh, always</h3><p>Seasonal ingredients, vibrant flavours.</p></div>
          <div id="menu"><span className="strip-icon" aria-hidden="true">☼</span><h3>Made to gather</h3><p>Good food is even better together.</p></div>
          <div><span className="strip-icon" aria-hidden="true">♡</span><h3>Made with care</h3><p>A warm welcome, every time.</p></div>
        </section>
      </main>
      <footer><a className="footer-brand" href="#home">LITTLE LEMON</a><span>Fresh flavours, happy moments.</span><span>© {new Date().getFullYear()} Little Lemon · Student capstone demo</span></footer>
    </div>
  );
}