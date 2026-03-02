import { useEffect, useRef, useState } from "react"
import { Check } from "lucide-react"
import { HighlightedText } from "./HighlightedText"

const plans = [
  {
    name: "Разовая перевозка",
    price: "от 35 000 ₽",
    unit: "за рейс",
    description: "Для разовых поставок и тестовых отправок",
    features: [
      "Объём от 10 м³",
      "Любой вид нефтепродукта",
      "GPS-мониторинг",
      "Полный пакет документов",
      "Страхование груза",
    ],
    cta: "Оформить заявку",
    highlighted: false,
  },
  {
    name: "Постоянный клиент",
    price: "от 28 000 ₽",
    unit: "за рейс",
    description: "Для регулярных поставок от 4 раз в месяц",
    features: [
      "Объём от 10 до 32 м³",
      "Приоритетный диспетчер",
      "GPS-мониторинг онлайн",
      "Полный пакет документов",
      "Страхование груза",
      "Скидка 10–20% от объёма",
      "Отсрочка платежа 14 дней",
    ],
    cta: "Стать клиентом",
    highlighted: true,
  },
  {
    name: "Корпоративный",
    price: "Индивидуально",
    unit: "по договору",
    description: "Для нефтяных компаний и крупных сетей АЗС",
    features: [
      "Неограниченный объём",
      "Выделенный парк техники",
      "Персональный менеджер",
      "SLA и гарантии сроков",
      "Интеграция с ERP-системами",
      "Отсрочка платежа 30 дней",
    ],
    cta: "Запросить КП",
    highlighted: false,
  },
]

export function Pricing() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.2 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="pricing" className="py-32 md:py-29 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-20">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Тарифы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
            Прозрачные
            <br />
            <HighlightedText>цены</HighlightedText>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Финальная стоимость зависит от маршрута, объёма и вида груза. Звоните — рассчитаем точную цену за 30 минут.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              data-index={index}
              className={`relative p-8 transition-all duration-700 ${
                visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } ${
                plan.highlighted
                  ? "bg-foreground text-primary-foreground"
                  : "bg-background border border-border"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-orange-500 text-white text-xs px-4 py-1 tracking-wider uppercase">
                    Популярный
                  </span>
                </div>
              )}

              <div className="mb-8">
                <p className={`text-sm tracking-[0.2em] uppercase mb-4 ${plan.highlighted ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                  {plan.name}
                </p>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-4xl font-medium">{plan.price}</span>
                </div>
                <p className={`text-sm ${plan.highlighted ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                  {plan.unit}
                </p>
                <p className={`text-sm mt-4 ${plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.highlighted ? "text-orange-400" : "text-foreground"}`}
                      strokeWidth={2}
                    />
                    <span className={plan.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`block text-center py-3 px-6 text-sm tracking-wide transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "border border-foreground text-foreground hover:bg-foreground hover:text-primary-foreground"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground text-sm mt-10">
          * Цены указаны без НДС. Итоговая стоимость рассчитывается индивидуально после уточнения маршрута.
        </p>
      </div>
    </section>
  )
}
