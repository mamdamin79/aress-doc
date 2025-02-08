export interface Fund {
    id: number;
    name: string;
    icon: string;
    hasVideo: boolean;
    type: "سهامی" | "درآمد ثابت" | "مختلط";
    isInWatchlist: boolean;
    columns: {
      netAssetValue: number;
      unitPrice: number;
      dailyReturn: number;
      weeklyReturn: number;
      monthlyReturn: number;
      yearlyReturn: number;
      capital: number;
      totalUnits: number;
      riskLevel: "کم" | "متوسط" | "زیاد";
      manager: string;
    };
  }
  
  const fundNames: string[] = [
    "یکم آبان", "امین آشنا", "زرین تدبیر", "آتیه نوین", "سهند پایدار",
    "آگاه رشد", "مهرگان", "الماس امید", "خاورمیانه", "تابان ثروت",
    "فراز پویا", "نگین پاسارگاد", "افق نوین", "سرمایه پرداز", "نوآوران سپهر",
    "توسعه کارآمد", "امین تدبیر", "پیشرو سهام", "صبا گستر", "نگین پارس",
    "آینده سازان", "توسعه فراز", "ثبات پایدار", "حامی سرمایه", "آسمان آبی",
    "راهبرد طلایی", "شفق گستر", "اندیشه برتر", "سرمایه ناب", "ره‌آورد نوین",
    "اقتصاد پویا", "دانا سرمایه", "سایبان تدبیر", "نگاه امید", "آتیه پایدار",
    "زرین توسعه", "آفاق سهام", "امید فردا", "آریا سرمایه", "نسیم گستر",
    "سپهر آتی", "نیکان رشد", "کیمیا تدبیر", "آفتاب نوین", "دیده‌بان بازار",
    "پارس ثروت", "ثریا سرمایه", "یاقوت سرمایه", "زیتون سهام", "اندیشه فردا",
    "امین رشد", "خورشید تابان", "سایه سرمایه", "سپهریاب", "فراز بورس",
    "راه نوین", "پیشتاز سرمایه", "کوشا رشد", "اندیشه پارس", "آریا نوین",
    "مهتاب گستر", "پارسا سهام", "پیشرو تدبیر", "کیمیا گستر", "ثبات فردا",
    "نوین آینده", "الماس تدبیر", "امید گستر", "سرمایه برتر", "نگاه نوین",
    "رهیاب بورس", "اقتصاد رشد", "خردمند سرمایه", "خورشید بورس", "پرشین رشد",
    "افرا تدبیر", "ثبات گستر", "پیشگام سهام", "راهکار رشد", "کیان توسعه",
    "آسمان فردا", "تابش سرمایه", "فرا سرمایه", "باران گستر", "پارسیان بورس",
    "سیمین سهام", "پاسارگاد رشد", "افق فردا", "رهبران بورس", "زرفام سرمایه",
    "ثروت‌اندیشان", "نیروان رشد", "توسعه نوین", "پیشتاز فردا", "اندیشه برتر"
  ];
  
  const riskLevels: ("کم" | "متوسط" | "زیاد")[] = ["کم", "متوسط", "زیاد"];
  const fundTypes: ("سهامی" | "درآمد ثابت" | "مختلط")[] = ["سهامی", "درآمد ثابت", "مختلط"];
  const managers: string[] = ["کارگزاری مفید", "کارگزاری آگاه", "کارگزاری بانک ملت", "کارگزاری فارابی", "کارگزاری اقتصاد نوین"];
  
  const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
  const getRandomNumber = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;
  const getRandomFloat = (min: number, max: number): number => parseFloat((Math.random() * (max - min) + min).toFixed(2));
  
  export const funds: Fund[] = fundNames.map((name, index) => ({
    id: index + 1,
    name,
    icon: `https://example.com/icons/fund${index + 1}.png`,
    hasVideo: Math.random() > 0.5,
    type: getRandomItem(fundTypes),
    isInWatchlist: Math.random() > 0.3, // حدود ۳۰٪ صندوق‌ها تو دیده‌بان هستن
    columns: {
      netAssetValue: getRandomNumber(5000000000, 30000000000), // ارزش خالص دارایی‌ها
      unitPrice: getRandomNumber(20000, 50000), // قیمت هر واحد
      dailyReturn: getRandomFloat(-2, 3), // بازده روزانه (%)
      weeklyReturn: getRandomFloat(-5, 7), // بازده هفتگی (%)
      monthlyReturn: getRandomFloat(-10, 15), // بازده ماهانه (%)
      yearlyReturn: getRandomFloat(-20, 50), // بازده سالانه (%)
      capital: getRandomNumber(1000000000, 10000000000), // سرمایه صندوق
      totalUnits: getRandomNumber(100000, 1000000), // تعداد کل واحدها
      riskLevel: getRandomItem(riskLevels), // سطح ریسک
      manager: getRandomItem(managers), // مدیر صندوق
    },
  }));
  