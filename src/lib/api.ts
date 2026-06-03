/* eslint-disable @typescript-eslint/no-explicit-any */
const isBrowser = typeof window !== 'undefined';
const isElectronRenderer = isBrowser && window.location.protocol === 'file:';
const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') ||
  (isElectronRenderer ? 'http://127.0.0.1:5000' : '');

const resolveUrl = (url: string): string => {
  if (!apiBaseUrl || /^https?:\/\//i.test(url)) {
    return url;
  }

  if (url.startsWith('/')) {
    return `${apiBaseUrl}${url}`;
  }

  return `${apiBaseUrl}/${url}`;
};

/**
 * Helper for making fetch requests that expect JSON responses
 * Handles setting Content-Type and common error handling
 */
export async function fetchJson<T>(
  url: string,
  options: RequestInit = {},
  defaultErrorMessage = 'Request failed',
): Promise<T> {
  const headers = new Headers(options.headers);

  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  let response: Response;
  const resolvedUrl = resolveUrl(url);
  try {
    response = await fetch(resolvedUrl, {
      ...options,
      headers,
    });
  } catch (networkError) {
    // Catch cases where the server is completely unreachable (e.g. CORS failure, offline)
    console.error('Network error during fetch:', networkError);
    throw new Error(
      'Network error: Unable to reach the server. Please check your connection.',
    );
  }

  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');

  let data: any;

  if (isJson) {
    try {
      data = await response.json();
    } catch (err) {
      throw new Error(defaultErrorMessage + ' (Invalid JSON response)');
    }
  } else {
    // If it is NOT JSON, but the response was ok, we might have hit a weird proxy cache.
    // If it wasn't ok, we hit an HTML error page.
    const textText = await response.text().catch(() => '');
    console.error(
      'Received non-JSON response. Status:',
      response.status,
      'Preview:',
      textText.substring(0, 100),
    );

    if (!response.ok) {
      throw new Error(
        `Server returned HTTP ${response.status} instead of JSON. The backend might be misconfigured.`,
      );
    } else {
      throw new Error(
        'Expected JSON response but received ' +
          (contentType || 'unknown format'),
      );
    }
  }

  if (!response.ok) {
    const errorMsg = data?.error || data?.message || defaultErrorMessage;
    throw new Error(errorMsg);
  }

  return data as T;
}
