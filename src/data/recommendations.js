import { Film, Music, Home, MonitorPlay, Sun, Volume2, Speaker, Zap, UserCog } from 'lucide-react';

export const STEPS = [
    {
        id: 'usage',
        question: "How will you use this space?",
        options: [
            { id: 'movies', label: "Movies & Sports", icon: Film, logic: 'surround' },
            { id: 'music', label: "Hi-Fi Music", icon: Music, logic: 'stereo' },
            { id: 'expert', label: "Expert Consultation", icon: UserCog, logic: 'expert' },
        ]
    },
    {
        id: 'room',
        question: "Where are we installing this?",
        options: [
            { id: 'living', label: "Living Room", icon: Home, logic: 'aesthetic' },
            { id: 'cinema', label: "Dedicated Cinema Room", icon: MonitorPlay, logic: 'performance' },
            { id: 'outdoor', label: "Outdoor / Terrace", icon: Sun, logic: 'outdoor' },
        ]
    },
    {
        id: 'budget',
        question: "What is your listening preference?",
        options: [
            { id: 'casual', label: "Essential Performance", sub: "Entry Level", icon: Volume2, logic: 'entry' },
            { id: 'cinema_exp', label: "High Performance", sub: "Mid Range", icon: Speaker, logic: 'mid' },
            { id: 'audiophile', label: "Reference Grade", sub: "Flagship", icon: Zap, logic: 'high' },
        ]
    }
];

export const RECOMMENDATIONS = {
    // Logic Key Format: usage_room_budget (e.g., movies_living_casual)

    // Default fallback
    default: {
        name: "Klipsch Reference Cinema System 5.1",
        basePrice: { min: 350000, max: 420000 },
        image: "/assets/Performance.jpg",
        description: "A perfect balance of performance and aesthetics for your home."
    },

    // --- OUTDOOR ---
    'outdoor': {
        name: "Klipsch AW-650 Outdoor Series",
        basePrice: { min: 120000, max: 250000 },
        image: "/assets/Outdoor.jpg",
        description: "Weather-resistant, high-performance outdoor speakers that bring the concert to your backyard."
    },

    // --- MUSIC FOCUS (STEREO) ---
    'music_living_casual': {
        name: "Jamo Studio Series S 809",
        basePrice: { min: 150000, max: 250000 },
        image: "/assets/Essential.jpg",
        description: "Elegant design meets natural sound. Perfect for modern living spaces."
    },
    'music_living_mid': {
        name: "Klipsch RP-8000F II Stereo Pair",
        basePrice: { min: 280000, max: 350000 },
        image: "/assets/Performance.jpg",
        description: "Dynamic, detailed, and powerful. The reference premiere experience."
    },
    'music_cinema_high': {
        name: "Klipsch Heritage Cornwall IV",
        basePrice: { min: 12000000, max: 15000000 },
        image: "/assets/Reference.jpg",
        description: "Legendary performance. A statement piece for the true audiophile."
    },

    // --- MOVIES (SURROUND) ---
    'movies_living_casual': {
        name: "Jamo S 809 HCS 5.1 System",
        basePrice: { min: 180000, max: 280000 },
        image: "/assets/Essential.jpg",
        description: "Compact, stylish, and immersive. Brings cinema sound to your living room without the bulk."
    },
    'movies_cinema_mid': {
        name: "Klipsch Reference Premiere 7.1 System",
        basePrice: { min: 550000, max: 700000 },
        image: "/assets/Performance.jpg",
        description: "The gold standard in home theater audio. Hear every detail as the director intended."
    },
    'movies_cinema_high': {
        name: "Klipsch THX Dominus 7.2.4",
        basePrice: { min: 2500000, max: 3500000 },
        image: "/assets/Reference.jpg",
        description: "The most powerful THX-certified home theater system available. Beyond cinema quality."
    },
};

export const getRecommendation = (selections) => {
    const { usage, room, budget } = selections;

    if (room === 'outdoor') return RECOMMENDATIONS['outdoor'];

    const key = `${usage}_${room}_${budget}`;

    if (RECOMMENDATIONS[key]) return RECOMMENDATIONS[key];

    if (budget === 'audiophile') return RECOMMENDATIONS['movies_cinema_high'];
    if (budget === 'casual') return RECOMMENDATIONS['movies_living_casual'];

    return RECOMMENDATIONS.default;
};
