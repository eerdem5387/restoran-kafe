/**
 * One-time generator for menu-i18n-data.mjs — run with: node scripts/_gen-menu-i18n.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {
  enToAr,
  EN_TO_AR,
  ITEM_EN_TO_AR,
  CATEGORY_EN_TO_AR,
} from "./en-to-ar.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const menu = JSON.parse(
  readFileSync(join(__dirname, "../data/menu-export.json"), "utf8")
);

/** @type {Record<string, { en: string, ar: string }>} */
const TAG_TRANSLATIONS = {
  "Acı Tereyağı": { en: "Spicy Butter", ar: "زبدة حارة" },
  "Acı Yağ": { en: "Chili Oil", ar: "زيت حار" },
  "Acılı Aoli": { en: "Spicy Aioli", ar: "أيoli حار" },
  "Acılı aoli sos": { en: "Spicy Aioli Sauce", ar: "صلصة أيoli حارة" },
  "Arpa Risotto": { en: "Barley Risotto", ar: "ريزotto شعير" },
  "Avokado Yarım": { en: "Half Avocado", ar: "نصف أفوكado" },
  "BIG SOS": { en: "BIG Sauce", ar: "صلصة BIG" },
  "Baharatlı Patates": { en: "Seasoned Potatoes", ar: "بطاطس متبلة" },
  "Baharatlı Patates Kızartma": { en: "Seasoned French Fries", ar: "بطاطس مقلية متبلة" },
  "Baharatlı Sos": { en: "Spiced Sauce", ar: "صلصة متبلة" },
  "Baharatlı Özel Sos": { en: "Special Spiced Sauce", ar: "صلصة خاصة متبلة" },
  Bal: { en: "Honey", ar: "عسل" },
  "Başbaş Pilavı": { en: "Başbaş Rice", ar: "أرز باشباش" },
  "Başbaşı Bulgur Pilav": { en: "Başbaş Bulgur Pilaf", ar: "برغل باشباش" },
  "Berray's sos": { en: "Berray's Sauce", ar: "صلصة Berray's" },
  "Beyaz peynir": { en: "White Cheese", ar: "جبنة بيضاء" },
  "Bolonez Sos": { en: "Bolognese Sauce", ar: "صلصة بولونيز" },
  "Bonfile Eti": { en: "Tenderloin", ar: "فيليه" },
  Brokoli: { en: "Broccoli", ar: "بروكلي" },
  "Burger köftesi": { en: "Burger Patty", ar: "قرص برجر" },
  "Burger sos": { en: "Burger Sauce", ar: "صلصة برجر" },
  "Böğürtlen Sos": { en: "Blackberry Sauce", ar: "صلصة توت أسود" },
  "Cafe de Paris Sos": { en: "Café de Paris Sauce", ar: "صلصة Café de Paris" },
  Ceviz: { en: "Walnuts", ar: "جوز" },
  "Cheddar Dilim": { en: "Cheddar Slice", ar: "شريحة cheddar" },
  "Chili Biber": { en: "Chili Pepper", ar: "فلفل حار" },
  "Chili biber": { en: "Chili Pepper", ar: "فلفل حار" },
  Coleslaw: { en: "Coleslaw", ar: "سلطة كولسلaw" },
  "Dana Bonfile": { en: "Beef Tenderloin", ar: "فيليه بقر" },
  "Dana Bonfile ve Kemiksiz But": { en: "Beef Tenderloin & Boneless Thigh", ar: "فيليه بقر وفخذ بدون عظم" },
  "Dana Kaburga": { en: "Beef Short Rib", ar: "ضلع بقر" },
  "Dana Köfte": { en: "Beef Meatballs", ar: "كفتة بقر" },
  "Demi Glace Sos": { en: "Demi-Glace Sauce", ar: "صلصة demi-glace" },
  "Demi Glase Sos": { en: "Demi-Glace Sauce", ar: "صلصة demi-glace" },
  "Demi Glase sos": { en: "Demi-Glace Sauce", ar: "صلصة demi-glace" },
  "Demi glase sos": { en: "Demi-Glace Sauce", ar: "صلصة demi-glace" },
  Dereotu: { en: "Dill", ar: "شبت" },
  Domates: { en: "Tomato", ar: "طماطم" },
  "Domates Sos": { en: "Tomato Sauce", ar: "صلصة طماطم" },
  "Domates sos": { en: "Tomato Sauce", ar: "صلصة طماطم" },
  "Eski kaşar": { en: "Aged Kashar Cheese", ar: "جبنة كاشار معتقة" },
  "Etli Dana Kaburga": { en: "Meaty Beef Short Rib", ar: "ضلع بقر باللحم" },
  Ezine: { en: "Ezine Cheese", ar: "جبنة إزين" },
  Falafel: { en: "Falafel", ar: "فلافل" },
  Fesleğen: { en: "Basil", ar: "ريحان" },
  "Füme et": { en: "Smoked Meat", ar: "لحم مدخن" },
  "Göbek marul": { en: "Iceberg Lettuce", ar: "خس آيسberg" },
  Havuç: { en: "Carrot", ar: "جزر" },
  "Haşlanmış yumurta": { en: "Boiled Egg", ar: "بيض مسلوق" },
  "Ispanaklı Beşamel Sos": { en: "Spinach Béchamel Sauce", ar: "صلصة بشamel بالسبانخ" },
  Kabak: { en: "Zucchini", ar: "كوسا" },
  "Kabak Mücver": { en: "Zucchini Fritters", ar: "مُجَوَّر كوسا" },
  "Kajun Baharatı": { en: "Cajun Spice", ar: "بهارات cajun" },
  Kapari: { en: "Capers", ar: "كبر" },
  "Karamelize Soğan": { en: "Caramelized Onion", ar: "بصل مكرمل" },
  "Karamelize soğan": { en: "Caramelized Onion", ar: "بصل مكرمل" },
  "Karpuz Limon": { en: "Watermelon Lemon", ar: "بطيخ وليمون" },
  "Karpuzlu Sos": { en: "Watermelon Sauce", ar: "صلصة بطيخ" },
  "Kaşar peynir": { en: "Kashar Cheese", ar: "جبنة كاشار" },
  "Kemiksiz But": { en: "Boneless Thigh", ar: "فخذ بدون عظم" },
  Kinao: { en: "Quinoa", ar: "كينoa" },
  "Kornişon turşu": { en: "Gherkin Pickles", ar: "مخلل خيار" },
  "Kuru Domates": { en: "Sun-Dried Tomatoes", ar: "طماطم مجففة" },
  "Kuru incir": { en: "Dried Figs", ar: "تين مجفف" },
  "Kuru kayısı": { en: "Dried Apricots", ar: "مشمش مجفف" },
  "Kuru kekik": { en: "Dried Thyme", ar: "زعتر مجفف" },
  "Kuru üzüm": { en: "Raisins", ar: "زبيب" },
  "Kuzu Pirzola": { en: "Lamb Chops", ar: "ريش غنم" },
  "Köz kapya": { en: "Roasted Kapya Pepper", ar: "فلفل كابيا مشوي" },
  "Kültür mantar": { en: "Cultivated Mushrooms", ar: "فطر" },
  "Kırmızı Lahana Turşusu": { en: "Pickled Red Cabbage", ar: "مخلل ملفوف أحمر" },
  "Kırmızı Toz Biber": { en: "Red Pepper Flakes", ar: "فلفل أحمر مطحون" },
  "Kırmızı Yağ": { en: "Red Pepper Oil", ar: "زيت فلفل أحمر" },
  Kıvırcık: { en: "Curly Lettuce", ar: "خس مجعد" },
  Limon: { en: "Lemon", ar: "ليمون" },
  "Limon Aromalı": { en: "Lemon Flavored", ar: "بنكهة ليمون" },
  Lorolosso: { en: "Lorolosso Cheese", ar: "جبنة lorolosso" },
  Nane: { en: "Mint", ar: "نعناع" },
  "Nane Limon": { en: "Mint Lemon", ar: "نعناع وليمون" },
  Nutella: { en: "Nutella", ar: "Nutella" },
  Papardella: { en: "Pappardelle", ar: "باباردelle" },
  Parmesan: { en: "Parmesan", ar: "بارمesan" },
  "Parmesan Peynir": { en: "Parmesan Cheese", ar: "جبنة parmesán" },
  Patates: { en: "Potatoes", ar: "بطاطس" },
  "Patates Kızartma": { en: "French Fries", ar: "بطاطس مقلية" },
  "Patates Salatası": { en: "Potato Salad", ar: "سلطة بطاطس" },
  "Patates kızartma": { en: "French Fries", ar: "بطاطس مقلية" },
  "Patates kızartması": { en: "French Fries", ar: "بطاطس مقلية" },
  "Patlıcan Beğendi": { en: "Eggplant Purée", ar: "بورée باذنجان" },
  "Pembe domates": { en: "Pink Tomatoes", ar: "طماطم وردية" },
  "Pizza Domates Sos": { en: "Pizza Tomato Sauce", ar: "صلصة طماطم للبيتza" },
  Pişi: { en: "Pişi (Fried Dough)", ar: "بيشي" },
  "Pişmiş Kırmızı Biber": { en: "Roasted Red Pepper", ar: "فلفل أحمر مشوي" },
  "Pişmiş Soğan": { en: "Roasted Onion", ar: "بصل مشوي" },
  "Pişmiş Yeşil Biber": { en: "Roasted Green Pepper", ar: "فلفل أخضر مشوي" },
  "Portakal vinegrad": { en: "Orange Vinaigrette", ar: "صلصة برتقال" },
  "Rende Mozzarella": { en: "Shredded Mozzarella", ar: "mozzarella مبشورة" },
  "Rende Mozzerella": { en: "Shredded Mozzarella", ar: "mozzarella مبشورة" },
  Rigatoni: { en: "Rigatoni", ar: "ريgatoni" },
  Roka: { en: "Arugula", ar: "جرجir" },
  Sade: { en: "Plain", ar: "سادة" },
  Salatalık: { en: "Cucumber", ar: "خيار" },
  Sarımsak: { en: "Garlic", ar: "ثوم" },
  "Sebzeli Kakule Barbekü Sos": { en: "Vegetable Clove BBQ Sauce", ar: "صلصة بارbecue بالخضار" },
  Semizotu: { en: "Purslane", ar: "بقلة" },
  "Sigara böreği": { en: "Cigar Rolls", ar: "بوريك سيجار" },
  "Siyah Pirinç": { en: "Black Rice", ar: "أرز أسود" },
  "Siyah zeytin": { en: "Black Olives", ar: "زيتون أسود" },
  Spagetti: { en: "Spaghetti", ar: "سباغيتي" },
  "Suda Mozerella": { en: "Fresh Mozzarella", ar: "mozzarella طازجة" },
  Sumak: { en: "Sumac", ar: "سماق" },
  "Süzme Yoğurt": { en: "Strained Yogurt", ar: "لبن مصفى" },
  Tahin: { en: "Tahini", ar: "طحينة" },
  "Tatlı Ekşi Sos": { en: "Sweet & Sour Sauce", ar: "صلصة حلوة حامضة" },
  "Tavuk Göğsü": { en: "Chicken Breast", ar: "صدر دجاج" },
  "Tavuk bonfile": { en: "Chicken Tenderloin", ar: "فيليه دجاج" },
  "Taze Baharatlı Tereyağı": { en: "Fresh Herb Butter", ar: "زبدة بالأعشاب" },
  Tereyağı: { en: "Butter", ar: "زبدة" },
  "Tiftik Et": { en: "Shredded Meat", ar: "لحم مفتت" },
  "Tiftik et": { en: "Shredded Meat", ar: "لحم مفتت" },
  "Tırnak Pide": { en: "Tırnak Flatbread", ar: "خبز tırnak" },
  "Tırnaklı Ekmek": { en: "Tırnak Bread", ar: "خبز tırnak" },
  Un: { en: "Flour", ar: "دقيق" },
  "Yanık Tereyağlu Süzme Yoğurt": { en: "Strained Yogurt with Browned Butter", ar: "لبن مصفى بزبدة محمرة" },
  "Yeşil zeytin": { en: "Green Olives", ar: "زيتون أخضر" },
  Yeşillik: { en: "Fresh Greens", ar: "خضار ورقية" },
  acuka: { en: "Acuka (Spicy Spread)", ar: "أجوка" },
  "acılı aoli": { en: "Spicy Aioli", ar: "أيoli حار" },
  "acılı chili biber": { en: "Spicy Chili Pepper", ar: "فلفل حار" },
  "aşurelik buğday": { en: "Wheat Berries", ar: "قمح" },
  "baharatlı patates": { en: "Seasoned Potatoes", ar: "بطاطس متبلة" },
  "baharatlı patates kızartması": { en: "Seasoned French Fries", ar: "بطاطس مقلية متبلة" },
  "baharatlı un karışımı": { en: "Seasoned Flour Mix", ar: "خليط دقيق متبل" },
  "bazlama ekmeği": { en: "Bazlama Bread", ar: "خبز بازlama" },
  "başbaş pilavı": { en: "Başbaş Rice", ar: "أرز باشباش" },
  "beyaz peynir": { en: "White Cheese", ar: "جبنة بيضاء" },
  brokoli: { en: "Broccoli", ar: "بروكلي" },
  "burger köfte": { en: "Burger Patty", ar: "قرص برجر" },
  "burger köftesi": { en: "Burger Patty", ar: "قرص برجر" },
  "burger sos": { en: "Burger Sauce", ar: "صلصة برجر" },
  "burgu peynir": { en: "Braided Cheese", ar: "جبنة مجدولة" },
  ceviz: { en: "Walnuts", ar: "جوز" },
  "cheddar peynir": { en: "Cheddar Cheese", ar: "جبنة cheddar" },
  cleslow: { en: "Coleslaw", ar: "سلطة كولslaw" },
  "dana bonfile": { en: "Beef Tenderloin", ar: "فيليه بقر" },
  "dana kaburga Füme Et": { en: "Smoked Beef Short Rib", ar: "ضلع بقر مدخن" },
  "dana köfte": { en: "Beef Meatballs", ar: "كفتة بقر" },
  "dana sucuk": { en: "Beef Sucuk", ar: "سجق بقر" },
  "demi glace sos": { en: "Demi-Glace Sauce", ar: "صلصة demi-glace" },
  dereotu: { en: "Dill", ar: "شبت" },
  domates: { en: "Tomato", ar: "طماطم" },
  "ekmek cipsi": { en: "Pita Chips", ar: "رقائق خبز" },
  "eski kaşar": { en: "Aged Kashar Cheese", ar: "جبنة كاشار معتقة" },
  espresso: { en: "Espresso", ar: "إسpresso" },
  "ezine peynir": { en: "Ezine Cheese", ar: "جبنة إزين" },
  fusulli: { en: "Fusilli", ar: "fusilli" },
  göbek: { en: "Iceberg Lettuce", ar: "خس آيسberg" },
  humus: { en: "Hummus", ar: "حمص" },
  kakao: { en: "Cocoa", ar: "كاكao" },
  "karamelize soğan": { en: "Caramelized Onion", ar: "بصل مكرمل" },
  karnıbahar: { en: "Cauliflower", ar: "قرنبيط" },
  kaygana: { en: "Kaygana (Herb Omelette)", ar: "كaygana" },
  kaymak: { en: "Clotted Cream", ar: "قشطة" },
  "kayısı reçeli": { en: "Apricot Jam", ar: "مربى مشمش" },
  "kaşar peyniri": { en: "Kashar Cheese", ar: "جبنة كاشار" },
  "kemiksiz tavuk": { en: "Boneless Chicken", ar: "دجاج بدون عظم" },
  kiraz: { en: "Cherries", ar: "كرز" },
  "kroton ekmeği": { en: "Croutons", ar: "خبز محمص" },
  kruvasan: { en: "Croissant", ar: "كرواسan" },
  "kuru incir": { en: "Dried Figs", ar: "تين مجفف" },
  "kuru kayısı": { en: "Dried Apricots", ar: "مشمش مجفف" },
  "kuzu pirzola": { en: "Lamb Chops", ar: "ريش غنم" },
  "köz biber": { en: "Roasted Pepper", ar: "فلفل مشوي" },
  "köz domates": { en: "Roasted Tomato", ar: "طماطم مشوية" },
  "köz patlıcan": { en: "Roasted Eggplant", ar: "باذنجان مشوي" },
  "kırmızı toz biber": { en: "Red Pepper Flakes", ar: "فلفل أحمر مطحون" },
  kıvırcık: { en: "Curly Lettuce", ar: "خس مجعد" },
  limon: { en: "Lemon", ar: "ليمون" },
  lorolosso: { en: "Lorolosso Cheese", ar: "جبنة lorolosso" },
  marul: { en: "Lettuce", ar: "خس" },
  maydanoz: { en: "Parsley", ar: "بقدونس" },
  "meyve tabağı": { en: "Fruit Platter", ar: "طبق فواكه" },
  mozarella: { en: "Mozzarella", ar: "mozzarella" },
  "mozarella peyniri": { en: "Mozzarella Cheese", ar: "جبنة mozzarella" },
  muz: { en: "Banana", ar: "موز" },
  nane: { en: "Mint", ar: "نعناع" },
  nohut: { en: "Chickpeas", ar: "حمص" },
  nutella: { en: "Nutella", ar: "Nutella" },
  pankek: { en: "Pancakes", ar: "بانكيك" },
  parmesan: { en: "Parmesan", ar: "بارmesan" },
  patates: { en: "Potatoes", ar: "بطاطس" },
  "patates kızartma": { en: "French Fries", ar: "بطاطس مقلية" },
  "patlıcan beğendi": { en: "Eggplant Purée", ar: "بورée باذنجان" },
  "pembe domates": { en: "Pink Tomatoes", ar: "طماطم وردية" },
  "pembe domatesli minci": { en: "Pink Tomato Mince", ar: "لحم مفروم بالطماطم الوردية" },
  "peynir tabağı": { en: "Cheese Platter", ar: "طبق جبن" },
  pişi: { en: "Pişi (Fried Dough)", ar: "بيشي" },
  portakal: { en: "Orange", ar: "برتقال" },
  "portakal sos": { en: "Orange Sauce", ar: "صلصة برتقال" },
  roka: { en: "Arugula", ar: "جرjir" },
  "sahanda yumurta": { en: "Pan-Fried Eggs", ar: "بيض مقلي" },
  salatalık: { en: "Cucumber", ar: "خيار" },
  "salatalık domates": { en: "Cucumber & Tomato", ar: "خيار وطماطم" },
  "sezar sos": { en: "Caesar Dressing", ar: "صلصة سيزar" },
  "sigara böreği": { en: "Cigar Rolls", ar: "بوريك سيجار" },
  "sivri biber": { en: "Hot Pepper", ar: "فلفل حار" },
  "siyah zeytin": { en: "Black Olives", ar: "زيتون أسود" },
  "sucuk hellim": { en: "Sucuk & Halloumi", ar: "سجق وحلوم" },
  "söğüş tabağı": { en: "Fresh Vegetable Platter", ar: "طبق خضار طازجة" },
  süt: { en: "Milk", ar: "حليب" },
  "süzme yoğurt": { en: "Strained Yogurt", ar: "لبن مصفى" },
  "tahin pekmez": { en: "Tahini & Grape Molasses", ar: "طحينة ودبس" },
  tavuk: { en: "Chicken", ar: "دجاج" },
  "tavuk göğsü": { en: "Chicken Breast", ar: "صدر دجاج" },
  "taze kaşar": { en: "Fresh Kashar Cheese", ar: "جبنة كاشار طازجة" },
  tereyağ: { en: "Butter", ar: "زبدة" },
  "tortilla lavaş": { en: "Tortilla Lavash", ar: "خبز tortilla" },
  turşu: { en: "Pickles", ar: "مخلل" },
  tuz: { en: "Salt", ar: "ملح" },
  "türüf yağı": { en: "Truffle Oil", ar: "زيت trufle" },
  "yağ limon vinegrad": { en: "Oil & Lemon Vinaigrette", ar: "صلصة زيت وليمون" },
  "yeşil elma": { en: "Green Apple", ar: "تفاح أخضر" },
  "yeşil mercimek": { en: "Green Lentils", ar: "عدس أخضر" },
  "yeşil yağ": { en: "Green Herb Oil", ar: "زيت أعشاب" },
  "yeşil zeytin": { en: "Green Olives", ar: "زيتون أخضر" },
  yeşillik: { en: "Fresh Greens", ar: "خضار ورقية" },
  "zeytin ezmesi": { en: "Olive Paste", ar: "معجون زيتون" },
  "zeytin yağı": { en: "Olive Oil", ar: "زيت زيتون" },
  "Çeri Domates": { en: "Cherry Tomatoes", ar: "طماطم كرزية" },
  "Çeri domates": { en: "Cherry Tomatoes", ar: "طماطم كرزية" },
  Çilek: { en: "Strawberry", ar: "فراولة" },
  "Çilekli Sos": { en: "Strawberry Sauce", ar: "صلصة فراولة" },
  "Çilekli vinegrad": { en: "Strawberry Vinaigrette", ar: "صلصة فراولة" },
  "çeri domates": { en: "Cherry Tomatoes", ar: "طماطم كرزية" },
  "çikolata parçacıklı": { en: "Chocolate Chip", ar: "رقائق شوكolata" },
  çilek: { en: "Strawberry", ar: "فراولة" },
  "çilek reçeli": { en: "Strawberry Jam", ar: "مربى فراولة" },
  "çilek vinegret": { en: "Strawberry Vinaigrette", ar: "صلصة فراولة" },
  "çıtır nohut": { en: "Crispy Chickpeas", ar: "حمص مقرمش" },
  "ıspanaklı beşamel": { en: "Spinach Béchamel", ar: "بشamel بالسبانخ" },
  "Şurup Aromaları": { en: "Syrup Flavors", ar: "نكهات شراب" },
  "Şurup aromalı": { en: "Syrup Flavored", ar: "بنكهة شراب" },
};

/** @type {Record<string, { nameEn: string, nameAr: string }>} */
const ITEM_NAMES = {
  cmsnkvtxg000704ibaopeon5k: { nameEn: "French Fries", nameAr: "بطاطس مقلية" },
  cmsnkx0q4000804ibdxkjg3cs: { nameEn: "Zucchini Fritters", nameAr: "مُجَوَّر كوسا" },
  cmsnlggyq000904ib8roycli0: { nameEn: "Cauliflower Broccoli Tabouleh", nameAr: "تبولة قرنبيط وبروكلي" },
  cmsnlhsnj000a04ib8m1shzvb: { nameEn: "Crispy Chicken", nameAr: "دجاج مقرمش" },
  cmsnliok1000b04ib8a6jvu4i: { nameEn: "Hummus", nameAr: "حمص" },
  cmsnljs4g000c04iblqlyz8t8: { nameEn: "Truffle French Fries", nameAr: "بطاطس مقلية بالtrufle" },
  cmsnlkv69000d04ibadlo00nq: { nameEn: "Meat Gyoza", nameAr: "جyoza باللحم" },
  cmsnmax0b000o04l2t9frd9fz: { nameEn: "Cheese Platter", nameAr: "طبق جبن" },
  cmso9foj1000m04l7cniyy92u: { nameEn: "Cup of Tea", nameAr: "فنجان شاي" },
  cmsoa9sxw001204l7v4ta92xl: { nameEn: "Milkshake", nameAr: "مilkshake" },
  cmsnlm3dk000e04ib1r1htf7s: { nameEn: "Hamburger", nameAr: "همبرger" },
  cmsnjexjx000004i2tg3h8wnu: { nameEn: "Lamb Chops", nameAr: "ريش غنم" },
  cmsnjgq6q000104i2c308p5pw: { nameEn: "Combo Fajita", nameAr: "فajita مشكلة" },
  cmsnloldq000004l2wbns4jvo: { nameEn: "Shredded Meat Burger", nameAr: "برجر لحم مفتت" },
  cmsnlqhvd000104l2nfm2p9sv: { nameEn: "Mini Burger", nameAr: "برger صغير" },
  cmsnji38b000204i2p09t6735: { nameEn: "Yogurt Kebab", nameAr: "كbab باللبن" },
  cmsnjk4sd000304i2aunxerk1: { nameEn: "Chicken Fajita", nameAr: "فajita دجاج" },
  cmsnlsgtq000204l2ivgghnyk: { nameEn: "Chicken Burger", nameAr: "برger دجاج" },
  cmsnluj6v000304l2ov2lodpw: { nameEn: "Cheese Burger", nameAr: "تشiz برger" },
  cmsnjltz3000004jp5hc939rh: { nameEn: "Beef Fajita", nameAr: "فajita لحم" },
  cmsnlwkt9000404l240raq0mk: { nameEn: "Berray's Burger", nameAr: "برger Berray's" },
  cmsnjywe0000004l51c435xp3: { nameEn: "Chicken Schnitzel", nameAr: "شنitzel دجاج" },
  cmsnk1fy9000004juvszdjncj: { nameEn: "Chicken Piccata", nameAr: "piccata دجاج" },
  cmsnk2w4v000104jua3nkyuze: { nameEn: "Başbaş Tenderloin", nameAr: "فيليه باشباش" },
  cmsnkfd35000004ibib5bci8i: { nameEn: "Grilled Chicken", nameAr: "دجاج مشوي" },
  cmsnkgrst000104ibvsvc8uvk: { nameEn: "Akçaabat Meatballs", nameAr: "كofte أكçaabat" },
  cmsnkiw8g000204ibq5c9vx0q: { nameEn: "BBQ Chicken Clove", nameAr: "دجاج بالbarbecue" },
  cmsnklhq8000304ibrqymvzrq: { nameEn: "Bistecca", nameAr: "bistecca" },
  cmsnknje1000404ibsqccumzz: { nameEn: "Meaty Short Rib", nameAr: "ضلع بقر باللحم" },
  cmsnks9ms000504ib0umgw4dg: { nameEn: "Vegan Bowl", nameAr: "طبق نباتي" },
  cmsnkuuxi000604ibaefk5me7: { nameEn: "Berray's Special", nameAr: "خاص Berray's" },
  cmsnlxpkq000504l2gjhkw3kd: { nameEn: "Lentil Soup", nameAr: "شوربة عدس" },
  cmsnlyv32000604l27v9n2cve: { nameEn: "Cold Soup", nameAr: "شوربة باردة" },
  cmsnlzbyy000704l2vy449nsw: { nameEn: "Başbaş Rice", nameAr: "أرز باشباش" },
  cmsnlzjsw000804l2ti1z6oeb: { nameEn: "Eggplant Purée", nameAr: "بورée باذنجان" },
  cmsnlzqaf000904l2s4nxfjbp: { nameEn: "Mushrooms", nameAr: "فطر" },
  cmsnlzyqw000a04l2smmhq38a: { nameEn: "Onion", nameAr: "بصل" },
  cmsnm069j000b04l203fpva3n: { nameEn: "Potatoes", nameAr: "بطاطس" },
  cmsnm0hrw000c04l2i94kh5bf: { nameEn: "Pepper", nameAr: "فلفل" },
  cmsnm1233000e04l2tdzndwpv: { nameEn: "Sucuk", nameAr: "سجق" },
  cmsnm0mhf000d04l2ia57lp10: { nameEn: "Cheese", nameAr: "جبنة" },
  cmsnm1glm000f04l2bjc19lpz: { nameEn: "Plain Omelette", nameAr: "أومlet سادة" },
  cmsnm3k9b000g04l20ewqgff9: { nameEn: "Turkish Breakfast Spread (2 People)", nameAr: "فطور تركي (شخصان)" },
  cmsnm5v2o000h04l26suddz92: { nameEn: "Breakfast Plate", nameAr: "طبق فطور" },
  cmsnm6sdb000i04l2nchwfg3t: { nameEn: "Eggs with Sucuk", nameAr: "بيض بالسجق" },
  cmsnm78v3000j04l29iu3pgy8: { nameEn: "Menemen", nameAr: "menemen" },
  cmsnm7sjj000k04l2turuw1h1: { nameEn: "Eggs with Sautéed Meat", nameAr: "بيض باللحم المقلي" },
  cmsnm8msd000l04l25fgo6l2r: { nameEn: "Plain Sautéed Meat", nameAr: "لحم مقلي" },
  cmsnm92a9000m04l21c1zk6ti: { nameEn: "Pan-Fried Eggs", nameAr: "بيض مقلي" },
  cmsnm9l9n000n04l26jpzjfbl: { nameEn: "Muhlama", nameAr: "muhlama" },
  cmsnmbzz9000p04l23vqdra6b: { nameEn: "Fresh Vegetable Platter", nameAr: "طبق خضار طازجة" },
  cmsnmchap000q04l2nc218p3s: { nameEn: "Kaygana", nameAr: "kaygana" },
  cmsnmczre000r04l2annpgoay: { nameEn: "Yogurt Granola", nameAr: "granola باللبن" },
  cmsnmezui000s04l2tl5p80qf: { nameEn: "Chocolate Fruit Croissant", nameAr: "كرواسan بالشوكolata والفواكه" },
  cmsnmgvqi000t04l25tanvmup: { nameEn: "Blue Orange Bubble Tea", nameAr: "bubble tea برتقال أزرق" },
  cmsnmzfu8000004jp7ajna69d: { nameEn: "Hibiscus Lime", nameAr: "hibiscus ولime" },
  cmsnn0ltf000104jpalttfeco: { nameEn: "Mojito", nameAr: "mojito" },
  cmsnn1tkz000204jpp8lb6hjw: { nameEn: "Strawberry Mojito", nameAr: "mojito فراولة" },
  cmsnn2w74000304jpq86vsvvl: { nameEn: "Cool Lime", nameAr: "cool lime" },
  cmsnn3srl000404jp1jtsyhuh: { nameEn: "Purple Sky", nameAr: "purple sky" },
  cmsnn4nkn000504jp8wztwtws: { nameEn: "Watermelon Fizz", nameAr: "watermelon fizz" },
  cmsnn5fbv000604jpov4gc0j1: { nameEn: "Butterfly Bubble Tea", nameAr: "bubble tea فراشة" },
  cmsnn6588000704jpvupsiild: { nameEn: "Dragonia Bubble Tea", nameAr: "bubble tea dragonia" },
  cmsnn774l000804jpp6ylfrf8: { nameEn: "Berray's Special", nameAr: "خاص Berray's" },
  cmt4a5627000004i8k3nrwgfv: { nameEn: "Lamb's Ear", nameAr: "أذن الغنم" },
  cmsnn8vxo000904jpk660v2rg: { nameEn: "Spaghetti Pomodoro", nameAr: "سباغيتي pomodoro" },
  cmsnn9zhr000a04jprg7zi74b: { nameEn: "Meat Pappardelle", nameAr: "pappardelle باللحم" },
  cmsnnbb2w000b04jpwk3htjwu: { nameEn: "Vegetable Fusilli", nameAr: "fusilli بالخضار" },
  cmsnnchja000c04jpz76m9usj: { nameEn: "Rigatoni Bolognese", nameAr: "rigatoni bolonez" },
  cmsnnd5nw000d04jpxopusvhf: { nameEn: "Cola", nameAr: "كola" },
  cmsnndbtf000e04jpxwinx6ym: { nameEn: "Cola Zero", nameAr: "كola zero" },
  cmsnndnd9000f04jp0vhunw4n: { nameEn: "Fanta", nameAr: "fanta" },
  cmsnndr6h000g04jpes8axjbl: { nameEn: "Sprite", nameAr: "sprite" },
  cmsnne03g000h04jpewtev76v: { nameEn: "Iced Tea", nameAr: "شاي مثلج" },
  cmsnnfcy6000i04jplrp9otsj: { nameEn: "Cappy Fruit Juice", nameAr: "عصير cappy" },
  cmsnnfpew000j04jpzukdgiyf: { nameEn: "Plain Soda", nameAr: "صودa سادة" },
  cmsnng8an000k04jp2lt6ux99: { nameEn: "Flavored Soda", nameAr: "صودa بنكهة" },
  cmsnnhbte000l04jp6voptmyi: { nameEn: "Kisarna Mineral Water", nameAr: "مياه kisarna معدنية" },
  cmsnnhtyt000m04jp4o52fe2i: { nameEn: "Schweppes", nameAr: "schweppes" },
  cmsnnial1000n04jp2ydv6gpa: { nameEn: "Glass Bottle Water (330ml)", nameAr: "ماء زجاجة (330ml)" },
  cmsnniu6b000o04jpn0qkfvi7: { nameEn: "Glass Bottle Water (750ml)", nameAr: "ماء زجاجة (750ml)" },
  cmsnnk84i000p04jp1wdzvnu9: { nameEn: "Margherita Pizza", nameAr: "بيتza margherita" },
  cmsnnl4q8000q04jpqmyx3q82: { nameEn: "Smoked Meat Pizza", nameAr: "بيتza لحم مدخن" },
  cmsnnmdgx000r04jp0kd2c337: { nameEn: "Pomodoro Pizza", nameAr: "بيتza pomodoro" },
  cmsnnn8nb000s04jp9dm4qt4v: { nameEn: "Tenderloin Pizza", nameAr: "بيتza فيليه" },
  cmso8y3ae000004l7s9p1a05j: { nameEn: "Strawberry Purslane Salad", nameAr: "سلطة بقلة وفراولة" },
  cmso8zlxj000104l7y43b8gqe: { nameEn: "Quinoa Chopped Salad", nameAr: "سلطة كينoa مقطعة" },
  cmso912bg000204l7ws2yfpk5: { nameEn: "Chicken Caesar Salad", nameAr: "سلطة سيزar بالدجاج" },
  cmso92y1m000304l739mmjxv6: { nameEn: "Tomato Arugula Salad", nameAr: "سلطة طماطم وجرjir" },
  cmso93fo0000404l75mlxnrkc: { nameEn: "Cortado", nameAr: "cortado" },
  cmso93qk4000504l7owvbox09: { nameEn: "Espresso", nameAr: "إسpresso" },
  cmso940gd000604l7z6l5f2k4: { nameEn: "Double Espresso", nameAr: "إسpresso مزدوج" },
  cmso94cjz000704l7jty4f9a5: { nameEn: "Americano", nameAr: "americano" },
  cmso94mzj000804l7nvimnhy2: { nameEn: "White Mocha", nameAr: "white mocha" },
  cmso94z37000904l7q5h5ir0f: { nameEn: "Toffenut Latte", nameAr: "toffenut latte" },
  cmso95cnk000a04l7thvjtm2z: { nameEn: "Cookies Latte", nameAr: "cookies latte" },
  cmso9602q000b04l74suhzhug: { nameEn: "Honey Milk", nameAr: "حليب بالعسل" },
  cmso96lz7000c04l77tftznr4: { nameEn: "Hot Chocolate", nameAr: "شوكolata ساخنة" },
  cmso97p5s000d04l79ol1u86r: { nameEn: "Caramel Latte", nameAr: "caramel latte" },
  cmso98ma3000e04l79zmvc2qi: { nameEn: "Mocha", nameAr: "mocha" },
  cmso998s5000f04l7rotyyc7j: { nameEn: "Cappuccino", nameAr: "cappuccino" },
  cmso99ryt000g04l7zbksfx47: { nameEn: "Latte", nameAr: "latte" },
  cmso9a9c7000h04l7mogx40o5: { nameEn: "Flat White", nameAr: "flat white" },
  cmso9avwz000i04l7j9frmgyk: { nameEn: "Filter Coffee", nameAr: "قهوة مfiltered" },
  cmso9d0gn000j04l7mzihitpj: { nameEn: "Turkish Coffee with Milk", nameAr: "قهوة تركية بالحليب" },
  cmso9edeu000k04l7zior9lcm: { nameEn: "Turkish Coffee", nameAr: "قهوة ترkية" },
  cmso9f51g000l04l7padb6org: { nameEn: "Tea", nameAr: "شاي" },
  cmso9g9a5000n04l7c785qxam: { nameEn: "Coffee with Milk", nameAr: "قهوة بالحليب" },
  cmsoa2ltj000o04l740z4d23k: { nameEn: "Iced Filter Coffee", nameAr: "قهوة مfiltered مثلجة" },
  cmsoa2ytg000p04l7t7toxvuq: { nameEn: "Iced Hot Chocolate", nameAr: "شوكolata باردة" },
  cmsoa387j000q04l78g2f04sw: { nameEn: "Frappe", nameAr: "frappé" },
  cmsoa3ovs000r04l7hb0qk4fy: { nameEn: "Blackberry Lemonade", nameAr: "ليمonada توت" },
  cmsoa3z1x000s04l7ct9cir6l: { nameEn: "Iced Mocha", nameAr: "iced mocha" },
  cmsoa4a6y000t04l7d3jvautt: { nameEn: "Iced White Mocha", nameAr: "iced white mocha" },
  cmsoa4m84000u04l77gx8xmwx: { nameEn: "Iced Cookies Latte", nameAr: "iced cookies latte" },
  cmsoa4yc4000v04l78fj3gsf5: { nameEn: "Iced Toffenut Latte", nameAr: "iced toffenut latte" },
  cmsoa5996000w04l7lvbvv9wa: { nameEn: "Affogato", nameAr: "affogato" },
  cmsoa5wx1000x04l7rnjs93f5: { nameEn: "Pomegranate Juice", nameAr: "عصير رمان" },
  cmsoa6ikl000y04l7lplwjuub: { nameEn: "Atom Juice", nameAr: "عصير atom" },
  cmsoa72q0000z04l7hlrilebs: { nameEn: "Orange Juice", nameAr: "عصير برتقال" },
  cmsoa7vmo001004l7jbwxbsvo: { nameEn: "Lemonade", nameAr: "ليمonada" },
  cmsoa94fd001104l7ug7zw4cd: { nameEn: "Mixed Frozen", nameAr: "frozen مشكلة" },
  cmsoaaahw001304l7z2j3vabz: { nameEn: "Frozen", nameAr: "frozen" },
  cmsoab3wj001404l70t2ykiuf: { nameEn: "Iced Americano", nameAr: "iced americano" },
  cmsoabrra001504l70raxa8se: { nameEn: "Iced Latte", nameAr: "iced latte" },
  cmsoac9aq001604l7x0z5j9nm: { nameEn: "Mint Lemonade", nameAr: "ليمonada بالنعناع" },
  cmsoacvn6001704l7jgh3l2eh: { nameEn: "Mango Lemonade", nameAr: "ليمonada مانgo" },
  cmsoadkr5001804l7dyb6wfpn: { nameEn: "Strawberry Lemonade", nameAr: "ليمonada فراولة" },
  cmsoaojy0001904l7sqs88ft3: { nameEn: "Ice Cream", nameAr: "آيس cream" },
  cmsoaov74001a04l7irg4n2ll: { nameEn: "Levain Cookie", nameAr: "levain cookie" },
  cmsoaptki001b04l7gdwj0jh5: { nameEn: "White Chocolate Tahini Soufflé", nameAr: "soufflé شوكolata بيضاء وطحينة" },
  cmsoaqdzd001c04l7wphs479p: { nameEn: "Sour Cherry Brownie", nameAr: "brownie كرز حامض" },
  cmsoaqxy6001d04l79903k4ke: { nameEn: "Strawberry Magnolia", nameAr: "magnolia فراولة" },
  cmsoarge3001e04l7gnmlguv5: { nameEn: "Tiramisu", nameAr: "tiramisu" },
  cmsoas89d001f04l7qfag9g2l: { nameEn: "Strawberry Cheesecake", nameAr: "cheesecake فراولة" },
  cmsoasued001g04l75v6bu9ir: { nameEn: "Merguez Roll", nameAr: "rulat merguez" },
  cmsoatote001h04l7xpdvmhfm: { nameEn: "Chocolate Straji", nameAr: "chocolate straji" },
  cmsoau5xm001i04l7041lizho: { nameEn: "Fruit Platter", nameAr: "طبق فواكه" },
  cmsoautzr001j04l7b9zoe1wr: { nameEn: "Forest Berry Craquelin", nameAr: "craquelin توت" },
  cmsoawedf001k04l7jnbtlusk: { nameEn: "Bazlama Toast", nameAr: "tost bazlama" },
  cmsoaxkzg001l04l7ub122tqg: { nameEn: "Mixed Bazlama Toast", nameAr: "tost bazlama مشكل" },
};

/** @type {Record<string, { nameEn: string, nameAr: string, descriptionEn: string, descriptionAr: string }>} */
const CATEGORY_TRANSLATIONS = {
  cmsm3pawf000004jsy8cbxnwa: {
    nameEn: "Starters",
    nameAr: "المقبلات",
    descriptionEn: "Shareable mezes, crispy bites, and flavors to open the table.",
    descriptionAr: "مقبلات للمشاركة، لقيمات مقرمشة، ونكهات تفتح الشهية.",
  },
  cat_main_courses: {
    nameEn: "Main Courses",
    nameAr: "الأطباق الرئيسية",
    descriptionEn: "Hearty main plates from grills, fajitas, and classics.",
    descriptionAr: "أطباق رئيسية مشبعة من المشاوي والفajita والكلاسيكيات.",
  },
  cmsm3pjhb000104jsgrpg9vtj: {
    nameEn: "Burgers",
    nameAr: "البرgers",
    descriptionEn: "Homemade burgers — from classics to the signature Berray's.",
    descriptionAr: "برgers منزلية — من الكلاسيكية إلى توقيع Berray's.",
  },
  cmsm3pl0k000204jsfzn47q1e: {
    nameEn: "Soups",
    nameAr: "الشوربات",
    descriptionEn: "Warm and refreshing soup options.",
    descriptionAr: "خيارات شوربة دافئة ومنعشة.",
  },
  cmsm3pqw9000304jsktfj7tv2: {
    nameEn: "Extras",
    nameAr: "الإضافات",
    descriptionEn: "Side dishes to add to your plates.",
    descriptionAr: "أطباق جانبية يمكنك إضافتها إلى طلبك.",
  },
  cmsm3pso4000404js1ac6vunh: {
    nameEn: "Breakfast",
    nameAr: "الفطور",
    descriptionEn: "From omelettes to Turkish breakfast spreads — a gentle start to the day.",
    descriptionAr: "من الأومlet إلى فطور تركي — بداية لطيفة لليوم.",
  },
  cmsm3q3p8000504js17ie3k6y: {
    nameEn: "Cocktails",
    nameAr: "الك sticktails",
    descriptionEn: "Bubble tea, mojitos, and signature blends.",
    descriptionAr: "bubble tea وmojito وخلطات توقيعية.",
  },
  cmsm3q53r000604jsoyzt6flq: {
    nameEn: "Pasta",
    nameAr: "المعكرونة",
    descriptionEn: "Fresh pasta plates from pomodoro to bolognese.",
    descriptionAr: "أطباق معكرونة طازجة من pomodoro إلى bolonez.",
  },
  cmsm3q73t000704js5vynvl2k: {
    nameEn: "Soft Drinks",
    nameAr: "المشروبات الغازية",
    descriptionEn: "Carbonated drinks, sodas, and cold beverages.",
    descriptionAr: "مشروبات غازية وصودa ومشروبات باردة.",
  },
  cmsm3q8ez000804js6c3dykgy: {
    nameEn: "Pizza",
    nameAr: "البيتza",
    descriptionEn: "Thin-crust pizzas fresh from the oven.",
    descriptionAr: "بيتza رقيقة طازجة من الفrn.",
  },
  cmsm3q9yy000904js0xyl1qu4: {
    nameEn: "Salads",
    nameAr: "السلطات",
    descriptionEn: "Fresh greens and hearty salad bowls.",
    descriptionAr: "خضار طازجة وأطباق سلطة مشبعة.",
  },
  cmsm3qchr000a04jsqt2bnu42: {
    nameEn: "Hot Drinks",
    nameAr: "المشروبات الساخنة",
    descriptionEn: "Espresso-based coffees and warm treats.",
    descriptionAr: "قهوة إسpresso ومشروبات ساخنة.",
  },
  cmsm3qhgp000b04jsaghqpcnl: {
    nameEn: "Cold Drinks",
    nameAr: "المشروبات الباردة",
    descriptionEn: "Iced coffees, lemonades, and fresh juices.",
    descriptionAr: "قهوة مثلجة وليمonada وعصائر طازجة.",
  },
  cmsm3qjp2000c04jsj7ipc47c: {
    nameEn: "Desserts",
    nameAr: "الحلويات",
    descriptionEn: "From soufflé to cheesecake — a sweet finish.",
    descriptionAr: "من soufflé إلى cheesecake — خاتمة حلوة.",
  },
  cmsm3qnf4000d04jsbvqjftd3: {
    nameEn: "Toasts",
    nameAr: "الtost",
    descriptionEn: "Simple and mixed toasts on bazlama bread.",
    descriptionAr: "tost سادة ومشكلة على خبز bazlama.",
  },
};

// Validate tag coverage
const allTags = [...new Set(menu.items.flatMap((i) => i.tags))];
const missingTags = allTags.filter((t) => !TAG_TRANSLATIONS[t]);
if (missingTags.length) {
  console.error("Missing tag translations:", missingTags);
  process.exit(1);
}

// Validate item coverage
const missingItems = menu.items.filter((i) => !ITEM_NAMES[i.id]);
if (missingItems.length) {
  console.error(
    "Missing item translations:",
    missingItems.map((i) => ({ id: i.id, name: i.name }))
  );
  process.exit(1);
}

// Apply Arabic from English maps
for (const tag of Object.values(TAG_TRANSLATIONS)) {
  tag.ar = enToAr(tag.en, EN_TO_AR);
}
for (const names of Object.values(ITEM_NAMES)) {
  names.nameAr = enToAr(names.nameEn, ITEM_EN_TO_AR);
}
for (const cat of Object.values(CATEGORY_TRANSLATIONS)) {
  const ar = CATEGORY_EN_TO_AR[cat.nameEn];
  cat.nameAr = ar.nameAr;
  cat.descriptionAr = ar.descriptionAr;
}

// Build ITEM_TRANSLATIONS
const ITEM_TRANSLATIONS = {};
for (const item of menu.items) {
  const names = ITEM_NAMES[item.id];
  ITEM_TRANSLATIONS[item.id] = {
    nameEn: names.nameEn,
    nameAr: names.nameAr,
    tagsEn: item.tags.map((t) => TAG_TRANSLATIONS[t].en),
    tagsAr: item.tags.map((t) => TAG_TRANSLATIONS[t].ar),
  };
}

function serialize(obj, indent = 0) {
  const pad = "  ".repeat(indent);
  const padInner = "  ".repeat(indent + 1);
  if (Array.isArray(obj)) {
    if (obj.length === 0) return "[]";
    const items = obj.map((v) => `${padInner}${JSON.stringify(v)}`).join(",\n");
    return `[\n${items},\n${pad}]`;
  }
  if (obj && typeof obj === "object") {
    const entries = Object.entries(obj).map(([k, v]) => {
      const key = /^[a-zA-Z_$][\w$]*$/.test(k) ? k : JSON.stringify(k);
      if (typeof v === "string") return `${padInner}${key}: ${JSON.stringify(v)}`;
      if (Array.isArray(v)) return `${padInner}${key}: ${serialize(v, indent + 1)}`;
      if (v && typeof v === "object") {
        const inner = Object.entries(v)
          .map(([ik, iv]) => `${padInner}  ${ik}: ${JSON.stringify(iv)}`)
          .join(",\n");
        return `${padInner}${key}: {\n${inner},\n${padInner}}`;
      }
      return `${padInner}${key}: ${JSON.stringify(v)}`;
    });
    return `{\n${entries.join(",\n")},\n${pad}}`;
  }
  return JSON.stringify(obj);
}

const output = `// Auto-generated menu i18n data — ${menu.categories.length} categories, ${menu.items.length} items, ${allTags.length} unique tags
// Regenerate with: node scripts/_gen-menu-i18n.mjs

export const TAG_TRANSLATIONS = ${serialize(TAG_TRANSLATIONS)};

export const CATEGORY_TRANSLATIONS = ${serialize(CATEGORY_TRANSLATIONS)};

export const ITEM_TRANSLATIONS = ${serialize(ITEM_TRANSLATIONS)};
`;

writeFileSync(join(__dirname, "menu-i18n-data.mjs"), output);
console.log(
  `Wrote menu-i18n-data.mjs — ${menu.categories.length} categories, ${menu.items.length} items, ${Object.keys(TAG_TRANSLATIONS).length} tags`
);
