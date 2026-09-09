import { PiCookingPotFill } from 'react-icons/pi';
import { MdDeliveryDining } from 'react-icons/md';
import { FaSquareCheck } from "react-icons/fa6";
import {
    CircleUser, House, Info, LogOut, Menu, Utensils, PaperBag, UserRound,
    CreditCard, BadgeIndianRupee, ConciergeBell
} from 'lucide-react';

export const navLinks = [
    { to: "/", label: "Home", icon: House, end: true },
    { to: "/about", label: "About", icon: Info },
    { to: "/menu", label: "Menu", icon: ConciergeBell },
];

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

export const getOrderStatus = (status) => {
    switch (status) {
        case "Food is Preparing":
            return {
                icon: PiCookingPotFill,
                color: "orange",
                className: "bg-warning-subtle"
            };

        case "Out for Delivery":
            return {
                icon: MdDeliveryDining,
                color: "dark",
                className: "bg-info-subtle"
            };

        case "Order Delivered":
            return {
                icon: FaSquareCheck,
                color: "green",
                className: "bg-success-subtle"
            };

        default:
            return {
                icon: PiCookingPotFill,
                color: "gray",
                className: "bg-secondary-subtle"
            };
    }
};