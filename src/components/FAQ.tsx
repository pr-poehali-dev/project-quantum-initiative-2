import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "В каких регионах вы работаете?",
    answer:
      "Работаем по всей территории России: Центральный федеральный округ, Поволжье, Урал, Сибирь, Северо-Запад. Для ряда направлений осуществляем международные перевозки в страны СНГ. Свяжитесь с нами — уточним наличие маршрута до вашего объекта.",
  },
  {
    question: "Какой минимальный объём перевозки?",
    answer:
      "Минимальный объём — от 10 м³ (одна автоцистерна). При регулярных заказах от 100 м³ в месяц предоставляем индивидуальные условия и скидки. Также организуем сборные рейсы для небольших объёмов.",
  },
  {
    question: "Как обеспечивается безопасность перевозки?",
    answer:
      "Весь транспорт оборудован GPS-трекерами, датчиками утечки, системой аварийного перекрытия клапанов. Водители имеют свидетельство ДОПОГ и регулярно проходят переаттестацию. Грузы застрахованы на полную стоимость.",
  },
  {
    question: "Какие документы вы предоставляете?",
    answer:
      "Полный комплект: товарно-транспортная накладная, паспорт качества на топливо, аварийная карточка, маршрутный лист. При необходимости — разрешения на перевозку опасных грузов, международные сертификаты ADR.",
  },
  {
    question: "Можно ли отследить груз в пути?",
    answer:
      "Да. Мы предоставляем доступ к онлайн-мониторингу — вы видите местоположение автоцистерны в реальном времени. Также уведомляем по SMS или в мессенджерах о выезде, промежуточных точках и прибытии.",
  },
  {
    question: "Как рассчитывается стоимость перевозки?",
    answer:
      "Стоимость зависит от объёма, расстояния, вида груза и срочности. Оставьте заявку или позвоните — рассчитаем стоимость в течение 30 минут. Для постоянных клиентов действуют специальные тарифы.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
