
import { Product } from '@/contexts/CartContext';

export const products: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
    category: 'Electrónica',
    rating: 4.8,
    reviews: 1205,
    description: 'El iPhone más avanzado hasta la fecha con chip A17 Pro y sistema de cámaras profesional.',
    colors: ['Negro', 'Blanco', 'Azul', 'Natural'],
    sizes: ['128GB', '256GB', '512GB', '1TB'],
    tags: ['Nuevo', 'Popular'],
    stock: 15
  },
  {
    id: '2',
    name: 'MacBook Air M2',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400',
    category: 'Electrónica',
    rating: 4.9,
    reviews: 892,
    description: 'Potente laptop ultradelgada con chip M2 de Apple para máximo rendimiento.',
    colors: ['Gris espacial', 'Plata', 'Oro', 'Azul medianoche'],
    sizes: ['8GB/256GB', '8GB/512GB', '16GB/512GB', '24GB/2TB'],
    tags: ['Recomendado'],
    stock: 8
  },
  {
    id: '3',
    name: 'Sudadera Nike Tech',
    price: 89,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',
    category: 'Ropa',
    rating: 4.6,
    reviews: 2341,
    description: 'Sudadera premium con tecnología Nike Tech Fleece para máxima comodidad.',
    colors: ['Negro', 'Gris', 'Azul marino', 'Verde'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    tags: ['Bestseller'],
    discount: 15,
    stock: 25
  },
  {
    id: '4',
    name: 'Zapatillas Air Jordan 1',
    price: 169,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
    category: 'Calzado',
    rating: 4.7,
    reviews: 3421,
    description: 'Icónicas zapatillas Air Jordan 1 con diseño retro y máxima comodidad.',
    colors: ['Negro/Rojo', 'Blanco/Negro', 'Azul/Blanco', 'Chicago'],
    sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'],
    tags: ['Edición limitada'],
    stock: 12
  },
  {
    id: '5',
    name: 'Sony WH-1000XM5',
    price: 349,
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400',
    category: 'Electrónica',
    rating: 4.8,
    reviews: 1876,
    description: 'Auriculares inalámbricos con cancelación de ruido líder en la industria.',
    colors: ['Negro', 'Plata'],
    tags: ['Nuevo', 'Cancelación de ruido'],
    stock: 18
  },
  {
    id: '6',
    name: 'Reloj Apple Watch Series 9',
    price: 429,
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400',
    category: 'Accesorios',
    rating: 4.9,
    reviews: 756,
    description: 'El Apple Watch más avanzado con chip S9 SiP y pantalla más brillante.',
    colors: ['Medianoche', 'Luz de las estrellas', 'Rosa', 'Rojo'],
    sizes: ['41mm', '45mm'],
    tags: ['Nuevo'],
    stock: 22
  },
  {
    id: '7',
    name: 'Camiseta Básica Premium',
    price: 29,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    category: 'Ropa',
    rating: 4.4,
    reviews: 892,
    description: 'Camiseta de algodón 100% orgánico con corte moderno y ajuste perfecto.',
    colors: ['Blanco', 'Negro', 'Gris', 'Azul marino', 'Verde oliva'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    tags: ['Básico', 'Eco-friendly'],
    discount: 20,
    stock: 45
  },
  {
    id: '8',
    name: 'Mochila Tech Urban',
    price: 79,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    category: 'Accesorios',
    rating: 4.5,
    reviews: 1234,
    description: 'Mochila urbana con compartimento para laptop y diseño minimalista.',
    colors: ['Negro', 'Gris', 'Azul oscuro'],
    tags: ['Tech', 'Urbano'],
    stock: 30
  },
  {
    id: '9',
    name: 'Velas Aromáticas Set',
    price: 45,
    image: 'https://images.unsplash.com/photo-1602874801259-84826c4e6deb?w=400',
    category: 'Hogar',
    rating: 4.3,
    reviews: 567,
    description: 'Set de 3 velas aromáticas con fragancias relajantes para el hogar.',
    colors: ['Natural', 'Lavanda', 'Vainilla'],
    tags: ['Relajante', 'Set'],
    discount: 10,
    stock: 35
  },
  {
    id: '10',
    name: 'Plancha Inalámbrica',
    price: 120,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    category: 'Hogar',
    rating: 4.6,
    reviews: 445,
    description: 'Plancha inalámbrica con tecnología de vapor avanzada.',
    colors: ['Blanco', 'Negro'],
    tags: ['Inalámbrico', 'Hogar'],
    stock: 16
  }
];

export const categories = [
  { id: 'all', name: 'Todo', icon: '🏷️' },
  { id: 'electronica', name: 'Electrónica', icon: '📱' },
  { id: 'ropa', name: 'Ropa', icon: '👕' },
  { id: 'calzado', name: 'Calzado', icon: '👟' },
  { id: 'accesorios', name: 'Accesorios', icon: '⌚' },
  { id: 'hogar', name: 'Hogar', icon: '🏠' }
];

export const banners = [
  {
    id: 1,
    title: 'Nueva Colección',
    subtitle: 'Hasta 50% de descuento',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 2,
    title: 'Tech Week',
    subtitle: 'Los mejores precios en tecnología',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 3,
    title: 'Envío Gratis',
    subtitle: 'En compras superiores a 50€',
    image: 'https://images.unsplash.com/photo-1586880244386-8b3e34c8382c?w=800',
    color: 'from-green-500 to-emerald-500'
  }
];
