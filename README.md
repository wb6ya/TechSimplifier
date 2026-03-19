<div align="center">
  <h1 align="center">Tech Simplifier 🪄</h1>
  <h3>المترجم التقني اللحظي للمطورين</h3>
</div>

## 🌟 نبذة عن المشروع
**Tech Simplifier** هو مساحة العمل الذكية للمطورين، مدعومة بالذكاء الاصطناعي (Google Gemini) لمساعدتك على فهم النصوص التقنية الإنجليزية المعقدة وتوثيقات الكود العميقة (Documentation).
تقوم الأداة بتفكيك النصوص وشرحها بأسلوب احترافي سلس ومبسط (باللهجة السعودية البيضاء)، مع استخراج لأهم المصطلحات الفنية وتوفير مصادر موثوقة (توثيق رسمي & مقاطع يوتيوب) للتعمق الشامل. كل هذا يظهر داخل واجهة مستخدم (UI) احترافية وعصرية مستوحاة من منصات الـ Premium SaaS مثل Linear و Stripe.

## ✨ المميزات (Features)
- 🎯 **شرح تقني عميق:** تفكيك للمفاهيم المعقدة مع قياسات منطقية من الواقع العملي، مع دعم قراءة الـ Markdown والجداول.
- 🧠 **قاموس المصطلحات (Terms Chips):** استخراج حصري ودقيق للمصطلحات التقنية المذكورة مع تعريف مبسط لها في بطاقات تفاعلية.
- 🔗 **روابط موثوقة (Curated Resources):** يولد الكود تلقائيًا روابط دقيقة لـ (Documentation) وروابط بحث ذكية لـ Youtube.
- 🎨 **SaaS Bento Grid UI:** واجهة احترافية نظام (Split-screen). مساحة عمل نظيفة بـ Glassmorphism ونظام Bento Grid مبهر لعرض النتائج.
- 💫 **رسوم متحركة سحرية (Motion):** تأثيرات بصرية فائقة النعومة من شاشة التحميل (Magic Orb) حتى فتح النتائج بفضل `Framer Motion`.

## 🛠️ التقنيات المستخدمة (Tech Stack)
- **الإطار الفرونت اند:** [Next.js](https://nextjs.org/) (App Router & React)
- **تصميم الواجهات:** [Tailwind CSS v4](https://tailwindcss.com/)
- **الأنميشن والحركة:** [Framer Motion](https://www.framer.com/motion/)
- **الأيقونات والجماليات:** [Lucide React](https://lucide.dev/)
- **المحرك الأساسي للذكاء الاصطناعي:** [Google Generative AI (Gemini Flash)](https://ai.google.dev/)

## 🚀 تشغيل المشروع محلياً (Local Setup)

1. **انسخ المستودع (Clone the repo):**
   ```bash
   git clone https://github.com/your-username/tech-simplifier.git
   cd tech-simplifier
   ```

2. **ثبت الحزم ومتطلبات المشروع (Install Dependencies):**
   ```bash
   npm install
   ```
   أو باستخدام `yarn`:
   ```bash
   yarn install
   ```

3. **إعداد المتغيرات البيئية (Environment Variables):**
   قم بإنشاء ملف `.env.local` في المسار الأساسي (Root) للمشروع، وضع فيه مفتاح الـ API لـ Google Gemini اللي استخرجته من Google AI Studio:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **تشغيل سيرفر التطوير (Run Dev Server):**
   ```bash
   npm run dev
   ```
   افتح `http://localhost:3000` في متصفحك واستمتع!

## 📦 النشر على Vercel (Deployment)
المشروع مبني بأسس خالية من أي تعارضات Typescript، وهو مهيأ تمامًا للنشر المباشر والمستقر على Vercel:
1. ارفع المشروع المكتمل على مستودع GitHub الخاص بك كـ Public أو Private.
2. قم بتسجيل الدخول إلى [Vercel](https://vercel.com/) واختر إضافة مشروع جديد (Import Project).
3. اختر مستودع **Tech Simplifier**.
4. **خطوة مصيرية:** قبل الضغط على Deploy، افتح قسم الإعدادات (Environment Variables) داخل Vercel وأضف المتغير `GEMINI_API_KEY` وقيمته.
5. اضغط على Deploy وانتظر دقيقة لمشاهدة مشروعك لايف للعالم!
