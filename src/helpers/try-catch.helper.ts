export async function TryCatch<T>(fn: () => Promise<T>): Promise<{ data: T, error: null } | { data: null, error: Error }> {
    try {
        const data = await fn();
        return { data, error: null };
    } catch (error) {
        if (error instanceof Error) return { data: null, error };
        return { data: null, error: new Error('Something went wrong') };
    }
}
