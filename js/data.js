// Rope Drop — Park Data
// To add/edit attractions, modify the sections arrays below.
// badge options: 'thrill' | 'family' | 'show' | 'food' | 'character'
// must: true  →  shows a star and sorts to top of section

// Items that support a song/variant picker after being checked.
// Used for rides with randomized soundtracks like Cosmic Rewind.
// Typical showtimes for entertainment — these are common patterns, not
// live daily schedules (Disney doesn't publish a public API and times
// shift constantly). Always double-check the My Disney Experience app
// or park signage for the actual time on your visit day.
// Menu items for food & drink spots, with a simple cost tier instead of
// exact prices (Disney pricing changes often and isn't worth pretending
// to track live). $ = snack, $$ = quick-service meal, $$$ = table-service
// or specialty item.
// Typical operating hours per park. Real daily hours vary by season and
// special events — these are common baselines, not a live schedule.
// Always confirm in the My Disney Experience app before your visit.
// Lightning Lane Single Pass — Disney's pay-per-ride skip-the-line option
// for the highest-demand attractions, separate from the daily Multi Pass.
// Prices are typical ranges, not live pricing (Disney adjusts these daily
// based on date and demand) — always confirm in the My Disney Experience
// or Disneyland app before your visit.
const SINGLE_PASS_RIDES = {
  'mk-01': { priceRange: '$15–$20' }, // Seven Dwarfs Mine Train
  'mk-13': { priceRange: '$20–$30' }, // TRON Lightcycle / Run
  'mk-14': { priceRange: '$15–$20' }, // Tiana's Bayou Adventure
  'ep-01': { priceRange: '$20–$30' }, // Guardians of the Galaxy: Cosmic Rewind
  'hs-01': { priceRange: '$20–$30' }, // Star Wars: Rise of the Resistance
  'ak-01': { priceRange: '$20–$25' }, // Avatar Flight of Passage
  'dl-03': { priceRange: '$15–$35' }, // Star Wars: Rise of the Resistance (Disneyland)
  'dca-01': { priceRange: '$18–$28' }, // Radiator Springs Racers
};

const TYPICAL_PARK_HOURS = {
  mk:  { early: '8:30 AM (Early Entry, resort guests)', open: '9:00 AM', close: '9:00 PM (later in busy season, often 10–11 PM)' },
  ep:  { early: '8:30 AM (Early Entry, resort guests)', open: '9:00 AM', close: '9:00 PM' },
  hs:  { early: '8:00 AM (Early Entry, resort guests)', open: '8:30 AM', close: '9:00 PM' },
  ak:  { early: '7:30 AM (Early Entry, resort guests)', open: '8:00 AM', close: '7:00 PM' },
  dl:  { early: '7:30 AM (Early Entry, resort guests)', open: '8:00 AM', close: '10:00 PM (varies seasonally)' },
  dca: { early: '7:30 AM (Early Entry, resort guests)', open: '8:00 AM', close: '9:00 PM (varies seasonally)' },
};

const MENU_DATA = {
  'mk-22': {
    tier: '$',
    items: [
      { name: 'Pineapple Dole Whip Cup' },
      { name: 'Vanilla Dole Whip Cup' },
      { name: 'Pineapple-Vanilla Swirl Cup' },
      { name: 'Dole Whip Float (with pineapple juice)' },
      { name: 'Tropical Serenade Float (pineapple-orange-guava juice, coconut soft-serve, cake pop)' },
      { name: 'Coconut Cup' },
      { name: 'Coconut-Pineapple Swirl Cup' },
      { name: 'Pineapple Upside-Down Cake with Dole Whip' },
      { name: 'Pineapple Juice (no soft-serve)' },
    ]
  },
  'mk-23': {
    tier: '$$$',
    items: [
      { name: 'Braised Pork Shank (lunch/dinner)' },
      { name: 'Pan-Seared Salmon (lunch/dinner)' },
      { name: 'Ratatouille Vegetable Tart (lunch/dinner)' },
      { name: 'French Onion Soup' },
      { name: 'Roasted Chicken (lunch/dinner)' },
      { name: 'Lobster & Shrimp Pasta Carbonara' },
      { name: 'Filet Mignon (dinner)' },
      { name: 'The Grey Stuff (signature dessert)' },
      { name: 'Master\'s Cupcake' },
      { name: 'Croque Monsieur (breakfast)' },
    ]
  },
  'mk-24': {
    tier: '$$',
    items: [
      { name: 'Smoked Turkey Leg' },
    ]
  },
  'mk-25': {
    tier: '$$',
    items: [
      { name: 'Classic All-Beef Hot Dog' },
      { name: 'Chipotle BBQ All-Beef Hot Dog (pulled pork, slaw, chipotle BBQ sauce)' },
      { name: 'Chipotle BBQ Foot-Long Hot Dog' },
      { name: 'Chili-Cheese Hot Dog' },
      { name: 'Bacon Mac & Cheese Hot Dog' },
      { name: 'Plant-Based Hot Dog' },
      { name: 'Corn Dog Nuggets' },
      { name: 'Loaded Fries' },
      { name: 'Pressed Penny Silk Pie (chocolate tart)' },
      { name: 'Assorted Fountain Beverages' },
    ]
  },
  'mk-26': {
    tier: '$$',
    items: [
      { name: 'Classic Belgian Waffle (sweet toppings rotate seasonally)' },
      { name: 'Savory Waffle (seasonal, often chicken or pulled pork)' },
      { name: 'Funnel Cake' },
      { name: 'Seasonal Pumpkin Funnel Cake Sundae (fall)' },
      { name: 'Nutella Waffle (when available)' },
      { name: 'Soft-Serve Sundae' },
      { name: 'Specialty Lemonade' },
      { name: 'Hot or Iced Coffee' },
    ]
  },
  'mk-27': {
    tier: '$$',
    items: [
      { name: 'Build-Your-Own Nacho Bowl' },
      { name: 'Southwest Salad' },
      { name: 'Pulled Pork Sandwich' },
      { name: 'Vegetarian Taco Salad' },
      { name: 'Tex-Mex Rice Bowl' },
      { name: 'Churros' },
      { name: 'Frozen Lemonade' },
    ]
  },
  'mk-28': {
    tier: '$',
    items: [
      { name: 'Turkey Leg (also sold here)' },
      { name: 'Chili Cheese Dog' },
      { name: 'Fried Pickles' },
    ]
  },
  'mk-29': {
    tier: '$',
    items: [
      { name: 'Frozen Lemonade' },
      { name: 'Frozen Lemon Slush' },
      { name: 'Soft Drinks' },
    ]
  },
  'mk-30': {
    tier: '$$$',
    items: [
      { name: 'All-You-Care-To-Enjoy Family-Style Turkey & Pot Roast' },
      { name: 'Seasonal Vegetables & Mashed Potatoes' },
      { name: 'Macaroni & Cheese' },
      { name: "Grandma's Chicken Pot Pie" },
      { name: 'Seasonal Cobbler' },
    ]
  },
  'mk-31': {
    tier: '$',
    items: [
      { name: 'Frozen Coca-Cola' },
      { name: 'Smoked Turkey Leg' },
      { name: 'Grab-and-go Sandwiches' },
      { name: 'Packaged Snacks' },
    ]
  },
  'mk-32': {
    tier: '$$$',
    items: [
      { name: 'Chilled Seafood Tower (lunch/dinner)' },
      { name: 'Pan-Seared Beef Tenderloin' },
      { name: 'Herb Roasted Chicken' },
      { name: 'Lobster & Pasta' },
      { name: "Gooey Toffee Cake" },
      { name: 'Character dining experience with Disney Princesses' },
    ]
  },
  'mk-33': {
    tier: '$$$',
    items: [
      { name: 'All-You-Care-To-Enjoy Buffet (breakfast, lunch, dinner)' },
      { name: 'Carved Meats (lunch/dinner)' },
      { name: 'Seasonal Salads' },
      { name: 'Kids\' Buffet Favorites' },
      { name: 'Character dining with Winnie the Pooh & friends' },
    ]
  },
  'mk-34': {
    tier: '$$$',
    items: [
      { name: "Tony's Spaghetti & Meatballs (Lady and the Tramp callback)" },
      { name: 'Chicken Parmesan' },
      { name: 'Lasagna' },
      { name: 'Italian-Style Salad' },
      { name: 'Tiramisu' },
    ]
  },
  'mk-35': {
    tier: '$$$',
    items: [
      { name: 'Specialty Burgers' },
      { name: 'Reuben Sandwich' },
      { name: 'Hand-Spun Milkshakes' },
      { name: 'Chicken Caesar Wrap' },
    ]
  },
  'mk-36': {
    tier: '$$$',
    items: [
      { name: 'Pork & Watermelon Bao Buns' },
      { name: "Falls Family Falafel" },
      { name: 'Grilled Beef Tenderloin' },
      { name: "S.E.A. Skewers" },
      { name: 'Schweitzer Falls Sundae' },
    ]
  },
  'mk-37': {
    tier: '$$$',
    items: [
      { name: 'Currently closed — reopening planned for Fall 2026' },
    ]
  },
  'mk-38': {
    tier: '$$',
    items: [
      { name: 'Grilled Salmon' },
      { name: 'Lighthouse Sandwich (lobster roll)' },
      { name: 'Fish & Chips' },
      { name: 'Shrimp & Lobster Salad' },
      { name: 'Clam Chowder' },
      { name: 'Vegetarian Chili' },
    ]
  },
  'mk-39': {
    tier: '$$',
    items: [
      { name: 'Bacon Cheeseburger' },
      { name: 'Plant-Based Burger' },
      { name: 'Rotisserie Chicken' },
      { name: 'Buffalo Chicken Sandwich' },
      { name: 'Kids\' Build-Your-Own Pasta' },
    ]
  },
  'mk-40': {
    tier: '$',
    items: [
      { name: 'Classic Ice Cream Scoops' },
      { name: 'Sundaes' },
      { name: 'Ice Cream Floats' },
      { name: 'Waffle Cone Sandwiches' },
    ]
  },
  'mk-41': {
    tier: '$',
    items: [
      { name: 'Cinnamon Roll' },
      { name: "LeFou's Brew (non-alcoholic specialty drink)" },
      { name: 'Caramel Apple' },
    ]
  },
  'mk-42': {
    tier: '$',
    items: [
      { name: 'Citrus Swirl (orange & vanilla soft-serve)' },
      { name: 'Orange Juice Slushy' },
      { name: 'Fresh Fruit' },
    ]
  },
  'mk-43': {
    tier: '$$',
    items: [
      { name: 'Starbucks Coffee & Espresso Drinks' },
      { name: 'Pastries & Croissants' },
      { name: 'Breakfast Sandwiches' },
      { name: 'Mickey-Shaped Treats' },
    ]
  },
  'mk-44': {
    tier: '$$',
    items: [
      { name: 'Flatbread Pizzas' },
      { name: 'Italian Sub Sandwich' },
      { name: 'Caesar Salad' },
      { name: 'Kids\' Pasta' },
    ]
  },
  'mk-45': {
    tier: '$',
    items: [
      { name: 'Loaded Tater Tots' },
      { name: 'Mac & Cheese' },
      { name: 'Hot Dog Bites' },
    ]
  },
  'ep-16': {
    tier: '$',
    items: [
      { name: 'School Bread (sweet bread with custard and coconut)' },
      { name: 'Norwegian Waffle' },
      { name: 'Kringle (Danish pastry)' },
      { name: 'Sweet Lefse Flatbread' },
      { name: 'Kringla (soft pretzel-shaped pastry)' },
      { name: 'Norwegian Open-Faced Sandwich' },
      { name: 'Hot Cocoa' },
      { name: 'Norwegian Coffee' },
    ]
  },
  'ep-17': {
    tier: '$',
    items: [
      { name: 'Ham & Cheese Crepe' },
      { name: 'Nutella Crepe' },
      { name: 'Quiche Lorraine' },
      { name: 'French Pastries' },
      { name: 'Croissant' },
      { name: 'Baguette Sandwich' },
      { name: 'Macarons' },
      { name: 'Fruit Tart' },
      { name: 'French Press Coffee' },
    ]
  },
  'ep-18': {
    tier: '$',
    items: [
      { name: 'Croissant Donut' },
      { name: 'Specialty Coffee' },
      { name: 'Iced Coffee' },
      { name: 'Hot Tea' },
      { name: 'Bottled Water' },
    ]
  },
  'ep-19': {
    tier: '$$',
    items: [
      { name: 'Fish & Chips' },
      { name: 'Bangers & Mash' },
      { name: 'Shepherd\'s Pie' },
      { name: 'Scotch Egg' },
      { name: 'Guinness & UK Beer Flight' },
      { name: 'Ploughman\'s Platter' },
      { name: 'Sticky Toffee Pudding' },
      { name: 'Pimm\'s Cup Cocktail' },
    ]
  },
  'ep-20': {
    tier: '$',
    items: [
      { name: 'Frozen Lime Margarita' },
      { name: 'Frozen Strawberry Margarita' },
      { name: 'Frozen Mango Margarita' },
      { name: 'Flight of Tequila Tastings' },
      { name: 'Sangria' },
      { name: 'Mexican Beer' },
      { name: 'Avocado Margarita' },
      { name: 'Spicy Mango Margarita' },
    ]
  },
  'ep-41': {
    tier: '$$$',
    items: [
      { name: 'All-You-Care-To-Enjoy German Buffet' },
      { name: 'Schnitzel' },
      { name: 'Spätzle' },
      { name: 'Roasted Chicken' },
      { name: 'Bratwurst & Sauerkraut' },
      { name: 'German Beer Flight' },
      { name: 'Apple Strudel' },
      { name: 'Pretzel Roll & Obatzda Cheese' },
      { name: 'Red Cabbage & Potato Dumplings' },
      { name: 'Black Forest Cake' },
    ]
  },
  'ep-42': {
    tier: '$$$',
    items: [
      { name: 'Handmade Pappardelle' },
      { name: 'Chicken Parmigiana' },
      { name: 'Risotto' },
      { name: 'Tiramisu' },
      { name: 'Italian Wine Flight' },
      { name: 'Lasagna Bolognese' },
      { name: 'Caprese Salad' },
      { name: 'Branzino (whole roasted fish)' },
      { name: 'Cannoli' },
    ]
  },
  'ep-43': {
    tier: '$$$',
    items: [
      { name: 'Tortilla Soup' },
      { name: 'Chicken Enchiladas with Mole Sauce' },
      { name: 'Beef Tacos' },
      { name: 'Queso Fundido' },
      { name: 'Flan' },
      { name: 'Carne Asada' },
      { name: 'Shrimp Ceviche' },
      { name: 'Churros' },
      { name: 'Margarita Flight' },
    ]
  },
  'ep-44': {
    tier: '$$',
    items: [
      { name: 'BBQ Pulled Pork Sandwich' },
      { name: 'Smoked Beef Brisket' },
      { name: 'BBQ Combo Platter' },
      { name: 'Cornbread' },
      { name: 'Mac & Cheese' },
      { name: 'Kansas City Smoked Chicken' },
      { name: 'Coleslaw' },
      { name: 'Craft Beer Flight' },
      { name: 'Banana Pudding' },
    ]
  },
  'ep-45': {
    tier: '$$$',
    items: [
      { name: 'Hibachi Chicken' },
      { name: 'Hibachi Steak & Shrimp' },
      { name: 'Vegetable Tempura' },
      { name: 'Miso Soup' },
      { name: 'Green Tea Ice Cream' },
      { name: 'Hibachi Scallops' },
      { name: 'Fried Rice' },
      { name: 'Edamame' },
      { name: 'Sake Flight' },
    ]
  },
  'ep-46': {
    tier: '$$$',
    items: [
      { name: 'Hummus Fries' },
      { name: 'Roasted Cauliflower' },
      { name: 'Lamb Shank' },
      { name: 'Chicken Shawarma' },
      { name: 'Homemade Sangria' },
      { name: 'Lamb Kefta' },
      { name: 'Moroccan Salad' },
      { name: 'Baklava' },
      { name: 'Mint Tea' },
    ]
  },
  'ep-47': {
    tier: '$$$',
    items: [
      { name: 'Character Dining with Disney Princesses' },
      { name: 'Traditional Norwegian Buffet' },
      { name: 'Kjottkake (Norwegian meatballs)' },
      { name: 'Smoked Salmon' },
      { name: 'Cloudberry Cream Dessert' },
      { name: 'Norwegian Cured Meats Platter' },
      { name: 'Roasted Pork Loin' },
      { name: 'Lefse with Lingonberry Jam' },
    ]
  },
  'ep-48': {
    tier: '$',
    items: [
      { name: 'Bavarian Pretzel with Cheese Sauce' },
      { name: 'Currywurst' },
      { name: 'German Beer' },
      { name: 'Bratwurst' },
      { name: 'Apple Strudel' },
      { name: 'German Riesling' },
    ]
  },
  'ep-49': {
    tier: '$',
    items: [
      { name: 'Macaron Ice Cream Sandwich' },
      { name: 'Croque Glace' },
      { name: 'Artisan Gelato' },
      { name: 'Sorbet' },
      { name: 'Affogato' },
      { name: 'Brioche Ice Cream Sandwich' },
      { name: 'Seasonal Sundae' },
    ]
  },
  'ep-50': {
    tier: '$$$',
    items: [
      { name: 'Filet Mignon' },
      { name: 'Bluehouse Salmon' },
      { name: 'Galaxy-Inspired Dessert' },
      { name: 'Space-Themed Mocktails' },
      { name: 'Prix Fixe Tasting Menu' },
      { name: 'Roasted Chicken' },
      { name: 'Seasonal Vegetable Plate' },
      { name: 'Constellation Cocktails (Lounge)' },
    ]
  },
  'ep-51': {
    tier: '$$$',
    items: [
      { name: 'Seafood Platter' },
      { name: 'Grilled Salmon' },
      { name: 'Lobster Bisque' },
      { name: 'Shrimp Pasta' },
      { name: 'Coconut Fried Shrimp' },
      { name: 'Seafood Boil' },
      { name: 'Key Lime Tart' },
      { name: 'Grilled Chicken Wings' },
    ]
  },
  'ep-52': {
    tier: '$$$',
    items: [
      { name: 'All-You-Care-To-Enjoy Family-Style Service' },
      { name: 'Garden-Grown Vegetables' },
      { name: 'Char-Grilled Beef Sirloin' },
      { name: 'Character Dining with Chip & Dale' },
      { name: 'Roasted Chicken' },
      { name: 'Honey-Glazed Salmon' },
      { name: 'Seasonal Salad' },
      { name: 'Harvest Pie' },
    ]
  },
  'ep-53': {
    tier: '$$',
    items: [
      { name: 'French Bistro Burger' },
      { name: 'Curry-Spiced Pizza' },
      { name: 'Asian Noodle Bowl' },
      { name: 'General Tso Chicken Salad' },
      { name: 'Starbucks Coffee & Espresso' },
      { name: 'Pepperoni Pizza' },
      { name: 'Grilled Chicken Sandwich' },
      { name: 'Seasonal Pastries' },
    ]
  },
  'ep-54': {
    tier: '$$',
    items: [
      { name: 'Rotisserie Chicken' },
      { name: 'Mongolian Beef' },
      { name: 'Birria Tacos' },
      { name: 'Plant-Based Bowls' },
      { name: 'Wood-Grilled Salmon' },
      { name: 'Asian Noodle Salad' },
      { name: 'Mickey-Shaped Macarons' },
      { name: 'Fresh Fruit & Cheese Plate' },
    ]
  },
  'ep-55': {
    tier: '$',
    items: [
      { name: 'Free Coca-Cola Flavor Sampling (international flavors)' },
      { name: 'Beverly (the infamous bitter sample)' },
      { name: 'Standard Fountain Drinks' },
      { name: 'Fanta Flavors from Around the World' },
      { name: 'Sprite Variants' },
    ]
  },
  'ep-56': {
    tier: '$$$',
    items: [
      { name: 'Tortilla Soup' },
      { name: 'Market Tacos' },
      { name: 'Fresh Corn Tortilla Skillets' },
      { name: 'Variety of Margaritas' },
      { name: 'Mole Poblano' },
      { name: 'Carnitas' },
      { name: 'Guacamole & Chips' },
      { name: 'Tres Leches Cake' },
    ]
  },
  'ep-57': {
    tier: '$',
    items: [
      { name: 'Tacos' },
      { name: 'Nachos' },
      { name: 'Mini Churros' },
      { name: 'Avocado Margarita' },
      { name: 'El Diablo Cocktail' },
      { name: 'Guacamole & Chips' },
      { name: 'Quesadilla' },
    ]
  },
  'ep-58': {
    tier: '$$$',
    items: [
      { name: 'Kung Pao Chicken' },
      { name: 'Sweet & Sour Pork' },
      { name: 'Beijing Duck' },
      { name: 'Egg Drop Soup' },
      { name: 'Mongolian Beef' },
      { name: 'Vegetable Spring Rolls' },
      { name: 'Fried Rice' },
      { name: 'Almond Cookies' },
    ]
  },
  'ep-59': {
    tier: '$',
    items: [
      { name: 'Egg Rolls' },
      { name: 'Potstickers' },
      { name: 'Orange Chicken' },
      { name: 'Chicken Fried Rice' },
      { name: 'Mongolian Beef' },
      { name: 'Vegetable Stir Fry' },
      { name: 'Wonton Soup' },
      { name: 'Fortune Cookie Dessert' },
    ]
  },
  'ep-60': {
    tier: '$$',
    items: [
      { name: 'Italian Wine Flights' },
      { name: 'Charcuterie & Cheese Boards' },
      { name: 'Bruschetta' },
      { name: 'Meatballs' },
      { name: 'Arancini (fried risotto balls)' },
      { name: 'Prosciutto & Melon' },
      { name: 'Italian Cocktails' },
    ]
  },
  'ep-61': {
    tier: '$$',
    items: [
      { name: 'Margherita Pizza' },
      { name: 'Quattro Formaggi Pizza' },
      { name: 'Caprese Salad' },
      { name: 'Tiramisu' },
      { name: 'Meatball Hero' },
      { name: 'Pepperoni Pizza' },
      { name: 'Italian Soda' },
    ]
  },
  'ep-62': {
    tier: '$$',
    items: [
      { name: 'Teriyaki Chicken Bowl' },
      { name: 'Sushi Combo' },
      { name: 'Udon Noodle Soup' },
      { name: 'Teriyaki Beef Bowl' },
      { name: 'Edamame' },
      { name: 'Miso Soup' },
      { name: 'Green Tea' },
    ]
  },
  'ep-63': {
    tier: '$',
    items: [
      { name: 'Kakigōri (Shaved Ice)' },
      { name: 'Snack Sushi' },
      { name: 'Frozen Kirin Beer' },
      { name: 'Sake (hot or cold)' },
      { name: 'Sake Cocktails' },
    ]
  },
  'ep-64': {
    tier: '$',
    items: [
      { name: 'Lamb Shawarma' },
      { name: 'Chicken Shawarma' },
      { name: 'Falafel' },
      { name: 'Festival-Rotating Specials' },
      { name: 'Hummus Plate' },
      { name: 'Moroccan Lemonade' },
      { name: 'Baklava' },
    ]
  },
  'ep-65': {
    tier: '$$$',
    items: [
      { name: 'French Onion Soup' },
      { name: 'Duck à l\'Orange' },
      { name: 'Crème Brûlée' },
      { name: 'Coq au Vin' },
      { name: 'Escargot' },
      { name: 'Beef Bourguignon' },
      { name: 'Croque Monsieur' },
      { name: 'French Wine Flight' },
    ]
  },
  'ep-66': {
    tier: '$$$',
    items: [
      { name: 'Prix Fixe Tasting Menu (fine dining)' },
      { name: 'Seasonal French Entrées' },
      { name: 'Wine Pairings' },
      { name: 'Foie Gras' },
      { name: 'Lobster Bisque' },
      { name: 'Soufflé' },
    ]
  },
  'ep-67': {
    tier: '$$',
    items: [
      { name: 'Smoked Salmon Galette' },
      { name: 'Pear & Chocolate Crêpe' },
      { name: 'Ham & Cheese Galette' },
      { name: 'Mushroom & Cheese Galette' },
      { name: 'Nutella Banana Crêpe' },
      { name: 'Cider Flight' },
      { name: 'Hot Chocolate' },
    ]
  },
  'ep-68': {
    tier: '$',
    items: [
      { name: 'Fish & Chips' },
      { name: 'Mushy Peas (side)' },
      { name: 'Malt Vinegar' },
      { name: 'Battered Cod' },
    ]
  },
  'ep-69': {
    tier: '$$$',
    items: [
      { name: 'Canadian Cheddar Cheese Soup' },
      { name: 'Filet Mignon' },
      { name: 'Maple Crème Brûlée' },
      { name: 'Canadian Whisky Flight' },
      { name: 'Signature Poutine' },
      { name: 'Steakhouse Wedge Salad' },
      { name: 'Butcher\'s Cuts (various steaks)' },
      { name: 'Canadian Icewine Flight' },
    ]
  },
  'ep-70': {
    tier: '$',
    items: [
      { name: 'Soft Pretzel with Beer Cheese' },
      { name: 'American Craft Beer Flight' },
      { name: 'Seasonal Cider' },
      { name: 'Bavarian Pretzel' },
    ]
  },
  'ep-71': {
    tier: '$',
    items: [
      { name: 'Poutine' },
      { name: 'Chicken Nuggets' },
      { name: 'Soft-Serve Ice Cream' },
      { name: 'Canadian Draft Beer' },
      { name: 'Maple Popcorn' },
    ]
  },
  'hs-15': {
    tier: '$',
    items: [
      { name: 'Blue Milk (plant-based)' },
      { name: 'Green Milk (plant-based)' },
    ]
  },
  'hs-16': {
    tier: '$',
    items: [
      { name: 'Ronto Wrap (pork & sausage, lunch/dinner)' },
      { name: 'Ronto Morning Wrap (sausage, eggs, cheese, breakfast)' },
      { name: 'Tatooine Sunset Cocktail' },
      { name: 'Yobshrimp Noodle Salad' },
    ]
  },
  'hs-17': {
    tier: '$$',
    items: [
      { name: 'Totchos (tater tot nachos)' },
      { name: 'Lunch Box Tart' },
      { name: 'BBQ Brisket Melt' },
      { name: 'Totchos with BBQ Pork' },
      { name: 'Cookies & Cream Milkshake' },
    ]
  },
  'hs-18': {
    tier: '$$',
    items: [
      { name: 'Fuzzy Tauntaun Cocktail' },
      { name: 'Jedi Mind Trick Cocktail' },
      { name: 'Outer Rim Cocktail' },
      { name: 'Yub Nub (non-alcoholic)' },
      { name: 'Batuu Bits (snack mix)' },
      { name: 'Smugglers Sampler' },
    ]
  },
  'hs-19': {
    tier: '$$',
    items: [
      { name: 'Mom\'s Old Fashioned Pot Roast' },
      { name: 'S\'Mores French Toast (breakfast)' },
      { name: 'Golden Fried Chicken' },
      { name: 'Meatloaf' },
      { name: 'Today\'s Vegetable Plate' },
      { name: 'S\'mores Milkshake' },
      { name: 'PB&J Milkshake' },
    ]
  },
  'hs-24': {
    tier: '$$',
    items: [
      { name: 'Felucian Garden Spread' },
      { name: 'Endorian Chicken "Tip Yip"' },
      { name: 'Batuu Beef Combo' },
      { name: 'Roasted Vegetable Salad' },
      { name: 'Galactic Lava Cake' },
    ]
  },
  'hs-25': {
    tier: '$$$',
    items: [
      { name: 'Famous Cobb Salad' },
      { name: 'Filet Mignon with Mushroom Risotto' },
      { name: 'Grilled Ōra King Salmon' },
      { name: 'Plant-Based Shepherd\'s Pie' },
      { name: 'Free Range Chicken & Dumplings' },
      { name: 'Grapefruit Cake' },
      { name: 'Orange-Hazelnut Chocolate Cake' },
      { name: 'Crème Brûlée' },
    ]
  },
  'hs-26': {
    tier: '$$',
    items: [
      { name: 'Feature Film Burger' },
      { name: 'Reuben Sandwich' },
      { name: 'Crispy Onion Rings' },
      { name: 'Pasta with Chicken or Shrimp' },
      { name: 'Smore\'s Shake' },
    ]
  },
  'hs-27': {
    tier: '$$$',
    items: [
      { name: 'Chicken alla Parmigiana' },
      { name: 'Spaghetti & Meatballs' },
      { name: 'Wood-Fired Pizza' },
      { name: 'Seafood Pasta' },
      { name: 'Mini Cannoli Trio' },
      { name: 'Tiramisu' },
    ]
  },
  'hs-28': {
    tier: '$$$',
    items: [
      { name: 'Character Dining Buffet (breakfast, lunch, dinner)' },
      { name: 'Carved Meats' },
      { name: 'Seasonal Salads' },
      { name: 'Kids\' Buffet Favorites' },
      { name: 'Mickey-Shaped Desserts' },
    ]
  },
  'hs-29': {
    tier: '$$',
    items: [
      { name: 'Shrimp & Pork Carnitas Tacos' },
      { name: 'Chicken Club Sandwich' },
      { name: 'Buffalo Chicken Grilled Cheese' },
      { name: 'Plant-Based California Burger' },
      { name: 'Watermelon Margarita' },
    ]
  },
  'hs-30': {
    tier: '$$',
    items: [
      { name: 'Cheeseburger' },
      { name: 'Chicken Strips & Fries' },
      { name: 'Teriyaki Chicken Bowl' },
      { name: 'Italian Sub Sandwich' },
      { name: 'Caesar Salad' },
      { name: 'Free Refills (fountain drinks)' },
    ]
  },
  'hs-31': {
    tier: '$$$',
    items: [
      { name: 'All-You-Care-To-Enjoy BBQ' },
      { name: 'Smoked Brisket' },
      { name: 'BBQ Pulled Pork' },
      { name: 'Cornbread' },
      { name: 'Mac & Cheese' },
      { name: 'Banana Pudding' },
    ]
  },
  'hs-32': {
    tier: '$$',
    items: [
      { name: 'Classic Burger' },
      { name: 'Plant-Based Burger' },
      { name: 'BBQ Bacon Cheeseburger' },
      { name: 'Loaded Fries' },
    ]
  },
  'hs-33': {
    tier: '$',
    items: [
      { name: 'Craft Beer Flight' },
      { name: 'Pretzel Bites' },
      { name: 'Charcuterie Board' },
      { name: 'Seasonal Cider' },
    ]
  },
  'hs-34': {
    tier: '$$',
    items: [
      { name: 'Pepperoni Flatbread' },
      { name: 'Cheese Pizza' },
      { name: 'Greek Salad' },
      { name: 'Caesar Salad with Chicken' },
    ]
  },
  'hs-35': {
    tier: '$$',
    items: [
      { name: 'Smoked Turkey Leg' },
      { name: 'BBQ Pork Sandwich' },
      { name: 'Onion Rings' },
      { name: 'Fountain Drinks' },
    ]
  },
  'hs-36': {
    tier: '$',
    items: [
      { name: 'Carrot Cake Whoopie Pie' },
      { name: 'Croissants' },
      { name: 'Specialty Coffee' },
      { name: 'Cupcakes' },
    ]
  },
  'hs-37': {
    tier: '$',
    items: [
      { name: 'All-Beef Hot Dog' },
      { name: 'Frozen Beverages' },
      { name: 'Soft Drinks' },
    ]
  },
  'hs-38': {
    tier: '$',
    items: [
      { name: 'Soft-Serve Ice Cream' },
      { name: 'Ice Cream Float' },
      { name: 'Sundaes' },
    ]
  },
  'ak-13': {
    tier: '$$',
    items: [
      { name: 'Half Slow-Smoked Chicken' },
      { name: 'Pulled Pork Sandwich' },
      { name: 'St. Louis Ribs' },
      { name: 'BBQ Combo Platter' },
      { name: 'Cornbread' },
      { name: 'Coleslaw' },
      { name: 'Mac & Cheese' },
      { name: 'Key Lime Pie' },
    ]
  },
  'ak-14': {
    tier: '$$',
    items: [
      { name: 'Chicken & Rice Bowl' },
      { name: 'Beef & Rice Bowl' },
      { name: 'Cheeseburger Pod' },
      { name: 'Vegetable & Tofu Bowl' },
      { name: 'Blueberry Cream Cheese Pod' },
      { name: 'Pandoran Sustainable Bowls' },
    ]
  },
  'ak-15': {
    tier: '$',
    items: [
      { name: 'Night Blossom (passionfruit & lemonade slush)' },
      { name: 'Hyper-Fizzy Porglyt Punch' },
      { name: 'Hibiscus Tea' },
    ]
  },
  'ak-16': {
    tier: '$$$',
    items: [
      { name: 'Signature Bread Service (Thai Red Curry Milk Bread & Pão de Queijo)' },
      { name: 'Tamarind-Braised Short Rib' },
      { name: 'North African-Spiced Tofu' },
      { name: 'Shrimp & Grits' },
      { name: 'Charred Lamb Chop' },
      { name: 'Plant-Based Tasting Menu' },
      { name: 'Coconut Tapioca Pudding' },
      { name: 'Wine Flights from Africa, Asia & South America' },
    ]
  },
  'ak-25': {
    tier: '$$$',
    items: [
      { name: 'Firecracker Shrimp' },
      { name: 'Chicken Tikka Masala' },
      { name: 'Ahi Tuna Nachos' },
      { name: 'Lo Mein' },
      { name: 'Korean Fried Chicken' },
      { name: 'Garlic Naan' },
      { name: 'Mango Pie' },
      { name: 'Yak Attack (frozen cocktail)' },
    ]
  },
  'ak-26': {
    tier: '$$',
    items: [
      { name: 'Pan-Asian Noodle Bowl' },
      { name: 'Pork Egg Rolls' },
      { name: 'Sweet & Sour Chicken' },
      { name: 'Honey Chicken' },
      { name: 'Vegetable Fried Rice' },
      { name: 'Mickey Pretzel' },
    ]
  },
  'ak-27': {
    tier: '$$$',
    items: [
      { name: 'Character Dining Buffet (breakfast, lunch, dinner)' },
      { name: 'Mickey & Simba Waffles (breakfast)' },
      { name: 'Spit-Roasted Tandoori Chicken' },
      { name: 'Berbere-Marinated Pork' },
      { name: 'Green Curry Shrimp' },
      { name: 'Doro Wat' },
      { name: 'Braised Beef Tajine' },
      { name: 'Peri-Peri Marinated Salmon' },
    ]
  },
  'ak-28': {
    tier: '$$',
    items: [
      { name: 'Harissa Chicken Wrap' },
      { name: 'Sausage & Peppers Pita' },
      { name: 'Chicken Skewers' },
      { name: 'Falafel Wrap' },
      { name: 'African-Spiced Corn on the Cob' },
      { name: 'Berry Fruit Plate' },
    ]
  },
  'ak-29': {
    tier: '$',
    items: [
      { name: 'Night Blossom (passionfruit & lemonade slush)' },
      { name: 'Specialty Frozen Cocktails' },
    ]
  },
  'ak-30': {
    tier: '$$',
    items: [
      { name: 'Tuna Poke Bowl' },
      { name: 'Cuban Frita Sliders' },
      { name: 'Tiffins Bread Service' },
      { name: 'Chicken Manchurian Nomad Bowl' },
      { name: 'Churros' },
      { name: 'Guava Margarita' },
      { name: 'The Night Monkey (cocktail)' },
      { name: 'Annapurna Zing (gin & passionfruit cocktail)' },
    ]
  },
  'ak-31': {
    tier: '$',
    items: [
      { name: 'Colossal Cinnamon Bun' },
      { name: 'Breakfast Sandwich' },
      { name: 'Pastries' },
      { name: 'Specialty Coffee' },
    ]
  },
  'ak-32': {
    tier: '$',
    items: [
      { name: 'Specialty Frozen Cocktails' },
      { name: 'Non-Alcoholic Frozen Drinks' },
      { name: 'Draft Beer' },
    ]
  },
  'dl-17': {
    tier: '$$$',
    items: [
      { name: 'Monte Cristo Sandwich' },
      { name: 'Roasted Chicken' },
      { name: 'Crescent City Salad' },
      { name: 'Filet Mignon' },
      { name: 'Seasonal Salad' },
      { name: 'Non-Alcoholic Mint Julep' },
      { name: 'Signature Hurricane Cocktail' },
      { name: 'Crème Brûlée' },
    ]
  },
  'dl-18': {
    tier: '$',
    items: [
      { name: 'Pineapple Dole Whip Cup' },
      { name: 'Pineapple Dole Whip Float' },
      { name: 'Pineapple Juice' },
    ]
  },
  'dl-19': {
    tier: '$',
    items: [
      { name: 'Non-Alcoholic Mint Julep' },
      { name: 'Lemonade' },
    ]
  },
  'dl-20': {
    tier: '$',
    items: [
      { name: 'Hand-Dipped Corn Dog' },
      { name: 'Chips' },
      { name: 'Cold Drinks' },
    ]
  },
  'dl-21': {
    tier: '$',
    items: [
      { name: 'Classic Churro' },
      { name: 'Seasonal Flavored Churros' },
    ]
  },
  'dl-22': {
    tier: '$',
    items: [
      { name: 'Ronto Wrap (pork & sausage)' },
      { name: 'Ronto Morning Wrap (breakfast)' },
      { name: 'Tatooine Sunset Cocktail' },
    ]
  },
  'dl-48': {
    tier: '$$$',
    items: [
      { name: 'Pommes Frites with Pulled Pork' },
      { name: 'Monte Cristo Sandwich' },
      { name: 'Farro with Mushrooms & Vegetables' },
      { name: 'Gumbo' },
      { name: 'Seasonal Beignets' },
      { name: 'Calamari' },
    ]
  },
  'dl-49': {
    tier: '$$$',
    items: [
      { name: 'Mickey Mouse-Shaped Waffles' },
      { name: 'Eggs Benedict' },
      { name: 'Pot Roast' },
      { name: 'Grilled Salmon' },
      { name: 'French Onion Soup' },
      { name: 'Seasonal Pie' },
    ]
  },
  'dl-50': {
    tier: '$$',
    items: [
      { name: 'Bao Buns' },
      { name: 'Chilled Ramen Salad' },
      { name: 'Sweet Pineapple Lumpia' },
      { name: 'Dole Whip Float' },
      { name: 'Dole Whip Swirl' },
    ]
  },
  'dl-51': {
    tier: '$$$',
    items: [
      { name: 'Fried Chicken Brunch' },
      { name: 'Pot Roast' },
      { name: 'Smokehouse BBQ Platter' },
      { name: 'Cornbread' },
      { name: 'Seasonal Cobbler' },
    ]
  },
  'dl-52': {
    tier: '$$',
    items: [
      { name: 'Carne Asada' },
      { name: 'Chicken Mole Poblano' },
      { name: 'Cheese Enchiladas' },
      { name: 'Tamales' },
      { name: 'Churro Bites' },
      { name: 'Horchata' },
    ]
  },
  'dl-53': {
    tier: '$$',
    items: [
      { name: 'Character Breakfast with Minnie & Friends' },
      { name: 'Omelets Cooked to Order' },
      { name: 'Signature Fried Chicken' },
      { name: 'Pot Roast' },
      { name: 'Penne Pasta' },
      { name: 'Seasonal Pie' },
    ]
  },
  'dl-54': {
    tier: '$',
    items: [
      { name: 'Fresh Pastries' },
      { name: 'Specialty Coffees' },
      { name: 'Sandwiches' },
      { name: 'Salads' },
      { name: 'Soups & Quiches' },
    ]
  },
  'dl-55': {
    tier: '$',
    items: [
      { name: 'Beef Skewers' },
      { name: 'Vegetable Skewers' },
      { name: 'Chicken Skewers' },
    ]
  },
  'dl-56': {
    tier: '$$',
    items: [
      { name: 'Bao Buns' },
      { name: 'Chilled Ramen Salad' },
      { name: 'Sweet Pineapple Lumpia' },
      { name: 'Dole Whip Float' },
      { name: 'Dole Whip Swirl' },
    ]
  },
  'dl-57': {
    tier: '$',
    items: [
      { name: 'Fried Chicken Sandwich' },
      { name: 'Loaded Fries' },
      { name: 'Root Beer Float' },
    ]
  },
  'dl-58': {
    tier: '$$',
    items: [
      { name: 'Pulled Pork Sandwich' },
      { name: 'Smoked Ribs' },
      { name: 'Plant-Based BBQ Option' },
      { name: 'Cornbread' },
      { name: 'Coleslaw' },
    ]
  },
  'dl-59': {
    tier: '$$',
    items: [
      { name: 'Lobster Roll' },
      { name: 'Tuna Salad Sandwich' },
      { name: 'Clam Chowder in a Sourdough Bowl' },
    ]
  },
  'dl-60': {
    tier: '$$',
    items: [
      { name: "Gaston's Grilled Chicken" },
      { name: 'Braised Short Rib' },
      { name: 'Mickey-Shaped Pretzel Bread' },
      { name: 'Seasonal Specialty Cake' },
    ]
  },
  'dl-61': {
    tier: '$$',
    items: [
      { name: 'Felucian Garden Spread' },
      { name: 'Endorian Chicken "Tip Yip"' },
      { name: 'Batuu Beef Combo' },
      { name: 'Galactic Lava Cake' },
    ]
  },
  'dl-62': {
    tier: '$$',
    items: [
      { name: 'Fuzzy Tauntaun Cocktail' },
      { name: 'Jedi Mind Trick Cocktail' },
      { name: 'Outer Rim Cocktail' },
      { name: 'Batuu Bits (snack mix)' },
      { name: 'Yub Nub (non-alcoholic)' },
    ]
  },
  'dca-16': {
    tier: '$',
    items: [
      { name: 'Cherry Cola Float' },
      { name: 'Root Beer Float' },
      { name: 'Classic Sundae' },
    ]
  },
  'dca-17': {
    tier: '$',
    items: [
      { name: 'Churro Toffee Sundae (seasonal)' },
      { name: 'Classic Churro' },
    ]
  },
  'dca-18': {
    tier: '$',
    items: [
      { name: 'Ice Cream Cones' },
      { name: 'Hot Fudge Sundae' },
      { name: 'Hot Chocolate' },
      { name: 'Milkshakes' },
    ]
  },
  'dca-19': {
    tier: '$$',
    items: [
      { name: 'All-Beef Hot Dog' },
      { name: 'Chili Cheese Dog' },
      { name: 'Bacon Wrapped Hot Dog' },
      { name: 'Loaded Fries' },
    ]
  },
  'dca-20': {
    tier: '$$$',
    items: [
      { name: 'Lobster Nachos' },
      { name: 'Salmon PLT' },
      { name: 'Honey Walnut Shrimp Wrap' },
      { name: 'Karaage-Inspired Crispy Chicken Sandwich' },
      { name: 'Baymax Macaron' },
      { name: 'Teriyaki Chicken' },
      { name: 'Brilliant Brunch Specials (weekends)' },
      { name: 'Signature Cocktails' },
    ]
  },
  'dca-33': {
    tier: '$$$',
    items: [
      { name: 'Ginger and Soy Glazed Tri Tip' },
      { name: 'California Asparagus Toast' },
      { name: 'Grilled Chicken Meatloaf' },
      { name: 'Pan Roasted Shrimp' },
      { name: 'Seasonal Starters' },
      { name: 'Kids\' Specialty Dishes' },
      { name: 'Indulgent Desserts' },
      { name: 'Retro Cocktails (Lounge)' },
    ]
  },
  'dca-34': {
    tier: '$$',
    items: [
      { name: "Flo's Famous Fried Chicken" },
      { name: 'French Toast with Salted Caramel & Bananas' },
      { name: 'Chicken Tamales with Scrambled Eggs' },
      { name: "Mack's Mac & Cheese" },
      { name: 'Micro Burgers' },
      { name: 'Club Sandwich' },
      { name: "Apple-Cheddar Pie-o-rama" },
      { name: "Flo's Classic Shakes" },
    ]
  },
  'dca-35': {
    tier: '$',
    items: [
      { name: 'Churro' },
      { name: 'Pretzel Bites' },
      { name: 'Soft-Serve Ice Cream' },
      { name: '"Route" Beer Float' },
      { name: 'Flavored Popcorn' },
      { name: 'Chili "Cone" Queso' },
      { name: 'Chimichanga' },
      { name: 'Breakfast Bread Cone with Bacon & Eggs' },
    ]
  },
  'dca-36': {
    tier: '$$',
    items: [
      { name: 'San Fransokyo Clam Chowder' },
      { name: 'Creamy Mac & Cheese' },
      { name: 'Chilled Shrimp Soba Noodle Salad' },
      { name: 'California Roll Sandwich' },
      { name: 'New Curry Dish' },
      { name: 'Katsu Sandwich' },
    ]
  },
  'dca-37': {
    tier: '$$',
    items: [
      { name: 'Carne Asada Tacos' },
      { name: 'QuesaBirria Tacos' },
      { name: 'Pollo Asado Tacos' },
      { name: 'San Fransokyo-Style Street Corn' },
      { name: 'Birria Tacos' },
      { name: 'Rice & Beans' },
    ]
  },
  'dca-38': {
    tier: '$$',
    items: [
      { name: 'Bulgogi Burrito' },
      { name: 'Birria Ramen' },
      { name: 'Chicken Sandwich' },
      { name: 'Udon Noodles' },
      { name: 'Asian-Inspired Bowls' },
    ]
  },
  'dca-39': {
    tier: '$$$',
    items: [
      { name: 'Lasagna' },
      { name: 'Grilled Sandwiches' },
      { name: 'Italian Soups' },
      { name: 'Pasta Selections' },
      { name: 'World of Color Dining Package available' },
    ]
  },
  'dca-40': {
    tier: '$$',
    items: [
      { name: '"Quantum-Sized" Tasting Plates' },
      { name: 'Pym-Inspired Specialty Dishes' },
      { name: 'Ant-Man Themed Cocktails' },
    ]
  },
  'dca-41': {
    tier: '$$',
    items: [
      { name: 'Mediterranean Skewers (Steak, Chicken, Meatballs, or Vegetable & Tofu)' },
      { name: 'Greek Salad' },
      { name: 'Seasonal Rotating Specials' },
    ]
  },
  'dca-42': {
    tier: '$$',
    items: [
      { name: 'Pepperoni Pizza' },
      { name: 'Cheese Pizza' },
      { name: 'Spaghetti & Meatballs' },
      { name: 'Caesar Salad' },
    ]
  },
  'dca-43': {
    tier: '$',
    items: [
      { name: 'Classic Corn Dog' },
      { name: 'Specialty Corn Dogs (seasonal flavors)' },
      { name: 'Mini Corn Dog Nuggets' },
    ]
  },
  'dca-44': {
    tier: '$',
    items: [
      { name: 'Giant Cookie Sandwich' },
      { name: 'Specialty Ice Cream Cookie Sandwiches' },
    ]
  },
  'dca-45': {
    tier: '$',
    items: [
      { name: "Dreyer's Ice Cream Cones" },
      { name: 'Chocolate-Dipped Ice Cream Bars' },
      { name: 'Sundaes' },
    ]
  },
  'dca-46': {
    tier: '$',
    items: [
      { name: 'Soft-Serve (seasonal flavors)' },
      { name: 'Frosted Treats' },
    ]
  },
};

const TYPICAL_SHOWTIMES = {
  'mk-15': ['2:00 PM'],
  'mk-16': ['Varies — check app, usually one nightly show at park close'],
  'mk-17': ['Continuous — runs all day, just walk up'],
  'mk-18': ['11:30 AM', '4:00 PM'],
  'hs-09': ['9:30 AM', '11:30 AM', '2:00 PM', '4:00 PM'],
  'hs-10': ['Varies — typically 1–2 shows nightly, check app'],
  'hs-21': ['Varies — multiple showtimes daily, check app'],
  'hs-12': ['Continuous throughout the day — just walk up'],
  'ep-15': ['9:00 PM (seasonal, check app for current schedule)'],
  'ak-08': ['11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'],
  'ak-17': ['Continuous throughout the day — just walk up'],
  'ak-12': ['After dark — short looping projections until close, seasonal Nov–March'],
  'ak-21': ['10:30 AM', '12:30 PM', '2:30 PM', '4:30 PM'],
  'dl-13': ['Varies — typically nightly, check app'],
  'dl-44': ['Multiple showtimes daily, check app'],
  'dl-15': ['Seasonal — check app for current run dates and time'],
  'dl-16': ['Varies — usually one nightly show, check app'],
  'dca-05': ['Varies — typically nightly, check app'],
  'dca-14': ['Continuous cavalcades throughout the day'],
  'dca-31': ['Multiple showtimes daily, check app'],
};

const SONG_PICKERS = {
  'ep-01': {
    label: 'Which song did you get?',
    options: [
      'September — Earth, Wind & Fire',
      'Disco Inferno — The Trammps',
      'Conga — Miami Sound Machine',
      'Everybody Wants to Rule the World — Tears for Fears',
      'I Ran — A Flock of Seagulls',
      'One Way or Another — Blondie',
    ]
  }
};

const RESORTS = [
  { id: 'wdw', name: 'Walt Disney World', shortName: 'Disney World', location: 'Orlando, FL', emoji: '🏰' },
  { id: 'dlr', name: 'Disneyland Resort', shortName: 'Disneyland', location: 'Anaheim, CA', emoji: '⭐' },
];

const PARKS = [
  {
    id: 'mk',
    resortId: 'wdw',
    name: 'Magic Kingdom',
    shortName: 'Magic Kingdom',
    resort: 'Walt Disney World · Orlando',
    emoji: '🏰',
    accentColor: '#1a6fd4',
    accentLight: '#e8f1fc',
    sections: [
      {
        name: 'Must-dos',
        items: [
          { id: 'mk-01', land: 'Fantasyland', name: 'Seven Dwarfs Mine Train', meta: 'Fantasyland · 38" min height', badge: 'thrill', must: true },
          { id: 'mk-02', land: 'Liberty Square', name: 'Haunted Mansion', meta: 'Liberty Square · all ages', badge: 'family', must: true },
          { id: 'mk-03', land: 'Adventureland', name: 'Pirates of the Caribbean', meta: 'Adventureland · all ages', badge: 'family', must: true },
          { id: 'mk-04', land: 'Tomorrowland', name: 'Space Mountain', meta: 'Tomorrowland · 44" min height', badge: 'thrill', must: true },
          { id: 'mk-05', land: 'Frontierland', name: 'Big Thunder Mountain Railroad', meta: 'Frontierland · 38" min height', badge: 'thrill', must: true, status: 'new' },
        ]
      },
      {
        name: 'Family rides',
        items: [
          { id: 'mk-06', land: 'Fantasyland', name: "It's a Small World", meta: 'Fantasyland · all ages', badge: 'family' },
          { id: 'mk-07', land: 'Tomorrowland', name: "Buzz Lightyear's Space Ranger Spin", meta: 'Tomorrowland · all ages', badge: 'family' },
          { id: 'mk-08', land: 'Adventureland', name: 'Jungle Cruise', meta: 'Adventureland · all ages', badge: 'family' },
          { id: 'mk-09', land: 'Fantasyland', name: 'The Many Adventures of Winnie the Pooh', meta: 'Fantasyland · all ages', badge: 'family' },
          { id: 'mk-10', land: 'Fantasyland', name: 'Dumbo the Flying Elephant', meta: 'Fantasyland · all ages', badge: 'family' },
          { id: 'mk-11', land: 'Tomorrowland', name: 'Tomorrowland Speedway', meta: 'Tomorrowland · 32" to ride, 54" to drive alone', badge: 'family' },
          { id: 'mk-12', land: 'Fantasyland', name: 'Under the Sea — Journey of the Little Mermaid', meta: 'Fantasyland · all ages', badge: 'family' },
          { id: 'mk-46', land: 'Fantasyland', name: "Peter Pan's Flight", meta: 'Fantasyland · all ages, flying galleon dark ride', badge: 'family' },
          { id: 'mk-47', land: 'Adventureland', name: 'The Magic Carpets of Aladdin', meta: 'Adventureland · all ages, spinning ride', badge: 'family' },
          { id: 'mk-48', land: 'Tomorrowland', name: 'Astro Orbiter', meta: 'Tomorrowland · all ages, elevated spinning rockets', badge: 'family' },
          { id: 'mk-49', land: 'Tomorrowland', name: 'Tomorrowland Transit Authority PeopleMover', meta: 'Tomorrowland · all ages, scenic elevated ride', badge: 'family' },
          { id: 'mk-50', land: 'Storybook Circus', name: 'The Barnstormer', meta: 'Storybook Circus · 35" min height, junior coaster', badge: 'family' },
          { id: 'mk-51', land: 'Main Street USA', name: 'Walt Disney World Railroad', meta: 'Main Street USA · all ages — currently shuttle mode, not full loop (construction)', badge: 'family' },
          { id: 'mk-52', land: 'Main Street USA', name: 'Main Street Vehicles', meta: 'Main Street USA · all ages, vintage cars', badge: 'family' },
          { id: 'mk-53', land: 'Adventureland', name: 'A Pirate\'s Adventure: Treasure of the Seven Seas', meta: 'Adventureland · all ages, interactive app-based treasure hunt', badge: 'family' },
          { id: 'mk-55', land: 'Adventureland', name: 'Swiss Family Treehouse', meta: 'Adventureland · all ages, walk-through treehouse', badge: 'family' },
          { id: 'mk-56', land: 'Fantasyland', name: "Enchanted Tales with Belle", meta: 'Fantasyland · all ages, interactive storytelling', badge: 'family' },
        ]
      },
      {
        name: 'Thrills',
        items: [
          { id: 'mk-13', land: 'Tomorrowland', name: 'TRON Lightcycle / Run', meta: 'Tomorrowland · 48" min height', badge: 'thrill' },
          { id: 'mk-14', land: 'Frontierland', name: 'Splash Mountain → Tiana\'s Bayou Adventure', meta: 'Frontierland · 40" min height', badge: 'thrill' },
        ]
      },
      {
        name: 'Shows & experiences',
        items: [
          { id: 'mk-15', land: 'Main Street USA', name: 'Festival of Fantasy Parade', meta: 'Check My Disney Experience for times', badge: 'show' },
          { id: 'mk-16', land: 'Main Street USA', name: 'Happily Ever After Fireworks', meta: 'Evenings — check schedule', badge: 'show' },
          { id: 'mk-17', land: 'Fantasyland', name: "Mickey's PhilharMagic", meta: 'Fantasyland · 4D film, all ages', badge: 'show' },
          { id: 'mk-18', land: 'Main Street USA', name: 'Move It! Shake It! MousekeDance It! Street Party', meta: 'Main Street USA · check times', badge: 'show' },
          { id: 'mk-57', land: 'Adventureland', name: "Walt Disney's Enchanted Tiki Room", meta: 'Adventureland · audio-animatronic show, all ages', badge: 'show' },
          { id: 'mk-58', land: 'Tomorrowland', name: 'Monsters, Inc. Laugh Floor', meta: 'Tomorrowland · interactive comedy show', badge: 'show' },
          { id: 'mk-59', land: 'Tomorrowland', name: 'Carousel of Progress', meta: 'Tomorrowland · classic rotating theater show', badge: 'show' },
          { id: 'mk-60', land: 'Liberty Square', name: 'The Hall of Presidents', meta: 'Liberty Square · audio-animatronic presidential show', badge: 'show' },
          { id: 'mk-61', land: 'Frontierland', name: 'Country Bear Musical Jamboree', meta: 'Frontierland · audio-animatronic musical show', badge: 'show' },
        ]
      },
      {
        name: 'Character meets',
        items: [
          { id: 'mk-19', land: 'Main Street USA', name: 'Mickey & Minnie at Town Square Theater', meta: 'Main Street USA · Lightning Lane available', badge: 'character' },
          { id: 'mk-20', land: 'Fantasyland', name: 'Cinderella & Elena at Princess Fairytale Hall', meta: 'Fantasyland · Lightning Lane available', badge: 'character' },
          { id: 'mk-21', land: 'Fantasyland', name: 'Rapunzel & Tiana at Princess Fairytale Hall', meta: 'Fantasyland · Lightning Lane available', badge: 'character' },
        ]
      },
      {
        name: 'Food & drink',
        items: [
          { id: 'mk-22', land: 'Adventureland', name: 'Dole Whip at Aloha Isle', meta: 'Adventureland · classic must-eat', badge: 'food', must: true },
          { id: 'mk-23', land: 'Fantasyland', name: 'Be Our Guest Restaurant', meta: 'Fantasyland · reservations required', badge: 'food' },
          { id: 'mk-24', land: 'Fantasyland', name: 'Smoked turkey leg', meta: 'Carts near Fantasyland & Frontierland', badge: 'food' },
          { id: 'mk-25', land: 'Main Street USA', name: "Casey's Corner hot dog", meta: 'Main Street USA', badge: 'food' },
          { id: 'mk-26', land: 'Liberty Square', name: 'Sleepy Hollow waffles', meta: 'Liberty Square · sweet & savory options', badge: 'food' },
          { id: 'mk-27', land: 'Frontierland', name: 'Pecos Bill Tall Tale Inn & Café', meta: 'Frontierland · Tex-Mex quick-service', badge: 'food' },
          { id: 'mk-28', land: 'Frontierland', name: 'Golden Oak Outpost', meta: 'Frontierland · quick snacks', badge: 'food' },
          { id: 'mk-29', land: 'Frontierland', name: 'Westward Ho', meta: 'Frontierland · frozen lemonade & snacks', badge: 'food' },
          { id: 'mk-30', land: 'Liberty Square', name: 'Liberty Tree Tavern', meta: 'Liberty Square · table-service American fare', badge: 'food' },
          { id: 'mk-31', land: 'Liberty Square', name: 'Liberty Square Market', meta: 'Liberty Square · frozen drinks & snacks', badge: 'food' },
          { id: 'mk-32', land: 'Fantasyland', name: "Cinderella's Royal Table", meta: 'Inside the castle · character dining, reservations essential', badge: 'food' },
          { id: 'mk-33', land: 'Main Street USA', name: 'The Crystal Palace', meta: 'Main Street USA · Winnie the Pooh character buffet', badge: 'food' },
          { id: 'mk-34', land: 'Main Street USA', name: "Tony's Town Square Restaurant", meta: 'Main Street USA · Lady and the Tramp Italian fare', badge: 'food' },
          { id: 'mk-35', land: 'Main Street USA', name: 'The Plaza Restaurant', meta: 'Main Street USA · table-service sandwiches & shakes', badge: 'food' },
          { id: 'mk-36', land: 'Adventureland', name: 'Jungle Navigation Co. Ltd Skipper Canteen', meta: 'Adventureland · adventurous table-service menu', badge: 'food' },
          { id: 'mk-37', land: 'Frontierland', name: 'The Diamond Horseshoe', meta: 'Frontierland · seasonal quick-service', badge: 'food', status: 'closed' },
          { id: 'mk-38', land: 'Liberty Square', name: 'Columbia Harbour House', meta: 'Liberty Square · seafood, quiet upstairs seating', badge: 'food' },
          { id: 'mk-39', land: 'Tomorrowland', name: "Cosmic Ray's Starlight Café", meta: 'Tomorrowland · burgers & live animatronic music', badge: 'food' },
          { id: 'mk-40', land: 'Main Street USA', name: 'Plaza Ice Cream Parlor', meta: 'Main Street USA · classic ice cream', badge: 'food' },
          { id: 'mk-41', land: 'Fantasyland', name: "Gaston's Tavern", meta: 'Fantasyland · cinnamon rolls & LeFou\'s Brew', badge: 'food' },
          { id: 'mk-42', land: 'Adventureland', name: 'Sunshine Tree Terrace', meta: 'Adventureland · Citrus Swirl soft-serve', badge: 'food' },
          { id: 'mk-43', land: 'Main Street USA', name: 'Main Street Bakery (Starbucks)', meta: 'Main Street USA · pastries & coffee', badge: 'food' },
          { id: 'mk-44', land: 'Fantasyland', name: 'Pinocchio Village Haus', meta: 'Fantasyland · flatbreads & pasta', badge: 'food' },
          { id: 'mk-45', land: 'Fantasyland', name: "The Friar's Nook", meta: 'Fantasyland · loaded tots & mac and cheese', badge: 'food' },
        ]
      }
    ]
  },

  {
    id: 'hs',
    resortId: 'wdw',
    name: 'Hollywood Studios',
    shortName: 'Hollywood Studios',
    resort: 'Walt Disney World · Orlando',
    emoji: '🎬',
    accentColor: '#b83230',
    accentLight: '#faeaea',
    sections: [
      {
        name: 'Must-dos',
        items: [
          { id: 'hs-01', land: 'Galaxy\'s Edge', name: 'Star Wars: Rise of the Resistance', meta: "Galaxy's Edge · 40\" min height", badge: 'thrill', must: true },
          { id: 'hs-02', land: 'Galaxy\'s Edge', name: 'Millennium Falcon: Smugglers Run', meta: "Galaxy's Edge · 38\" min height — new Mandalorian & Grogu missions May 2026", badge: 'thrill', must: true, status: 'new' },
          { id: 'hs-03', land: 'Toy Story Land', name: 'Slinky Dog Dash', meta: 'Toy Story Land · 38" min height', badge: 'thrill', must: true },
          { id: 'hs-04', land: 'Sunset Blvd', name: 'Tower of Terror', meta: 'Sunset Blvd · 40" min height', badge: 'thrill', must: true },
          { id: 'hs-05', land: 'Sunset Blvd', name: "Rock 'n' Roller Coaster Starring The Muppets", meta: 'Sunset Blvd · 48" min height — reopened May 26, 2026', badge: 'thrill', must: true, status: 'new' },
        ]
      },
      {
        name: 'Family rides',
        items: [
          { id: 'hs-06', land: 'Toy Story Land', name: 'Toy Story Mania!', meta: 'Toy Story Land · all ages', badge: 'family' },
          { id: 'hs-07', land: 'Toy Story Land', name: 'Alien Swirling Saucers', meta: 'Toy Story Land · 32" min height', badge: 'family' },
          { id: 'hs-08', land: 'Hollywood Blvd', name: 'Mickey & Minnie\'s Runaway Railway', meta: 'Hollywood Blvd (Chinese Theatre) · all ages', badge: 'family' },
          { id: 'hs-20', land: 'Echo Lake', name: 'Star Tours – The Adventures Continue', meta: 'Echo Lake · 40" min height, motion simulator', badge: 'family' },
        ]
      },
      {
        name: 'Shows & experiences',
        items: [
          { id: 'hs-09', land: 'Echo Lake', name: 'Indiana Jones Epic Stunt Spectacular', meta: 'Echo Lake · live stunt show, multiple times daily', badge: 'show' },
          { id: 'hs-10', land: 'Hollywood Hills Amphitheater', name: 'Fantasmic!', meta: 'Hollywood Hills Amphitheater · evenings, nightly', badge: 'show' },
          { id: 'hs-12', land: 'Echo Lake', name: 'For the First Time in Forever: A Frozen Sing-Along', meta: 'Echo Lake (Hyperion Theater) · all ages', badge: 'show' },
          { id: 'hs-21', land: 'Sunset Blvd', name: 'Disney Villains: Hocus Pocus & Wicked Ways', meta: 'Sunset Showcase theater · live stage show, opened May 2025', badge: 'show', status: 'new' },
          { id: 'hs-22', land: 'The Walt Disney Studios', name: 'Disney Jr. Mickey Mouse Clubhouse Live!', meta: 'The Walt Disney Studios · opened May 26, 2026', badge: 'show', status: 'new' },
          { id: 'hs-23', land: 'Animation Courtyard', name: 'Walt Disney Presents', meta: 'Animation Courtyard area · behind-the-scenes exhibit & film', badge: 'show' },
        ]
      },
      {
        name: "Galaxy's Edge",
        items: [
          { id: 'hs-13', land: 'Galaxy\'s Edge', name: 'Build a lightsaber at Savi\'s Workshop', meta: '~$260 · reservations required', badge: 'character' },
          { id: 'hs-14', land: 'Galaxy\'s Edge', name: 'Build a droid at Droid Depot', meta: '~$120 · walk-up or reservations', badge: 'character' },
        ]
      },
      {
        name: 'Food & drink',
        items: [
          { id: 'hs-15', land: 'Galaxy\'s Edge', name: 'Blue or green milk at Milk Stand', meta: "Galaxy's Edge · plant-based drinks", badge: 'food' },
          { id: 'hs-16', land: 'Galaxy\'s Edge', name: 'Ronto Wrap at Ronto Roasters', meta: "Galaxy's Edge · must-eat", badge: 'food', must: true },
          { id: 'hs-17', land: 'Toy Story Land', name: 'Tater tot nachos (Totchos) at Woody\'s Lunch Box', meta: 'Toy Story Land', badge: 'food' },
          { id: 'hs-18', land: 'Galaxy\'s Edge', name: "Oga's Cantina", meta: "Galaxy's Edge · reservations recommended, 21+ after 9pm", badge: 'food' },
          { id: 'hs-19', land: 'Echo Lake', name: "50's Prime Time Café", meta: 'Echo Lake · reservations suggested', badge: 'food' },
          { id: 'hs-24', land: 'Galaxy\'s Edge', name: 'Docking Bay 7 Food and Cargo', meta: "Galaxy's Edge · creative quick-service", badge: 'food' },
          { id: 'hs-25', land: 'Hollywood Blvd', name: 'Hollywood Brown Derby', meta: 'Hollywood Blvd · signature dining, the park\'s best food', badge: 'food' },
          { id: 'hs-26', land: 'Commissary Lane', name: 'Sci-Fi Dine-In Theater Restaurant', meta: 'Commissary Lane · eat inside a 1950s drive-in', badge: 'food' },
          { id: 'hs-27', land: 'Grand Avenue', name: 'Mama Melrose\'s Ristorante Italiano', meta: 'Grand Avenue · Italian table-service', badge: 'food' },
          { id: 'hs-28', land: 'Hollywood Blvd', name: 'Hollywood & Vine', meta: 'Hollywood Blvd · character dining', badge: 'food' },
          { id: 'hs-29', land: 'Commissary Lane', name: 'ABC Commissary', meta: 'Commissary Lane · studio-cafeteria quick-service', badge: 'food' },
          { id: 'hs-30', land: 'Echo Lake', name: 'Backlot Express', meta: 'Echo Lake · large quick-service, free refills', badge: 'food' },
          { id: 'hs-31', land: 'Toy Story Land', name: 'Roundup Rodeo BBQ', meta: 'Toy Story Land · all-you-care-to-enjoy BBQ', badge: 'food' },
          { id: 'hs-32', land: 'Sunset Blvd', name: 'Rosie\'s All-American Café', meta: 'Sunset Blvd · burgers & quick-service', badge: 'food' },
          { id: 'hs-33', land: 'Grand Avenue', name: 'Baseline Tap House', meta: 'Grand Avenue · craft beer & appetizers, relaxed', badge: 'food' },
          { id: 'hs-34', land: 'Sunset Blvd', name: 'Catalina Eddie\'s', meta: 'Sunset Blvd · pizza & flatbreads', badge: 'food' },
          { id: 'hs-35', land: 'Sunset Blvd', name: 'Fairfax Fare', meta: 'Sunset Blvd · BBQ & turkey legs', badge: 'food' },
          { id: 'hs-36', land: 'Hollywood Blvd', name: 'Starring Rolls Café', meta: 'Hollywood Blvd · pastries & coffee', badge: 'food' },
          { id: 'hs-37', land: 'Echo Lake', name: 'Min & Bill\'s Dockside Diner', meta: 'Echo Lake · hot dogs & frozen drinks', badge: 'food' },
          { id: 'hs-38', land: 'Echo Lake', name: 'Dinosaur Gertie\'s Ice Cream of Extinction', meta: 'Echo Lake · soft-serve kiosk', badge: 'food' },
        ]
      }
    ]
  },

  {
    id: 'ep',
    resortId: 'wdw',
    name: 'EPCOT',
    shortName: 'EPCOT',
    resort: 'Walt Disney World · Orlando',
    emoji: '🌍',
    accentColor: '#1a7a5e',
    accentLight: '#e4f5ef',
    sections: [
      {
        name: 'Must-dos',
        items: [
          { id: 'ep-01', land: 'World Discovery', name: 'Guardians of the Galaxy: Cosmic Rewind', meta: 'World Discovery · 42" min height', badge: 'thrill', must: true },
          { id: 'ep-02', land: 'World Showcase (France)', name: "Remy's Ratatouille Adventure", meta: 'World Showcase (France) · all ages', badge: 'family', must: true },
          { id: 'ep-03', land: 'World Showcase (Norway)', name: 'Frozen Ever After', meta: 'World Showcase (Norway) · all ages — refreshed animatronics Feb 2026', badge: 'family', must: true, status: 'new' },
          { id: 'ep-04', land: 'World Nature', name: 'Soarin\' Across America', meta: 'World Nature · 40" min height — new film as of May 2026', badge: 'family', must: true, status: 'new' },
          { id: 'ep-05', land: 'World Discovery', name: 'Test Track', meta: 'World Discovery · 40" min height — reimagined 2025', badge: 'thrill', must: true },
        ]
      },
      {
        name: 'More rides',
        items: [
          { id: 'ep-06', land: 'World Discovery', name: 'Mission: SPACE', meta: 'World Discovery · 40" min height · choose Orange or Green', badge: 'thrill' },
          { id: 'ep-07', land: 'World Celebration', name: 'Journey Into Imagination with Figment', meta: 'World Celebration · all ages', badge: 'family' },
          { id: 'ep-08', land: 'World Nature', name: 'Living with the Land', meta: 'World Nature · all ages', badge: 'family' },
          { id: 'ep-09', land: 'World Showcase (Mexico)', name: 'Gran Fiesta Tour Starring the Three Caballeros', meta: 'World Showcase (Mexico) · all ages', badge: 'family' },
          { id: 'ep-21', land: 'World Celebration', name: 'Spaceship Earth', meta: 'World Celebration · all ages, the park\'s icon ride', badge: 'family' },
        ]
      },
      {
        name: 'Shows & experiences',
        items: [
          { id: 'ep-15', land: 'World Showcase', name: 'Luminous: The Symphony of Us', meta: 'World Showcase Lagoon · nightly fireworks', badge: 'show' },
          { id: 'ep-22', land: 'World Celebration', name: 'Journey of Water, Inspired by Moana', meta: 'World Celebration · all ages, interactive water trail', badge: 'family' },
          { id: 'ep-23', land: 'World Showcase (USA)', name: 'The American Adventure', meta: 'World Showcase (USA) · 30-minute animatronic show', badge: 'show' },
          { id: 'ep-24', land: 'World Showcase (China)', name: 'Reflections of China', meta: 'World Showcase (China) · 360° Circle-Vision film', badge: 'show' },
          { id: 'ep-25', land: 'World Showcase (Canada)', name: 'Canada Far and Wide', meta: 'World Showcase (Canada) · Circle-Vision film', badge: 'show' },
          { id: 'ep-26', land: 'World Showcase (France)', name: 'Impressions de France', meta: 'World Showcase (France) · widescreen film', badge: 'show' },
          { id: 'ep-27', land: 'World Showcase (France)', name: 'Beauty and the Beast Sing-Along', meta: 'World Showcase (France) · all ages', badge: 'show' },
          { id: 'ep-28', land: 'World Nature', name: 'Turtle Talk with Crush', meta: 'World Nature (The Seas) · interactive show, all ages', badge: 'show' },
          { id: 'ep-29', land: 'World Nature', name: 'Awesome Planet', meta: 'World Nature (The Land) · 15-minute film', badge: 'show' },
          { id: 'ep-30', land: 'World Celebration', name: 'Mickey & Friends character meet', meta: 'World Celebration (CommuniCore Hall) · Lightning Lane available', badge: 'character' },
          { id: 'ep-31', land: 'World Celebration', name: 'Meet Figment', meta: 'World Celebration (ImageWorks) · limited hours daily', badge: 'character' },
          { id: 'ep-32', land: 'World Showcase (Norway)', name: 'Princess characters at Akershus', meta: 'World Showcase (Norway) · character dining', badge: 'character' },
          { id: 'ep-33', land: 'World Showcase (France)', name: 'Meet Belle', meta: 'World Showcase (France) · along the promenade', badge: 'character' },
          { id: 'ep-34', land: 'World Showcase (China)', name: 'Meet Mulan', meta: 'World Showcase (China) · inside the Great Hall', badge: 'character' },
          { id: 'ep-35', land: 'World Showcase (Morocco)', name: 'Meet Princess Jasmine', meta: 'World Showcase (Morocco)', badge: 'character' },
        ]
      },
      {
        name: 'World Showcase pavilions',
        items: [
          { id: 'ep-10', land: 'World Showcase (Mexico)', name: 'Mexico pavilion', meta: 'Pyramid, Gran Fiesta Tour & Mexico Folk Art Gallery', badge: 'food' },
          { id: 'ep-36', land: 'World Showcase (Norway)', name: 'Norway pavilion', meta: 'Frozen Ever After, Stave Church Gallery & Viking artifacts', badge: 'food' },
          { id: 'ep-37', land: 'World Showcase (China)', name: 'China pavilion', meta: 'Reflections of China film & House of Good Fortune shop', badge: 'food' },
          { id: 'ep-38', land: 'World Showcase (Germany)', name: 'Germany pavilion', meta: 'Biergarten, model train display & toy shops', badge: 'food' },
          { id: 'ep-39', land: 'World Showcase (Italy)', name: 'Italy pavilion', meta: 'Tutto Italia, Tutto Gusto Wine Cellar & street performers', badge: 'food' },
          { id: 'ep-11', land: 'World Showcase (Japan)', name: 'Japan pavilion', meta: 'Mitsukoshi department store, koi ponds & sake bar', badge: 'food' },
          { id: 'ep-40', land: 'World Showcase (Morocco)', name: 'Morocco pavilion', meta: 'Intricate tilework, Spice Road Table & Jasmine meet', badge: 'food' },
          { id: 'ep-12', land: 'World Showcase (France)', name: 'France pavilion', meta: 'Remy\'s Ratatouille Adventure, Les Halles & Eiffel Tower view', badge: 'food' },
          { id: 'ep-13', land: 'World Showcase (United Kingdom)', name: 'United Kingdom pavilion', meta: 'Rose & Crown Pub, gardens & Mary Poppins meet', badge: 'food' },
          { id: 'ep-14', land: 'World Showcase (Canada)', name: 'Canada pavilion', meta: 'Le Cellier steakhouse & Canada Far and Wide film', badge: 'food' },
        ]
      },
      {
        name: 'Food & drink',
        items: [
          { id: 'ep-16', land: 'World Showcase (Norway)', name: 'School bread at Kringla Bakeri (Norway)', meta: 'World Showcase · a EPCOT classic', badge: 'food', must: true },
          { id: 'ep-17', land: 'World Showcase (France)', name: 'Crepes at Les Halles (France)', meta: 'World Showcase', badge: 'food' },
          { id: 'ep-18', land: 'World Showcase (Canada)', name: 'Croissant donut at Refreshment Port', meta: 'Near Canada pavilion', badge: 'food' },
          { id: 'ep-19', land: 'World Showcase (United Kingdom)', name: 'Rose & Crown Pub (UK)', meta: 'Fish & chips & Guinness', badge: 'food' },
          { id: 'ep-20', land: 'World Showcase (Mexico)', name: 'Frozen margarita at La Cava del Tequila (Mexico)', meta: 'World Showcase · no reservation needed', badge: 'food' },
          { id: 'ep-41', land: 'World Showcase (Germany)', name: 'Biergarten Restaurant (Germany)', meta: 'Buffet-style German cuisine with live entertainment', badge: 'food' },
          { id: 'ep-42', land: 'World Showcase (Italy)', name: 'Tutto Italia Ristorante (Italy)', meta: 'Table-service handmade pasta', badge: 'food' },
          { id: 'ep-43', land: 'World Showcase (Mexico)', name: 'San Angel Inn Restaurante (Mexico)', meta: 'Table-service, twilight ambiance inside the pyramid', badge: 'food' },
          { id: 'ep-44', land: 'World Showcase (USA)', name: 'Regal Eagle Smokehouse (USA)', meta: 'Kansas City, Texas & Carolina-style BBQ', badge: 'food' },
          { id: 'ep-45', land: 'World Showcase (Japan)', name: 'Teppan Edo (Japan)', meta: 'Hibachi-style table-service dining', badge: 'food' },
          { id: 'ep-46', land: 'World Showcase (Morocco)', name: 'Spice Road Table (Morocco)', meta: 'Waterfront small plates & sangria', badge: 'food' },
          { id: 'ep-47', land: 'World Showcase (Norway)', name: 'Akershus Royal Banquet Hall (Norway)', meta: 'Character dining with Disney princesses', badge: 'food' },
          { id: 'ep-48', land: 'World Showcase (Germany)', name: 'Sommerfest pretzels (Germany)', meta: 'Quick-service, soft pretzels with cheese sauce', badge: 'food' },
          { id: 'ep-49', land: 'World Showcase (France)', name: 'L\'Artisan des Glaces (France)', meta: 'Macaron ice cream sandwiches & artisan gelato', badge: 'food' },
          { id: 'ep-50', land: 'World Discovery', name: 'Space 220', meta: 'World Discovery · "space station" dining with Earth views', badge: 'food' },
          { id: 'ep-51', land: 'World Nature', name: 'Coral Reef Restaurant', meta: 'World Nature (The Seas) · dine beside a real aquarium', badge: 'food' },
          { id: 'ep-52', land: 'World Nature', name: 'Garden Grill Restaurant', meta: 'World Nature (The Land) · character dining with Chip & Dale', badge: 'food' },
          { id: 'ep-53', land: 'World Celebration', name: 'Connections Cafe & Eatery', meta: 'World Celebration · Starbucks + globally-inspired quick-service', badge: 'food' },
          { id: 'ep-54', land: 'World Nature', name: 'Sunshine Seasons', meta: 'World Nature (The Land) · large food-court with fresh, healthy options', badge: 'food' },
          { id: 'ep-55', land: 'World Celebration', name: 'Club Cool', meta: 'World Celebration · free international Coca-Cola flavor sampling', badge: 'food' },
          { id: 'ep-56', land: 'World Showcase (Mexico)', name: 'La Hacienda de San Angel (Mexico)', meta: 'Lagoon-view table-service Mexican dining', badge: 'food' },
          { id: 'ep-57', land: 'World Showcase (Mexico)', name: 'La Cantina de San Angel (Mexico)', meta: 'Quick-service tacos by the water', badge: 'food' },
          { id: 'ep-58', land: 'World Showcase (China)', name: 'Nine Dragons Restaurant (China)', meta: 'Table-service Chinese cuisine', badge: 'food' },
          { id: 'ep-59', land: 'World Showcase (China)', name: 'Lotus Blossom Café (China)', meta: 'Quick-service egg rolls, potstickers & orange chicken', badge: 'food' },
          { id: 'ep-60', land: 'World Showcase (Italy)', name: 'Tutto Gusto Wine Cellar (Italy)', meta: 'Over 200 Italian wines & small plates', badge: 'food' },
          { id: 'ep-61', land: 'World Showcase (Italy)', name: 'Via Napoli Ristorante e Pizzeria (Italy)', meta: 'Wood-fired Neapolitan pizza', badge: 'food' },
          { id: 'ep-62', land: 'World Showcase (Japan)', name: 'Katsura Grill (Japan)', meta: 'Quiet garden-side teriyaki & sushi bowls', badge: 'food' },
          { id: 'ep-63', land: 'World Showcase (Japan)', name: 'Kabuki Café (Japan)', meta: 'Shaved ice (kakigōri) & frozen Kirin beer', badge: 'food' },
          { id: 'ep-64', land: 'World Showcase (Morocco)', name: 'Tangierine Café (Morocco)', meta: 'Quick-service lamb & chicken dishes, rotating festival menu', badge: 'food' },
          { id: 'ep-65', land: 'World Showcase (France)', name: 'Chefs de France', meta: 'Table-service French bistro classics', badge: 'food' },
          { id: 'ep-66', land: 'World Showcase (France)', name: 'Monsieur Paul', meta: 'Upscale fine-dining French cuisine', badge: 'food' },
          { id: 'ep-67', land: 'World Showcase (France)', name: 'La Crêperie de Paris', meta: 'Sit-down sweet & savory crêpes', badge: 'food' },
          { id: 'ep-68', land: 'World Showcase (United Kingdom)', name: 'Yorkshire County Fish Shop (UK)', meta: 'Quick-service fish & chips window', badge: 'food' },
          { id: 'ep-69', land: 'World Showcase (Canada)', name: 'Le Cellier Steakhouse (Canada)', meta: 'Table-service steakhouse, one of the hardest EPCOT reservations', badge: 'food' },
          { id: 'ep-70', land: 'World Showcase (USA)', name: 'Block & Hans (USA)', meta: 'Pretzels & American craft beer kiosk', badge: 'food' },
          { id: 'ep-71', land: 'World Showcase (Canada)', name: 'Refreshment Port (near Canada)', meta: 'Poutine, chicken nuggets & soft-serve', badge: 'food' },
        ]
      }
    ]
  },

  {
    id: 'ak',
    resortId: 'wdw',
    name: 'Animal Kingdom',
    shortName: 'Animal Kingdom',
    resort: 'Walt Disney World · Orlando',
    emoji: '🦁',
    accentColor: '#4a7c2f',
    accentLight: '#eaf4e2',
    sections: [
      {
        name: 'Must-dos',
        items: [
          { id: 'ak-01', land: 'Pandora', name: 'Avatar Flight of Passage', meta: 'Pandora · 44" min height', badge: 'thrill', must: true },
          { id: 'ak-02', land: 'Africa', name: 'Kilimanjaro Safaris', meta: 'Africa · all ages · go early for best animal sightings', badge: 'family', must: true },
          { id: 'ak-03', land: 'Asia', name: 'Expedition Everest', meta: 'Asia · 44" min height', badge: 'thrill', must: true },
        ]
      },
      {
        name: 'More rides',
        items: [
          { id: 'ak-04', land: 'Pandora', name: "Na'vi River Journey", meta: 'Pandora · all ages', badge: 'family' },
          { id: 'ak-05', land: 'Asia', name: 'Kali River Rapids', meta: 'Asia · 38" min height · you will get soaked', badge: 'thrill' },
        ]
      },
      {
        name: 'Shows & trails',
        items: [
          { id: 'ak-08', land: 'Africa', name: 'Festival of the Lion King', meta: 'Africa · 30-minute live musical & acrobatic show', badge: 'show' },
          { id: 'ak-17', land: 'Discovery Island', name: 'Zootopia: Better Zoogether!', meta: 'Discovery Island (Tree of Life Theater) · 4D film, opened Nov 2025', badge: 'show', status: 'new' },
          { id: 'ak-10', land: 'Africa', name: 'Gorilla Falls Exploration Trail', meta: 'Africa · walk-through, all ages', badge: 'family' },
          { id: 'ak-11', land: 'Asia', name: 'Maharajah Jungle Trek', meta: 'Asia · tigers, bats & birds', badge: 'family' },
          { id: 'ak-12', land: 'Discovery Island', name: 'Tree of Life Awakenings', meta: 'Discovery Island · evening projections, seasonal (mid-Nov to early March)', badge: 'show' },
          { id: 'ak-18', land: 'Discovery Island', name: "Wilderness Explorers", meta: 'Park-wide · self-guided badge-earning activity, all ages', badge: 'family' },
          { id: 'ak-19', land: 'Africa', name: "Bluey's Wild World", meta: 'Conservation Station · opened May 26, 2026 — virtual queue required', badge: 'family', status: 'new' },
          { id: 'ak-20', land: 'Africa', name: 'Wildlife Express Train', meta: 'Africa (Harambe Station) · only way to reach Conservation Station', badge: 'family' },
          { id: 'ak-21', land: 'Asia', name: 'Feathered Friends in Flight!', meta: 'Asia (Caravan Stage) · live bird show', badge: 'show' },
          { id: 'ak-22', land: 'Discovery Island', name: 'Adventurers Outpost', meta: 'Discovery Island · meet Mickey & Minnie', badge: 'character' },
          { id: 'ak-23', land: 'Asia', name: 'Habitat Habit!', meta: 'Asia · self-guided cotton-top tamarin exhibit', badge: 'family' },
          { id: 'ak-24', land: 'Discovery Island', name: 'Oasis Exhibits', meta: 'Park entrance · giant anteaters, swamp wallabies & more', badge: 'family' },
        ]
      },
      {
        name: 'Food & drink',
        items: [
          { id: 'ak-13', land: 'Discovery Island', name: 'Flame Tree Barbecue', meta: 'Discovery Island · best views in the park', badge: 'food', must: true },
          { id: 'ak-14', land: 'Pandora', name: "Satu'li Canteen", meta: 'Pandora · healthy bowls & great theming', badge: 'food' },
          { id: 'ak-15', land: 'Pandora', name: 'Night Blossom at Pongu Pongu', meta: 'Pandora · passionfruit & lemonade slush', badge: 'food' },
          { id: 'ak-16', land: 'Discovery Island', name: 'Tiffins Restaurant', meta: 'Discovery Island · signature dining, reservations required', badge: 'food' },
          { id: 'ak-25', land: 'Asia', name: 'Yak & Yeti Restaurant', meta: 'Asia · table-service Pan-Asian cuisine', badge: 'food' },
          { id: 'ak-26', land: 'Asia', name: 'Yak & Yeti Local Food Cafes', meta: 'Asia · quick-service counterpart to the restaurant', badge: 'food' },
          { id: 'ak-27', land: 'Africa', name: 'Tusker House Restaurant', meta: 'Africa · character dining buffet with Donald & friends', badge: 'food' },
          { id: 'ak-28', land: 'Africa', name: 'Harambe Market', meta: 'Africa · African-inspired quick-service stalls', badge: 'food' },
          { id: 'ak-29', land: 'Pandora', name: "Pongu Pongu", meta: 'Pandora · specialty drinks & frozen cocktails', badge: 'food' },
          { id: 'ak-30', land: 'Discovery Island', name: 'Nomad Lounge', meta: 'Discovery Island · craft cocktails & small plates, scenic seating', badge: 'food' },
          { id: 'ak-31', land: 'Africa', name: "Kusafiri Coffee Shop & Bakery", meta: 'Africa · pastries & coffee', badge: 'food' },
          { id: 'ak-32', land: 'Asia', name: 'Drinkwallah', meta: 'Asia · specialty non-alcoholic & alcoholic frozen drinks', badge: 'food' },
        ]
      }
    ]
  },

  {
    id: 'dl',
    resortId: 'dlr',
    name: 'Disneyland',
    shortName: 'Disneyland',
    resort: 'Disneyland Resort · Anaheim',
    emoji: '⭐',
    accentColor: '#5a3fa0',
    accentLight: '#eeebf8',
    sections: [
      {
        name: 'Must-dos',
        items: [
          { id: 'dl-01', land: 'Adventureland', name: 'Indiana Jones Adventure', meta: 'Adventureland · 46" min height', badge: 'thrill', must: true },
          { id: 'dl-02', land: 'Fantasyland', name: "It's a Small World (the original)", meta: 'Fantasyland · all ages — the one that started it all', badge: 'family', must: true },
          { id: 'dl-03', land: 'Galaxy\'s Edge', name: 'Star Wars: Rise of the Resistance', meta: "Galaxy's Edge · 40\" min height", badge: 'thrill', must: true },
          { id: 'dl-04', land: 'New Orleans Square', name: 'Haunted Mansion', meta: 'New Orleans Square · all ages', badge: 'family', must: true },
          { id: 'dl-05', land: 'New Orleans Square', name: 'Pirates of the Caribbean', meta: 'New Orleans Square · all ages — the original!', badge: 'family', must: true },
          { id: 'dl-06', land: 'Fantasyland', name: 'Matterhorn Bobsleds', meta: 'Fantasyland · 35" min height', badge: 'thrill', must: true },
        ]
      },
      {
        name: 'Classic Disneyland',
        items: [
          { id: 'dl-07', land: 'Bayou Country', name: "Tiana's Bayou Adventure", meta: 'Bayou Country (formerly Critter Country) · 40" min height · you will get wet', badge: 'family' },
          { id: 'dl-08', land: 'Tomorrowland', name: 'Space Mountain', meta: 'Tomorrowland · 40" min height', badge: 'thrill' },
          { id: 'dl-09', land: 'Frontierland', name: 'Big Thunder Mountain Railroad', meta: 'Frontierland · 40" min height', badge: 'thrill' },
          { id: 'dl-10', land: 'Fantasyland', name: "Peter Pan's Flight", meta: 'Fantasyland · all ages', badge: 'family' },
          { id: 'dl-11', land: 'Adventureland', name: 'Jungle Cruise', meta: 'Adventureland · all ages', badge: 'family' },
          { id: 'dl-12', land: 'Galaxy\'s Edge', name: 'Millennium Falcon: Smugglers Run', meta: "Galaxy's Edge · 38\" min height", badge: 'thrill' },
          { id: 'dl-23', land: 'Fantasyland', name: "Mr. Toad's Wild Ride", meta: 'Fantasyland · all ages', badge: 'family' },
          { id: 'dl-24', land: 'Fantasyland', name: "Snow White's Enchanted Wish", meta: 'Fantasyland · all ages', badge: 'family' },
          { id: 'dl-25', land: 'Fantasyland', name: "Alice in Wonderland", meta: 'Fantasyland · all ages', badge: 'family' },
          { id: 'dl-26', land: 'Fantasyland', name: "Pinocchio's Daring Journey", meta: 'Fantasyland · all ages', badge: 'family' },
          { id: 'dl-27', land: 'Fantasyland', name: 'King Arthur Carrousel', meta: 'Fantasyland · all ages', badge: 'family' },
          { id: 'dl-28', land: 'Fantasyland', name: 'Mad Tea Party', meta: 'Fantasyland · all ages, spinning teacups', badge: 'family' },
          { id: 'dl-29', land: 'Fantasyland', name: 'Dumbo the Flying Elephant', meta: 'Fantasyland · all ages', badge: 'family' },
          { id: 'dl-30', land: 'Fantasyland', name: 'Casey Jr. Circus Train', meta: 'Fantasyland · all ages', badge: 'family' },
          { id: 'dl-31', land: 'Fantasyland', name: 'Storybook Land Canal Boats', meta: 'Fantasyland · all ages, miniature scenes', badge: 'family' },
          { id: 'dl-32', land: 'Tomorrowland', name: 'Astro Orbitor', meta: 'Tomorrowland · all ages, spinning rockets near entrance', badge: 'family' },
          { id: 'dl-33', land: 'Tomorrowland', name: 'Autopia', meta: 'Tomorrowland · 32" to ride, 52" to drive alone', badge: 'family' },
          { id: 'dl-34', land: 'Tomorrowland', name: 'Buzz Lightyear Astro Blasters', meta: 'Tomorrowland · all ages, interactive shooting dark ride', badge: 'family' },
          { id: 'dl-35', land: 'Main Street USA', name: "Disneyland Railroad", meta: 'Main Street USA · all ages, steam train loop around the park', badge: 'family' },
          { id: 'dl-36', land: 'Main Street USA', name: 'Main Street Vehicles', meta: 'Main Street USA · all ages, limited operating hours', badge: 'family' },
          { id: 'dl-37', land: 'Frontierland', name: 'Mark Twain Riverboat', meta: 'Frontierland · all ages, scenic riverboat', badge: 'family' },
          { id: "dl-38", land: 'Frontierland', name: 'Sailing Ship Columbia', meta: 'Frontierland · all ages, tall ship (seasonal hours)', badge: 'family' },
          { id: 'dl-39', land: 'Frontierland', name: "Pirate's Lair on Tom Sawyer Island", meta: 'Frontierland · all ages, walk-through exploration island', badge: 'family' },
          { id: 'dl-40', land: 'Bayou Country', name: "Davy Crockett's Explorer Canoes", meta: 'Bayou Country · all ages, guest-paddled canoe ride, seasonal hours', badge: 'family' },
          { id: 'dl-41', land: 'Mickey\'s Toontown', name: "Mickey & Minnie's Runaway Railway", meta: 'Mickey\'s Toontown · all ages, trackless dark ride', badge: 'family' },
          { id: 'dl-42', land: 'Mickey\'s Toontown', name: "Roger Rabbit's Car Toon Spin", meta: 'Mickey\'s Toontown · all ages, spinning dark ride', badge: 'family' },
          { id: "dl-43", land: "Mickey's Toontown", name: "Chip 'n' Dale's GADGETcoaster", meta: 'Mickey\'s Toontown · 35" min height, family coaster', badge: 'family' },
        ]
      },
      {
        name: 'Shows & experiences',
        items: [
          { id: 'dl-13', land: 'Frontierland', name: 'Fantasmic!', meta: 'Rivers of America · evenings, check schedule', badge: 'show' },
          { id: 'dl-15', land: 'Main Street USA', name: 'Main Street Electrical Parade', meta: 'Check schedule — seasonal', badge: 'show' },
          { id: 'dl-16', land: 'Main Street USA', name: 'Disneyland Forever Fireworks', meta: 'Check schedule', badge: 'show' },
          { id: 'dl-44', land: 'Fantasyland', name: "Bluey's Best Day Ever!", meta: 'Fantasyland Theatre · opened March 22, 2026', badge: 'show', status: 'new' },
          { id: 'dl-45', land: 'Main Street USA', name: 'Great Moments with Mr. Lincoln', meta: 'Main Street USA (Disneyland Story) · animatronic theater presentation', badge: 'show' },
          { id: 'dl-46', land: 'Frontierland', name: 'Frontierland Shootin\' Exposition', meta: 'Frontierland · interactive shooting gallery, small fee', badge: 'family' },
          { id: 'dl-47', land: 'Fantasyland', name: "Sleeping Beauty Castle Walkthrough", meta: 'Fantasyland · all ages, walk-through diorama', badge: 'family' },
        ]
      },
      {
        name: 'Food & drink',
        items: [
          { id: 'dl-17', land: 'New Orleans Square', name: 'Monte Cristo at Blue Bayou', meta: 'New Orleans Square · reservations suggested', badge: 'food', must: true },
          { id: 'dl-18', land: 'Adventureland', name: 'Dole Whip at Tiki Juice Bar', meta: 'Adventureland · the original Disneyland Dole Whip', badge: 'food', must: true },
          { id: 'dl-19', land: 'New Orleans Square', name: 'Mint julep at Royal Street Veranda', meta: 'New Orleans Square · non-alcoholic', badge: 'food' },
          { id: 'dl-20', land: 'Main Street USA', name: 'Corn dog at Little Red Wagon', meta: 'Main Street USA · Disneyland institution', badge: 'food' },
          { id: 'dl-21', land: 'Main Street USA', name: 'Churro from a cart', meta: 'Available throughout the park', badge: 'food' },
          { id: 'dl-22', land: 'Galaxy\'s Edge', name: 'Ronto Wrap at Ronto Roasters', meta: "Galaxy's Edge", badge: 'food' },
          { id: 'dl-48', land: 'New Orleans Square', name: 'Cafe Orleans', meta: 'New Orleans Square · table-service, less formal than Blue Bayou', badge: 'food' },
          { id: 'dl-49', land: 'Main Street USA', name: 'Carnation Cafe', meta: 'Main Street USA · table-service American comfort food', badge: 'food' },
          { id: 'dl-50', land: 'New Orleans Square', name: "Tiana's Palace", meta: 'New Orleans Square · quick-service Creole-inspired fare', badge: 'food' },
          { id: 'dl-51', land: 'Frontierland', name: 'River Belle Terrace', meta: 'Frontierland · table-service, hearty American brunch', badge: 'food' },
          { id: 'dl-52', land: 'Frontierland', name: 'Rancho del Zócalo Restaurante', meta: 'Frontierland · quick-service Mexican', badge: 'food' },
          { id: 'dl-53', land: 'Main Street USA', name: 'Plaza Inn', meta: 'Main Street USA · character breakfast, fried chicken & pot roast', badge: 'food' },
          { id: 'dl-54', land: 'Main Street USA', name: 'Jolly Holiday Bakery Cafe', meta: 'Main Street USA · pastries, sandwiches & coffee', badge: 'food' },
          { id: 'dl-55', land: 'Adventureland', name: 'Bengal Barbecue', meta: 'Adventureland · skewers, quick-service snack', badge: 'food' },
          { id: 'dl-56', land: 'Adventureland', name: 'The Tropical Hideaway', meta: 'Adventureland · bao buns & Dole Whip variations', badge: 'food' },
          { id: 'dl-57', land: 'Frontierland', name: 'Golden Horseshoe', meta: 'Frontierland · quick-service with live entertainment', badge: 'food' },
          { id: 'dl-58', land: 'Bayou Country', name: 'Hungry Bear Restaurant', meta: 'Bayou Country · BBQ quick-service', badge: 'food' },
          { id: 'dl-59', land: 'Bayou Country', name: 'Harbour Galley', meta: 'Bayou Country · seafood, clam chowder & lobster roll', badge: 'food' },
          { id: 'dl-60', land: 'Fantasyland', name: 'Red Rose Taverne', meta: "Fantasyland · Beauty and the Beast-themed quick-service", badge: 'food' },
          { id: 'dl-61', land: 'Galaxy\'s Edge', name: "Docking Bay 7 Food and Cargo", meta: "Galaxy's Edge · creative quick-service", badge: 'food' },
          { id: 'dl-62', land: 'Galaxy\'s Edge', name: "Oga's Cantina", meta: "Galaxy's Edge · themed lounge, reservations recommended", badge: 'food' },
        ]
      }
    ]
  },

  {
    id: 'dca',
    resortId: 'dlr',
    name: 'Disney California Adventure',
    shortName: 'California Adventure',
    resort: 'Disneyland Resort · Anaheim',
    emoji: '🎡',
    accentColor: '#d4651a',
    accentLight: '#fbeee2',
    sections: [
      {
        name: 'Must-dos',
        items: [
          { id: 'dca-01', land: 'Cars Land', name: 'Radiator Springs Racers', meta: 'Cars Land · 40" min height', badge: 'thrill', must: true },
          { id: 'dca-02', land: 'Avengers Campus', name: 'Guardians of the Galaxy – Mission: BREAKOUT!', meta: 'Avengers Campus · 40" min height', badge: 'thrill', must: true },
          { id: 'dca-03', land: 'Avengers Campus', name: 'WEB SLINGERS: A Spider-Man Adventure', meta: 'Avengers Campus · all ages', badge: 'family', must: true },
          { id: 'dca-04', land: 'Pixar Pier', name: 'Incredicoaster', meta: 'Pixar Pier · 48" min height', badge: 'thrill', must: true },
          { id: 'dca-06', land: 'Grizzly Peak', name: 'Soarin\' Around the World', meta: 'Grizzly Peak · 40" min height', badge: 'family', must: true },
        ]
      },
      {
        name: 'More rides',
        items: [
          { id: 'dca-07', land: 'Grizzly Peak', name: 'Grizzly River Run', meta: 'Grizzly Peak · 42" min height · you will get wet', badge: 'thrill' },
          { id: 'dca-08', land: 'Paradise Gardens Park', name: 'Goofy\'s Sky School', meta: 'Paradise Gardens Park · 42" min height', badge: 'thrill' },
          { id: 'dca-09', land: 'Pixar Pier', name: 'Pixar Pal-A-Round (swinging gondola)', meta: 'Pixar Pier · 40" min height', badge: 'family' },
          { id: 'dca-10', land: 'Pixar Pier', name: 'Toy Story Midway Mania!', meta: 'Pixar Pier · all ages', badge: 'family' },
          { id: 'dca-11', land: 'Hollywood Land', name: 'Monsters, Inc. Mike & Sulley to the Rescue!', meta: 'Hollywood Land · all ages — closing 2027', badge: 'family' },
          { id: 'dca-21', land: 'Cars Land', name: "Luigi's Rollickin' Roadsters", meta: 'Cars Land · all ages, gliding & spinning ride', badge: 'family' },
          { id: 'dca-22', land: 'Cars Land', name: "Mater's Junkyard Jamboree", meta: 'Cars Land · all ages, bumper-car-style spinner', badge: 'family' },
          { id: 'dca-23', land: 'Paradise Gardens Park', name: "The Little Mermaid – Ariel's Undersea Adventure", meta: 'Paradise Gardens Park · all ages', badge: 'family' },
          { id: 'dca-24', land: 'Paradise Gardens Park', name: 'Silly Symphony Swings', meta: 'Paradise Gardens Park · 40" min height, swinging ride', badge: 'thrill' },
          { id: 'dca-25', land: 'Paradise Gardens Park', name: 'Golden Zephyr', meta: 'Paradise Gardens Park · 40" min height, spinning rocket ride', badge: 'family' },
          { id: 'dca-26', land: 'Paradise Gardens Park', name: 'Jumpin\' Jellyfish', meta: 'Paradise Gardens Park · 40" min height, gentle parachute drop', badge: 'family' },
          { id: 'dca-27', land: 'Pixar Pier', name: "Jessie's Critter Carousel", meta: 'Pixar Pier · all ages, classic carousel', badge: 'family' },
          { id: 'dca-28', land: 'Pixar Pier', name: 'Inside Out Emotional Whirlwind', meta: 'Pixar Pier · all ages, spinning ride', badge: 'family' },
          { id: 'dca-29', land: 'Grizzly Peak', name: 'Redwood Creek Challenge Trail', meta: 'Grizzly Peak · all ages, climbing & play area', badge: 'family' },
        ]
      },
      {
        name: 'Avengers Campus',
        items: [
          { id: 'dca-12', land: 'Avengers Campus', name: 'Avengers Headquarters meet-and-greets', meta: 'Spider-Man, Black Panther & more', badge: 'character' },
          { id: 'dca-13', land: 'Avengers Campus', name: 'WEB Suppliers shopping', meta: 'Avengers Campus · merch & props', badge: 'family' },
          { id: 'dca-30', land: 'Avengers Campus', name: 'Doctor Strange at the Sanctum', meta: 'Avengers Campus · live character experience', badge: 'character' },
        ]
      },
      {
        name: 'Shows & entertainment',
        items: [
          { id: 'dca-05', land: 'Paradise Gardens Park', name: 'World of Color – Happiness!', meta: 'Paradise Bay · evenings, currently themed to Encanto/Turning Red/Inside Out', badge: 'show' },
          { id: 'dca-14', land: 'Buena Vista Street', name: 'Pixar Fest cavalcades', meta: 'Seasonal — check schedule', badge: 'show' },
          { id: 'dca-31', land: 'Hollywood Land', name: 'Disney Jr. Mickey Mouse Clubhouse Live!', meta: 'Hyperion Theater (Hollywood Land) · opened May 16, 2025', badge: 'show', status: 'new' },
          { id: 'dca-32', land: 'Hollywood Land', name: 'Five & Dime', meta: 'Hollywood Land · roving jazz band performance', badge: 'show' },
        ]
      },
      {
        name: 'Food & drink',
        items: [
          { id: 'dca-16', land: 'Buena Vista Street', name: 'Cherry Cola Float at Carthay Circle', meta: 'Buena Vista Street', badge: 'food', must: true },
          { id: 'dca-17', land: 'Buena Vista Street', name: 'Churro Toffee Sundae', meta: 'Available seasonally', badge: 'food' },
          { id: 'dca-18', land: 'Buena Vista Street', name: 'Ghirardelli ice cream', meta: 'Buena Vista Street', badge: 'food' },
          { id: 'dca-19', land: 'Hollywood Land', name: 'Award Wieners hot dogs', meta: 'Hollywood Land', badge: 'food' },
          { id: 'dca-20', land: 'Pixar Pier', name: 'Lamplight Lounge', meta: 'Pixar Pier · waterfront dining, reservations suggested', badge: 'food' },
          { id: 'dca-33', land: 'Buena Vista Street', name: 'Carthay Circle Restaurant', meta: 'Buena Vista Street · upscale signature dining', badge: 'food' },
          { id: "dca-34", land: 'Cars Land', name: "Flo's V8 Cafe", meta: 'Cars Land · Route 66-inspired diner classics', badge: 'food' },
          { id: 'dca-35', land: 'Cars Land', name: 'Cozy Cone Motel', meta: 'Cars Land · five themed snack windows in one spot', badge: 'food' },
          { id: 'dca-36', land: 'San Fransokyo Square', name: 'Aunt Cass Cafe', meta: 'San Fransokyo Square · Big Hero 6-themed quick-service', badge: 'food' },
          { id: 'dca-37', land: 'San Fransokyo Square', name: 'Cocina Cucamonga Mexican Grill', meta: 'San Fransokyo Square · quick-service tacos & birria', badge: 'food' },
          { id: 'dca-38', land: 'San Fransokyo Square', name: 'Lucky Fortune Cookery', meta: 'San Fransokyo Square · Asian-inspired bowls & ramen', badge: 'food' },
          { id: 'dca-39', land: 'Golden State', name: 'Wine Country Trattoria', meta: 'Golden State · table-service Italian', badge: 'food' },
          { id: 'dca-40', land: 'Avengers Campus', name: 'Pym Test Kitchen', meta: 'Avengers Campus · "quantum-sized" Ant-Man themed food', badge: 'food' },
          { id: 'dca-41', land: 'Paradise Gardens Park', name: 'Paradise Garden Grill', meta: 'Paradise Gardens Park · seasonal-rotating quick-service', badge: 'food' },
          { id: 'dca-42', land: 'Pixar Pier', name: 'Boardwalk Pizza & Pasta', meta: 'Pixar Pier · quick-service Italian', badge: 'food' },
          { id: 'dca-43', land: 'Pixar Pier', name: 'Corn Dog Castle', meta: 'Pixar Pier · classic and specialty corn dogs', badge: 'food' },
          { id: "dca-44", land: 'Pixar Pier', name: "Jack-Jack Cookie Num Nums", meta: 'Pixar Pier · giant cookie sandwiches', badge: 'food' },
          { id: 'dca-45', land: 'Buena Vista Street', name: "Clarabelle's Hand-Scooped Ice Cream", meta: "Buena Vista Street · Dreyer's ice cream & sundaes", badge: 'food' },
          { id: 'dca-46', land: 'Pixar Pier', name: 'Adorable Snowman Frosted Treats', meta: 'Pixar Pier · seasonal soft-serve & desserts', badge: 'food' },
        ]
      }
    ]
  }
];
