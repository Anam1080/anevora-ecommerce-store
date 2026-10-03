
const products = [
  // =========================
  // CLOTHES
  // =========================

  {
    id: "clothes-01",
    name: "Noor Embroidered Suit",
    category: "Clothes",
    subcategory: "2-Piece Suit",
    price: 8900,
    oldPrice: 10500,
    badge: "Bestseller",
    image: "clothes-01.jpg",
    description:
      "A refined embroidered eastern suit designed for elegant everyday and festive dressing.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Ivory", "Beige"],
    material: "Premium Lawn",
    featured: true,
  },

  {
    id: "clothes-02",
    name: "Ivory Grace Suit",
    category: "Clothes",
    subcategory: "2-Piece Suit",
    price: 9500,
    oldPrice: 11000,
    badge: "New",
    image: "clothes-02.jpg",
    description:
      "An ivory-toned contemporary suit with delicate detailing and a graceful silhouette.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Ivory"],
    material: "Lawn",
    featured: false,
  },

  {
    id: "clothes-03",
    name: "Rosé Garden Ensemble",
    category: "Clothes",
    subcategory: "2-Piece Suit",
    price: 11200,
    oldPrice: 12900,
    badge: "Popular",
    image: "clothes-03.jpg",
    description:
      "A soft rose ensemble featuring feminine embroidery and a polished eastern finish.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Rose", "Blush"],
    material: "Embroidered Lawn",
    featured: false,
  },

  {
    id: "clothes-04",
    name: "Mehfil Midnight Suit",
    category: "Clothes",
    subcategory: "Formal Suit",
    price: 14800,
    oldPrice: 16500,
    badge: "Limited",
    image: "clothes-04.jpg",
    description:
      "A sophisticated dark formal outfit created for evening gatherings and special occasions.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Midnight Blue", "Black"],
    material: "Chiffon",
    featured: true,
  },

  {
    id: "clothes-05",
    name: "Sahar Pastel Ensemble",
    category: "Clothes",
    subcategory: "3-Piece Suit",
    price: 10200,
    oldPrice: 11800,
    badge: "New",
    image: "clothes-05.jpg",
    description:
      "A pastel three-piece eastern ensemble with subtle embroidery and an effortless finish.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Powder Blue", "Pastel"],
    material: "Lawn",
    featured: false,
  },

  {
    id: "clothes-06",
    name: "Ayla Embroidered Lawn",
    category: "Clothes",
    subcategory: "3-Piece Suit",
    price: 8500,
    oldPrice: 9900,
    badge: "Bestseller",
    image: "clothes-06.jpg",
    description:
      "A lightweight embroidered lawn outfit designed for comfortable polished daytime dressing.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Mint", "Cream"],
    material: "Lawn",
    featured: false,
  },

  {
    id: "clothes-07",
    name: "Zehra Festive Ensemble",
    category: "Clothes",
    subcategory: "Formal Suit",
    price: 15900,
    oldPrice: 18000,
    badge: "Festive",
    image: "clothes-07.jpg",
    description:
      "A richly detailed festive ensemble designed for celebrations and elegant occasions.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Gold", "Maroon"],
    material: "Organza",
    featured: false,
  },

  {
    id: "clothes-08",
    name: "Nura Minimal Kurta Set",
    category: "Clothes",
    subcategory: "3-Piece Suit",
    price: 7600,
    oldPrice: 8900,
    badge: "Everyday",
    image: "clothes-08.jpg",
    description:
      "A clean contemporary kurta and trouser set for understated everyday elegance.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Sand"],
    material: "Cotton",
    featured: false,
  },

  {
    id: "clothes-09",
    name: "Aurelia Evening Suit",
    category: "Clothes",
    subcategory: "3-Piece Suit",
    price: 17200,
    oldPrice: 19500,
    badge: "Premium",
    image: "clothes-09.jpg",
    description:
      "An elevated evening suit combining refined embroidery with a luxurious silhouette.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Deep Green", "Gold"],
    material: "Silk Blend",
    featured: false,
  },

  {
    id: "clothes-10",
    name: "Lina Classic Lawn",
    category: "Clothes",
    subcategory: "3-Piece Suit",
    price: 8200,
    oldPrice: 9400,
    badge: "Summer",
    image: "clothes-10.jpg",
    description:
      "A classic lawn three-piece suit balancing traditional details with modern simplicity.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Peach", "Cream"],
    material: "Lawn",
    featured: false,
  },

  {
    id: "clothes-11",
    name: "Maira Signature Suit",
    category: "Clothes",
    subcategory: "3-Piece Suit",
    price: 9900,
    oldPrice: 11400,
    badge: "Signature",
    image: "clothes-11.jpg",
    description:
      "ANÉVORA's signature eastern silhouette with refined tailoring and delicate accents.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Taupe", "Ivory"],
    material: "Premium Cotton",
    featured: false,
  },

  {
    id: "clothes-12",
    name: "Rania Heritage Ensemble",
    category: "Clothes",
    subcategory: "3-Piece Suit",
    price: 13500,
    oldPrice: 15100,
    badge: "Heritage",
    image: "clothes-12.jpg",
    description:
      "A traditional-inspired ensemble bringing heritage embroidery into a contemporary wardrobe.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Rust", "Cream"],
    material: "Linen Blend",
    featured: false,
  },

  {
    id: "clothes-13",
    name: "Elara Contemporary Suit",
    category: "Clothes",
    subcategory: "3-Piece Suit",
    price: 10800,
    oldPrice: 12400,
    badge: "Modern",
    image: "clothes-13.jpg",
    description:
      "A contemporary eastern set featuring clean lines and sophisticated neutral tones.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Stone", "Olive"],
    material: "Cotton Silk",
    featured: false,
  },

  {
    id: "clothes-14",
    name: "Haya Eid Ensemble",
    category: "Clothes",
    subcategory: "Formal Suit",
    price: 14500,
    oldPrice: 16900,
    badge: "Eid Edit",
    image: "clothes-14.jpg",
    description:
      "A graceful festive three-piece ensemble created for Eid gatherings and celebrations.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Lavender", "Silver"],
    material: "Chiffon",
    featured: false,
  },

  {
    id: "clothes-15",
    name: "Élan Signature Formal",
    category: "Clothes",
    subcategory: "Formal Suit",
    price: 18500,
    oldPrice: 21000,
    badge: "ANÉVORA Edit",
    image: "clothes-15.jpg",
    description:
      "A statement formal outfit representing the refined signature of the ANÉVORA collection.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Champagne"],
    material: "Premium Silk",
    featured: false,
  },

  // =========================
  // BAGS
  // =========================

  {
    id: "bags-01",
    name: "Élan Structured Bag",
    category: "Bags",
    subcategory: "Handbag",
    price: 6500,
    oldPrice: 7600,
    badge: "Bestseller",
    image: "bag-01.jpg",
    description:
      "A structured everyday handbag with a polished silhouette and refined hardware.",
    colors: ["Black", "Tan"],
    material: "Premium Vegan Leather",
    featured: true,
  },

  {
    id: "bags-02",
    name: "Luna Shoulder Bag",
    category: "Bags",
    subcategory: "Shoulder Bag",
    price: 5900,
    oldPrice: 6900,
    badge: "New",
    image: "bag-02.jpg",
    description:
      "A compact shoulder bag designed for effortless everyday styling.",
    colors: ["Cream", "Black"],
    material: "Vegan Leather",
    featured: false,
  },

  {
    id: "bags-03",
    name: "Aurea Mini Bag",
    category: "Bags",
    subcategory: "Mini Bag",
    price: 4800,
    oldPrice: 5600,
    badge: "Trending",
    image: "bag-03.jpg",
    description:
      "A refined mini bag that adds a polished finishing touch to evening looks.",
    colors: ["Gold", "Ivory"],
    material: "Synthetic Leather",
    featured: false,
  },

  {
    id: "bags-04",
    name: "Noor Everyday Tote",
    category: "Bags",
    subcategory: "Tote",
    price: 7200,
    oldPrice: 8300,
    badge: "Everyday",
    image: "bag-04.jpg",
    description:
      "A spacious tote designed for practical everyday carrying without sacrificing elegance.",
    colors: ["Brown", "Tan"],
    material: "Vegan Leather",
    featured: false,
  },

  {
    id: "bags-05",
    name: "Sera Classic Crossbody",
    category: "Bags",
    subcategory: "Crossbody",
    price: 5300,
    oldPrice: 6200,
    badge: "Popular",
    image: "bag-05.jpg",
    description:
      "A versatile crossbody with a clean silhouette for day-to-evening styling.",
    colors: ["Black", "Burgundy"],
    material: "Faux Leather",
    featured: false,
  },

  {
    id: "bags-06",
    name: "Mira Quilted Bag",
    category: "Bags",
    subcategory: "Shoulder Bag",
    price: 6800,
    oldPrice: 7900,
    badge: "New",
    image: "bag-06.jpg",
    description:
      "A softly quilted shoulder bag with an elegant structured finish.",
    colors: ["Cream", "Blush"],
    material: "Vegan Leather",
    featured: false,
  },

  {
    id: "bags-07",
    name: "Ayla Box Bag",
    category: "Bags",
    subcategory: "Mini Bag",
    price: 6100,
    oldPrice: 7200,
    badge: "Limited",
    image: "bag-07.jpg",
    description:
      "A compact box-shaped design created for sophisticated occasion dressing.",
    colors: ["Black", "Gold"],
    material: "Premium Faux Leather",
    featured: false,
  },

  {
    id: "bags-08",
    name: "Riva Soft Tote",
    category: "Bags",
    subcategory: "Tote",
    price: 7400,
    oldPrice: 8500,
    badge: "Essential",
    image: "bag-08.jpg",
    description:
      "A softly structured tote offering generous space with a minimal aesthetic.",
    colors: ["Mocha", "Cream"],
    material: "Vegan Leather",
    featured: false,
  },

  {
    id: "bags-09",
    name: "Naya Chain Bag",
    category: "Bags",
    subcategory: "Shoulder Bag",
    price: 6300,
    oldPrice: 7400,
    badge: "Evening",
    image: "bag-09.jpg",
    description:
      "A refined chain-strap bag designed to complement evening and formal looks.",
    colors: ["Black", "Champagne"],
    material: "Synthetic Leather",
    featured: false,
  },

  {
    id: "bags-10",
    name: "Elara Classic Satchel",
    category: "Bags",
    subcategory: "Satchel",
    price: 7900,
    oldPrice: 9100,
    badge: "Premium",
    image: "bag-10.jpg",
    description:
      "A classic satchel combining structured design with practical everyday space.",
    colors: ["Camel", "Dark Brown"],
    material: "Premium Vegan Leather",
    featured: false,
  },

  {
    id: "bags-11",
    name: "Siena Mini Tote",
    category: "Bags",
    subcategory: "Mini Bag",
    price: 5100,
    oldPrice: 5900,
    badge: "New",
    image: "bag-11.jpg",
    description:
      "A compact tote with a contemporary silhouette and understated ANÉVORA styling.",
    colors: ["Ivory", "Tan"],
    material: "Vegan Leather",
    featured: false,
  },

  {
    id: "bags-12",
    name: "Maya Crescent Bag",
    category: "Bags",
    subcategory: "Shoulder Bag",
    price: 5700,
    oldPrice: 6700,
    badge: "Trending",
    image: "bag-12.jpg",
    description:
      "A softly curved shoulder bag bringing modern character to everyday outfits.",
    colors: ["Olive", "Black"],
    material: "Faux Leather",
    featured: false,
  },

  {
    id: "bags-13",
    name: "Liora Premium Tote",
    category: "Bags",
    subcategory: "Tote",
    price: 8600,
    oldPrice: 9900,
    badge: "Premium",
    image: "bag-13.jpg",
    description:
      "A spacious premium tote designed for polished daily and workwear styling.",
    colors: ["Chocolate", "Beige"],
    material: "Premium Vegan Leather",
    featured: false,
  },

  {
    id: "bags-14",
    name: "Zara Pearl Evening Bag",
    category: "Bags",
    subcategory: "Evening Bag",
    price: 6900,
    oldPrice: 7900,
    badge: "Occasion",
    image: "bag-14.jpg",
    description:
      "A refined evening bag with delicate pearl-inspired detailing for special occasions.",
    colors: ["Pearl", "Champagne"],
    material: "Satin",
    featured: false,
  },

  {
    id: "bags-15",
    name: "ANÉVORA Signature Bag",
    category: "Bags",
    subcategory: "Handbag",
    price: 9800,
    oldPrice: 11500,
    badge: "Signature",
    image: "bag-15.jpg",
    description:
      "The signature ANÉVORA handbag, designed around timeless structure and quiet luxury.",
    colors: ["Black", "Espresso"],
    material: "Premium Vegan Leather",
    featured: true,
  },

  
// =========================
// JEWELRY
// =========================

{
  id: "jewelry-01",
  name: "Luna Gold Jewelry Set",
  category: "Jewelry",
  subcategory: "Jewelry Set",
  price: 4800,
  oldPrice: 5600,
  badge: "Bestseller",
  image: "jewelry-01.jpg",
  description:
    "A delicate gold-tone jewelry set designed for graceful everyday and occasion styling.",
  colors: ["Gold"],
  material: "Gold-Tone Alloy",
  featured: true,
},

{
  id: "jewelry-02",
  name: "Noor Pearl Jewelry Set",
  category: "Jewelry",
  subcategory: "Jewelry Set",
  price: 3900,
  oldPrice: 4600,
  badge: "New",
  image: "jewelry-02.jpg",
  description:
    "A refined pearl-inspired jewelry set offering a timeless and elegant finish.",
  colors: ["Pearl", "Gold"],
  material: "Pearl-Inspired Alloy",
  featured: false,
},

{
  id: "jewelry-03",
  name: "Aurelia Gold Jewelry Set",
  category: "Jewelry",
  subcategory: "Jewelry Set",
  price: 3200,
  oldPrice: 3900,
  badge: "Popular",
  image: "jewelry-03.jpg",
  description:
    "An elegant coordinated jewelry set designed to add a graceful finish to occasion looks.",
  colors: ["Gold"],
  material: "Gold-Tone Alloy",
  featured: false,
},

{
  id: "jewelry-04",
  name: "Sera Minimal Necklace",
  category: "Jewelry",
  subcategory: "Necklace",
  price: 2800,
  oldPrice: 3400,
  badge: "Everyday",
  image: "jewelry-04.jpg",
  description:
    "A refined minimal necklace created for understated everyday elegance.",
  colors: ["Gold", "Silver"],
  material: "Stainless Steel",
  featured: false,
},

{
  id: "jewelry-05",
  name: "Mira Crystal Necklace",
  category: "Jewelry",
  subcategory: "Necklace",
  price: 2500,
  oldPrice: 3100,
  badge: "Essential",
  image: "jewelry-05.jpg",
  description:
    "A delicate necklace designed to complement both casual and formal outfits.",
  colors: ["Clear", "Silver"],
  material: "Crystal-Inspired Alloy",
  featured: false,
},

{
  id: "jewelry-06",
  name: "Elara Pearl Necklace",
  category: "Jewelry",
  subcategory: "Necklace",
  price: 5200,
  oldPrice: 6100,
  badge: "Premium",
  image: "jewelry-06.jpg",
  description:
    "A graceful pearl-inspired necklace designed for timeless occasion styling.",
  colors: ["Pearl", "Gold"],
  material: "Pearl-Inspired Alloy",
  featured: false,
},

{
  id: "jewelry-07",
  name: "Naya Classic Earrings",
  category: "Jewelry",
  subcategory: "Earrings",
  price: 3500,
  oldPrice: 4200,
  badge: "Trending",
  image: "jewelry-07.jpg",
  description:
    "Elegant earrings with a refined silhouette designed for effortless everyday styling.",
  colors: ["Gold"],
  material: "Gold-Tone Alloy",
  featured: false,
},

{
  id: "jewelry-08",
  name: "Ayla Floral Earrings",
  category: "Jewelry",
  subcategory: "Earrings",
  price: 3300,
  oldPrice: 3900,
  badge: "New",
  image: "jewelry-08.jpg",
  description:
    "Floral-inspired earrings bringing delicate detail to festive and evening outfits.",
  colors: ["Gold", "Pearl"],
  material: "Gold-Tone Alloy",
  featured: false,
},

{
  id: "jewelry-09",
  name: "Riva Statement Earrings",
  category: "Jewelry",
  subcategory: "Earrings",
  price: 4100,
  oldPrice: 4900,
  badge: "Modern",
  image: "jewelry-09.jpg",
  description:
    "A modern pair of earrings designed to add an elegant statement to any look.",
  colors: ["Gold"],
  material: "Gold-Tone Alloy",
  featured: false,
},

{
  id: "jewelry-10",
  name: "Siena Minimal Bracelet",
  category: "Jewelry",
  subcategory: "Bracelet",
  price: 2700,
  oldPrice: 3200,
  badge: "Statement",
  image: "jewelry-10.jpg",
  description:
    "A refined bracelet featuring a clean silhouette for modern everyday styling.",
  colors: ["Gold", "Silver"],
  material: "Stainless Steel",
  featured: false,
},

{
  id: "jewelry-11",
  name: "Liora Charm Bracelet",
  category: "Jewelry",
  subcategory: "Bracelet",
  price: 3100,
  oldPrice: 3700,
  badge: "New",
  image: "jewelry-11.jpg",
  description:
    "A delicate charm bracelet designed to bring a graceful touch to everyday outfits.",
  colors: ["Gold"],
  material: "Gold-Tone Alloy",
  featured: false,
},

{
  id: "jewelry-12",
  name: "Maira Classic Bracelet",
  category: "Jewelry",
  subcategory: "Bracelet",
  price: 2400,
  oldPrice: 2900,
  badge: "Essential",
  image: "jewelry-12.jpg",
  description:
    "A classic bracelet designed as an effortless and versatile jewelry essential.",
  colors: ["Gold", "Silver"],
  material: "Stainless Steel",
  featured: false,
},

{
  id: "jewelry-13",
  name: "Zehra Classic Ring",
  category: "Jewelry",
  subcategory: "Ring",
  price: 5900,
  oldPrice: 6900,
  badge: "Festive",
  image: "jewelry-13.jpg",
  description:
    "An elegant ring designed to complement traditional and contemporary occasion wear.",
  colors: ["Gold", "Pearl"],
  material: "Gold-Tone Alloy",
  featured: false,
},

{
  id: "jewelry-14",
  name: "Haya Elegant Ring",
  category: "Jewelry",
  subcategory: "Ring",
  price: 3600,
  oldPrice: 4300,
  badge: "Occasion",
  image: "jewelry-14.jpg",
  description:
    "A refined ring offering a graceful finishing touch for special occasions.",
  colors: ["Pearl", "Gold"],
  material: "Pearl-Inspired Alloy",
  featured: false,
},

{
  id: "jewelry-15",
  name: "ANÉVORA Signature Ring",
  category: "Jewelry",
  subcategory: "Ring",
  price: 7200,
  oldPrice: 8500,
  badge: "Signature",
  image: "jewelry-15.jpg",
  description:
    "The signature ANÉVORA ring, balancing modern minimalism with timeless elegance.",
  colors: ["Gold", "Pearl"],
  material: "Premium Gold-Tone Alloy",
  featured: true,
},

];
// =========================
// ABAYA PRODUCTS
// =========================

products.push(
  {
    id: "abaya-01",
    name: "Classic Noir Abaya",
    category: "Abaya",
    subcategory: "Classic Abaya",
    price: 9500,
    oldPrice: 11000,
    badge: "Essential",
    image: "abaya-01.jpg",
    description:
      "A refined black abaya designed with a clean silhouette and effortless everyday elegance.",
    material: "Premium Nida",
    colors: ["Black"],
    sizes: ["S", "M", "L", "XL"],
    featured: false,
  },

  {
    id: "abaya-02",
    name: "Aira Open Front Abaya",
    category: "Abaya",
    subcategory: "Open Front Abaya",
    price: 10800,
    oldPrice: 12500,
    badge: "New",
    image: "abaya-02.jpg",
    description:
      "An elegant open-front abaya with a graceful fall, created for sophisticated everyday styling.",
    material: "Premium Nida",
    colors: ["Black"],
    sizes: ["S", "M", "L", "XL"],
    featured: false,
  },

  {
    id: "abaya-03",
    name: "Zoya Embroidered Abaya",
    category: "Abaya",
    subcategory: "Embroidered Abaya",
    price: 13900,
    oldPrice: 15900,
    badge: "Premium",
    image: "abaya-03.jpg",
    description:
      "A sophisticated embroidered abaya combining understated detailing with a polished formal silhouette.",
    material: "Premium Nida",
    colors: ["Black"],
    sizes: ["S", "M", "L", "XL"],
    featured: true,
  },

  {
    id: "abaya-04",
    name: "Elara Beige Abaya",
    category: "Abaya",
    subcategory: "Minimal Abaya",
    price: 9900,
    oldPrice: 11500,
    badge: "Minimal",
    image: "abaya-04.jpg",
    description:
      "A minimal beige abaya with a soft contemporary silhouette for refined everyday dressing.",
    material: "Premium Crepe",
    colors: ["Beige"],
    sizes: ["S", "M", "L", "XL"],
    featured: false,
  },

  {
    id: "abaya-05",
    name: "Noura Pleated Abaya",
    category: "Abaya",
    subcategory: "Pleated Abaya",
    price: 12500,
    oldPrice: 14500,
    badge: "New",
    image: "abaya-05.jpg",
    description:
      "A fluid pleated abaya that adds movement and texture while maintaining an elegant modest profile.",
    material: "Pleated Nida",
    colors: ["Black"],
    sizes: ["S", "M", "L", "XL"],
    featured: false,
  },

  {
    id: "abaya-06",
    name: "ANÉVORA Noir Signature Abaya",
    category: "Abaya",
    subcategory: "Signature Abaya",
    price: 15500,
    oldPrice: 18000,
    badge: "Signature",
    image: "abaya-06.jpg",
    description:
      "A signature black abaya defined by a sophisticated silhouette and timeless ANÉVORA aesthetic.",
    material: "Luxury Nida",
    colors: ["Black"],
    sizes: ["S", "M", "L", "XL"],
    featured: true,
  },

  {
    id: "abaya-07",
    name: "Noor Black & Gold Abaya",
    category: "Abaya",
    subcategory: "Black & Gold Abaya",
    price: 14900,
    oldPrice: 16900,
    badge: "Festive",
    image: "abaya-07.jpg",
    description:
      "A statement black and gold abaya created for occasions that call for refined elegance.",
    material: "Premium Nida",
    colors: ["Black & Gold"],
    sizes: ["S", "M", "L", "XL"],
    featured: false,
  },

  {
    id: "abaya-08",
    name: "Riva Kimono Abaya",
    category: "Abaya",
    subcategory: "Kimono Abaya",
    price: 12800,
    oldPrice: 14900,
    badge: "Modern",
    image: "abaya-08.jpg",
    description:
      "A contemporary kimono-inspired abaya with a relaxed silhouette and graceful drape.",
    material: "Premium Crepe",
    colors: ["Black"],
    sizes: ["S", "M", "L", "XL"],
    featured: false,
  },

  {
    id: "abaya-09",
    name: "Haya Cape Abaya",
    category: "Abaya",
    subcategory: "Cape Abaya",
    price: 14200,
    oldPrice: 16500,
    badge: "Occasion",
    image: "abaya-09.jpg",
    description:
      "A graceful cape abaya designed with elegant layers and a sophisticated occasion-ready finish.",
    material: "Luxury Nida",
    colors: ["Black"],
    sizes: ["S", "M", "L", "XL"],
    featured: false,
  },

  {
    id: "abaya-10",
    name: "Élan Signature Abaya",
    category: "Abaya",
    subcategory: "Signature Abaya",
    price: 17500,
    oldPrice: 19900,
    badge: "ANÉVORA Edit",
    image: "abaya-10.jpg",
    description:
      "An elevated signature abaya featuring a luxurious silhouette created for the ANÉVORA edit.",
    material: "Luxury Nida",
    colors: ["Black"],
    sizes: ["S", "M", "L", "XL"],
    featured: true,
  },

  // =========================
  // SHOES PRODUCTS
  // =========================

  {
    id: "shoes-01",
    name: "Aurelia High Heels",
    category: "Shoes",
    subcategory: "Heels",
    price: 6900,
    oldPrice: 7900,
    badge: "New",
    image: "shoes-01.jpg",
    description:
      "Elegant high heels designed to bring a polished finish to formal and evening looks.",
    material: "Premium Synthetic",
    colors: ["Black"],
    sizes: ["36", "37", "38", "39", "40", "41"],
    featured: false,
  },

  {
    id: "shoes-02",
    name: "Elara Classic Heels",
    category: "Shoes",
    subcategory: "Heels",
    price: 7200,
    oldPrice: 8300,
    badge: "Bestseller",
    image: "shoes-02.jpg",
    description:
      "A timeless pair of classic heels with an elegant silhouette for effortless occasion dressing.",
    material: "Premium Synthetic",
    colors: ["Black"],
    sizes: ["36", "37", "38", "39", "40", "41"],
    featured: true,
  },

  {
    id: "shoes-03",
    name: "Noor Pointed Pumps",
    category: "Shoes",
    subcategory: "Pumps",
    price: 6500,
    oldPrice: 7500,
    badge: "Essential",
    image: "shoes-03.jpg",
    description:
      "Sophisticated pointed pumps designed for a clean and refined everyday wardrobe.",
    material: "Premium Synthetic",
    colors: ["Black"],
    sizes: ["36", "37", "38", "39", "40", "41"],
    featured: false,
  },

  {
    id: "shoes-04",
    name: "Siena Classic Pumps",
    category: "Shoes",
    subcategory: "Pumps",
    price: 6200,
    oldPrice: 7200,
    badge: "Classic",
    image: "shoes-04.jpg",
    description:
      "A versatile pump silhouette created to complement both tailored and occasion outfits.",
    material: "Premium Synthetic",
    colors: ["Black"],
    sizes: ["36", "37", "38", "39", "40", "41"],
    featured: false,
  },

  {
    id: "shoes-05",
    name: "Élan Leather Loafers",
    category: "Shoes",
    subcategory: "Loafers",
    price: 6800,
    oldPrice: 7800,
    badge: "Premium",
    image: "shoes-05.jpg",
    description:
      "Polished loafers with a timeless profile designed for sophisticated everyday wear.",
    material: "Premium Synthetic Leather",
    colors: ["Black"],
    sizes: ["36", "37", "38", "39", "40", "41"],
    featured: false,
  },

  {
    id: "shoes-06",
    name: "Mira Classic Loafers",
    category: "Shoes",
    subcategory: "Loafers",
    price: 5900,
    oldPrice: 6900,
    badge: "Everyday",
    image: "shoes-06.jpg",
    description:
      "Comfort-focused classic loafers with a refined shape for effortless everyday styling.",
    material: "Premium Synthetic Leather",
    colors: ["Black"],
    sizes: ["36", "37", "38", "39", "40", "41"],
    featured: false,
  },

  {
    id: "shoes-07",
    name: "Ivory Winter Shoes",
    category: "Shoes",
    subcategory: "Winter Shoes",
    price: 8200,
    oldPrice: 9500,
    badge: "Winter Edit",
    image: "shoes-07.jpg",
    description:
      "A warm winter-inspired silhouette finished in a clean ivory tone for seasonal styling.",
    material: "Premium Textile",
    colors: ["Ivory"],
    sizes: ["36", "37", "38", "39", "40", "41"],
    featured: false,
  },

  {
    id: "shoes-08",
    name: "Aurelia Heeled Sandals",
    category: "Shoes",
    subcategory: "Heeled Sandals",
    price: 7100,
    oldPrice: 8200,
    badge: "Occasion",
    image: "shoes-08.jpg",
    description:
      "Elegant heeled sandals designed to add a refined finishing touch to occasion dressing.",
    material: "Premium Synthetic",
    colors: ["Black"],
    sizes: ["36", "37", "38", "39", "40", "41"],
    featured: false,
  },

  {
    id: "shoes-09",
    name: "Naya Luxe Slippers",
    category: "Shoes",
    subcategory: "Slippers",
    price: 4500,
    oldPrice: 5200,
    badge: "Comfort",
    image: "shoes-09.jpg",
    description:
      "Comfortable everyday slippers with an understated silhouette and ANÉVORA-inspired finish.",
    material: "Premium Synthetic",
    colors: ["Black"],
    sizes: ["36", "37", "38", "39", "40", "41"],
    featured: false,
  },

  {
    id: "shoes-10",
    name: "ANÉVORA Signature Slippers",
    category: "Shoes",
    subcategory: "Slippers",
    price: 4900,
    oldPrice: 5700,
    badge: "Signature",
    image: "shoes-10.jpg",
    description:
      "A signature slipper silhouette created for effortless comfort with a polished luxury aesthetic.",
    material: "Premium Synthetic",
    colors: ["Black"],
    sizes: ["36", "37", "38", "39", "40", "41"],
    featured: true,
  }
);



export default products;
