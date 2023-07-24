function generateTimeStrings(slotsInMinutes = 30) {
  const results = [];
  const slotsPerHour = 60 / slotsInMinutes;
  const startHour = 6;

  // morning
  for (let i = startHour; i < 12; i++) {
    for (let j = 0; j < slotsPerHour; j++) {
      const minutes = j * slotsInMinutes;
      const minutesString = `${minutes}`.padStart(2, "0");
      results.push(`${i}:${minutesString}:00 AM`);
    }
  }

  for (let j = 0; j < slotsPerHour; j++) {
    const minutes = j * slotsInMinutes;
    const minutesString = `${minutes}`.padStart(2, "0");
    results.push(`12:${minutesString}:00 PM`);
  }

  // afternoon
  for (let i = 1; i < 12; i++) {
    for (let j = 0; j < slotsPerHour; j++) {
      const minutes = j * slotsInMinutes;
      const minutesString = `${minutes}`.padStart(2, "0");
      results.push(`${i}:${minutesString}:00 PM`);
    }
  }

  return results;
}

export { generateTimeStrings };
