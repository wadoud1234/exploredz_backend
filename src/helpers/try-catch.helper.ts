export async function TryCatch<T>(fn: () => Promise<T>): Promise<{ data: T, error: null } | { data: null, error: string }> {
    try {
        const data = await fn();
        return { data, error: null };
    } catch (error) {
        if (error instanceof Error) return { data: null, error: error.message };
        return { data: null, error: 'Something went wrong' };
    }
}
