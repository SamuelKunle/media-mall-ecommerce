import type { Product } from "../components/ProductCard";

export const sampleProducts: Product[] = [
  // ─── PHONES & TABLETS ───
  { id: 1, name: "iPhone 15 Pro Max 256GB Natural Titanium", brand: "Apple", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop", price: 1299000, oldPrice: 1499000, rating: 4.8, reviews: 2341, specs: ["A17 Pro", '6.7" Super Retina', "48MP Camera"], badges: ["Official", "Best Seller"], inStock: true, installment: "From ₦108K/mo × 12", category: "phones-tablets" },
  { id: 2, name: "Samsung Galaxy S24 Ultra 512GB Titanium Black", brand: "Samsung", image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop", price: 1399000, oldPrice: 1649000, rating: 4.7, reviews: 1856, specs: ["Snapdragon 8 Gen 3", '6.8" QHD+', "200MP Camera"], badges: ["Official"], inStock: true, installment: "From ₦116K/mo × 12", category: "phones-tablets" },
  { id: 5, name: 'iPad Air M2 13" 256GB Wi-Fi Space Gray', brand: "Apple", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop", price: 849000, oldPrice: 999000, rating: 4.7, reviews: 645, specs: ["M2 Chip", '13" Liquid Retina', "Apple Pencil Pro"], badges: ["New", "Official"], inStock: true, installment: "From ₦70K/mo × 12", category: "phones-tablets" },
  { id: 14, name: "Xiaomi Redmi Note 13 Pro+ 256GB", brand: "Xiaomi", image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop", price: 289000, oldPrice: 340000, rating: 4.4, reviews: 2105, specs: ["Dimensity 7200", '6.67" AMOLED 120Hz', "200MP Camera"], badges: ["Official"], inStock: true, installment: "From ₦24K/mo × 12", category: "phones-tablets" },
  { id: 21, name: "Samsung Galaxy Tab S9 FE 128GB", brand: "Samsung", image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop", price: 389000, oldPrice: 449000, rating: 4.5, reviews: 512, specs: ["Exynos 1380", '10.9" TFT LCD', "S Pen Included"], badges: ["Official"], inStock: true, category: "phones-tablets" },

  // ─── LAPTOPS ───
  { id: 3, name: 'MacBook Pro 14" M3 Pro 18GB 512GB', brand: "Apple", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", price: 2199000, oldPrice: 2499000, rating: 4.9, reviews: 892, specs: ["M3 Pro Chip", '14.2" Liquid Retina XDR', "18GB Unified Memory"], badges: ["Official", "New"], inStock: true, installment: "From ₦183K/mo × 12", category: "laptops" },
  { id: 9, name: "ASUS ROG Strix G16 RTX 4060 i7-13650HX", brand: "ASUS", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop", price: 1449000, oldPrice: 1699000, rating: 4.6, reviews: 342, specs: ["i7-13650HX", "RTX 4060", '16" 165Hz'], badges: ["New"], inStock: true, installment: "From ₦120K/mo × 12", category: "laptops" },
  { id: 15, name: "Lenovo ThinkPad X1 Carbon Gen 11", brand: "Lenovo", image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop", price: 1750000, oldPrice: 1999000, rating: 4.8, reviews: 410, specs: ["i7-1365U", '14" 2.8K OLED', "1.12kg"], badges: ["Official", "New"], inStock: true, installment: "From ₦145K/mo × 12", category: "laptops" },
  { id: 22, name: "HP Spectre x360 14 2-in-1 OLED", brand: "HP", image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400&h=400&fit=crop", price: 1599000, oldPrice: 1849000, rating: 4.7, reviews: 298, specs: ["Intel Core Ultra 7", '14" 2.8K OLED', "16GB RAM"], badges: ["Official", "New"], inStock: true, installment: "From ₦133K/mo × 12", category: "laptops" },
  { id: 23, name: "Acer Swift Go 14 OLED", brand: "Acer", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop", price: 899000, oldPrice: 1049000, rating: 4.5, reviews: 189, specs: ["Intel Core i7", '14" 2.8K OLED', "16GB / 512GB"], badges: ["Official"], inStock: true, installment: "From ₦75K/mo × 12", category: "laptops" },
  { id: 24, name: "Dell XPS 15 OLED i7 RTX 4050", brand: "Dell", image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=400&fit=crop", price: 1899000, oldPrice: 2199000, rating: 4.8, reviews: 356, specs: ["i7-13700H", "RTX 4050", '15.6" 3.5K OLED'], badges: ["Official"], inStock: true, installment: "From ₦158K/mo × 12", category: "laptops" },

  // ─── AUDIO ───
  { id: 4, name: "Sony WH-1000XM5 Wireless Noise Cancelling", brand: "Sony", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop", price: 289000, oldPrice: 349000, rating: 4.8, reviews: 3201, specs: ["30h Battery", "LDAC Codec", "Multipoint"], badges: ["Best Seller"], inStock: true, category: "audio" },
  { id: 10, name: "AirPods Pro 2nd Gen USB-C MagSafe", brand: "Apple", image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop", price: 249000, oldPrice: 289000, rating: 4.9, reviews: 4521, specs: ["Active Noise Cancel", "Adaptive Audio", "USB-C"], badges: ["Best Seller", "Official"], inStock: true, category: "audio" },
  { id: 16, name: "JBL Charge 5 Portable Bluetooth Speaker", brand: "JBL", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop", price: 119000, oldPrice: 145000, rating: 4.7, reviews: 3450, specs: ["20h Battery", "IP67 Waterproof", "Powerbank"], badges: ["Best Seller"], inStock: true, category: "audio" },
  { id: 25, name: "Bose QuietComfort Ultra Headphones", brand: "Bose", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop", price: 329000, oldPrice: 389000, rating: 4.8, reviews: 1890, specs: ["Immersive Audio", "24h Battery", "CustomTune"], badges: ["Official", "New"], inStock: true, category: "audio" },
  { id: 26, name: "JBL Flip 6 Portable Speaker", brand: "JBL", image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=400&h=400&fit=crop", price: 79000, oldPrice: 95000, rating: 4.6, reviews: 5120, specs: ["12h Battery", "IP67", "PartyBoost"], badges: ["Best Seller"], inStock: true, category: "audio" },
  { id: 27, name: "Bose SoundLink Max Portable Speaker", brand: "Bose", image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=400&fit=crop", price: 199000, oldPrice: 239000, rating: 4.7, reviews: 820, specs: ["20h Battery", "Stereo Pairing", "IP67"], badges: ["New"], inStock: true, category: "audio" },

  // ─── GAMING ───
  { id: 7, name: "PlayStation 5 Slim Digital Edition", brand: "Sony", image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop", price: 499000, oldPrice: 599000, rating: 4.8, reviews: 1523, specs: ["1TB SSD", "4K Gaming", "DualSense Controller"], badges: ["Flash Sale"], inStock: true, category: "gaming" },
  { id: 17, name: "Nintendo Switch OLED Model White", brand: "Nintendo", image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=400&fit=crop", price: 349000, oldPrice: 399000, rating: 4.8, reviews: 2890, specs: ['7" OLED', "64GB Storage", "Enhanced Audio"], badges: ["Best Seller"], inStock: true, category: "gaming" },
  { id: 28, name: "Nintendo Switch Lite Turquoise", brand: "Nintendo", image: "https://images.unsplash.com/photo-1585620385456-4759f9b5c7d9?w=400&h=400&fit=crop", price: 219000, oldPrice: 259000, rating: 4.6, reviews: 3410, specs: ["Handheld Only", "Compact", "32GB"], badges: ["Best Seller"], inStock: true, category: "gaming" },
  { id: 29, name: "Logitech G Pro X Superlight 2", brand: "Logitech", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop", price: 109000, oldPrice: 129000, rating: 4.9, reviews: 2340, specs: ["60g Ultralight", "HERO 2 Sensor", "95h Battery"], badges: ["Best Seller"], inStock: true, category: "gaming" },
  { id: 30, name: "ASUS ROG Ally Z1 Extreme Handheld", brand: "ASUS", image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=400&fit=crop", price: 599000, oldPrice: 699000, rating: 4.5, reviews: 456, specs: ["Z1 Extreme", '7" FHD 120Hz', "Windows 11"], badges: ["New"], inStock: true, category: "gaming" },

  // ─── CAMERAS ───
  { id: 11, name: "Canon EOS R6 Mark II Body", brand: "Canon", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop", price: 1850000, oldPrice: 2100000, rating: 4.7, reviews: 218, specs: ["24.2MP Full Frame", "4K 60fps", "40fps Burst"], badges: ["Official", "New"], inStock: true, installment: "From ₦154K/mo × 12", category: "cameras" },
  { id: 31, name: "Canon EOS R50 Mirrorless Kit", brand: "Canon", image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop", price: 649000, oldPrice: 749000, rating: 4.6, reviews: 534, specs: ["24.2MP APS-C", "4K Video", "RF-S 18-45mm"], badges: ["Official"], inStock: true, installment: "From ₦54K/mo × 12", category: "cameras" },
  { id: 32, name: "Sony Alpha A7 IV Body", brand: "Sony", image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=400&h=400&fit=crop", price: 1999000, oldPrice: 2299000, rating: 4.8, reviews: 345, specs: ["33MP Full Frame", "4K 60fps", "BIONZ XR"], badges: ["Official"], inStock: true, installment: "From ₦166K/mo × 12", category: "cameras" },

  // ─── WEARABLES ───
  { id: 8, name: "Samsung Galaxy Watch 6 Classic 47mm", brand: "Samsung", image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop", price: 369000, oldPrice: 479000, rating: 4.5, reviews: 876, specs: ["Wear OS", "Rotating Bezel", "BioActive Sensor"], badges: ["Best Seller"], inStock: true, category: "wearables" },
  { id: 18, name: "Apple Watch Ultra 2 49mm Titanium", brand: "Apple", image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&h=400&fit=crop", price: 799000, oldPrice: 899000, rating: 4.9, reviews: 1234, specs: ["S9 Chip", "36h Battery", "Depth Gauge"], badges: ["Official", "New"], inStock: true, installment: "From ₦66K/mo × 12", category: "wearables" },
  { id: 33, name: "Garmin Forerunner 265 GPS Watch", brand: "Garmin", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop", price: 349000, oldPrice: 399000, rating: 4.7, reviews: 1560, specs: ["AMOLED Display", "13-Day Battery", "GPS/GLONASS"], badges: ["Official", "Best Seller"], inStock: true, category: "wearables" },
  { id: 34, name: "Garmin Venu 3 AMOLED Smartwatch", brand: "Garmin", image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&h=400&fit=crop", price: 419000, oldPrice: 479000, rating: 4.6, reviews: 678, specs: ["AMOLED 1.4\"", "14-Day Battery", "Body Battery"], badges: ["New"], inStock: true, category: "wearables" },

  // ─── MONITORS ───
  { id: 6, name: 'Dell UltraSharp U2723QE 27" 4K USB-C Hub Monitor', brand: "Dell", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop", price: 599000, oldPrice: 699000, rating: 4.6, reviews: 432, specs: ["4K UHD", "USB-C 90W", "IPS Black"], badges: ["Official"], inStock: true, category: "monitors" },
  { id: 19, name: 'LG UltraGear 27GP850-B 27" QHD 165Hz', brand: "LG", image: "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=400&h=400&fit=crop", price: 419000, oldPrice: 499000, rating: 4.6, reviews: 678, specs: ["QHD 2560×1440", "165Hz", "Nano IPS"], badges: ["Official"], inStock: true, category: "monitors" },
  { id: 35, name: 'Samsung Odyssey G7 32" QHD 240Hz', brand: "Samsung", image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=400&fit=crop", price: 549000, oldPrice: 649000, rating: 4.7, reviews: 890, specs: ["QHD 2560×1440", "240Hz", "1000R Curved"], badges: ["Best Seller"], inStock: true, category: "monitors" },

  // ─── NETWORKING ───
  { id: 12, name: "TP-Link Deco XE75 Pro AXE5400 Mesh (3-Pack)", brand: "TP-Link", image: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400&h=400&fit=crop", price: 189000, oldPrice: 229000, rating: 4.5, reviews: 312, specs: ["Wi-Fi 6E", "Tri-Band", "5400Mbps"], badges: ["Best Seller"], inStock: true, category: "networking" },
  { id: 36, name: "TP-Link Archer AXE75 Wi-Fi 6E Router", brand: "TP-Link", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop", price: 89000, oldPrice: 109000, rating: 4.4, reviews: 1230, specs: ["Wi-Fi 6E", "5400Mbps", "USB 3.0"], badges: ["Official"], inStock: true, category: "networking" },
  { id: 37, name: "ASUS RT-AXE7800 Tri-Band Router", brand: "ASUS", image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=400&fit=crop", price: 149000, oldPrice: 179000, rating: 4.6, reviews: 456, specs: ["Wi-Fi 6E", "7800Mbps", "AiMesh"], badges: ["Official"], inStock: true, category: "networking" },

  // ─── ACCESSORIES ───
  { id: 13, name: "Anker 737 Power Bank 24000mAh 140W", brand: "Anker", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop", price: 79000, oldPrice: 95000, rating: 4.6, reviews: 1842, specs: ["24000mAh", "140W Output", "Smart Display"], badges: ["Best Seller"], inStock: true, category: "accessories" },
  { id: 20, name: "Logitech MX Master 3S Wireless Mouse", brand: "Logitech", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop", price: 69000, oldPrice: 82000, rating: 4.8, reviews: 5210, specs: ["8K DPI", "USB-C", "Multi-Device"], badges: ["Best Seller"], inStock: true, category: "accessories" },
  { id: 38, name: "Anker 735 Charger GaNPrime 65W", brand: "Anker", image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&h=400&fit=crop", price: 32000, oldPrice: 39000, rating: 4.7, reviews: 6780, specs: ["65W GaN", "3-Port", "Foldable Plug"], badges: ["Best Seller"], inStock: true, category: "accessories" },
  { id: 39, name: "Anker USB-C to Lightning Cable 2-Pack", brand: "Anker", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop", price: 12000, oldPrice: 15000, rating: 4.5, reviews: 12400, specs: ["MFi Certified", "1.8m", "Braided"], badges: [], inStock: false, category: "accessories" },
  { id: 40, name: "Logitech MX Keys S Wireless Keyboard", brand: "Logitech", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop", price: 89000, oldPrice: 105000, rating: 4.8, reviews: 2340, specs: ["Smart Illumination", "Multi-Device", "USB-C"], badges: ["Official"], inStock: true, category: "accessories" },
  { id: 41, name: "Logitech MX Anywhere 3S Compact Mouse", brand: "Logitech", image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&h=400&fit=crop", price: 55000, oldPrice: 65000, rating: 4.7, reviews: 3100, specs: ["8K DPI", "Quiet Clicks", "USB-C"], badges: [], inStock: true, category: "accessories" },

  // ─── TVs ───
  { id: 42, name: 'LG C3 65" 4K OLED evo Smart TV', brand: "LG", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop", price: 1599000, oldPrice: 1899000, rating: 4.9, reviews: 1245, specs: ['65" OLED evo', "α9 Gen6 AI", "120Hz Dolby Vision"], badges: ["Official", "Best Seller"], inStock: true, installment: "From ₦133K/mo × 12", category: "tvs" },
  { id: 43, name: 'Samsung 55" Crystal UHD 4K Smart TV', brand: "Samsung", image: "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=400&h=400&fit=crop", price: 499000, oldPrice: 599000, rating: 4.5, reviews: 2340, specs: ['55" Crystal UHD', "Crystal Processor 4K", "Smart Hub"], badges: ["Official"], inStock: true, category: "tvs" },

  // ─── SMART HOME ───
  { id: 44, name: "Xiaomi Smart Home Hub 2", brand: "Xiaomi", image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=400&h=400&fit=crop", price: 29000, oldPrice: 39000, rating: 4.3, reviews: 890, specs: ["Zigbee 3.0", "Bluetooth 5.0", "Wi-Fi"], badges: ["Official"], inStock: true, category: "smart-home" },
  { id: 45, name: "TP-Link Tapo C210 Smart Camera", brand: "TP-Link", image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop", price: 19000, oldPrice: 25000, rating: 4.4, reviews: 3450, specs: ["2K QHD", "Pan & Tilt", "Night Vision"], badges: ["Best Seller"], inStock: true, category: "smart-home" },
  { id: 46, name: "Xiaomi Mi Smart LED Bulb Essential", brand: "Xiaomi", image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=400&fit=crop", price: 5000, oldPrice: 7000, rating: 4.2, reviews: 6700, specs: ["16M Colors", "Wi-Fi", "Voice Control"], badges: [], inStock: true, category: "smart-home" },

  // ─── PCs & COMPONENTS ───
  { id: 47, name: "ASUS ROG Strix B760-F Gaming WiFi", brand: "ASUS", image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=400&fit=crop", price: 219000, oldPrice: 259000, rating: 4.6, reviews: 340, specs: ["LGA 1700", "DDR5", "Wi-Fi 6E"], badges: ["Official"], inStock: true, category: "pcs" },
  { id: 48, name: "Lenovo IdeaCentre 5i Desktop", brand: "Lenovo", image: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=400&h=400&fit=crop", price: 699000, oldPrice: 799000, rating: 4.5, reviews: 567, specs: ["i5-13400", "16GB RAM", "512GB SSD"], badges: ["Official"], inStock: true, category: "pcs" },
  { id: 49, name: "HP Victus 15L Gaming Desktop", brand: "HP", image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=400&fit=crop", price: 899000, oldPrice: 1049000, rating: 4.4, reviews: 234, specs: ["i7-13700F", "RTX 4060", "16GB / 1TB"], badges: ["New"], inStock: true, installment: "From ₦75K/mo × 12", category: "pcs" },
];

export interface CategoryInfo {
  slug: string;
  name: string;
  description: string;
  count: string;
  icon: string;
  subcategories: string[];
  brands: string[];
}

export const categories: CategoryInfo[] = [
  { slug: "phones-tablets", name: "Phones & Tablets", description: "Discover the latest smartphones and tablets from top brands. Official warranty, genuine products.", count: "1,240+", icon: "📱", subcategories: ["Smartphones", "Tablets", "Feature Phones", "Phone Cases", "Screen Protectors", "Chargers"], brands: ["Apple", "Samsung", "Xiaomi", "Google", "OnePlus", "Tecno"] },
  { slug: "laptops", name: "Laptops & MacBooks", description: "Premium laptops for work, school, and creative professionals. 0% installment available.", count: "860+", icon: "💻", subcategories: ["MacBooks", "Ultrabooks", "Gaming Laptops", "Budget Laptops", "2-in-1 Laptops", "Chromebooks"], brands: ["Apple", "Lenovo", "ASUS", "Dell", "HP", "Acer"] },
  { slug: "audio", name: "Audio & Headphones", description: "Immerse yourself in premium sound. Headphones, speakers, and audio gear from leading brands.", count: "520+", icon: "🎧", subcategories: ["Wireless Headphones", "Earbuds", "Speakers", "Soundbars", "Studio Monitors", "Microphones"], brands: ["Sony", "Bose", "JBL", "Apple", "Samsung", "Sennheiser"] },
  { slug: "gaming", name: "Gaming", description: "Level up your gaming experience. Consoles, gaming laptops, peripherals & accessories.", count: "430+", icon: "🎮", subcategories: ["Consoles", "Gaming Laptops", "Controllers", "Gaming Headsets", "Gaming Chairs", "VR"], brands: ["Sony", "Nintendo", "Microsoft", "ASUS", "Razer", "Logitech"] },
  { slug: "cameras", name: "Cameras", description: "Capture every moment. DSLRs, mirrorless, action cameras and photography accessories.", count: "310+", icon: "📷", subcategories: ["Mirrorless", "DSLR", "Action Cameras", "Lenses", "Tripods", "Camera Bags"], brands: ["Canon", "Sony", "Nikon", "Fujifilm", "GoPro", "DJI"] },
  { slug: "wearables", name: "Wearables", description: "Smartwatches and fitness trackers to keep you connected and healthy.", count: "280+", icon: "⌚", subcategories: ["Smartwatches", "Fitness Trackers", "Watch Bands", "Smart Rings", "Watch Chargers"], brands: ["Apple", "Samsung", "Garmin", "Fitbit", "Xiaomi", "Huawei"] },
  { slug: "networking", name: "Networking", description: "Build a fast, reliable network. Routers, mesh systems, switches and more.", count: "190+", icon: "📡", subcategories: ["Routers", "Mesh Systems", "Switches", "Range Extenders", "Modems", "Cables"], brands: ["TP-Link", "ASUS", "Netgear", "Ubiquiti", "Cisco", "Linksys"] },
  { slug: "accessories", name: "Accessories", description: "Essential tech accessories. Chargers, cables, cases, storage, keyboards, mice and more.", count: "2,100+", icon: "🔌", subcategories: ["Chargers & Cables", "Cases & Covers", "Storage", "Keyboards", "Mice", "Power Banks", "Hubs & Docks"], brands: ["Anker", "Logitech", "Belkin", "Apple", "Samsung", "Baseus"] },
  { slug: "monitors", name: "Monitors", description: "High-resolution monitors for work, gaming, and creative professionals.", count: "340+", icon: "🖥️", subcategories: ["4K Monitors", "Gaming Monitors", "Ultrawide", "Portable Monitors", "Monitor Arms"], brands: ["Dell", "LG", "Samsung", "ASUS", "BenQ", "AOC"] },
  { slug: "tvs", name: "TVs & Entertainment", description: "Smart TVs, streaming devices, and home entertainment systems.", count: "220+", icon: "📺", subcategories: ["Smart TVs", "OLED TVs", "Soundbars", "Streaming Devices", "Projectors", "TV Mounts"], brands: ["Samsung", "LG", "Sony", "Hisense", "TCL", "Apple"] },
  { slug: "smart-home", name: "Smart Home", description: "Make your home smarter. Smart speakers, lights, security cameras and more.", count: "180+", icon: "🏠", subcategories: ["Smart Speakers", "Smart Lights", "Security Cameras", "Smart Plugs", "Smart Locks"], brands: ["Google", "Amazon", "Philips", "Ring", "Xiaomi", "TP-Link"] },
  { slug: "pcs", name: "PCs & Components", description: "Desktop PCs, custom builds, and PC components for every need.", count: "560+", icon: "🖱️", subcategories: ["Pre-built PCs", "Processors", "Graphics Cards", "RAM", "Storage", "Cases", "Power Supplies"], brands: ["AMD", "Intel", "NVIDIA", "Corsair", "ASUS", "MSI"] },
];

export const categoryShortcuts = categories.slice(0, 12).map((c) => ({
  name: c.name.split(" &")[0].split(" ")[0],
  icon: c.icon,
  slug: c.slug,
}));

export const brands = [
  "Apple", "Samsung", "Sony", "ASUS", "Dell", "Lenovo",
  "LG", "Xiaomi", "Bose", "JBL", "HP", "Acer"
];

export function getProductById(id: number): Product | undefined {
  return sampleProducts.find((p) => p.id === id);
}

export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  return categories.find((c) => c.slug === slug);
}
