import about1 from '../assets/about1.jpeg';
import about2 from '../assets/about2.jpeg';
import about3 from '../assets/about3.jpg';
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';
import service1 from '../assets/serve1.png';
import service2 from '../assets/serve2.png';
import service3 from '../assets/serve3.png';
import menu_1 from '../assets/menu_1.png'
import menu_2 from '../assets/menu_2.png'
import menu_3 from '../assets/menu_3.png'
import menu_4 from '../assets/menu_4.png'
import menu_5 from '../assets/menu_5.png'
import menu_6 from '../assets/menu_6.png'
import menu_7 from '../assets/menu_7.png'
import menu_8 from '../assets/menu_8.png'
import { CreditCard, BadgeIndianRupee } from 'lucide-react';

export const menu_list = [
    {
        menu_name: "Breakfast",
        menu_image: menu_1,
        availableText: "Available from 7:30 AM to 10:30 AM"
    },
    {
        menu_name: "Dessert",
        menu_image: menu_7,
    },
    {
        menu_name: "Dinner",
        menu_image: menu_4,
        availableText: "Available from 7:00 PM to 10:00 PM"
    },
    {
        menu_name: "Lunch",
        menu_image: menu_3,
        availableText: "Available from 11:30 PM to 3:00 PM"
    },
    {
        menu_name: "NonVeg",
        menu_image: menu_5,
        availableText: "Available from 12:00 PM to 10:00 PM"
    },
    {
        menu_name: "Nutritious",
        menu_image: menu_8,
    },
    {
        menu_name: "Snacks",
        menu_image: menu_2,
        availableText: "Available from 4:00 PM to 6:00 PM"
    },
    {
        menu_name: "Curry",
        menu_image: menu_6,
        availableText: "Available from 12:00 PM to 10:00 PM"
    }]

export const sortingOptions = {
    "": 'Default Ordering',
    asc: 'Sort by price: Low to High',
    desc: 'Sort by price: High to Low',
};

export const faq = [
    {
        eKey: "0",
        title: "What kind of food do you offer?",
        text: "We offer freshly prepared, homemade meals prepared by local home chefs. Each dish is made with love and quality ingredients just like you'd get in a home kitchen. "
    },
    {
        eKey: "1",
        title: "How do I place an order?",
        text: "Browse the available dishes, select your favorites, and add them to your plate. Choose your delivery time, enter your details, and complete payment. Your meal will be prepared fresh and delivered to your doorstep."
    },
    {
        eKey: "2",
        title: "Can I customize my meal or request dietary preferences?",
        text: "Yes! Many of our chefs offer customization options like less spice, oil, or vegan. Just mention your preferences while placing the order, and we’ll do our best to accommodate."
    },
    {
        eKey: "3",
        title: "Can I modify or cancel my order after placing it?",
        text: "Yes, but only within a short window after ordering. Please contact our support team immediately. Once our chefs starts preparing your food, changes may not be possible."
    },
    {
        eKey: "4",
        title: "How is the food delivered?",
        text: "We partner with trusted local delivery services to ensure your food arrives hot and fresh. You’ll receive live tracking updates once your order is on the way."
    },
    {
        eKey: "5",
        title: "What if my food arrives late or incorrect?",
        text: "We’re sorry if that happens! Please report the issue through the Help section in your account. Our team will investigate and offer a resolution either a refund, replacement, or credit."
    },
    {
        eKey: "6",
        title: "Do you offer subscriptions or meal plans?",
        text: "Yes! You can subscribe to weekly or monthly homemade meal plans tailored to your taste and schedule. It’s perfect for busy professionals, students, or anyone craving consistent home style food."
    }
]

export const carouselData = [
    {
        id: 1,
        image: about1,
        title: "Your Meal, Just How You Like It",
        description:
            "Ready When You Are. From breakfast to dinner, experience the taste of home wherever you are. Your perfect meal awaits.",
    },
    {
        id: 2,
        image: about2,
        title: "Discover Your Next Craving",
        description:
            "Hungry? We've Got You! Freshly homemade meals cooked with love in our kitchen. Whatever you're in the mood for, we'll cook for you.",
    },
    {
        id: 3,
        image: about3,
        title: "Crafted By Home Chefs",
        description:
            "Behind every delicious dish is a culinary master. We partner with dedicated home cooks passionate about creating meals just for you.",
    },
];

export const aboutData = [
    {
        id: 1,
        content: "Are you tired of bland, uninspiring meals that leave you feeling unsatisfied? At Eatzio, we understand the need of a truely wholesome meal to nourish both body and heart. Thats why through our dedicated home chefs we wants to bring you delicious homemade meals straight from their homes. With Eatzio, you can indulge in the comforting taste of homemeade meals, just like how your mom makes with love and care!"
    },
    {
        id: 2,
        content: "We believe that everyone deserves to enjoy delicious and healthy food, without compromising on taste or quality and our mission is to make it easy for you to access the nutritious home-cooked meals you need to thrive. We started Eatzio because we noticed a gap in the home made food experience therefore wanted to create a platform that offers a wide range of healthy alternatives to restaurant-delivered food. From humble beginnings, we've grown into a trusted name in the homemade food space, connecting countless happy customers with their culinary cravings."
    },
    {
        id: 3,
        content: "As we continue to grow, our commitment remains unchanged: to serve you meals that are not only satisfying but also crafted with heart. We are constantly listening, evolving, and innovating to enhance your experience—because for us, it’s not just about food, it’s about how it makes you feel."
    },
    {
        id: 4,
        content: "At Eatzio, we are dedicated to making it easy for you to access healthy and delicious homemeade food, right at your doorstep. So why settle for mediocre meals when you have the taste of home and the peace of mind that comes with knowing you are feeding yourself with home-cooked meals? Try Eatzio today and experience the difference for yourself."
    },
];


export const sections = [
    {
        id: 1,
        title: "A Taste of Home",
        description:
            "Whether you're reliving childhood flavors or exploring something entirely new, our goal is to make every bite a comforting reminder of home. That’s why we prioritize seasonal ingredients, sustainable sourcing, and locally inspired menus that reflect the diversity of our communities.",
        image: img1,
        imageLeft: false,
    },
    {
        id: 2,
        title: "Flavors Woven with Tradition",
        description:
            "At Eatzio, we celebrate the authenticity of flavors made with love and tradition. Our dishes are more than just meals—they're heartfelt expressions of heritage and home.",
        image: img2,
        imageLeft: true,
    },
    {
        id: 3,
        title: "From Their Kitchen to Your Plate",
        description:
            "Our talented network of home chefs ensures every dish tells a story—rich with culture, freshness, and passion. With every order, you're not just enjoying a meal, you're supporting a community of talented cooks and sharing in their craft.",
        image: img3,
        imageLeft: false,
    },
];


export const services = [
    {
        id: 1,
        image: service1,
        title: "Easy Ordering",
        description: "Our user-friendly platform makes ordering simple. Plus, with secure payment options, so you can order with confidence.",
    },
    {
        id: 2,
        image: service2,
        title: "Best Quality",
        description: "Savor the excellence of our dishes, meticulously prepared with the highest standards of freshness and quality.",
    },
    {
        id: 3,
        image: service3,
        title: "Speedy Delivery",
        description: " Hot meals, delivered right to your doorstep. We ensure your food arrives quickly and in perfect condition.",
    },
];

export const paymentMethods = [
    {
        id: "card",
        title: "Online Payment",
        value: "Online Payment",
        icon: CreditCard,
    },
    {
        id: "cod",
        title: "Cash on Delivery",
        value: "Cash on Delivery",
        icon: BadgeIndianRupee,
    }
];

export const instructionOptions = [
    "Less Spicy",
    "Extra Spicy",
    "Less Oil",
    "Other"
];