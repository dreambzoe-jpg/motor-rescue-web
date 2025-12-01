import React, { useState } from "react";
import supabase from "../services/supabase";

interface BookingFormProps {
  garageId: string;
}

export default function BookingForm({ garageId }: BookingFormProps) {
  const [serviceType, setServiceType] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const submit = async () => {
    await supabase.from("bookings").insert({
      garage_id: garageId,
      service_type: serviceType,
      schedule_date: date,
      schedule_time: time
    });

    alert("Booking requested!");
  };

  return (
    <div className="booking-form">
      <h3>Book a Service</h3>

      <input
        type="text"
        placeholder="Service Needed (ex: Oil Change)"
        value={serviceType}
        onChange={(e) => setServiceType(e.target.value)}
      />

      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />

      <button onClick={submit}>Request Booking</button>
    </div>
  );
}
