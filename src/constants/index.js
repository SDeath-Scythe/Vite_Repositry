import { facebook, instagram, shieldTick, support, truckFast, twitter } from "../assets/icons";
import { bigShoe1, bigShoe2, bigShoe3, customer1, customer2, shoe4, shoe5, shoe6, shoe7, thumbnailShoe1, thumbnailShoe2, thumbnailShoe3 } from "../assets/images";

export const navLinks = [
    { href: "/", label: "Home" },
    { href: "#about-us", label: "About Us" },
    { href: "#products", label: "Products" },
    { href: "/catalog", label: "Shop All" },
    { href: "#contact-us", label: "Contact Us" },
    { href: "#services", label: "Services" },
    { href: "/admin", label: "Admin" },
];

export const shoes = [
    {
        thumbnail:thumbnailShoe1,
        bigShoe:bigShoe1,
    },
    {
        thumbnail: thumbnailShoe2,
        bigShoe: bigShoe2,
    },
    {
        thumbnail: thumbnailShoe3,
        bigShoe: bigShoe3,
    },
];

export const statistics = [
    { value: '1k+', label: 'Brands' },
    { value: '500+', label: 'Shops' },
    { value: '250k+', label: 'Customers' },
];

export const products = [
    {
        id: 1,
        imgURL: shoe4,
        name: "Nike Air Jordan-01",
        price: "$200.20",
        originalPrice: "$250.20",
        category: "Basketball",
        brand: "Nike",
        rating: 4.8,
        reviews: 342,
        colors: ["Red", "Black", "White"],
        sizes: [7, 8, 9, 10, 11, 12],
        isNew: true,
        onSale: true,
        description: "Classic basketball shoe with premium comfort and style."
    },
    {
        id: 2,
        imgURL: shoe5,
        name: "Nike Air Jordan-10",
        price: "$210.20",
        originalPrice: "$210.20",
        category: "Basketball",
        brand: "Nike",
        rating: 4.6,
        reviews: 289,
        colors: ["Blue", "White", "Gray"],
        sizes: [7, 8, 9, 10, 11],
        isNew: false,
        onSale: false,
        description: "Retro basketball sneaker with modern performance features."
    },
    {
        id: 3,
        imgURL: shoe6,
        name: "Nike Air Jordan-100",
        price: "$220.20",
        originalPrice: "$280.20",
        category: "Basketball",
        brand: "Nike",
        rating: 4.9,
        reviews: 567,
        colors: ["Black", "Red", "Gold"],
        sizes: [8, 9, 10, 11, 12, 13],
        isNew: false,
        onSale: true,
        description: "Limited edition Jordan with premium materials and design."
    },
    {
        id: 4,
        imgURL: shoe7,
        name: "Nike Air Jordan-001",
        price: "$230.20",
        originalPrice: "$230.20",
        category: "Basketball",
        brand: "Nike",
        rating: 4.7,
        reviews: 198,
        colors: ["White", "Silver", "Blue"],
        sizes: [7, 8, 9, 10, 11],
        isNew: true,
        onSale: false,
        description: "Revolutionary design meets classic Jordan comfort."
    },
    // Running Shoes
    {
        id: 5,
        imgURL: shoe4,
        name: "Nike Air Max 270",
        price: "$150.00",
        originalPrice: "$180.00",
        category: "Running",
        brand: "Nike",
        rating: 4.5,
        reviews: 423,
        colors: ["Black", "White", "Blue"],
        sizes: [6, 7, 8, 9, 10, 11, 12],
        isNew: false,
        onSale: true,
        description: "Maximum comfort with visible Air cushioning for all-day wear."
    },
    {
        id: 6,
        imgURL: shoe5,
        name: "Nike React Infinity",
        price: "$160.00",
        originalPrice: "$160.00",
        category: "Running",
        brand: "Nike",
        rating: 4.8,
        reviews: 512,
        colors: ["Gray", "Pink", "Green"],
        sizes: [6, 7, 8, 9, 10, 11],
        isNew: true,
        onSale: false,
        description: "Designed to help reduce injury and keep you running."
    },
    {
        id: 7,
        imgURL: shoe6,
        name: "Nike Zoom Pegasus 40",
        price: "$130.00",
        originalPrice: "$130.00",
        category: "Running",
        brand: "Nike",
        rating: 4.6,
        reviews: 687,
        colors: ["Blue", "Orange", "Black"],
        sizes: [7, 8, 9, 10, 11, 12],
        isNew: false,
        onSale: false,
        description: "The workhorse with wings, updated for everyday running."
    },
    // Lifestyle Shoes
    {
        id: 8,
        imgURL: shoe7,
        name: "Nike Air Force 1",
        price: "$90.00",
        originalPrice: "$110.00",
        category: "Lifestyle",
        brand: "Nike",
        rating: 4.9,
        reviews: 1234,
        colors: ["White", "Black", "Red"],
        sizes: [6, 7, 8, 9, 10, 11, 12, 13],
        isNew: false,
        onSale: true,
        description: "The iconic shoe that defined a generation of sneaker culture."
    },
    {
        id: 9,
        imgURL: shoe4,
        name: "Nike Dunk Low",
        price: "$100.00",
        originalPrice: "$100.00",
        category: "Lifestyle",
        brand: "Nike",
        rating: 4.7,
        reviews: 856,
        colors: ["White", "Green", "Purple"],
        sizes: [6, 7, 8, 9, 10, 11, 12],
        isNew: true,
        onSale: false,
        description: "Classic court style meets modern street fashion."
    },
    {
        id: 10,
        imgURL: shoe5,
        name: "Nike Blazer Mid",
        price: "$85.00",
        originalPrice: "$85.00",
        category: "Lifestyle",
        brand: "Nike",
        rating: 4.4,
        reviews: 291,
        colors: ["White", "Navy", "Tan"],
        sizes: [7, 8, 9, 10, 11],
        isNew: false,
        onSale: false,
        description: "Vintage basketball aesthetic with modern comfort."
    },
    // Training Shoes
    {
        id: 11,
        imgURL: shoe6,
        name: "Nike Metcon 8",
        price: "$130.00",
        originalPrice: "$150.00",
        category: "Training",
        brand: "Nike",
        rating: 4.8,
        reviews: 378,
        colors: ["Black", "Red", "White"],
        sizes: [7, 8, 9, 10, 11, 12],
        isNew: false,
        onSale: true,
        description: "Built for your toughest workouts and training sessions."
    },
    {
        id: 12,
        imgURL: shoe7,
        name: "Nike Free X Metcon 4",
        price: "$120.00",
        originalPrice: "$120.00",
        category: "Training",
        brand: "Nike",
        rating: 4.5,
        reviews: 234,
        colors: ["Gray", "Blue", "Black"],
        sizes: [6, 7, 8, 9, 10, 11],
        isNew: true,
        onSale: false,
        description: "Versatile training shoe for gym and outdoor workouts."
    },
    // Soccer Shoes
    {
        id: 13,
        imgURL: shoe4,
        name: "Nike Mercurial Vapor",
        price: "$275.00",
        originalPrice: "$275.00",
        category: "Soccer",
        brand: "Nike",
        rating: 4.9,
        reviews: 445,
        colors: ["Neon", "Black", "White"],
        sizes: [6, 7, 8, 9, 10, 11, 12],
        isNew: true,
        onSale: false,
        description: "Explosive speed and precision for the beautiful game."
    },
    {
        id: 14,
        imgURL: shoe5,
        name: "Nike Phantom GT2",
        price: "$250.00",
        originalPrice: "$300.00",
        category: "Soccer",
        brand: "Nike",
        rating: 4.7,
        reviews: 321,
        colors: ["White", "Pink", "Black"],
        sizes: [6, 7, 8, 9, 10, 11],
        isNew: false,
        onSale: true,
        description: "Enhanced touch and striking power for goal scorers."
    },
    // Skateboarding
    {
        id: 15,
        imgURL: shoe6,
        name: "Nike SB Dunk Low",
        price: "$95.00",
        originalPrice: "$95.00",
        category: "Skateboarding",
        brand: "Nike",
        rating: 4.6,
        reviews: 567,
        colors: ["Black", "White", "Orange"],
        sizes: [7, 8, 9, 10, 11, 12],
        isNew: false,
        onSale: false,
        description: "Skate-ready durability with classic Dunk style."
    },
    {
        id: 16,
        imgURL: shoe7,
        name: "Nike SB Janoski",
        price: "$75.00",
        originalPrice: "$90.00",
        category: "Skateboarding",
        brand: "Nike",
        rating: 4.5,
        reviews: 423,
        colors: ["Gray", "Black", "Blue"],
        sizes: [6, 7, 8, 9, 10, 11],
        isNew: false,
        onSale: true,
        description: "Sleek skate shoe with superior board feel and style."
    }
];

export const services = [
    {
        imgURL: truckFast,
        label: "Free shipping",
        subtext: "Enjoy seamless shopping with our complimentary shipping service."
    },
    {
        imgURL: shieldTick,
        label: "Secure Payment",
        subtext: "Experience worry-free transactions with our secure payment options."
    },
    {
        imgURL: support,
        label: "Love to help you",
        subtext: "Our dedicated team is here to assist you every step of the way."
    },
];

export const reviews = [
    {
        imgURL: customer1,
        customerName: 'Morich Brown',
        rating: 4.5,
        feedback: "The attention to detail and the quality of the product exceeded my expectations. Highly recommended!"
    },
    {
        imgURL: customer2,
        customerName: 'Lota Mongeskar',
        rating: 4.5,
        feedback: "The product not only met but exceeded my expectations. I'll definitely be a returning customer!"
    }
];


export const footerLinks = [
    {
        title: "Products",
        links: [
            { name: "Air Force 1", link: "/" },
            { name: "Air Max 1", link: "/" },
            { name: "Air Jordan 1", link: "/" },
            { name: "Air Force 2", link: "/" },
            { name: "Nike Waffle Racer", link: "/" },
            { name: "Nike Cortez", link: "/" },
        ],
    },
    {
        title: "Help",
        links: [
            { name: "About us", link: "/" },
            { name: "FAQs", link: "/" },
            { name: "How it works", link: "/" },
            { name: "Privacy policy", link: "/" },
            { name: "Payment policy", link: "/" },
        ],
    },
    {
        title: "Get in touch",
        links: [
            { name: "customer@nike.com", link: "mailto:customer@nike.com" },
            { name: "+92554862354", link: "tel:+92554862354" },
        ],
    },
];

export const categories = [
    { id: 'all', name: 'All Shoes', count: 16 },
    { id: 'basketball', name: 'Basketball', count: 4 },
    { id: 'running', name: 'Running', count: 3 },
    { id: 'lifestyle', name: 'Lifestyle', count: 3 },
    { id: 'training', name: 'Training', count: 2 },
    { id: 'soccer', name: 'Soccer', count: 2 },
    { id: 'skateboarding', name: 'Skateboarding', count: 2 }
];

export const priceRanges = [
    { id: 'all', name: 'All Prices', min: 0, max: 1000 },
    { id: 'under-100', name: 'Under $100', min: 0, max: 100 },
    { id: '100-150', name: '$100 - $150', min: 100, max: 150 },
    { id: '150-200', name: '$150 - $200', min: 150, max: 200 },
    { id: '200-250', name: '$200 - $250', min: 200, max: 250 },
    { id: 'over-250', name: 'Over $250', min: 250, max: 1000 }
];

export const sortOptions = [
    { id: 'featured', name: 'Featured' },
    { id: 'name-asc', name: 'Name: A to Z' },
    { id: 'name-desc', name: 'Name: Z to A' },
    { id: 'price-asc', name: 'Price: Low to High' },
    { id: 'price-desc', name: 'Price: High to Low' },
    { id: 'rating-desc', name: 'Highest Rated' },
    { id: 'newest', name: 'Newest First' }
];

export const socialMedia = [
    { src: facebook, alt: "facebook logo" },
    { src: twitter, alt: "twitter logo" },
    { src: instagram, alt: "instagram logo" },
];