(() => {
  let resolvePostHog;
  window.posthogReady = new Promise(resolve => {
    resolvePostHog = resolve;
  });

  // Public project token (phc_…): safe to ship in client code. GitHub Pages can't read .env.
  const key = 'phc_oFDbnrHEL5pqbacTDgkUK2fPPNT8zikkrCRQrPTbc79C';
  const host = 'https://us.i.posthog.com';

  const script = document.createElement('script');
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.src = `${host.replace('.i.posthog.com', '-assets.i.posthog.com')}/static/array.js`;
  script.onload = () => {
    window.posthog.init(key, {
      api_host: host,
      defaults: '2026-05-30',
      capture_exceptions: {
        capture_unhandled_errors: true,
        capture_unhandled_rejections: true,
        capture_console_errors: false,
      },
      logs: {
        serviceName: 'som-core-schedule-web',
        environment: location.hostname === 'localhost' || location.hostname === '127.0.0.1' ? 'development' : 'production',
      },
    });
    resolvePostHog(window.posthog);
  };
  script.onerror = () => resolvePostHog(null);
  document.head.appendChild(script);
})();
