import { toast } from "react-toastify";
import { submitContactForm } from "./actions";
import { useActionState, useEffect } from "react";
import type { FormActionState } from "../../types";

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState<
    FormActionState | null,
    FormData
  >(submitContactForm, {
    error: undefined,
    success: false,
  });

  useEffect(() => {
    if (state?.success) {
      toast.success("Thank you! Your message has been sent successfully.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else if (state?.error) {
      toast.error("Please fill out the form and try again.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [state?.success, state?.error]);

  const getFieldError = (fieldName: string): string | null => {
    if (!state?.error || !state.error[fieldName]) {
      return null;
    }
    return state.error[fieldName].errors[0] || null;
  };

  return (
    <form
      id="contact-form"
      className="form-horizontal"
      role="form"
      action={formAction}
    >
      <div className="form-group">
        <label htmlFor="name" style={{ display: "none" }}>
          Name
        </label>
        <input
          type="text"
          className={`form-control ${
            getFieldError("name") ? "input-error" : ""
          }`}
          id="name"
          placeholder="Name"
          name="name"
          defaultValue={state?.data?.name || ""}
          aria-describedby={getFieldError("name") ? "name-error" : undefined}
        />
        {getFieldError("name") && (
          <span className="error-message" id="name-error">
            {getFieldError("name")}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email" style={{ display: "none" }}>
          Email
        </label>
        <input
          type="email"
          className={`form-control ${
            getFieldError("email") ? "input-error" : ""
          }`}
          id="email"
          placeholder="Email"
          name="email"
          defaultValue={state?.data?.email || ""}
          aria-describedby={getFieldError("email") ? "email-error" : undefined}
        />
        {getFieldError("email") && (
          <span className="error-message" id="email-error">
            {getFieldError("email")}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="message" style={{ display: "none" }}>
          Message
        </label>
        <textarea
          className={`form-control ${
            getFieldError("message") ? "input-error" : ""
          }`}
          rows={10}
          placeholder="Drop your message here"
          name="message"
          id="message"
          defaultValue={state?.data?.message || ""}
          aria-describedby={
            getFieldError("message") ? "message-error" : undefined
          }
        ></textarea>
        {getFieldError("message") && (
          <span className="error-message" id="message-error">
            {getFieldError("message")}
          </span>
        )}
      </div>

      <button
        className="btn btn-primary send-button"
        id="submit"
        type="submit"
        disabled={isPending}
      >
        <div className="alt-send-button">
          <i className="fa fa-paper-plane"></i>
          <span className="send-text">{isPending ? "SENDING..." : "SEND"}</span>
        </div>
      </button>
    </form>
  );
}

