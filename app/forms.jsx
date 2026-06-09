/* forms.jsx — email backend for the contact + workshop-interest forms.
   ----------------------------------------------------------------------------
   Static sites can't run server code, so submissions are delivered by email via
   FormSubmit (https://formsubmit.co) — a free relay that needs no account and
   no API key: you just POST to /ajax/<your-email>. The AJAX endpoint returns
   JSON (CORS-enabled), so we get real success/error states.

   ⚠ FIRST-RUN ACTIVATION: the very first submission to a new address triggers a
   one-time confirmation email from FormSubmit to shrutisolanki1226@gmail.com.
   Click the link in it once; after that, every submission lands in the inbox.

   To change the destination, edit the email below. To switch providers later,
   only window.ssSubmitForm needs to change — the form components are agnostic. */

window.SS_FORMS = {
  // ---- Immersive Art Workshops — interest / hosting ----
  workshop: {
    email: "shrutisolanki1226@gmail.com",
    subject: "New workshop interest — shrutisolanki.com",
  },
  // ---- Contact ----
  contact: {
    email: "shrutisolanki1226@gmail.com",
    subject: "New message — shrutisolanki.com",
  },
};

// Submit `data` (plain object) to FormSubmit for `cfg.email`.
// Throws "not-configured" if no destination email is set.
window.ssSubmitForm = async function (cfg, data) {
  if (!cfg || !cfg.email) {
    const e = new Error("not-configured"); e.code = "not-configured"; throw e;
  }
  const payload = Object.assign({}, data, {
    _subject: cfg.subject || "New message — shrutisolanki.com",
    _template: "table",
  });
  const res = await fetch("https://formsubmit.co/ajax/" + encodeURIComponent(cfg.email), {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("http " + res.status);
  // FormSubmit returns { success: "true", message: ... } on success (and during
  // the activation step). A 2xx response means the request was accepted.
  await res.json().catch(() => ({}));
  return true;
};

// Shared submit-state hook for the form components.
window.useFormSubmit = function (cfg) {
  const [status, setStatus] = React.useState("idle"); // idle | sending | sent | error | unconfigured
  const submit = React.useCallback(async (data) => {
    setStatus("sending");
    try { await window.ssSubmitForm(cfg, data); setStatus("sent"); return true; }
    catch (err) { setStatus(err && err.code === "not-configured" ? "unconfigured" : "error"); return false; }
  }, [cfg]);
  return { status, submit, reset: () => setStatus("idle") };
};
