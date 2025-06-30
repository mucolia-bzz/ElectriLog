export const formatDate2DigitYear = (ts: number) =>
  new Date(ts).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: '2-digit',
  });

export const formatDateFullYear = (ts: number) =>
  new Date(ts).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
