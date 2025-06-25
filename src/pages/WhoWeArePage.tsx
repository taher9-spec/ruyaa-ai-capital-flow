import React from "react";
import logo from "../../ruyaa agents/ruyaaaaaaaaaaaaaalogo.png";

const WhoWeArePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-6 py-12">
      <img src={logo} alt="Ruyaa Capital Logo" className="w-48 h-auto mb-8" />
      <div className="w-full max-w-5xl space-y-12">
        <section className="text-lg md:text-xl leading-relaxed text-right" dir="rtl">
          رؤيا كابيتال | ريادة عربية برؤية تكنولوجية
          <br />
          رؤيا كابيتال ليست مجرد شركة استثمار، بل هي جزء من مجموعة رؤيا للذكاء الاصطناعي وشركائها، وتُعد أول منصة عربية حقيقية تقدم لك تجربة تفاعلية متكاملة مع الذكاء الاصطناعي. نحن الأوائل في المنطقة الذين يوفرون لك وكيل ذكاء اصطناعي يقوم فعلياً بالعمل نيابةً عنك—not just advice—سواء في التداول، الاستثمار، أو حلول الأعمال الذكية.
          <br />
          تأسست رؤيا كابيتال على شراكات قوية مع شركات تداول مرخصة وموثوقة تمتلك خبرة تتجاوز 15 عاماً في الأسواق المالية، مدعومة بأصول مالية حقيقية وفريق محترف يجمع بين الخبرة والتحليل المدعوم بالذكاء الاصطناعي. ويعزز ثقتنا في السوق دعم نخبة المستثمرين والخبراء في دبي وتركيا.
          <br />
          نجاحنا ارتقى من خلال التعاون مع رواد الذكاء الاصطناعي العالميين مثل OpenAI (ChatGPT) وAnthropic، وإطلاق بوتات GPT الخاصة بنا—منها <a href="https://chatgpt.com/g/g-685b413e2df08191bebf7a990374d616-ruyaacapital-ai" target="_blank" rel="noopener noreferrer" className="underline">المساعد الرسمي لرؤيا كابيتال على ChatGPT.com</a>، ليكون معك في كل خطوة ويقدم حلولاً عملية وفورية.
          <br />
          في رؤيا كابيتال، هدفنا ليس مجرد تحقيق الربح، بل بناء علاقات طويلة الأمد تقوم على الشفافية، الاحترافية، والدعم المستمر. رسالتنا أن نوفر لك كل الأدوات والتقنيات لتجربة استثمارية ذكية وآمنة—من التداول وحتى اكتشاف كل جديد في عالم الذكاء الاصطناعي.
          <br />
          مع رؤيا كابيتال، الاستثمار الذكي ليس شعاراً—بل واقع جديد تصنعه التكنولوجيا وثقة العملاء في عالم المال العربي.
        </section>
        <section className="text-lg md:text-xl leading-relaxed text-left" dir="ltr">
          Ruyaa Capital is not just another investment company—it’s part of Ruyaa AI Group and its partners, and stands as the first true Arab platform delivering a complete, interactive experience with artificial intelligence. We’re the first in the region to offer an AI agent that doesn’t just give advice, but actually does the work for you—whether in trading, investing, or smart business solutions.
          <br />
          Our foundation is built on strong partnerships with licensed, trusted brokers with over 15 years of financial market experience, backed by real financial assets and a professional team that combines deep market expertise with advanced AI analysis. We’re supported by leading investors and experts in Dubai and Turkey, which has strengthened our market trust and the quality of our launch.
          <br />
          Our success is elevated through strategic collaborations with global AI pioneers like OpenAI (ChatGPT) and Anthropic, and the launch of our own custom GPTs—including the official <a href="https://chatgpt.com/g/g-685b413e2df08191bebf7a990374d616-ruyaacapital-ai" target="_blank" rel="noopener noreferrer" className="underline">Ruyaa Capital Assistant on ChatGPT.com</a>, to support you every step of the way with practical, instant solutions.
          <br />
          At Ruyaa Capital, we’re not here just to help you make a profit—we aim to build long-term relationships based on transparency, professionalism, and continuous support. Our mission is to provide every tool and technology for a smart, safe investment experience, from trading to discovering the latest in AI.
          <br />
          With Ruyaa Capital, smart investing isn’t just a slogan—it’s a new reality, driven by technology and client trust in the world of Arab finance.
        </section>
      </div>
    </div>
  );
};

export default WhoWeArePage;
