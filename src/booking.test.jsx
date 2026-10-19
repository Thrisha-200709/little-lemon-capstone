import { describe, expect, it } from "vitest";
import { getAvailableTimes, TIMES, validateBooking } from "./booking.js";

describe("booking helpers", () => {
  it("returns all standard times when no date is selected", () => {
    expect(getAvailableTimes("")).toEqual(TIMES);
  });

  it("returns a non-empty list of available times for a date", () => {
    expect(getAvailableTimes("2030-05-20").length).toBeGreaterThan(0);
    expect(getAvailableTimes("2030-05-20").length).toBeLessThan(TIMES.length);
  });

  it("accepts a valid future booking", () => {
    const errors = validateBooking({
      date: "2099-05-20", time: "18:00", guests: "2", occasion: "Birthday"
    });
    expect(errors).toEqual({});
  });

  it("requires date, time, guests, and occasion", () => {
    const errors = validateBooking({ date: "", time: "", guests: "", occasion: "" });
    expect(errors.date).toBeTruthy();
    expect(errors.time).toBeTruthy();
    expect(errors.guests).toBeTruthy();
    expect(errors.occasion).toBeTruthy();
  });

  it("rejects a past date", () => {
    const errors = validateBooking({
      date: "2000-01-01", time: "18:00", guests: "2", occasion: "Birthday"
    });
    expect(errors.date).toMatch(/future date/i);
  });

  it("rejects guest counts outside the allowed range", () => {
    const errors = validateBooking({
      date: "2099-05-20", time: "18:00", guests: "11", occasion: "Birthday"
    });
    expect(errors.guests).toMatch(/1 and 10/i);
  });
});