/* forms.jsx — Google Forms backend for the contact + workshop-interest forms.
   ----------------------------------------------------------------------------
   Static sites can't run server code, so submissions POST straight to a Google
   Form's /formResponse endpoint; responses collect in a Google Sheet you own.
   Google doesn't send CORS headers, so we POST with mode:"no-cors" — the
   response is opaque (unreadable) but the row IS recorded, so a resolved fetch
   is treated as success.

   ─── TO CONNECT (one-time) ───────────────────────────────────────────────
   1. Create a Google Form with the fields listed under each section below.
   2. Open the live form, View source, and find each field's id: search for
      "entry." → you'll see entry.123456789. Map them below.
   3. The action URL is your form's URL with /viewform replaced by /formResponse:
      https://docs.google.com/forms/d/e/<FORM_ID>/formResponse
   Until these are filled in, the forms show a graceful "email me" fallback. */

window.SS_FORMS = {
  // ---- Immersive Art Workshops — interest / hosting ----
  // Form fields: Name · Email · City · Country · Intent · Note
  workshop: {
    action: "", // e.g. https://docs.google.com/forms/d/e/XXXX/formResponse
    fields: {
      name: "",     // entry.NNNNNN
      email: "",    // entry.NNNNNN
      city: "",     // entry.NNNNNN
      country: "",  // entry.NNNNNN
      intent: "",   // entry.NNNNNN  (values sent: "Take part" / "Host one")
      note: "",     // entry.NNNNNN
    },
  },
  // ---- Contact ----
  // Form fields: Name · Email · Message
  contact: {
    action: "",
    fields: {
      name: "",     // entry.NNNNNN
      email: "",    // entry.NNNNNN
      message: "",  // entry.NNNNNN
    },
  },
};

// Submit `data` (plain object) to a configured Google Form. Throws
// "not-configured" if the action/ids haven't been filled in yet.
window.ssSubmitGoogleForm = async function (cfg, data) {
  if (!cfg || !cfg.action || !cfg.fields) {
    const e = new Error("not-configured"); e.code = "not-configured"; throw e;
  }
  const body = new URLSearchParams();
  let mapped = 0;
  for (const [key, value] of Object.entries(data)) {
    const entry = cfg.fields[key];
    if (entry && value != null && String(value).trim() !== "") { body.append(entry, value); mapped++; }
  }
  if (!mapped) { const e = new Error("not-configured"); e.code = "not-configured"; throw e; }
  await fetch(cfg.action, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  return true; // opaque response — resolved fetch == row recorded
};

// Shared submit-state hook for the form components.
window.useFormSubmit = function (cfg) {
  const [status, setStatus] = React.useState("idle"); // idle | sending | sent | error | unconfigured
  const submit = React.useCallback(async (data) => {
    setStatus("sending");
    try { await window.ssSubmitGoogleForm(cfg, data); setStatus("sent"); return true; }
    catch (err) { setStatus(err && err.code === "not-configured" ? "unconfigured" : "error"); return false; }
  }, [cfg]);
  return { status, submit, reset: () => setStatus("idle") };
};
