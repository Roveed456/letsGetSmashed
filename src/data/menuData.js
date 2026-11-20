// menu items, the images are in public/images/menu
// highlight = orange part of the title, oldPrice = crossed out price

const rawSections = [
  {
    id: 'wing-combo',
    title: 'The Wing Combo',
    showTitle: false, // no heading above the first group
    items: [
      { image: 'wing-6.jpg', title: 'The Wing Combo', highlight: '6PCS', desc: 'With Crinkle Fries', price: '$10.50', oldPrice: '$13.00' },
      { image: 'wing-10.jpg', title: 'The Wing Combo', highlight: '10PCS', desc: 'With Crinkle Fries', price: '$16.50', oldPrice: '$18.00' },
      { image: 'wing-15.jpg', title: 'The Wing Combo', highlight: '15PCS', desc: 'With Crinkle Fries', price: '$22.50', oldPrice: '$13.00' },
      { image: 'wing-20.jpg', title: 'The Wing Combo', highlight: '20PCS', desc: 'With Crinkle Fries', price: '$30.00', oldPrice: '$13.00' },
      { image: 'wing-30.jpg', title: 'The Wing Combo', highlight: '30PCS', desc: 'With Crinkle Fries', price: '$37.50', oldPrice: '$13.00' },
    ],
  },
  {
    id: 'family-deals',
    title: 'Family Deals',
    showTitle: true,
    items: [
      { image: 'family.jpg', title: 'Family Deals', highlight: '5PCS', desc: 'Smash Burgers/Toast Melts with Crinkle Fries', price: '$30.75', oldPrice: '$13.00' },
      { image: 'family.jpg', title: 'Family Deals', highlight: '10PCS', desc: 'Smash Burgers/Toast Melts with Crinkle Fries', price: '$59.99', oldPrice: '$13.00' },
      { image: 'family.jpg', title: 'Family Deals', highlight: '15PCS', desc: 'Smash Burgers/Toast Melts with Crinkle Fries', price: '$87.75', oldPrice: '$13.00' },
    ],
  },
  {
    id: 'burger',
    title: 'Burger',
    showTitle: true,
    items: [
      { image: 'smash-burger.jpg', title: 'Smash Burger', desc: 'ADD AN ADDITIONAL PATTY FOR $1.49', price: '$6.99', oldPrice: '$13.00' },
      { image: 'toast-melt.jpg', title: 'Toast Melt', desc: 'ADD AN ADDITIONAL PATTY FOR $1.49', price: '$6.99', oldPrice: '$13.00' },
    ],
  },
  {
    id: 'side',
    title: 'Side',
    showTitle: true,
    items: [
      { image: 'loaded-fries.jpg', title: 'Loaded Fries', desc: 'with extra sauce & cheese', price: '$6.99', oldPrice: '$13.00' },
      { image: 'crinkle-fries.jpg', title: 'Crinkle Fries', price: '$3.99 (S) / $4.49 (L)' },
      { image: 'curly-fries.jpg', title: 'Curly Fries', price: '$4.49 (S) / $5.99 (L)' },
      { image: 'onion-rings.jpg', title: 'Onion Rings', price: '$4.99 (S) / $6.99 (L)' },
      { image: 'jalapeno.jpg', title: 'Jalapeño Poppers', price: '$5.99 (S) / $7.99 (L)' },
      { image: 'mozzarella.jpg', title: 'Mozzarella Sticks', price: '$6.99 (S) / $8.99 (L)' },
    ],
  },
  {
    id: 'soft-drink',
    title: 'Soft Drink',
    showTitle: true,
    items: [
      { image: 'soft-drink.jpg', title: 'Soft Drink', desc: 'with extra sauce & cheese', price: '$1.50' },
      { image: 'barbican.jpg', title: 'Barbican', desc: 'with extra sauce & cheese', price: '$2.50' },
      { image: 'freshers.jpg', title: 'Freshers', desc: 'with extra sauce & cheese', price: '$2.99' },
      { image: 'mint-lemonade.jpg', title: 'Mint Lemonade', desc: 'with extra sauce & cheese', price: '$3.49' },
      { image: 'tamarind.jpg', title: 'Tamarind Blast', desc: '$3.99', price: '$3.49' },
    ],
  },
]

// long text for the detail page, per group
const aboutText = {
  'wing-combo':
    'Crispy on the outside, juicy on the inside. Our wings are tossed in the house sauce and served piping hot with a side of golden crinkle fries.',
  'family-deals':
    'Everything you need for the whole table: smash burgers or toast melts, loaded with flavor and served with a big portion of crinkle fries.',
  burger:
    'Pressed thin on a hot grill for crispy edges, then stacked high on a soft toasted bun. Add an extra patty any time you are extra hungry.',
  side: 'The perfect partner for any burger. Made fresh to order, crispy, golden and served with our signature dipping sauce.',
  'soft-drink': 'Ice cold and refreshing, made fresh every day. Perfect for washing down a plate of burgers and fries.',
}

// "Crinkle Fries" + "6PCS" -> "crinkle-fries-6pcs"
function makeId(title, highlight = '') {
  return `${title} ${highlight}`
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // remove accents (Jalapeño)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// adds id, group and long text to every item
export const menuSections = rawSections.map((section) => ({
  ...section,
  items: section.items.map((item) => ({
    ...item,
    id: makeId(item.title, item.highlight),
    sectionId: section.id,
    sectionTitle: section.title,
    about: aboutText[section.id],
  })),
}))

// all items in one list, find by id
export const allItems = menuSections.flatMap((section) => section.items)
export const findItem = (id) => allItems.find((item) => item.id === id)

// tabs above the menu cards
export const menuTabs = [
  { label: 'The Wing Combo', target: 'wing-combo' },
  { label: 'Family Deals', target: 'family-deals' },
  { label: 'Burger', target: 'burger' },
  { label: 'Side', target: 'side' },
  { label: 'Drinks', target: 'soft-drink' },
]
