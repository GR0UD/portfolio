import { toast } from "react-toastify";
import { submitContactForm } from "./actions";
import { useActionState, useEffect, useState } from "react";
import type { FormActionState } from "../../types";
import { useTranslation } from "../../i18n/TranslationContext";

export default function ContactForm() {
  const { t } = useTranslation();
  const [state, formAction, isPending] = useActionState<
    FormActionState | null,
    FormData
  >(submitContactForm, {
    error: undefined,
    success: false,
  });

  const [service, setService] = useState(state?.data?.service || "");

  useEffect(() => {
    if (state?.success) {
      toast.success(t("formSuccess"), {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else if (state?.error?._form) {
      toast.error(t("formError"), {
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
    if (!state?.error || !state.error[fieldName]) return null;
    return state.error[fieldName].errors[0] || null;
  };

  return (
    <form
      id="contact-form"
      className="form-horizontal"
      role="form"
      action={formAction}
    >
      {/* Name + Email — 2 columns */}
      <div className="form-group">
        <label htmlFor="name" className="sr-only">
          {t("formName")}
        </label>
        <input
          type="text"
          className={`form-control ${getFieldError("name") ? "input-error" : ""}`}
          id="name"
          placeholder={t("formNamePlaceholder")}
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
        <label htmlFor="email" className="sr-only">
          {t("formEmail")}
        </label>
        <input
          type="email"
          className={`form-control ${getFieldError("email") ? "input-error" : ""}`}
          id="email"
          placeholder={t("formEmailPlaceholder")}
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

      {/* Service — full width */}
      <div className="form-group form-group--full">
        <label htmlFor="service" className="sr-only">
          {t("formService")}
        </label>
        <select
          id="service"
          name="service"
          className={`form-control form-select ${!service ? "select-placeholder" : ""} ${getFieldError("service") ? "input-error" : ""}`}
          value={service}
          onChange={(e) => setService(e.target.value)}
          aria-describedby={getFieldError("service") ? "service-error" : undefined}
        >
          <option value="" disabled>
            {t("formService")}
          </option>
          <option value="Consultation">{t("formServiceConsultation")}</option>
          <option value="Website Development">{t("formServiceWebsite")}</option>
          <option value="UI / UX Design">{t("formServiceUIUX")}</option>
          <option value="Code Review & Maintenance">{t("formServiceMaintenance")}</option>
          <option value="Other">{t("formServiceOther")}</option>
        </select>
        {getFieldError("service") && (
          <span className="error-message" id="service-error">
            {getFieldError("service")}
          </span>
        )}
      </div>

      {/* Message — full width */}
      <div className="form-group form-group--full">
        <label htmlFor="message" className="sr-only">
          {t("formMessage")}
        </label>
        <textarea
          className={`form-control ${getFieldError("message") ? "input-error" : ""}`}
          rows={8}
          placeholder={t("formMessage")}
          name="message"
          id="message"
          defaultValue={state?.data?.message || ""}
          aria-describedby={getFieldError("message") ? "message-error" : undefined}
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
          <span className="send-text">
            {isPending ? t("formSending") : t("formSend")}
          </span>
        </div>
      </button>
    </form>
  );
}
