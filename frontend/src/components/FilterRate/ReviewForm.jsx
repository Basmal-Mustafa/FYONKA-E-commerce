import React, { useState } from "react";
import "@/styles/ReviewForm.css";

function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0 || name.trim() === "") {
      alert("Please fill out all fields.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="review-container">
      <h2 className="title">WRITE A REVIEW</h2>
      <div className="underline" />
      {!submitted ? (
        <form className="review-form" onSubmit={handleSubmit}>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= (hoveredRating || rating) ? "active" : ""}`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
              >
                ★
              </span>
            ))}
          </div>
          <textarea
            className="review-textarea"
            placeholder="Your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <input
            type="text"
            placeholder="Your Name"
            className="review-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button className="send-button" type="submit">
            SUBMIT REVIEW
          </button>
        </form>
      ) : (
        <div className="review-submitted">
          <p>✅ Thank you for your review, <strong>{name}</strong>!</p>
          <p>
            You rated: <strong>{rating} star{rating > 1 && "s"}</strong>
          </p>
          <p>📝 "{comment}"</p>
        </div>
      )}
    </div>
  );
};

export default ReviewForm;
