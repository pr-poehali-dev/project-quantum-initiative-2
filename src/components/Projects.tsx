import { useState, useEffect, useRef } from "react"
import { Droplets } from "lucide-react"
import Icon from "@/components/ui/icon"

const fuels = [
  {
    id: 1,
    title: "Автомобильный бензин",
    category: "АИ-92, АИ-95, АИ-98",
    description: "Перевозка всех марок бензина в автоцистернах с алюминиевыми и стальными секциями, раздельная загрузка разных марок.",
    image: "https://cdn.poehali.dev/projects/877021ad-74b1-4ed2-8328-38219ccd4ad4/files/886927fd-93d7-4d1e-b178-4166aab3f63f.jpg",
    icon: "Fuel",
  },
  {
    id: 2,
    title: "Дизельное топливо",
    category: "ДТ летнее, зимнее, арктическое",
    description: "Доставка дизельного топлива для АЗС, промышленных предприятий, сельхозтехники и строительной отрасли.",
    image: "https://cdn.poehali.dev/projects/877021ad-74b1-4ed2-8328-38219ccd4ad4/files/2cebf52d-951f-4aae-9968-1c28c63e5f83.jpg",
    icon: "Truck",
  },
  {
    id: 3,
    title: "Авиационное топливо",
    category: "Авиакеросин ТС-1, Jet A-1",
    description: "Перевозка авиакеросина в специализированных цистернах с сертификацией для аэропортов. Строжайший контроль качества на всех этапах.",
    image: "https://cdn.poehali.dev/projects/877021ad-74b1-4ed2-8328-38219ccd4ad4/files/50a35d9b-eb8b-48b1-90a5-e20de121dc7d.jpg",
    icon: "Plane",
  },
  {
    id: 4,
    title: "Светлые масла и нефтехимия",
    category: "Масла, растворители, нефтехимия",
    description: "Транспортировка светлых нефтяных масел, технических растворителей и нефтехимического сырья с соблюдением температурного режима.",
    image: "https://cdn.poehali.dev/projects/877021ad-74b1-4ed2-8328-38219ccd4ad4/files/fae6ec3b-277a-4999-9ab4-6f63771ef436.jpg",
    icon: "FlaskConical",
  },
]

export function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [revealedImages, setRevealedImages] = useState<Set<number>>(new Set())
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imageRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setRevealedImages((prev) => new Set(prev).add(fuels[index].id))
            }
          }
        })
      },
      { threshold: 0.2 },
    )

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-32 md:py-29 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Виды грузов</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">Что мы перевозим</h2>
          </div>
          <p className="text-muted-foreground text-sm max-w-xs">
            Специализированный транспорт для каждого вида нефтепродуктов
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {fuels.map((fuel, index) => (
            <article
              key={fuel.id}
              className="group cursor-default"
              onMouseEnter={() => setHoveredId(fuel.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div ref={(el) => (imageRefs.current[index] = el)} className="relative overflow-hidden aspect-[4/3] mb-6">
                <img
                  src={fuel.image || "/placeholder.svg"}
                  alt={fuel.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredId === fuel.id ? "scale-105" : "scale-100"
                  }`}
                />
                <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-500/90 p-2 rounded">
                      <Icon name={fuel.icon} size={20} className="text-white" fallback="Droplets" />
                    </div>
                    <span className="text-white text-sm font-medium">{fuel.category}</span>
                  </div>
                </div>
                <div
                  className="absolute inset-0 bg-primary origin-top"
                  style={{
                    transform: revealedImages.has(fuel.id) ? "scaleY(0)" : "scaleY(1)",
                    transition: "transform 1.5s cubic-bezier(0.76, 0, 0.24, 1)",
                  }}
                />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-medium mb-2">{fuel.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{fuel.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}