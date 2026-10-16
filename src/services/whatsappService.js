
const axios = require("axios");

const sendWhatsAppSOS = async ({
  deviceId,
  latitude,
  longitude,
  message,
}) => {
  const token = process.env.WHATSAPP_ACCESS_TOKEN?.trim();
  const phoneNumberId =
    process.env.WHATSAPP_PHONE_NUMBER_ID?.trim();
  const guardianPhone =
    process.env.WHATSAPP_GUARDIAN_PHONE?.trim();

  if (!token || !phoneNumberId || !guardianPhone) {
    throw new Error(
      "WhatsApp configuration is incomplete. Check your .env file."
    );
  }

  // Accept an Indian 10-digit number or a number with country code.
  let recipient = guardianPhone.replace(/\D/g, "");

  if (recipient.length === 10) {
    recipient = `91${recipient}`;
  }

  if (recipient.length < 11 || recipient.length > 15) {
    throw new Error(
      "Invalid guardian phone number. Include the country code."
    );
  }

  const hasCoordinates =
    Number.isFinite(Number(latitude)) &&
    Number.isFinite(Number(longitude));

  const mapLink = hasCoordinates
    ? `https://maps.google.com/?q=${latitude},${longitude}`
    : "Location unavailable";

  const body = [
    "🚨 EMERGENCY SOS ALERT",
    "",
    `Device ID: ${deviceId}`,
    `Message: ${message || "Emergency! Please help."}`,
    `Location: ${latitude ?? "Unavailable"}, ${longitude ?? "Unavailable"}`,
    `Google Maps: ${mapLink}`,
  ].join("\n");

  try {
    const response = await axios.post(
      `https://graph.facebook.com/v25.0/${phoneNumberId}/messages`,
      {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: recipient,
        type: "text",
        text: {
          preview_url: false,
          body,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        timeout: 15000,
      }
    );

    console.log(
      "✅ WhatsApp SOS accepted by Meta:",
      response.data.messages?.[0]?.id
    );

    return {
      success: true,
      messageId: response.data.messages?.[0]?.id,
    };
  } catch (error) {
    const details = error.response?.data || error.message;

    console.error(
      "❌ WhatsApp SOS failed:",
      JSON.stringify(details)
    );

    throw new Error(
      `WhatsApp delivery request failed: ${
        error.response?.data?.error?.message ||
        error.message
      }`
    );
  }
};

module.exports = { sendWhatsAppSOS };
