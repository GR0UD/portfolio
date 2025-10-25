import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "You must enter a valid email" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long" }),
});

export async function submitContactForm(prevState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  const parseResult = contactSchema.safeParse({
    name: name?.trim(),
    email: email?.trim(),
    message: message?.trim(),
  });

  if (!parseResult.success) {
    // Use the error format from Zod v3
    const fieldErrors = parseResult.error.flatten().fieldErrors;

    const errorStructure = {};

    if (fieldErrors.name) {
      errorStructure.name = { errors: fieldErrors.name };
    }

    if (fieldErrors.email) {
      errorStructure.email = { errors: fieldErrors.email };
    }

    if (fieldErrors.message) {
      errorStructure.message = { errors: fieldErrors.message };
    }

    return {
      success: false,
      error: errorStructure,
      data: {
        name: name?.trim(),
        email: email?.trim(),
        message: message?.trim(),
      },
    };
  }

  try {
    const contactData = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    };

    console.log("Contact Form Submission:", contactData);

    // Simulate API call with delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
