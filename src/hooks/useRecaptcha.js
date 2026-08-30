import { useEffect, useRef, useState } from "react";

// Public reCAPTCHA v2 site key (safe to expose — it identifies the site,
// not a secret). The matching Secret Key goes only into the EmailJS
// template's Settings tab ("Enable reCAPTCHA V2 verification") — never in
// this codebase — so EmailJS itself rejects any send whose token doesn't
// check out with Google, server-side. That's what makes this resistant to
// bots/scripts/AI agents: the check can't be bypassed by skipping our JS.
//
// Client's production reCAPTCHA v2 site key (registered under the client's
// own Google account, with their real domain(s) added in the reCAPTCHA
// admin console). The matching Secret Key is entered only in EmailJS's
// template Settings tab, never here.
export const RECAPTCHA_SITE_KEY = "6LcE-Y0tAAAAANJ3Xzy4Ec9wSv3W05LyHSvnjQL8";

// Renders a reCAPTCHA v2 checkbox widget into `containerRef` once Google's
// script has loaded, and exposes getToken()/reset() for the submit flow.
export function useRecaptcha() {
  const containerRef = useRef(null);
  const widgetId = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (RECAPTCHA_SITE_KEY.startsWith("REPLACE_WITH")) return; // not configured yet
    let cancelled = false;
    const interval = setInterval(() => {
      if (cancelled) return;
      if (
        window.grecaptcha &&
        typeof window.grecaptcha.render === "function" &&
        containerRef.current &&
        widgetId.current === null
      ) {
        widgetId.current = window.grecaptcha.render(containerRef.current, {
          sitekey: RECAPTCHA_SITE_KEY,
          theme: "dark", // matches the site's black/lime theme instead of Google's default white box
        });
        setReady(true);
        clearInterval(interval);
      }
    }, 200);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  function getToken() {
    if (widgetId.current === null || !window.grecaptcha) return "";
    return window.grecaptcha.getResponse(widgetId.current) || "";
  }

  function reset() {
    if (widgetId.current !== null && window.grecaptcha) {
      window.grecaptcha.reset(widgetId.current);
    }
  }

  return { containerRef, getToken, reset, ready, configured: !RECAPTCHA_SITE_KEY.startsWith("REPLACE_WITH") };
}
