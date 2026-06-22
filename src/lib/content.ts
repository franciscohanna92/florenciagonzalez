export const siteConfig = {
  name: "Florencia González",
  descriptor: "Arquitectura & Diseño",
  location: "San Juan, Argentina",
  remoteWork: "Proyectos presenciales y a distancia según alcance",
  whatsapp: "+543825554196",
  whatsappHref: "https://wa.me/543825554196",
  email: "[completar]",
  instagram: "[completar]",
};

export const navItems = [
  { label: "Proyectos", href: "/proyectos" },
  { label: "Servicios", href: "/servicios" },
  { label: "Cómo trabajo", href: "/como-trabajo" },
  { label: "Sobre mí", href: "/sobre-mi" },
  { label: "Contacto", href: "/contacto" },
];

export const serviceGroups = [
  {
    title: "Viviendas",
    summary:
      "Diseño casas, reformas y ampliaciones pensadas para tu forma de vivir: distribución, luz natural, materiales, circulación, guardado, interiores y detalles de uso cotidiano.",
    detail:
      "Diseño casas, reformas y ampliaciones pensadas para tu forma de vivir. Trabajo sobre distribución, luz natural, materiales, circulación, guardado, interiores y detalles que hacen más cómodo el uso cotidiano del espacio.",
    items: [
      "Casas desde cero",
      "Reformas",
      "Ampliaciones",
      "Diseño interior",
      "Espacios exteriores",
      "Documentación técnica",
      "Aprobaciones",
      "Dirección de obra",
      "Visualización 3D",
    ],
  },
  {
    title: "Espacios comerciales",
    summary:
      "Diseño locales, oficinas y espacios de atención donde la arquitectura ayuda a comunicar tu marca, ordenar la operación y mejorar la experiencia del cliente.",
    detail:
      "Diseño locales, oficinas y espacios de atención donde la arquitectura ayuda a comunicar tu marca y mejorar la experiencia del cliente. El objetivo es que el espacio funcione bien, sea claro para quienes lo usan y tenga una identidad reconocible.",
    items: [
      "Diseño de locales",
      "Remodelaciones comerciales",
      "Aplicación de marca en espacios físicos",
      "Cartelería",
      "Mobiliario comercial",
      "Franquicias",
      "Habilitaciones",
      "Documentación técnica",
      "Visualización 3D",
      "Dirección de obra",
    ],
  },
  {
    title: "Interiores y mobiliario",
    summary:
      "Trabajo sobre ambientes, materiales, iluminación, equipamiento, guardado y piezas a medida para que cada espacio sea más claro, cómodo y funcional.",
    detail:
      "Trabajo sobre ambientes existentes o en proyecto para mejorar distribución, materialidad, iluminación, guardado, equipamiento y detalles de uso cotidiano.",
    items: [
      "Diseño interior",
      "Selección de materiales",
      "Paletas y criterios visuales",
      "Iluminación",
      "Mobiliario a medida",
      "Equipamiento",
      "Guardado",
      "Detalles funcionales",
    ],
  },
  {
    title: "Visualización, planos y obra",
    summary:
      "Desarrollo renders, documentación técnica, aprobaciones, habilitaciones y dirección de obra según el alcance de cada proyecto.",
    detail:
      "Desarrollo piezas técnicas y visuales para entender, presentar, aprobar o ejecutar un proyecto con mayor claridad.",
    items: [
      "Renders",
      "Visualización 3D",
      "Planos",
      "Documentación municipal",
      "Aprobaciones",
      "Habilitaciones",
      "Dirección de obra",
      "Acompañamiento técnico",
    ],
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Consulta inicial",
    short:
      "Conversamos sobre lo que querés hacer, el estado actual del espacio, tus necesidades, tiempos, referencias y alcance posible.",
    detail:
      "Empezamos conversando sobre lo que querés hacer, dónde está el proyecto, qué necesitás resolver, qué referencias tenés y en qué etapa estás.",
  },
  {
    number: "02",
    title: "Relevamiento y análisis",
    short:
      "Analizo medidas, condiciones existentes, ubicación, usos, restricciones y oportunidades del lugar.",
    detail:
      "Reviso medidas, fotos, planos existentes, condiciones del lugar, usos, restricciones, orientación, circulaciones y oportunidades.",
  },
  {
    number: "03",
    title: "Idea y propuesta",
    short:
      "Trabajo una idea clara de distribución, materialidad, funcionamiento y lenguaje visual del proyecto.",
    detail:
      "Trabajo una propuesta que ordene el espacio y defina criterios de distribución, materialidad, funcionamiento y lenguaje visual.",
  },
  {
    number: "04",
    title: "Desarrollo",
    short:
      "Desarrollo planos, criterios técnicos, renders o piezas necesarias para entender, presentar o avanzar con el proyecto.",
    detail:
      "Según el alcance, desarrollo planos, documentación técnica, renders, detalles, criterios de materialidad o piezas necesarias para avanzar.",
  },
  {
    number: "05",
    title: "Gestión y obra",
    short:
      "Según el alcance, puedo acompañar aprobaciones, habilitaciones, dirección de obra o coordinación de decisiones durante la ejecución.",
    detail:
      "Cuando el proyecto lo requiere, puedo acompañar aprobaciones, habilitaciones, dirección de obra o decisiones técnicas durante la ejecución.",
  },
  {
    number: "06",
    title: "Cierre o próxima etapa",
    short:
      "El proceso puede terminar con una entrega puntual o continuar hacia nuevas etapas, según lo que necesites resolver.",
    detail:
      "El proceso puede terminar con una entrega puntual o continuar hacia nuevas etapas, según lo que necesites resolver.",
  },
];

export const projectCategories = [
  "Todos",
  "Vivienda",
  "Comercial",
  "Interiorismo",
  "Mobiliario",
  "Visualización 3D",
] as const;

export const projectTypeOptions = [
  "Casa desde cero",
  "Reforma o ampliación",
  "Local comercial",
  "Interiorismo",
  "Mobiliario",
  "Renders o visualización 3D",
  "Planos, aprobación o habilitación",
  "Dirección de obra",
  "Otro",
];

export const projectStatusOptions = [
  "Tengo una idea inicial",
  "Tengo terreno o local",
  "Tengo planos",
  "Estoy por empezar obra",
  "La obra ya empezó",
  "Necesito regularizar o aprobar",
  "No sé por dónde empezar",
];
