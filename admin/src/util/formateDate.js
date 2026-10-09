export const formateOrderDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    }).replace("am", "AM").replace("pm", "PM");
};