export const daysAgo = (date: Date): string => {
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - date.getTime();

    // Convert milliseconds to seconds, minutes, hours, days, etc.
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    // Determine which unit to display based on the time difference
    if (years > 0) {
        return `${years}yr ago`;
    } else if (months > 0) {
        return `${months}mth ago`;
    } else if (days > 0) {
        return `${days}d ago`;
    } else if (hours > 0) {
        return `${hours}hr ago`;
    } else if (minutes > 0) {
        return `${minutes}m ago`;
    } else {
        return `${seconds}s ago`;
    }
};