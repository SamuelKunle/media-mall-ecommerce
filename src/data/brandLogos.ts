// Brand logo mapping - uses local SVGs where available, text fallback otherwise
export const brandLogos: Record<string, string | null> = {
  "Apple": "/brands/apple.svg",
  "Samsung": "/brands/samsung.svg",
  "Sony": "/brands/sony.svg",
  "ASUS": "/brands/asus.svg",
  "Dell": "/brands/dell.svg",
  "Lenovo": "/brands/lenovo.svg",
  "LG": "/brands/lg.svg",
  "Xiaomi": "/brands/xiaomi.svg",
  "Bose": null,
  "JBL": null,
  "HP": "/brands/hp.svg",
  "Acer": "/brands/acer.svg",
  "Canon": "/brands/canon.svg",
  "Logitech": "/brands/logitech.svg",
  "Anker": null,
  "TP-Link": null,
  "Nintendo": "/brands/nintendo.svg",
  "Garmin": null,
};

export const getBrandLogo = (brand: string): string | null => {
  return brandLogos[brand] || null;
};
