type ApiClientOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
};

export async function apiClient<T>(path: string, options: ApiClientOptions = {}): Promise<T> {
  const response = await fetch(`/api/proxy${path}`, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`AutoCare API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
