import { useMemo } from 'react';
import { projectors, bundles } from '../data/projector-data';
import { calculateMaxScreenSize, recommendLumens } from '../utils/calculator';

/**
 * useProjectorRecommendation Hook
 * Filters and prioritizes projectors based on room, distance, and usage.
 */
export const useProjectorRecommendation = (roomLight, throwDistance, useCase) => {
    return useMemo(() => {
        if (!roomLight || !throwDistance) return [];

        const minLumens = recommendLumens(roomLight);

        let filtered = projectors.filter(product => {
            // 1. Lumen Requirement
            // Check matching room first (Trust Manufacturer/Data)
            const isIdealRoom = product.idealRoom === roomLight;
            // Relaxed check: if within 70% of requirement OR if it's the ideal room for this product
            if (product.lumens < minLumens * 0.7 && !isIdealRoom) return false;

            // 2. Throw Distance / Screen Size Requirement
            // Use min throw ratio for calculation
            const ratio = product.throwRatio.min || product.throwRatio;
            const possibleScreenSize = calculateMaxScreenSize(throwDistance, ratio);

            // Must be capable of projecting at least 80 inches at this distance
            if (possibleScreenSize < 80) return false;

            return true;
        });

        // 3. Prioritization Logic
        filtered.sort((a, b) => {
            let scoreA = 0;
            let scoreB = 0;

            // Simple scoring based on matching room
            if (a.idealRoom === roomLight) scoreA += 50;
            if (b.idealRoom === roomLight) scoreB += 50;

            // Price sorting
            scoreA += a.price / 10000;
            scoreB += b.price / 10000;

            return scoreB - scoreA;
        });

        // 4. Bundle logic
        // If room is bright OR the product is the L9Q (which specifically mentions "Includes Screen"), attach bundle.
        // Actually L9Q data says "Includes Screen" in features.
        // We will attach the ALR bundle if brightness is required or simply if it's the L9Q to match request.

        const top3 = filtered.slice(0, 3).map(product => {
            let enhanced = { ...product };

            // Explicitly attach bundle for L9Q as requested
            if (product.id === 'hisense-l9q') {
                enhanced.bundle = {
                    name: bundles.screen.name,
                    components: [bundles.screen.name, "Installation Included"],
                    discountedPrice: product.price // Assuming price includes it based on "Includes Screen" feature, or we add bundle price?
                    // Request said "Ensure Bundle card still appears". Let's assume the bundle is INCLUDED in that price if features says so.
                    // But if we want to show it as a separate "Bundle", we might display it.
                };
            }
            // For others in bright room, suggest add-on
            else if (roomLight === 'bright') {
                enhanced.recommendedAddOn = `Recommended: ${bundles.screen.name}`;
            }

            return enhanced;
        });

        return top3;

    }, [roomLight, throwDistance, useCase]);
};
