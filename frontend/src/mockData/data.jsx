import {faHome, faGift, faCartShopping, faUser, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const navLinks = [
    {
        id: 1,
      title: "Home",
      link: "/home",
      icon: faHome,
    },
    {
        id: 2,
      title: "About",
      link: "/about",
    },
    {
        id: 3,
      title: "Gifts",
      link: "/products",
      icon: faGift,
    },
    {
        id: 4,
      title: "Contact Us",
      link: "/contact",
    },
    {
      id: 5,
      title: "Search",
      link: "#",
      icon: faMagnifyingGlass,
      isSearch: true
    },
    {
        id: 6,
      title: "AccountOrProfile",
      icon: faUser,
    },
    {
        id: 7,
      title: "Cart",
      link: "",
      icon: faCartShopping,
    },
    {
        id: 8,
      title: "LogoutButton",
    },
  ];

export default navLinks;