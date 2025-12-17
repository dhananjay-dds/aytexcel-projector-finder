/**
 * Calculator Utility for Projector Configurator
 * Contains core mathematical formulas for throw distance, screen size, and brightness recommendations.
 */

/**
 * Calculate throw distance from throw ratio and desired screen width
 * @param {number} throwRatio - Projector's throw ratio (e.g., 1.5)
 * @param {number} screenWidthMeters - Desired screen width in meters
 * @returns {number} Required throw distance in meters
 */
export function calculateThrowDistance(throwRatio, screenWidthMeters) {
    return throwRatio * screenWidthMeters;
}

/**
 * Calculate max screen size (diagonal inches) from throw distance and ratio
 * Formula:
 * 1. Screen Width (m) = Distance / Ratio
 * 2. Screen Width (inches) = Width (m) / 0.0254
 * 3. Diagonal (inches) = Width (inches) / 0.844 (for 16:9 aspect ratio)
 * 
 * @param {number} distanceMeters - Distance from projector to wall (meters)
 * @param {number} throwRatio - Projector throw ratio
 * @returns {number} Maximum screen diagonal in inches (rounded)
 */
export function calculateMaxScreenSize(distanceMeters, throwRatio) {
    const screenWidthMeters = distanceMeters / throwRatio;
    const screenWidthInches = screenWidthMeters / 0.0254;
    // 0.844 is the width-to-diagonal factor for 16:9 (16 / sqrt(16^2 + 9^2))
    const diagonalInches = screenWidthInches / 0.844;
    return Math.round(diagonalInches);
}

/**
 * Recommend minimum lumens based on room type
 * @param {string} roomType - 'Dark Room', 'Family Room', or 'Bright Room' (case insensitive)
 * @returns {number} Minimum recommended lumens
 */
export function recommendLumens(roomType) {
    const normalizedType = roomType?.toLowerCase().trim();

    if (normalizedType.includes('bright')) {
        return 4500;
    }
    if (normalizedType.includes('family') || normalizedType.includes('living')) {
        return 3000;
    }
    // Default to Dark Room / Cinema
    return 2000;
}
