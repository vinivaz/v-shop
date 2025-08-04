// type FetchOptions = RequestInit & {
//   revalidate?: number;
// };



// export async function fetchWithHandler<T>(
//   url: string,
//   options?: FetchOptions
// ): Promise<{ data: T } | { error: string }> {
//   try {
//     const res = await fetch(url, {
//       ...options,
//       next: options?.revalidate ? { revalidate: options.revalidate } : undefined,
//     });

//     const json = await res.json().catch(() => null);

//     if (!res.ok || !json) {
//       return { error: json?.error || 'Erro na requisição' };
//     }

//     return { data: json.data satisfies T };
//   } catch (err) {
//     console.error(err);
//     return { error: err instanceof Error ? err.message : 'Erro inesperado' };
//   }
// }


type FetchOptions = RequestInit & {
  next?: {
    revalidate?: number;
    tags?: string[];
  };
};

export async function fetchWithHandler<T>(
  url: string,
  options?: FetchOptions
): Promise<{ data?: T; message?: string; error?: string }> {
  try {
    const res = await fetch(url, {
      ...options,
      // next: options?.next,
    });

    const json = await res.json().catch(() => null);

    if (!res.ok || !json) {
      throw new Error(json?.error || 'Erro na requisição');
    }

    return {
      data: json.data,
      message: json.message,
    };
  } catch (err) {
    console.error(err);
    return { error: err instanceof Error ? err.message : 'Erro inesperado' };
  }
}


