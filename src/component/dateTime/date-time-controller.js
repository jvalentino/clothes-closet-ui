function generateTimeStrings() {
  const results = [];

  for (let i = 6; i < 12; i++) {
    results.push(`${i}:00:00 AM`);
    results.push(`${i}:30:00 AM`);
  }

  results.push(`12:00:00 PM`);
  results.push(`12:30:00 PM`);

  for (let i = 1; i < 12; i++) {
    results.push(`${i}:00:00 PM`);
    results.push(`${i}:30:00 PM`);
  }

  return results;
}

export { generateTimeStrings };
