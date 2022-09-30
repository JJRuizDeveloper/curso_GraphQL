export function toDate(val) {
    if (val instanceof Date) return val;
    return new Date(val);
}