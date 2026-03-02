import { ArrowRight } from "lucide-react"
import { HighlightedText } from "./HighlightedText"

export function CallToAction() {
  return (
    <section id="contact" className="py-32 md:py-29 bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary-foreground/60 text-sm tracking-[0.3em] uppercase mb-8">Оставить заявку</p>

          <h2 className="text-3xl md:text-4xl lg:text-6xl font-medium leading-[1.1] tracking-tight mb-8 text-balance">
            Нужна доставка
            <br />
            нефтепродуктов? <HighlightedText>Звоните!</HighlightedText>
          </h2>

          <p className="text-primary-foreground/70 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
            Рассчитаем стоимость за 30 минут. Работаем 24/7, выезд в день обращения. Опыт — более 18 лет на рынке нефтеналивных перевозок.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+78001234567"
              className="inline-flex items-center justify-center gap-3 bg-primary-foreground text-foreground px-8 py-4 text-sm tracking-wide hover:bg-primary-foreground/90 transition-colors duration-300 group"
            >
              Позвонить бесплатно
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="mailto:info@neftetrans.ru"
              className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 px-8 py-4 text-sm tracking-wide hover:bg-primary-foreground/10 transition-colors duration-300"
            >
              Написать на почту
            </a>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-primary-foreground/10 pt-16">
            {[
              { value: "18+", label: "лет на рынке" },
              { value: "500+", label: "клиентов" },
              { value: "2 млн т", label: "перевезено грузов" },
              { value: "24/7", label: "диспетчерская" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-medium text-primary-foreground mb-2">{stat.value}</p>
                <p className="text-primary-foreground/50 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
