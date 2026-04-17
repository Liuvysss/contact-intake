import React, { useState } from 'react';

const initialState = {
  name: '',
  contactMethod: '',
  contactTime: '',
  message: '',
};

export default function ContactIntakeForm({ onSuccess }) {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState('');

  function validate(fields = form) {
    const errs = {};
    if (!fields.contactMethod?.trim()) errs.contactMethod = 'Contact method is required.';
    if (!fields.message?.trim()) errs.message = 'Message is required.';
    return errs;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setErrors(errs => ({ ...errs, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    setConfirmation('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Submission failed');
      setForm(initialState);
      setConfirmation(data.message ?? 'Your request was received securely.');
      if (onSuccess) onSuccess();
    } catch (err) {
      setConfirmation(err.message ?? 'Could not submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="intake-form" onSubmit={handleSubmit} aria-describedby="confirmation" autoComplete="off" noValidate>
      <h2>Safe Contact Intake</h2>
      <p>Your information is handled securely and confidentially.</p>
      <div>
        <label htmlFor="name">Name (optional)</label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="off"
          value={form.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="contactMethod">Safe Contact Method <span aria-hidden="true">*</span></label>
        <input
          id="contactMethod"
          name="contactMethod"
          type="text"
          required
          autoComplete="off"
          value={form.contactMethod}
          onChange={handleChange}
          aria-invalid={!!errors.contactMethod}
          aria-describedby={errors.contactMethod ? 'contactMethod-error' : undefined}
        />
        {errors.contactMethod && <span id="contactMethod-error" role="alert">{errors.contactMethod}</span>}
      </div>
      <div>
        <label htmlFor="contactTime">Preferred Contact Time</label>
        <input
          id="contactTime"
          name="contactTime"
          type="text"
          autoComplete="off"
          value={form.contactTime}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="message">Message <span aria-hidden="true">*</span></label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={form.message}
          onChange={handleChange}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && <span id="message-error" role="alert">{errors.message}</span>}
      </div>
      <button type="submit" disabled={submitting} aria-busy={submitting}>
        {submitting ? 'Submitting…' : 'Submit'}
      </button>
      {confirmation && (
        <div id="confirmation" role="status" aria-live="polite" className="confirmation">
          {confirmation}
        </div>
      )}
    </form>
  );
}
