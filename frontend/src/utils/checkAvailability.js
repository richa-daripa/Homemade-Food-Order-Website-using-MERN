export const menuAvailability = {
    Breakfast: { from: "07:30", to: "10:30" },
    Lunch: { from: "11:30", to: "15:00" },
    Snacks: { from: "16:00", to: "18:00" },
    Dinner: { from: "19:00", to: "22:00" },
    Curry: { from: "12:00", to: "22:00" },
    NonVeg: { from: "12:00", to: "22:00" },
    Dessert: { from: "10:00", to: "22:00" },
    Nutritious: { from: "8:00", to: "22:00" }
};

export const checkAvailability = (category) => {

    // Categories available all day
    if (!menuAvailability[category]) {
        return {
            available: true
        };
    }

    const now = new Date();

    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const { from, to } = menuAvailability[category];

    const [fromHour, fromMinute] = from.split(":").map(Number);
    const [toHour, toMinute] = to.split(":").map(Number);

    const startMinutes = fromHour * 60 + fromMinute;
    const endMinutes = toHour * 60 + toMinute;

    const available = currentMinutes >= startMinutes && currentMinutes <= endMinutes;

    return { available, from, to };
};