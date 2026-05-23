import { z } from "zod";
import type { FormActionState } from "../../types";

const SERVICE_OPTIONS = [
  "Consultation",
  "Website Development",
  "UI / UX Design",
  "Code Review & Maintenance",
  "Other",
] as const;

const contactSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "You must enter a valid email" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long" }),
  service: z.enum(SERVICE_OPTIONS, { message: "Please select a service" }),
});

export async function submitContactForm(
  _prevState: FormActionState | null,
  formData: FormData,
): Promise<FormActionState> {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");
  const service = formData.get("service");

  const parseResult = contactSchema.safeParse({
    name: typeof name === "string" ? name.trim() : "",
    email: typeof email === "string" ? email.trim() : "",
    message: typeof message === "string" ? message.trim() : "",
    service: typeof service === "string" ? service.trim() : "",
  });

  if (!parseResult.success) {
    const fieldErrors = parseResult.error.flatten().fieldErrors;

    const errorStructure: Record<string, { errors: string[] }> = {};

    if (fieldErrors.name) errorStructure.name = { errors: fieldErrors.name };
    if (fieldErrors.email) errorStructure.email = { errors: fieldErrors.email };
    if (fieldErrors.message)
      errorStructure.message = { errors: fieldErrors.message };
    if (fieldErrors.service)
      errorStructure.service = { errors: fieldErrors.service };

    return {
      success: false,
      error: errorStructure,
      data: {
        name: typeof name === "string" ? name.trim() : "",
        email: typeof email === "string" ? email.trim() : "",
        message: typeof message === "string" ? message.trim() : "",
        service: typeof service === "string" ? service.trim() : "",
      },
    };
  }

  try {
    // Prepare Web3Forms submission
    const web3FormData = new FormData();
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      throw new Error("Web3Forms access key is not configured");
    }

    web3FormData.append("access_key", accessKey);
    web3FormData.append(
      "subject",
      `[Portfolio] ${parseResult.data.service} — ${parseResult.data.name}`,
    );
    web3FormData.append("name", parseResult.data.name);
    web3FormData.append("email", parseResult.data.email);
    web3FormData.append(
      "message",
      `"Interested in " + ${parseResult.data.service}\n\n${parseResult.data.message}`,
    );

    // Submit to Web3Forms
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: web3FormData,
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error("Failed to send message");
    }

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: {
        _form: {
          errors: [err instanceof Error ? err.message : "An error occurred"],
        },
      },
    };
  }
}
