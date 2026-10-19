/* =========================================================
   KEIZOKU DEV — INQUIRY SUBMISSION
   ========================================================= */

(() => {
    "use strict";

    const form = document.getElementById("inquiry-form");
    const successPanel = document.getElementById("inquiry-success");
    const status = document.getElementById("inquiry-status");
    const button = form?.querySelector('button[type="submit"]');

    if (!form || !successPanel || !status || !button) return;

    const originalButtonHTML = button.innerHTML;
    let submitting = false;

    function setStatus(message, isError = false) {
        status.textContent = message;
        status.classList.toggle("is-error", isError);
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (submitting || !form.reportValidity()) return;

        submitting = true;
        button.disabled = true;
        button.textContent = "Sending…";
        setStatus("Sending your inquiry…");

        let sent = false;
        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: new FormData(form),
                headers: { Accept: "application/json" }
            });

            if (!response.ok) {
                let message = "Your inquiry could not be sent. Please try again.";
                try {
                    const data = await response.json();
                    if (Array.isArray(data.errors) && data.errors.length) {
                        message = data.errors.map((item) => item.message).filter(Boolean).join(" ") || message;
                    }
                } catch (_) {
                    // Non-JSON response: retain the fallback message.
                }
                throw new Error(message);
            }

            sent = true;
            form.reset();
            form.hidden = true;
            successPanel.hidden = false;
            successPanel.setAttribute("tabindex", "-1");
            successPanel.focus({ preventScroll: true });
            successPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
        } catch (error) {
            setStatus(error instanceof Error ? error.message : "Unable to send your inquiry. Please try again.", true);
        } finally {
            submitting = false;
            if (!sent) {
                button.disabled = false;
                button.innerHTML = originalButtonHTML;
            }
        }
    });
})();
