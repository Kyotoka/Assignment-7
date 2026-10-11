export function toBengaliNumber(num: number | string | undefined | null): string {
  if (num === undefined || num === null) return "০";
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num
    .toString()
    .replace(/\d/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
}

/** Returns today's date formatted in Bangla, e.g. "শনিবার, ১০ অক্টোবর, ২০২৬" */
export function getBanglaDate(): string {
  const now = new Date();
  const dayNames = [
    "রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার",
    "বৃহস্পতিবার", "শুক্রবার", "শনিবার",
  ];
  const monthNames = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল",
    "মে", "জুন", "জুলাই", "আগস্ট",
    "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
  ];
  const day = dayNames[now.getDay()];
  const date = toBengaliNumber(now.getDate());
  const month = monthNames[now.getMonth()];
  const year = toBengaliNumber(now.getFullYear());
  return `${day}, ${date} ${month}, ${year}`;
}