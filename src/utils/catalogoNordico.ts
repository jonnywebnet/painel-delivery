export interface NordicPresentation {
  name: string;
  cuisine: string;
  image: string;
}

const catalogoNordico: Record<string, NordicPresentation> = {
  'classic margherita pizza': { name: 'Gravlax de Salmão', cuisine: 'Norueguesa', image: '/images/nordic/gravlax.jpg' },
  'vegetarian stir-fry': { name: 'Smørrebrød de Ervas', cuisine: 'Dinamarquesa', image: '/images/nordic/smorrebrod.jpg' },
  'chocolate chip cookies': { name: 'Kanelbullar de Cardamomo', cuisine: 'Sueca', image: '/images/nordic/canela.jpg' },
  'chicken biryani': { name: 'Almôndegas à Sueca', cuisine: 'Sueca', image: '/images/nordic/almondegas.jpg' },
  'mexican chicken tacos': { name: 'Arenque com Batatas', cuisine: 'Dinamarquesa', image: '/images/nordic/gravlax.jpg' },
  'beef and broccoli stir-fry': { name: 'Ensopado de Carne e Raízes', cuisine: 'Islandesa', image: '/images/nordic/almondegas.jpg' },
  'strawberry oatmeal': { name: 'Mingau de Aveia e Frutas', cuisine: 'Finlandesa', image: '/images/nordic/canela.jpg' },
  'japanese ramen': { name: 'Sopa Cremosa de Salmão', cuisine: 'Finlandesa', image: '/images/nordic/sopa-salmao.jpg' },
  'blueberry muffins': { name: 'Muffin de Mirtilo Silvestre', cuisine: 'Norueguesa', image: '/images/nordic/canela.jpg' },
  'grilled salmon': { name: 'Salmão do Fiorde', cuisine: 'Norueguesa', image: '/images/nordic/gravlax.jpg' },
  'mango salsa': { name: 'Salada de Raízes e Endro', cuisine: 'Sueca', image: '/images/nordic/smorrebrod.jpg' },
  'caprese salad': { name: 'Salada de Pepino em Conserva', cuisine: 'Dinamarquesa', image: '/images/nordic/smorrebrod.jpg' },
  'quinoa salad': { name: 'Salada de Cevada e Ervas', cuisine: 'Finlandesa', image: '/images/nordic/smorrebrod.jpg' },
  'thai green curry': { name: 'Caldeirada de Bacalhau', cuisine: 'Islandesa', image: '/images/nordic/sopa-salmao.jpg' },
  'korean bibimbap': { name: 'Tigela de Salmão e Raízes', cuisine: 'Norueguesa', image: '/images/nordic/sopa-salmao.jpg' },
  'tomato basil bruschetta': { name: 'Pão de Centeio com Cogumelos', cuisine: 'Sueca', image: '/images/nordic/smorrebrod.jpg' },
  'spaghetti carbonara': { name: 'Cevada Cremosa com Cogumelos', cuisine: 'Finlandesa', image: '/images/nordic/almondegas.jpg' },
  'greek salad': { name: 'Salada Nórdica de Beterraba', cuisine: 'Norueguesa', image: '/images/nordic/smorrebrod.jpg' },
  'chicken alfredo pasta': { name: 'Frango ao Molho de Mostarda', cuisine: 'Sueca', image: '/images/nordic/almondegas.jpg' },
  'vegetable sushi rolls': { name: 'Rolinhos de Pepino e Salmão', cuisine: 'Dinamarquesa', image: '/images/nordic/gravlax.jpg' },
  'beef tacos': { name: 'Carne ao Molho de Zimbro', cuisine: 'Islandesa', image: '/images/nordic/almondegas.jpg' },
  'coconut chicken curry': { name: 'Frango com Endro e Limão', cuisine: 'Finlandesa', image: '/images/nordic/sopa-salmao.jpg' },
  'caesar salad': { name: 'Folhas com Salmão Defumado', cuisine: 'Norueguesa', image: '/images/nordic/gravlax.jpg' },
  'shrimp scampi pasta': { name: 'Camarões do Mar do Norte', cuisine: 'Dinamarquesa', image: '/images/nordic/sopa-salmao.jpg' },
  ratatouille: { name: 'Legumes Assados do Norte', cuisine: 'Sueca', image: '/images/nordic/smorrebrod.jpg' },
  'chicken noodle soup': { name: 'Sopa de Salmão e Endro', cuisine: 'Finlandesa', image: '/images/nordic/sopa-salmao.jpg' },
  'fish and chips': { name: 'Peixe Crocante com Raízes', cuisine: 'Islandesa', image: '/images/nordic/gravlax.jpg' },
  'pad thai': { name: 'Macarrão de Centeio com Ervas', cuisine: 'Sueca', image: '/images/nordic/smorrebrod.jpg' },
  'margherita pizza': { name: 'Torta Nórdica de Cogumelos', cuisine: 'Dinamarquesa', image: '/images/nordic/almondegas.jpg' },
  tiramisu: { name: 'Creme de Cardamomo e Café', cuisine: 'Sueca', image: '/images/nordic/canela.jpg' },
};

export function getNordicPresentation(name: string): NordicPresentation | undefined {
  return catalogoNordico[name.trim().toLowerCase()];
}
