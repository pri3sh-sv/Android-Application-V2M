/**
 * Calculates the remaining range of a car based on battery percentage and maximum range.
 *
 * @param batteryPercentage - The current percentage of the battery (0 to 100).
 * @param maxRangeKm - The maximum range of the car when the battery is fully charged (in kilometers).
 * @param efficiencyKmPerPercent - Optional: The car's efficiency in km per 1% of battery. This is derived from maxRangeKm by default.
 * @returns The remaining range of the car (in kilometers).
 *
 * @throws Error if batteryPercentage is not between 0 and 100.
 */
export function calculateCarRange(
    batteryPercentage: number,
    maxRangeKm: number,
    efficiencyKmPerPercent?: number
): number {
    if (batteryPercentage < 0 || batteryPercentage > 100) {
        throw new Error("Battery percentage must be between 0 and 100.");
    }

    // Calculate efficiency (km per 1% battery) if not provided
    const kmPerPercent = efficiencyKmPerPercent ?? (maxRangeKm / 100);

    // Calculate remaining range
    const remainingRange = batteryPercentage * kmPerPercent;

    return parseFloat(remainingRange.toFixed(2)); // Return with 2 decimal precision
}