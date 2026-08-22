import type { Locale } from "./types";

export type Translations = {
  nav: {
    home: string;
    menu: string;
    reservations: string;
    story: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    title: string;
    subtitle: string;
    reservation: string;
    viewMenu: string;
    scroll: string;
  };
  home: {
    aboutLabel: string;
    aboutTitle: string;
    aboutP1: string;
    aboutP2: string;
    readStory: string;
    showcaseCaption: string;
    showcaseTallAlt: string;
    showcaseWideAlt: string;
    ctaTitle: string;
    ctaBody: string;
    ctaButton: string;
  };
  menu: {
    title: string;
    subtitle: string;
    closedSubtitle: string;
    closedBody: string;
    empty: string;
    reservation: string;
    productCount: (count: number) => string;
    allCategories: string;
    noProductsInCategory: string;
    noImage: string;
  };
  product: {
    menu: string;
    close: string;
    closeDetail: string;
    contents: string;
    noTags: string;
  };
  story: {
    label: string;
    title: string;
    intro: string;
    sectionTitle: string;
    p1: string;
    p2: string;
    p3: string;
    reservation: string;
    showcaseCaption: string;
    showcaseTallAlt: string;
    showcaseWideAlt: string;
  };
  reservations: {
    title: string;
    subtitle: string;
    formTitle: string;
    contact: string;
    directions: string;
    mapTitle: string;
  };
  form: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    guests: string;
    selectTime: string;
    selectGuests: string;
    guest: string;
    guestsLabel: string;
    specialRequests: string;
    specialRequestsPlaceholder: string;
    submit: string;
    submitting: string;
    success: string;
    error: string;
  };
  footer: {
    tagline: string;
    copyright: string;
  };
  language: {
    label: string;
  };
};

const tr: Translations = {
  nav: {
    home: "Ana Sayfa",
    menu: "Menü",
    reservations: "Rezervasyon",
    story: "Hikâyemiz",
    openMenu: "Menüyü aç",
    closeMenu: "Menüyü kapat",
  },
  hero: {
    title: "Berray's'ta Güzel Bir Mola",
    subtitle:
      "Kahvaltıdan akşam yemeğine, kahveden tatlıya… Sevdiğiniz lezzetler ve keyifli sohbetler için Berray's'ta buluşalım.",
    reservation: "Rezervasyon",
    viewMenu: "Menüyü Gör",
    scroll: "Kaydır",
  },
  home: {
    aboutLabel: "Berray's'ı Tanıyın",
    aboutTitle: "Sıcak Bir Ortam, Sevdiğiniz Lezzetler.",
    aboutP1:
      "Berray's'ta her tabağı özenle hazırlıyor, sevdiğiniz lezzetleri sıcak ve rahat bir ortamda sunuyoruz.",
    aboutP2:
      "Ahşap tavanlar, taş duvarlar ve sıcak ışıklarla hazırlanan salonumuzda ailenizle ve arkadaşlarınızla güzel vakit geçirebilirsiniz.",
    readStory: "Hikâyemizi Okuyun",
    showcaseCaption: "Salon & Şömine",
    showcaseTallAlt: "Berray's Kitchen & Cafe salonu",
    showcaseWideAlt: "Berray's şömineli oturma alanı",
    ctaTitle: "Berray's'ta Yerinizi Ayırın",
    ctaBody:
      "Ailenizle veya arkadaşlarınızla güzel bir masa için rezervasyonunuzu kolayca oluşturun.",
    ctaButton: "Rezervasyon Yap",
  },
  menu: {
    title: "Menümüz",
    subtitle: "Berray's menüsünü keşfetmek için bir kategori seçin.",
    closedSubtitle: "Berray's menüsü şu an güncelleniyor. Çok yakında yeniden burada.",
    closedBody:
      "Fiyatları ve ürünleri yeniliyoruz. Bu sırada rezervasyon için bizi arayabilir veya formu doldurabilirsiniz.",
    empty: "Berray's menüsü çok yakında burada.",
    reservation: "Rezervasyon",
    productCount: (count) => `${count} ürün`,
    allCategories: "Tüm kategoriler",
    noProductsInCategory: "Bu kategoride henüz ürün yok.",
    noImage: "Görsel yok",
  },
  product: {
    menu: "Menü",
    close: "Kapat",
    closeDetail: "Ürün detayını kapat",
    contents: "İçerik / Notlar",
    noTags: "Bu ürün için henüz etiket eklenmemiş.",
  },
  story: {
    label: "Berray's",
    title: "Hikâyemiz",
    intro:
      "Berray's Kitchen & Cafe, günün her saatinde iyi yemek ve güzel sohbet için buluşabileceğiniz sıcak bir mekân.",
    sectionTitle: "Birlikte Güzel Vakit Geçirmek İçin.",
    p1: "Güne kahvaltıyla başlayabilir, kahvenizi yudumlayabilir veya akşam yemeğinde sevdiklerinizle aynı sofrayı paylaşabilirsiniz. Menümüzde burger, pizza, makarna, salata ve ana yemek seçenekleri bulunur.",
    p2: "Sıcak ve soğuk kahvelerimiz, taze içeceklerimiz ve tatlılarımızla günün her saatinde keyifli bir mola verebilirsiniz.",
    p3: "Berray's Kitchen & Cafe'yi rahatça oturabileceğiniz, ailenizle ve arkadaşlarınızla güzel anılar biriktirebileceğiniz bir yer olarak hazırladık.",
    reservation: "Rezervasyon",
    showcaseCaption: "Salon & Şömine",
    showcaseTallAlt: "Berray's Kitchen & Cafe salonu",
    showcaseWideAlt: "Berray's şömineli oturma alanı",
  },
  reservations: {
    title: "Berray's'ta Rezervasyon",
    subtitle:
      "Formu doldurun, masanızı sizin için ayıralım. Dilerseniz bizi telefonla da arayabilirsiniz.",
    formTitle: "Rezervasyon Formu",
    contact: "İletişim",
    directions: "Yol Tarifi Al",
    mapTitle: "Berray's Kitchen & Cafe konumu",
  },
  form: {
    firstName: "Ad",
    lastName: "Soyad",
    email: "E-posta",
    phone: "Telefon",
    date: "Tarih",
    time: "Saat",
    guests: "Kişi",
    selectTime: "Saat seçin",
    selectGuests: "Kişi sayısı",
    guest: "Kişi",
    guestsLabel: "Kişi",
    specialRequests: "Özel İstekler (İsteğe bağlı)",
    specialRequestsPlaceholder: "Diyet tercihleri, kutlama, oturma tercihi...",
    submit: "Rezervasyon Talebi Gönder",
    submitting: "Gönderiliyor...",
    success: "Talebinizi aldık. En kısa sürede sizinle iletişime geçeceğiz.",
    error: "Bir sorun oluştu. Lütfen tekrar deneyin veya bizi arayın.",
  },
  footer: {
    tagline:
      "Kahvaltıdan akşam yemeğine, kahveden tatlıya… Berray's'ta her zaman güzel bir mola var.",
    copyright: "© 2026 Berray's Kitchen & Cafe.",
  },
  language: {
    label: "Dil seçin",
  },
};

const en: Translations = {
  nav: {
    home: "Home",
    menu: "Menu",
    reservations: "Reservations",
    story: "Our Story",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  hero: {
    title: "A Nice Break at Berray's",
    subtitle:
      "From breakfast to dinner, coffee to dessert… Join us at Berray's for the flavors you love and good company.",
    reservation: "Reservations",
    viewMenu: "View Menu",
    scroll: "Scroll",
  },
  home: {
    aboutLabel: "Discover Berray's",
    aboutTitle: "A Warm Place, Your Favorite Flavors.",
    aboutP1:
      "At Berray's, every dish is prepared with care and served in a warm, relaxed setting.",
    aboutP2:
      "In our dining room with wood ceilings, stone walls, and soft lighting, you can enjoy time with family and friends.",
    readStory: "Read Our Story",
    showcaseCaption: "Dining Room & Fireplace",
    showcaseTallAlt: "Berray's Kitchen & Cafe dining room",
    showcaseWideAlt: "Berray's fireplace seating area",
    ctaTitle: "Reserve Your Table at Berray's",
    ctaBody: "Book a table easily for a lovely meal with family or friends.",
    ctaButton: "Make a Reservation",
  },
  menu: {
    title: "Our Menu",
    subtitle: "Choose a category to explore the Berray's menu.",
    closedSubtitle: "The Berray's menu is being updated. It will be back here very soon.",
    closedBody:
      "We are refreshing prices and items. In the meantime, call us or fill out the reservation form.",
    empty: "The Berray's menu will be here very soon.",
    reservation: "Reservations",
    productCount: (count) => `${count} item${count === 1 ? "" : "s"}`,
    allCategories: "All categories",
    noProductsInCategory: "No items in this category yet.",
    noImage: "No image",
  },
  product: {
    menu: "Menu",
    close: "Close",
    closeDetail: "Close product details",
    contents: "Contents / Notes",
    noTags: "No tags have been added for this item yet.",
  },
  story: {
    label: "Berray's",
    title: "Our Story",
    intro:
      "Berray's Kitchen & Cafe is a warm place to meet for good food and great conversation at any time of day.",
    sectionTitle: "A Place to Enjoy Time Together.",
    p1: "Start the day with breakfast, sip your coffee, or share dinner with loved ones. Our menu includes burgers, pizza, pasta, salads, and main courses.",
    p2: "With hot and iced coffees, fresh drinks, and desserts, you can take a pleasant break at any hour.",
    p3: "We created Berray's Kitchen & Cafe as a place to sit comfortably and make good memories with family and friends.",
    reservation: "Reservations",
    showcaseCaption: "Dining Room & Fireplace",
    showcaseTallAlt: "Berray's Kitchen & Cafe dining room",
    showcaseWideAlt: "Berray's fireplace seating area",
  },
  reservations: {
    title: "Reservations at Berray's",
    subtitle: "Fill out the form and we will reserve a table for you. You can also call us.",
    formTitle: "Reservation Form",
    contact: "Contact",
    directions: "Get Directions",
    mapTitle: "Berray's Kitchen & Cafe location",
  },
  form: {
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    phone: "Phone",
    date: "Date",
    time: "Time",
    guests: "Guests",
    selectTime: "Select time",
    selectGuests: "Number of guests",
    guest: "Guest",
    guestsLabel: "Guests",
    specialRequests: "Special requests (optional)",
    specialRequestsPlaceholder: "Dietary preferences, celebration, seating preference...",
    submit: "Send Reservation Request",
    submitting: "Sending...",
    success: "We received your request. We will contact you shortly.",
    error: "Something went wrong. Please try again or call us.",
  },
  footer: {
    tagline:
      "From breakfast to dinner, coffee to dessert… There is always a nice break waiting at Berray's.",
    copyright: "© 2026 Berray's Kitchen & Cafe.",
  },
  language: {
    label: "Choose language",
  },
};

const ar: Translations = {
  nav: {
    home: "الرئيسية",
    menu: "القائمة",
    reservations: "الحجز",
    story: "قصتنا",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
  },
  hero: {
    title: "استراحة جميلة في Berray's",
    subtitle:
      "من الإفطار إلى العشاء، ومن القهوة إلى الحلويات… نلتقي في Berray's لنستمتع بالنكهات التي تحبونها ولحظات جميلة.",
    reservation: "الحجز",
    viewMenu: "عرض القائمة",
    scroll: "مرر",
  },
  home: {
    aboutLabel: "تعرّف على Berray's",
    aboutTitle: "أجواء دافئة ونكهات تحبونها.",
    aboutP1: "في Berray's نُعد كل طبق بعناية ونقدمه في أجواء دافئة ومريحة.",
    aboutP2:
      "في صالوننا ذي الأسقف الخشبية والجدران الحجرية والإضاءة الدافئة، يمكنكم قضاء وقت جميل مع العائلة والأصدقاء.",
    readStory: "اقرأ قصتنا",
    showcaseCaption: "الصالون والمدفأة",
    showcaseTallAlt: "صالون Berray's Kitchen & Cafe",
    showcaseWideAlt: "منطقة الجلوس عند المدفأة في Berray's",
    ctaTitle: "احجز مكانك في Berray's",
    ctaBody: "احجز طاولة بسهولة لتناول وجبة جميلة مع العائلة أو الأصدقاء.",
    ctaButton: "احجز الآن",
  },
  menu: {
    title: "قائمتنا",
    subtitle: "اختر فئة لاستكشاف قائمة Berray's.",
    closedSubtitle: "قائمة Berray's قيد التحديث. ستعود هنا قريبًا جدًا.",
    closedBody: "نقوم بتحديث الأسعار والمنتجات. في هذه الأثناء يمكنكم الاتصال بنا أو تعبئة نموذج الحجز.",
    empty: "قائمة Berray's ستكون هنا قريبًا جدًا.",
    reservation: "الحجز",
    productCount: (count) => (count === 1 ? "منتج واحد" : `${count} منتجات`),
    allCategories: "جميع الفئات",
    noProductsInCategory: "لا توجد منتجات في هذه الفئة بعد.",
    noImage: "لا توجد صورة",
  },
  product: {
    menu: "القائمة",
    close: "إغلاق",
    closeDetail: "إغلاق تفاصيل المنتج",
    contents: "المحتويات / ملاحظات",
    noTags: "لم تُضف أي وسوم لهذا المنتج بعد.",
  },
  story: {
    label: "Berray's",
    title: "قصتنا",
    intro:
      "Berray's Kitchen & Cafe مكان دافئ للقاء على طعام جيد وحديث لطيف في أي وقت من اليوم.",
    sectionTitle: "مكان لقضاء وقت جميل معًا.",
    p1: "يمكنكم بدء اليوم بالإفطار، أو الاستمتاع بقهوتكم، أو مشاركة العشاء مع أحبائكم. تشمل قائمتنا البرغر والبيتزا والمعكرونة والسلطات والأطباق الرئيسية.",
    p2: "مع القهوة الساخنة والباردة والمشروبات الطازجة والحلويات، يمكنكم أخذ استراحة ممتعة في أي وقت.",
    p3: "أعددنا Berray's Kitchen & Cafe ليكون مكانًا مريحًا لجلوسكم وصنع ذكريات جميلة مع العائلة والأصدقاء.",
    reservation: "الحجز",
    showcaseCaption: "الصالون والمدفأة",
    showcaseTallAlt: "صالون Berray's Kitchen & Cafe",
    showcaseWideAlt: "منطقة الجلوس عند المدفأة في Berray's",
  },
  reservations: {
    title: "الحجز في Berray's",
    subtitle: "املأ النموذج وسنحجز لكم طاولة. يمكنكم أيضًا الاتصال بنا.",
    formTitle: "نموذج الحجز",
    contact: "التواصل",
    directions: "احصل على الاتجاهات",
    mapTitle: "موقع Berray's Kitchen & Cafe",
  },
  form: {
    firstName: "الاسم",
    lastName: "اسم العائلة",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    date: "التاريخ",
    time: "الوقت",
    guests: "الضيوف",
    selectTime: "اختر الوقت",
    selectGuests: "عدد الضيوف",
    guest: "ضيف",
    guestsLabel: "ضيوف",
    specialRequests: "طلبات خاصة (اختياري)",
    specialRequestsPlaceholder: "تفضيلات غذائية، احتفال، تفضيل الجلوس...",
    submit: "إرسال طلب الحجز",
    submitting: "جارٍ الإرسال...",
    success: "استلمنا طلبكم. سنتواصل معكم في أقرب وقت.",
    error: "حدثت مشكلة. يرجى المحاولة مرة أخرى أو الاتصال بنا.",
  },
  footer: {
    tagline:
      "من الإفطار إلى العشاء، ومن القهوة إلى الحلويات… دائمًا هناك استراحة جميلة في Berray's.",
    copyright: "© 2026 Berray's Kitchen & Cafe.",
  },
  language: {
    label: "اختر اللغة",
  },
};

export const translations: Record<Locale, Translations> = { tr, en, ar };
