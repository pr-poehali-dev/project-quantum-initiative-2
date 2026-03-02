import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./HighlightedText"
import Icon from "@/components/ui/icon"

const services = [
  {
    title: "Перевозка светлых нефтепродуктов",
    description: "Доставка бензина, дизельного топлива и керосина по всей России. Автоцистерны ёмкостью от 10 до 32 м³. Мультисекционный транспорт для перевозки нескольких видов топлива одновременно.",
    icon: "Fuel",
  },
  {
    title: "Авиационное топливо",
    description: "Специализированные цистерны с фильтрацией и системой контроля качества. Сертифицированные водители и транспорт для работы с аэропортами. Полный комплект сопроводительной документации.",
    icon: "Plane",
  },
  {
    title: "Нефтехимическое сырьё",
    description: "Перевозка нефтехимии, растворителей и специальных жидкостей. Соблюдение температурного режима, химически стойкие цистерны, экспресс-доставка для производственных нужд.",
    icon: "FlaskConical",
  },
  {
    title: "Хранение и перевалка",
    description: "Временное хранение нефтепродуктов на собственных терминалах. Перекачка между ёмкостями, слив и налив с соблюдением норм безопасности. Возможность оперативной корректировки маршрутов.",
    icon: "Warehouse",
  },
]

export function Expertise() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)
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
    <section id="services" ref={sectionRef} className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-20">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Наши услуги</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
            <HighlightedText>Услуги</HighlightedText>, проверенные
            <br />
            годами
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Полный цикл транспортировки нефтепродуктов — от оформления документов до доставки на объект. Работаем с крупными нефтяными компаниями, региональными АЗС и промышленными предприятиями.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {services.map((service, index) => (
            <div
              key={service.title}
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              data-index={index}
              className={`relative pl-8 border-l border-border transition-all duration-700 ${
                visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div
                className={`transition-all duration-1000 ${
                  visibleItems.includes(index) ? "animate-draw-stroke" : ""
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <Icon name={service.icon} size={40} className="mb-4 text-foreground" fallback="Truck" />
              </div>
              <h3 className="text-xl font-medium mb-4">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
