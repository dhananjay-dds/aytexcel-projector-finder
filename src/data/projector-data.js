export const projectors = [
    {
        id: "hisense-l9q",
        name: "Hisense L9Q Laser TV",
        price: 600000,
        originalPrice: 800000,
        lumens: 3000,
        throwRatio: { min: 0.25, max: 0.25 }, // UST
        type: "UST",
        idealRoom: "bright",
        image: "/images/hisense-l9q.png",
        features: ["TriChroma Laser", "3000 Lumens", "Includes Screen"]
    },
    {
        id: "hisense-l9he",
        name: "Hisense L9HE",
        price: 499999,
        originalPrice: 599999,
        lumens: 3000,
        throwRatio: { min: 0.25, max: 0.25 },
        type: "UST",
        idealRoom: "dim",
        image: "/images/hisense-l9he.png",
        features: ["4K UHD", "Dolby Atmos", "Smart TV"]
    },
    {
        id: "jmgo-n1s",
        name: "JMGO N1S Ultimate",
        price: 249999,
        lumens: 3000,
        throwRatio: { min: 1.2, max: 1.2 },
        type: "Long Throw",
        idealRoom: "dark",
        image: "/images/jmgo-n1s-ultimate.png",
        features: ["Gimbal Design", "Triple Laser", "Portable"]
    },
    {
        id: "formovie-dice",
        name: "Formovie Dice",
        price: 49999,
        originalPrice: 99000,
        lumens: 700,
        throwRatio: { min: 1.2, max: 1.2 },
        type: "Portable",
        idealRoom: "dark",
        image: "/images/formovie-dice.png",
        features: ["Portable", "Battery Built-in", "1080p"]
    }
];

export const bundles = {
    screen: {
        name: "VIVIDSTORM PHANTOM ALR Screen",
        price: 100000,
        image: "/images/screen-bundle.png"
    },
    mount: {
        name: "Valerion Ceiling Mount",
        price: 15000
    }
};

// Re-export formulas for compatibility if needed, but we might just inline logic
export const FORMULAS = {};
