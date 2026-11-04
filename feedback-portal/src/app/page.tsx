"use client";

import { useEffect, useState } from "react";

type Feedback = {
  id: string;
  name: string;
  message: string;
  rating: number;
  category: string;
  created_at: string;
};

export default function Home() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [category, setCategory] = useState("General");
  const [status, setStatus] = useState("");
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);

  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Edit states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editMessage, setEditMessage] = useState("");
  const [editRating, setEditRating] = useState(5);
  const [editCategory, setEditCategory] = useState("General");
  const [actionStatus, setActionStatus] = useState("");

  // Fetch feedback
  async function fetchFeedback() {
    try {
      const response = await fetch("/api/feedback");
      const data = await response.json();

      if (response.ok) {
        setFeedbackList(data);
      } else {
        setStatus(data.error || "Unable to load feedback.");
      }
    } catch {
      setStatus("Unable to load feedback.");
    } finally {
      setIsLoading(false);
    }
  }

  // Load feedback when page opens
  useEffect(() => {
    let ignore = false;

    async function loadFeedback() {
      try {
        const response = await fetch("/api/feedback");
        const data = await response.json();

        if (response.ok && !ignore) {
          setFeedbackList(data);
        } else if (!ignore) {
          setStatus(data.error || "Unable to load feedback.");
        }
      } catch {
        if (!ignore) {
          setStatus("Unable to load feedback.");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadFeedback();

    return () => {
      ignore = true;
    };
  }, []);

  // Submit feedback
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (trimmedName.length < 2) {
      setStatus("Please enter a name with at least 2 characters.");
      return;
    }

    if (trimmedMessage.length < 5) {
      setStatus("Feedback message must be at least 5 characters.");
      return;
    }

    setIsSubmitting(true);
    setStatus("Submitting feedback...");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          message: trimmedMessage,
          rating,
          category,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setStatus(result.error || "Submission failed.");
        return;
      }

      setName("");
      setMessage("");
      setRating(5);
      setCategory("General");

      await fetchFeedback();

      setStatus("Feedback submitted successfully!");
    } catch {
      setStatus("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Start editing feedback
  function handleEdit(feedback: Feedback) {
    setEditingId(feedback.id);
    setEditName(feedback.name);
    setEditMessage(feedback.message);
    setEditRating(feedback.rating);
    setEditCategory(feedback.category);
    setActionStatus("");
  }

  // Cancel editing
  function handleCancelEdit() {
    setEditingId(null);
    setEditName("");
    setEditMessage("");
    setEditRating(5);
    setEditCategory("General");
    setActionStatus("");
  }

  // Save edited feedback
  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!editingId) return;

    const trimmedName = editName.trim();
    const trimmedMessage = editMessage.trim();

    if (trimmedName.length < 2) {
      setActionStatus("Name must be at least 2 characters.");
      return;
    }

    if (trimmedMessage.length < 5) {
      setActionStatus("Feedback message must be at least 5 characters.");
      return;
    }

    setIsUpdating(true);
    setActionStatus("Updating feedback...");

    try {
      const response = await fetch("/api/feedback", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingId,
          feedback: {
            name: trimmedName,
            message: trimmedMessage,
            rating: editRating,
            category: editCategory,
          },
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setActionStatus(result.error || "Failed to update feedback.");
        return;
      }

      await fetchFeedback();
      handleCancelEdit();
      setActionStatus("Feedback updated successfully.");
    } catch {
      setActionStatus("Something went wrong. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  }

  // Delete feedback
  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this feedback?"
    );

    if (!confirmed) return;

    setDeletingId(id);
    setActionStatus("Deleting feedback...");

    try {
      const response = await fetch("/api/feedback", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();

      if (!response.ok) {
        setActionStatus(result.error || "Failed to delete feedback.");
        return;
      }

      if (editingId === id) {
        handleCancelEdit();
      }

      await fetchFeedback();
      setActionStatus("Feedback deleted successfully.");
    } catch {
      setActionStatus("Something went wrong. Please try again.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <main className="container">
      <h1>Feedback Portal</h1>
      <p>We&apos;d love to hear what you think.</p>

      {/* Feedback Form */}
      <form onSubmit={handleSubmit} className="feedback-form">
        <label htmlFor="name">Your Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          minLength={2}
          maxLength={50}
          required
          disabled={isSubmitting}
          placeholder="Enter your name"
        />

        <label htmlFor="message">Your Feedback</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          minLength={5}
          maxLength={1000}
          required
          disabled={isSubmitting}
          placeholder="Share your thoughts..."
        />

        <label htmlFor="rating">Rating</label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          disabled={isSubmitting}
        >
          {[5, 4, 3, 2, 1].map((value) => (
            <option key={value} value={value}>
              {value} / 5
            </option>
          ))}
        </select>

        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={isSubmitting}
        >
          <option>General</option>
          <option>Suggestion</option>
          <option>Bug Report</option>
          <option>Feature Request</option>
        </select>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </button>

        {status && (
          <p className="status-message" role="status">
            {status}
          </p>
        )}
      </form>

      {/* Feedback List */}
      <section className="feedback-section" aria-labelledby="feedback-heading">
        <h2 id="feedback-heading">Recent Feedback</h2>

        {actionStatus && (
          <p className="status-message action-status" role="status">
            {actionStatus}
          </p>
        )}

        {isLoading ? (
          <p className="loading-state">Loading feedback...</p>
        ) : feedbackList.length === 0 ? (
          <p className="empty-state">No feedback yet. Be the first to share your thoughts!</p>
        ) : (
          feedbackList.map((feedback) => (
            <article className="feedback-card" key={feedback.id}>
              <div className="feedback-card-header">
                <h3>{feedback.name}</h3>
                <span className="category-badge">{feedback.category}</span>
              </div>

              <p className="feedback-message">{feedback.message}</p>

              <div
                className="feedback-rating"
                role="img"
                aria-label={`Rating: ${feedback.rating} out of 5 stars`}
              >
                <span aria-hidden="true">{"⭐".repeat(feedback.rating)}</span>
                <span className="rating-text">({feedback.rating}/5)</span>
              </div>

              {/* Actions */}
              <div className="feedback-actions">
                <button
                  type="button"
                  className="btn-edit"
                  onClick={() => handleEdit(feedback)}
                  disabled={isUpdating || deletingId !== null}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="btn-delete"
                  onClick={() => handleDelete(feedback.id)}
                  disabled={deletingId === feedback.id || isUpdating}
                >
                  {deletingId === feedback.id ? "Deleting..." : "Delete"}
                </button>
              </div>

              {/* Inline Edit Form */}
              {editingId === feedback.id && (
                <form onSubmit={handleUpdate} className="edit-form">
                  <h4>Edit Feedback</h4>

                  <label htmlFor={`edit-name-${feedback.id}`}>
                    Name
                  </label>
                  <input
                    id={`edit-name-${feedback.id}`}
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    minLength={2}
                    maxLength={50}
                    required
                    disabled={isUpdating}
                  />

                  <label htmlFor={`edit-message-${feedback.id}`}>
                    Feedback
                  </label>
                  <textarea
                    id={`edit-message-${feedback.id}`}
                    value={editMessage}
                    onChange={(e) => setEditMessage(e.target.value)}
                    minLength={5}
                    maxLength={1000}
                    required
                    disabled={isUpdating}
                  />

                  <label htmlFor={`edit-rating-${feedback.id}`}>
                    Rating
                  </label>
                  <select
                    id={`edit-rating-${feedback.id}`}
                    value={editRating}
                    onChange={(e) => setEditRating(Number(e.target.value))}
                    disabled={isUpdating}
                  >
                    {[5, 4, 3, 2, 1].map((value) => (
                      <option key={value} value={value}>
                        {value} / 5
                      </option>
                    ))}
                  </select>

                  <label htmlFor={`edit-category-${feedback.id}`}>
                    Category
                  </label>
                  <select
                    id={`edit-category-${feedback.id}`}
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    disabled={isUpdating}
                  >
                    <option>General</option>
                    <option>Suggestion</option>
                    <option>Bug Report</option>
                    <option>Feature Request</option>
                  </select>

                  <div className="edit-form-buttons">
                    <button type="submit" className="btn-save" disabled={isUpdating}>
                      {isUpdating ? "Saving Changes..." : "Save Changes"}
                    </button>

                    <button
                      type="button"
                      className="btn-cancel"
                      onClick={handleCancelEdit}
                      disabled={isUpdating}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </article>
          ))
        )}
      </section>
    </main>
  );
}
