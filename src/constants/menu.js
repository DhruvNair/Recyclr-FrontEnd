const data = [
  // {
  //   id: "buy",
  //   icon: "iconsminds-add-cart",
  //   label: "menu.buy",
  //   adminRequired:false,
  //   to: "/app",
  //   subs: [
  //     {
  //       icon: "simple-icon-screen-smartphone",
  //       label: "menu.phones",
  //       to: "/phones/buy"
  //     },
  //     {
  //       icon: "simple-icon-screen-tablet",
  //       label: "menu.tablets",
  //       to: "/tablets/buy"
  //     },
  //     {
  //       icon: "simple-icon-screen-desktop",
  //       label: "menu.desktops",
  //       to: "/desktops/buy"
  //     }
  //   ]
  // },
  // {
  //   id: "sell",
  //   icon: "iconsminds-financial",
  //   label: "menu.sell",
  //   adminRequired:false,
  //   to: "/app",
  //   subs: [
  //     {
  //       icon: "simple-icon-screen-smartphone",
  //       label: "menu.phones",
  //       to: "/phones/sell"
  //     },
  //     {
  //       icon: "simple-icon-screen-tablet",
  //       label: "menu.tablets",
  //       to: "/tablets/sell"
  //     },
  //     {
  //       icon: "simple-icon-screen-desktop",
  //       label: "menu.desktops",
  //       to: "/desktops/sell"
  //     }
  //   ]
  // },
  // {
  //   id: "recycle",
  //   icon: "iconsminds-recycling-2",
  //   label: "menu.recycle",
  //   adminRequired:false,
  //   to: "/app",
  // },
  {
    id: "buyParts",
    icon: "iconsminds-add-cart",
    label: "menu.buy",
    adminRequired:false,
    partnerRequired: false,
    to: "/buy",
  },
  {
    id: "sellDevice",
    icon: "iconsminds-financial",
    label: "menu.sell",
    adminRequired:false,
    partnerRequired: false,
    to: "/sell",
  },
  {
    id: "myOrders",
    icon: "iconsminds-billing",
    label: "menu.myordersandpickups",
    adminRequired:false,
    partnerRequired: false,
    to: "/orders",
  },
  {
    id: "inventory",
    icon: "iconsminds-box-close",
    label: "menu.inventory",
    adminRequired:false,
    partnerRequired: true,
    to: "/inventory",
  },
  {
    id: "availablePickups",
    icon: "iconsminds-handshake",
    label: "menu.availablePickups",
    adminRequired:false,
    partnerRequired: true,
    to: "/pickups",
  },
  {
    id: "allOrders",
    icon: "iconsminds-scooter",
    label: "pages.allOrders",
    adminRequired:false,
    partnerRequired: true,
    to: "/allorders",
  },
  {
    id: "admin",
    icon: "iconsminds-wrench",
    label: "menu.admin",
    adminRequired:true,
    partnerRequired: false,
    to: "/admin",
  },
];
export default data;
