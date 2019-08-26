class ViewLog {
    public static error(message: string): void {
        throw new Error(message);
    }
}

export default ViewLog;
