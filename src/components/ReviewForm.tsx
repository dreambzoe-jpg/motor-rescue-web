"use client"

import React, { useState } from "react";
import supabase from "../services/supabase";

interface ReviewFormProps {
  garageId: string;
}

export default function ReviewForm({ garageId }: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const submitReview = async () => {
    await supabase.from("reviews").insert({
      garage_id: garageId,
      rating,
      comment,
    });

    setRating(5);
    setComment("");
    alert("Review submitted!");
  };

  return (
    <div className="review-form">
      <h3>Leave a Review</h3>

      <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
        <option value={5}>⭐️⭐️⭐️⭐️⭐️</option>
        <option value={4}>⭐️⭐️⭐️⭐️</option>
        <option value={3}>⭐️⭐️⭐️</option>
        <option value={2}>⭐️⭐️</option>
        <option value={1}>⭐️</option>
      </select>

      <textarea
        placeholder="Your comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button onClick={submitReview}>
        Submit Review
      </button>
    </div>
  );
}
