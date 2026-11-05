export interface Collection {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  collectionId: string;
  badge?: string;
  description: string;
  details: string[];
  notes: string;
  price: number;
  image: string;
}

export const WHATSAPP_NUMBER = '5215658104298'; // TODO: reemplazar por el número real de Purus Bouquet

export const collections: Collection[] = [
  {
    id: 'muertos',
    name: 'Día de Muertos',
    tagline: 'Colección Especial',
    description:
      'Fragancias que honran la tradición mexicana con esencias naturales y diseños únicos en sarcófagos 3D.',
    image: '/img/col-muertos.jpg',
  },
  {
    id: 'madres',
    name: 'Día de las Madres',
    tagline: 'Para Ella',
    description:
      'Portaretratos-perfume que capturan el amor maternal en cada detalle, elaborados con ingredientes naturales.',
    image: '/img/col-madres.jpg',
  },
  {
    id: 'padre',
    name: 'Día del Padre',
    tagline: 'Para Él',
    description:
      'Estuches elegantes con fragancias masculinas extraídas de la naturaleza, perfectos para honrar a papá.',
    image: '/img/col-padre.jpg',
  },
  {
    id: 'nino',
    name: 'Día del Niño',
    tagline: 'Para los Pequeños',
    description:
      'Fragancias suaves y naturales diseñadas especialmente para los más pequeños de la familia.',
    image: '/img/col-nino.jpg',
  },
   // 👇 NUEVA COLECCIÓN AGREGADA
  {
    id: 'para-ella',
    name: 'Para Ella',
    tagline: 'Colección Permanente',
    description:
      'Fragancias que celebran la feminidad, el poder y la elegancia. Piezas atemporales para mujeres que honran su propia esencia.',
    image: '/img/col-para-ella.jpg', // Necesitarás crear esta imagen
  },
];

export const products: Product[] = [
  {
    id: 'huitzilin',
    name: 'Huitzilin / Catrin',
    collectionId: 'muertos',
    badge: 'Edición Limitada',
    description:
      `Una explosión luminosa de flor de cempasúchil recién cortada, envuelta en vainilla ahumada y resinas doradas. Huitzilin es el alma de la tradición hecha perfume: vibrante, cálido y profundamente mexicano. Un relicario olfativo que honra la vida con cada nota.`,
    details: ['Sarcófago 3D artesanal', 'Fragancia 100% natural'],
    notes: 'Flor de cempasúchil, vainilla ahumada y un toque de ámbar dorado.',
    price: 3499,
    image: '/img/p-huitzilin.jpg',
  },
  {
    id: 'xochitl',
    name: 'Xóchitl / Catrina',
    collectionId: 'muertos',
    badge: 'Edición Limitada',
    description:
       `Como la flor que ilumina el camino de regreso, Xóchitl despliega su magia en capas de copal, resinas dulces y especias envolventes. Una fragancia que no solo perfuma, sino que invoca. Un ritual olfativo que celebra el amor eterno más allá de la ausencia.`,
    details: ['Sarcófago 3D artesanal', 'Humo de copal ceremonial'],
    notes: 'Madera sagrada de copal, resina dulce y un final especiado profundo.',
    price: 3499,
    image: '/img/p-xochitl.jpg',
  },
  {
    id: 'amor-eterno',
    name: 'Amor Eterno',
    collectionId: 'madres',
    badge: 'Exclusivo',
    description: 'Portaretrato-perfume colgante que guarda su recuerdo más bello.',
    details: ['Diseño colgante para pared', 'Impresión 3D de alta calidad'],
    notes: 'Fragancia floral natural de pétalos recién cortados.',
    price: 899,
    image: '/img/p-amor.jpg',
  },
  {
    id: 'corazon-de-madre',
    name: 'Corazón de Madre',
    collectionId: 'madres',
    badge: 'Nuevo',
    description: 'Un corazón que perfuma: detalles dorados y esencia de rosas.',
    details: ['Diseño en forma de corazón', 'Detalles dorados elegantes'],
    notes: 'Esencia natural de rosas con un fondo cálido y maternal.',
    price: 899,
    image: '/img/p-corazon.jpg',
  },
  {
    id: 'eternidad-floral',
    name: 'Eternidad Floral',
    collectionId: 'madres',
    badge: 'Premium',
    description: 'Acabado en oro rosa para un amor que no conoce el tiempo.',
    details: ['Acabado en oro rosa', 'Base magnética incluida'],
    notes: 'Esencia de jazmín natural, delicada y luminosa.',
    price: 899,
    image: '/img/p-eternidad.jpg',
  },
  {
    id: 'odisea-eterna',
    name: 'Odisea Eterna',
    badge: 'Edición Limitada',
    collectionId: 'padre',
    description: 'Un estuche premium que honra la fortaleza y la sabiduría de papá.',
    details: ['Estuche impreso en 3D', 'Incluye tarjeta personalizada'],
    notes: 'Fragancia amaderada natural, sobria y perdurable.',
    price: 799,
    image: '/img/p-legado.jpg',
  },
  {
    id: 'yoyolino',
    name: 'Yoyolino',
    collectionId: 'nino',
    badge: 'Seguro para Niños',
    description: 'Su primera fragancia: suave, frutal y llena de aventura.',
    details: ['Fórmula suave y natural', 'Hipoalergénico'],
    notes: 'Aromas frutales delicados que cuidan su piel.',
    price: 799,
    image: '/img/p-explorador.jpg',
  },
  {
    id: 'ternapomella',
    name: 'Ternapomella',
    collectionId: 'nino',
    badge: 'Seguro para niñas',
    description: 'Un castillo encantado que guarda un aroma dulce y floral.',
    details: ['Estuche con diseño de castillo', 'Seguro para piel sensible'],
    notes: 'Aroma dulce y floral, pensado para soñar despierto.',
    price: 890,
    image: '/img/p-princesa.jpg',
  },
  // 👇 NUEVO PRODUCTO AGREGADO
  {
    id: 'corona-escarlata',
    name: 'Corona Escarlata',
    collectionId: 'para-ella',
    badge: 'Edición Permanente',
    description:
      `Una corona dorada que guarda el poder de la feminidad. Corona Escarlata es una fragancia intensa y magnética, diseñada para mujeres que no piden permiso para brillar. Un relicario olfativo que celebra la fuerza, la pasión y la elegancia atemporal.`,
    details: ['Frasco con forma de corona dorada', 'Cofre artesanal decorado', 'Fragancia 100% natural'],
    notes: 'Notas de rosas rojas, ámbar dorado y un toque de especias orientales.',
    price: 1790, // Ajusta según tu precio real
    image: '/img/p-corona-escarlata.jpg', // Guarda las fotos con este nombre
  },
];

export const testimonials = [
  {
    quote:
      'El perfume de Día de Muertos es simplemente espectacular. El diseño del sarcófago es una obra de arte y la fragancia es increíblemente natural.',
    name: 'María Fernanda G.',
    role: 'Cliente Verificada',
  },
  {
    quote:
      'Compré el portaretrato-perfume para mi mamá y quedó encantada. La calidad es excepcional y el aroma natural es delicioso.',
    name: 'Carlos Ramírez',
    role: 'Cliente Verificado',
  },
  {
    quote:
      'Los perfumes para niños son perfectos. Mi hija ama el diseño y el aroma es suave y natural. Me encanta que sean productos seguros.',
    name: 'Ana Martínez',
    role: 'Cliente Verificada',
  },
];

export const formatPrice = (n: number) =>
  `$${n.toLocaleString('es-MX')} MXN`;
