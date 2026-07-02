// Park Moments — Park Data
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
      { name: 'Chocolate-Covered Frozen Banana' },
      { name: 'Bottled Drinks' },
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
      { name: 'Beef Nachos Supreme' },
    ]
  },
  'mk-28': {
    tier: '$',
    items: [
      { name: 'Turkey Leg (also sold here)' },
      { name: 'Chili Cheese Dog' },
      { name: 'Fried Pickles' },
      { name: 'Waffle Fries' },
      { name: 'BBQ Waffle Fries with Pulled Pork' },
      { name: 'Chicken Nuggets' },
      { name: 'Frozen Lemonade' },
      { name: 'Fountain Drinks' },
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
      { name: 'Grandma\'s Chicken Pot Pie' },
      { name: 'Seasonal Cobbler' },
      { name: 'Declaration Salad' },
      { name: 'Freedom Pasta (plant-based)' },
      { name: 'Ooey Gooey Toffee Cake' },
      { name: 'Pilgrims\' Bread Service' },
      { name: 'Herb Stuffing & Cranberry Sauce' },
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
      { name: 'Gooey Toffee Cake' },
      { name: 'Character dining experience with Disney Princesses' },
      { name: 'Castle-Inspired Charcuterie Board' },
      { name: 'Shrimp Cocktail Appetizer' },
      { name: 'Braised Pork Belly' },
      { name: 'The Clock Strikes Twelve (dessert)' },
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
      { name: 'Peel-and-Eat Shrimp (dinner)' },
      { name: 'Carved Prime Rib (dinner)' },
      { name: 'Sustainable Fish of the Day' },
      { name: 'Soup & Salad Bar' },
      { name: 'Dessert Bar with Pooh-Themed Sweets' },
    ]
  },
  'mk-34': {
    tier: '$$$',
    items: [
      { name: 'Tony\'s Spaghetti & Meatballs (Lady and the Tramp callback)' },
      { name: 'Chicken Parmesan' },
      { name: 'Lasagna' },
      { name: 'Italian-Style Salad' },
      { name: 'Tiramisu' },
      { name: 'Fried Calamari' },
      { name: 'Caprese Salad' },
      { name: 'Shrimp Scampi' },
      { name: 'Chicken Alfredo' },
      { name: 'Cannoli' },
    ]
  },
  'mk-35': {
    tier: '$$$',
    items: [
      { name: 'Specialty Burgers' },
      { name: 'Reuben Sandwich' },
      { name: 'Hand-Spun Milkshakes' },
      { name: 'Chicken Caesar Wrap' },
      { name: 'Grilled Chicken Sandwich' },
      { name: 'Meatloaf with Mashed Potatoes' },
      { name: 'Plaza Club Sandwich' },
      { name: 'Soup of the Day' },
      { name: 'Angus Chuck Cheeseburger' },
      { name: 'Banana Split Sundae' },
    ]
  },
  'mk-36': {
    tier: '$$$',
    items: [
      { name: 'Pork & Watermelon Bao Buns' },
      { name: 'Falls Family Falafel' },
      { name: 'Grilled Beef Tenderloin' },
      { name: 'S.E.A. Skewers' },
      { name: 'Schweitzer Falls Sundae' },
      { name: 'Hardy Har Char Siu Pork' },
      { name: 'Head-On Shrimp with Spiced Broth' },
      { name: 'Curried Vegetable Crew Stew' },
      { name: 'Kungaloosh! (chocolate cake dessert)' },
      { name: 'Punch Line Punch (tropical juice blend)' },
    ]
  },
  'mk-37': {
    tier: '$$$',
    items: [
      { name: 'Currently closed — reopening planned for Fall 2026' },
      { name: 'All-You-Care-To-Enjoy Sampler (returning menu)' },
      { name: 'Roasted Turkey with Stuffing (returning menu)' },
      { name: 'Pot Roast (returning menu)' },
      { name: 'Smoked Pork Loin (returning menu)' },
      { name: 'Mashed Potatoes & Gravy (returning menu)' },
      { name: 'Seasonal Vegetables (returning menu)' },
      { name: 'Warm Campfire Brownie (returning menu)' },
      { name: 'Frozen Lemonade (returning menu)' },
      { name: 'Saloon-Style Root Beer Float (returning menu)' },
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
      { name: 'Grilled Shrimp Skewer' },
      { name: 'Hush Puppies' },
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
      { name: 'Chicken Strips & Fries' },
      { name: 'Greek Salad with Chicken' },
      { name: 'Chocolate Cake' },
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
      { name: 'LeFou\'s Brew (non-alcoholic specialty drink)' },
      { name: 'Caramel Apple' },
      { name: 'Roasted Pork Shank' },
      { name: 'Hummus & Vegetable Cup' },
      { name: 'Mixed Berry Parfait' },
      { name: 'Warm Bacon-Cheddar Pretzel' },
      { name: 'Chocolate Croissant' },
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
      { name: 'Iced & Blended Frappuccinos' },
      { name: 'Ham & Swiss Croissant' },
      { name: 'Cake Pops' },
      { name: 'Seasonal Muffins' },
    ]
  },
  'mk-44': {
    tier: '$$',
    items: [
      { name: 'Flatbread Pizzas' },
      { name: 'Italian Sub Sandwich' },
      { name: 'Caesar Salad' },
      { name: 'Kids\' Pasta' },
      { name: 'Chicken Parmesan Sandwich' },
      { name: 'Meatball Sub' },
      { name: 'Breadsticks with Marinara' },
      { name: 'Gelato Cup' },
    ]
  },
  'mk-45': {
    tier: '$',
    items: [
      { name: 'Loaded Tater Tots' },
      { name: 'Mac & Cheese' },
      { name: 'Hot Dog Bites' },
      { name: 'Bacon Cheeseburger Tots' },
      { name: 'Buffalo Chicken Mac & Cheese' },
      { name: 'Plant-Based Pot Roast Mac & Cheese' },
      { name: 'Fresh Fruit Cup' },
      { name: 'Fountain Drinks' },
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
      { name: 'Welsh Pub Burger' },
      { name: 'English Trifle' },
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
      { name: 'Guacamole & Totopos' },
      { name: 'Queso Fundido con Chorizo' },
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
      { name: 'Gnocchi al Pomodoro' },
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
      { name: 'Pollo a las Rajas' },
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
      { name: 'Filet Mignon Hibachi' },
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
      { name: 'Grilled Halloumi Salad' },
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
      { name: 'Traditional Norwegian Dessert Buffet' },
      { name: 'Aquavit Tasting Flight' },
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
      { name: 'Potato Salad' },
      { name: 'Black Forest Cake Cup' },
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
      { name: 'Big Bang Burrata (appetizer)' },
      { name: 'Stellar Sliders (lunch)' },
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
      { name: 'Seared Mahi-Mahi' },
      { name: 'Chocolate Wave Cake' },
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
      { name: 'Buttermilk Mashed Potatoes' },
      { name: 'Chip & Dale Celebration Cupcake (kids)' },
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
      { name: 'Camarones al Ajillo (garlic shrimp)' },
      { name: 'Cremoso de Chocolate (dessert)' },
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
      { name: 'Empanadas con Queso' },
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
      { name: 'Xiaolongbao (soup dumplings)' },
      { name: 'Honey-Sesame Chicken' },
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
      { name: 'Mozzarella Caprese Plate' },
      { name: 'Cannoli & Espresso' },
      { name: 'Small-Plate Pasta Tastings' },
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
      { name: 'Piccante Pizza (spicy salami)' },
      { name: 'Chicken Parmigiana' },
      { name: 'Zeppole di Ricotta' },
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
      { name: 'Chicken Katsu Curry' },
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
      { name: 'Moroccan Mint Tea' },
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
      { name: 'Ratatouille' },
      { name: 'Profiteroles au Chocolat' },
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
      { name: 'Black Sea Bass en Croûte' },
      { name: 'Roasted Duck Breast' },
      { name: 'Cheese Course Selection' },
      { name: 'Champagne by the Glass' },
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
      { name: 'Ratatouille Galette' },
      { name: 'Salted Caramel Crêpe' },
      { name: 'Kir Breton (sparkling cider cocktail)' },
    ]
  },
  'ep-68': {
    tier: '$',
    items: [
      { name: 'Fish & Chips' },
      { name: 'Mushy Peas (side)' },
      { name: 'Malt Vinegar' },
      { name: 'Battered Cod' },
      { name: 'Shrimp & Chips' },
      { name: 'Victoria Sponge Cake' },
      { name: 'British Bottled Ales' },
      { name: 'Sea-Salted Chips' },
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
      { name: 'Loaded Mashed Potatoes' },
      { name: 'Chocolate "Moose" (dessert)' },
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
      { name: 'Buffalo Chicken Poutine' },
      { name: 'Craft Pressed Sandwich' },
      { name: 'Frozen Slushies' },
    ]
  },
  'hs-15': {
    tier: '$',
    items: [
      { name: 'Blue Milk (plant-based)' },
      { name: 'Green Milk (plant-based)' },
      { name: 'Swirled Blue & Green Milk' },
    ]
  },
  'hs-16': {
    tier: '$',
    items: [
      { name: 'Ronto Wrap (pork & sausage, lunch/dinner)' },
      { name: 'Ronto Morning Wrap (sausage, eggs, cheese, breakfast)' },
      { name: 'Tatooine Sunset Cocktail' },
      { name: 'Yobshrimp Noodle Salad' },
      { name: 'Ronto-less Garden Wrap (plant-based)' },
      { name: 'Turkey Jerky' },
      { name: 'Meiloorun Juice' },
      { name: 'Nuna Chips' },
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
      { name: 'Grilled Three-Cheese Sandwich' },
      { name: 'Smoked Turkey Sandwich' },
      { name: 'Mystic Portal Punch (Mountain Dew specialty drink)' },
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
      { name: 'Bloody Rancor (cocktail with chile-lime "bone")' },
      { name: 'Blue Bantha (blue milk with cookie)' },
      { name: 'Carbon Freeze (non-alcoholic)' },
      { name: 'Oga\'s Obsession (petri-dish dessert)' },
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
      { name: 'Aunt Liz\'s Golden Fried Chicken Salad' },
      { name: 'Grandpa Jean\'s Chicken Pot Pie' },
      { name: 'Dad\'s Chocolate-Peanut Butter Layered Cake' },
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
      { name: 'Smoked Kaadu Pork Ribs' },
      { name: 'Ithorian Garden Loaf (plant-based)' },
      { name: 'Batuu-Bon Dessert' },
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
      { name: 'Charcuterie Board' },
      { name: 'Derby Old Fashioned (cocktail)' },
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
      { name: 'Fried Pickle Spears' },
      { name: 'BBQ Burger' },
      { name: 'Shrimp Louie Salad' },
      { name: 'Hand-Spun Milkshakes' },
      { name: 'Warm Glazed Doughnut Dessert' },
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
      { name: 'Charred Strip Steak' },
      { name: 'Shrimp Campanelle' },
      { name: 'Antipasto Platter' },
      { name: 'Italian Wine Flight' },
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
      { name: 'Mac & Cheese Bar' },
      { name: 'Roasted Vegetables' },
      { name: 'Fresh Fruit & Cheese Display' },
      { name: 'Soup Station' },
      { name: 'Mickey Waffles (breakfast)' },
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
      { name: 'Curry Rice Bowl' },
      { name: 'Kids\' Chicken Strips' },
      { name: 'Seasonal Cupcake' },
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
      { name: 'Southwest Salad' },
      { name: 'Chocolate Mousse Dessert' },
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
      { name: 'Smoked Sausage' },
      { name: 'BBQ Chicken' },
      { name: 'Watermelon Salad' },
      { name: 'Prospector\'s Cheddar Biscuits' },
    ]
  },
  'hs-32': {
    tier: '$$',
    items: [
      { name: 'Classic Burger' },
      { name: 'Plant-Based Burger' },
      { name: 'BBQ Bacon Cheeseburger' },
      { name: 'Loaded Fries' },
      { name: 'Chicken Strips & Fries' },
      { name: 'Onion Rings' },
      { name: 'Garden Salad' },
      { name: 'Strawberry Shortcake Cup' },
    ]
  },
  'hs-33': {
    tier: '$',
    items: [
      { name: 'Craft Beer Flight' },
      { name: 'Pretzel Bites' },
      { name: 'Charcuterie Board' },
      { name: 'Seasonal Cider' },
      { name: 'California Wine Selection' },
      { name: 'Loaded Tater Tots' },
      { name: 'BBQ Pork Rinds' },
      { name: 'Spiced Nuts' },
      { name: 'Giant Bavarian Pretzel' },
      { name: 'Seasonal Craft Beer Specials' },
    ]
  },
  'hs-34': {
    tier: '$$',
    items: [
      { name: 'Pepperoni Flatbread' },
      { name: 'Cheese Pizza' },
      { name: 'Greek Salad' },
      { name: 'Caesar Salad with Chicken' },
      { name: 'BBQ Chicken Pizza' },
      { name: 'Meat Lovers Flatbread' },
      { name: 'Breadsticks' },
      { name: 'Seasonal Dessert Pizza' },
    ]
  },
  'hs-35': {
    tier: '$$',
    items: [
      { name: 'Smoked Turkey Leg' },
      { name: 'BBQ Pork Sandwich' },
      { name: 'Onion Rings' },
      { name: 'Fountain Drinks' },
      { name: 'Loaded Baked Potato' },
      { name: 'Chili-Cheese Fries' },
      { name: 'Corn on the Cob' },
      { name: 'Frozen Lemonade' },
    ]
  },
  'hs-36': {
    tier: '$',
    items: [
      { name: 'Carrot Cake Whoopie Pie' },
      { name: 'Croissants' },
      { name: 'Specialty Coffee' },
      { name: 'Cupcakes' },
      { name: 'Mickey Mouse-Shaped Cinnamon Roll' },
      { name: 'Breakfast Sandwiches' },
      { name: 'Cheese Danish' },
      { name: 'Seasonal Frappuccinos' },
    ]
  },
  'hs-37': {
    tier: '$',
    items: [
      { name: 'All-Beef Hot Dog' },
      { name: 'Frozen Beverages' },
      { name: 'Soft Drinks' },
      { name: 'Loaded Buffalo Chicken Fries' },
      { name: 'Loaded BBQ Pork Fries' },
      { name: 'Hand-Spun Milkshakes' },
      { name: 'Soft Pretzel' },
      { name: 'Nachos with Queso' },
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
      { name: 'Fish & Rice Bowl' },
      { name: 'Cheesecake Pod (seasonal)' },
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
      { name: 'Whole-Fried Sustainable Fish' },
      { name: 'Passion Fruit Panna Cotta' },
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
      { name: 'Fried Cream Cheese Wontons with Pineapple' },
      { name: 'Crispy Honey Sesame Beef' },
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
      { name: 'Teriyaki Beef Bowl' },
      { name: 'Chicken Fried Rice' },
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
      { name: 'Cape Malay Vegetable Curry' },
      { name: 'South African Wine Selection' },
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
      { name: 'Beef & Pork Sausage Platter' },
      { name: 'South African Milk Tart' },
    ]
  },
  'ak-29': {
    tier: '$',
    items: [
      { name: 'Night Blossom (passionfruit & lemonade slush)' },
      { name: 'Specialty Frozen Cocktails' },
      { name: 'Pongu Lumpia (pineapple cream cheese spring roll)' },
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
      { name: 'Vegetable Samosas' },
      { name: 'Himalayan Ginger Margarita' },
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
      { name: 'Surf & Turf (dinner)' },
      { name: 'Pasta Jambalaya (vegetarian)' },
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
      { name: 'Mickey-Shaped Beignets' },
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
      { name: 'Bottled Water & Soft Drinks' },
    ]
  },
  'dl-22': {
    tier: '$',
    items: [
      { name: 'Ronto Wrap (pork & sausage)' },
      { name: 'Ronto Morning Wrap (breakfast)' },
      { name: 'Tatooine Sunset Cocktail' },
      { name: 'Ronto-less Garden Wrap (plant-based)' },
      { name: 'Nuna Chips' },
      { name: 'Meiloorun Juice' },
      { name: 'Turkey Jerky' },
      { name: 'Sparkling Water of Batuu' },
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
      { name: 'Three-Cheese Monte Cristo' },
      { name: 'French Onion Soup' },
      { name: 'Mickey-Shaped Beignets' },
      { name: 'Crème Brûlée' },
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
      { name: 'Loaded Baked Potato Soup (Walt\'s favorite)' },
      { name: 'Chicken-Fried Chicken' },
      { name: 'Fried Pickles with Dill Ranch' },
      { name: 'Homemade Meatloaf' },
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
      { name: 'Chicken & Andouille Gumbo' },
      { name: 'Muffuletta Sandwich' },
      { name: 'Beignets' },
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
      { name: 'BBQ Pork Ribs' },
      { name: 'Citrus-Brined Roast Chicken' },
      { name: 'Mark Twain Salad' },
      { name: 'Mississippi Mud Pie' },
      { name: 'Mint Julep (non-alcoholic)' },
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
      { name: 'Pollo Asado Street Tacos' },
      { name: 'Caramel Flan' },
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
      { name: 'Roasted Turkey Dinner' },
      { name: 'Salmon with Seasonal Vegetables' },
      { name: 'Kids\' Fried Chicken Meal' },
      { name: 'Strawberry Shortcake' },
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
      { name: 'Toasted Cheese with Tomato-Basil Soup' },
      { name: 'Matterhorn Macaroon' },
      { name: 'Seasonal Cheesecake' },
    ]
  },
  'dl-55': {
    tier: '$',
    items: [
      { name: 'Beef Skewers' },
      { name: 'Vegetable Skewers' },
      { name: 'Chicken Skewers' },
      { name: 'Bacon-Wrapped Asparagus Skewer' },
      { name: 'Pork Belly Skewer' },
      { name: 'Tiger Tails (breadsticks)' },
      { name: 'Mickey Pretzel' },
      { name: 'Frozen Lemonade' },
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
      { name: 'Chicken Nuggets' },
      { name: 'Fish & Chips' },
      { name: 'Hand-Scooped Ice Cream Sundae' },
      { name: 'Chili Cheese Fries' },
      { name: 'Frozen Lemonade' },
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
      { name: 'Smoked Chicken Platter' },
      { name: 'Watermelon Salad' },
      { name: 'Campfire S\'more Dessert' },
    ]
  },
  'dl-59': {
    tier: '$$',
    items: [
      { name: 'Lobster Roll' },
      { name: 'Tuna Salad Sandwich' },
      { name: 'Clam Chowder in a Sourdough Bowl' },
      { name: 'Loaded Baked Potato' },
      { name: 'Garden Salad with Chicken' },
      { name: 'Clam Chowder Combo' },
      { name: 'Kids\' Tuna Sandwich' },
      { name: 'Fountain Drinks' },
    ]
  },
  'dl-60': {
    tier: '$$',
    items: [
      { name: 'Gaston\'s Grilled Chicken' },
      { name: 'Braised Short Rib' },
      { name: 'Mickey-Shaped Pretzel Bread' },
      { name: 'Seasonal Specialty Cake' },
      { name: 'Enchanted Cauliflower Sandwich' },
      { name: 'Grey Stuff Gâteau' },
      { name: 'Fries with Garlic Aioli' },
      { name: 'Kids\' Cheeseburger' },
    ]
  },
  'dl-61': {
    tier: '$$',
    items: [
      { name: 'Felucian Garden Spread' },
      { name: 'Endorian Chicken "Tip Yip"' },
      { name: 'Batuu Beef Combo' },
      { name: 'Galactic Lava Cake' },
      { name: 'Smoked Kaadu Pork Ribs' },
      { name: 'Ithorian Garden Loaf (plant-based)' },
      { name: 'Yobshrimp Noodle Salad' },
      { name: 'Batuu-Bon Dessert' },
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
      { name: 'Bloody Rancor (cocktail with chile-lime "bone")' },
      { name: 'Blue Bantha (blue milk with cookie)' },
      { name: 'Carbon Freeze (non-alcoholic)' },
      { name: 'Oga\'s Obsession (petri-dish dessert)' },
      { name: 'Happabore Sampler (snack platter)' },
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
      { name: 'Bottled Water & Soft Drinks' },
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
      { name: 'Plant-Based Hot Dog' },
      { name: 'Onion Rings' },
      { name: 'Funnel Cake Fries' },
      { name: 'Fountain Drinks' },
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
      { name: 'Crispy Piggy Wings' },
      { name: 'Warm Donut Box with Dipping Sauces' },
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
      { name: 'Carthay Signature Fried Biscuits' },
      { name: 'Sommelier Wine Pairings' },
    ]
  },
  'dca-34': {
    tier: '$$',
    items: [
      { name: 'Flo\'s Famous Fried Chicken' },
      { name: 'French Toast with Salted Caramel & Bananas' },
      { name: 'Chicken Tamales with Scrambled Eggs' },
      { name: 'Mack\'s Mac & Cheese' },
      { name: 'Micro Burgers' },
      { name: 'Club Sandwich' },
      { name: 'Apple-Cheddar Pie-o-rama' },
      { name: 'Flo\'s Classic Shakes' },
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
      { name: 'Sourdough Bread Bowl Combo' },
      { name: 'Matcha Cream Puff' },
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
      { name: 'Chips & Guacamole' },
      { name: 'Horchata' },
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
      { name: 'Karaage Chicken Rice Bowl' },
      { name: 'Pot Stickers' },
      { name: 'Yuzu Lemonade' },
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
      { name: 'Chicken Parmesan' },
      { name: 'Shrimp Scampi Pasta' },
      { name: 'Antipasto Salad' },
      { name: 'Tiramisu' },
      { name: 'California Wine Flights' },
    ]
  },
  'dca-40': {
    tier: '$$',
    items: [
      { name: '"Quantum-Sized" Tasting Plates' },
      { name: 'Pym-Inspired Specialty Dishes' },
      { name: 'Ant-Man Themed Cocktails' },
      { name: 'Pym-ini (pressed sandwich)' },
      { name: 'Impossible Spoonful (giant & tiny pasta)' },
      { name: 'Quantum Pretzel (giant pretzel)' },
      { name: 'Proton PB&J Punch' },
      { name: 'Celestial-Sized Candy Bar' },
    ]
  },
  'dca-41': {
    tier: '$$',
    items: [
      { name: 'Mediterranean Skewers (Steak, Chicken, Meatballs, or Vegetable & Tofu)' },
      { name: 'Greek Salad' },
      { name: 'Seasonal Rotating Specials' },
      { name: 'Chicken Gyro' },
      { name: 'Hummus & Pita' },
      { name: 'Baklava' },
      { name: 'Lemon Rice' },
      { name: 'Seasonal Sangria' },
    ]
  },
  'dca-42': {
    tier: '$$',
    items: [
      { name: 'Pepperoni Pizza' },
      { name: 'Cheese Pizza' },
      { name: 'Spaghetti & Meatballs' },
      { name: 'Caesar Salad' },
      { name: 'BBQ Chicken Pizza' },
      { name: 'Fettuccine Alfredo' },
      { name: 'Garlic Breadsticks' },
      { name: 'Tiramisu Cup' },
    ]
  },
  'dca-43': {
    tier: '$',
    items: [
      { name: 'Classic Corn Dog' },
      { name: 'Specialty Corn Dogs (seasonal flavors)' },
      { name: 'Mini Corn Dog Nuggets' },
      { name: 'Hot Link Corn Dog' },
      { name: 'Cheese-Stuffed Corn Dog' },
      { name: 'Sliced Apples Side' },
      { name: 'Bag of Chips' },
      { name: 'Fountain Drinks' },
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
      { name: 'Dreyer\'s Ice Cream Cones' },
      { name: 'Chocolate-Dipped Ice Cream Bars' },
      { name: 'Sundaes' },
    ]
  },
  'dca-46': {
    tier: '$',
    items: [
      { name: 'Soft-Serve (seasonal flavors)' },
      { name: 'Frosted Treats' },
      { name: 'It\'s Lemon! Soft-Serve Cone' },
    ]
  },
  'dl-63': {
    tier: '$$',
    items: [
      { name: 'Pepperoni Pizza' },
      { name: 'Cheese Pizza' },
      { name: 'Spaghetti & Meatballs' },
      { name: 'Caesar Salad with Chicken' },
      { name: 'Alien Mac & Cheese' },
      { name: 'Garlic Knots' },
      { name: 'Mixed Green Salad' },
      { name: 'Chocolate Cake' },
    ]
  },
  'dl-64': {
    tier: '$$',
    items: [
      { name: 'Pizza Flop-Over (calzone-style)' },
      { name: 'Hot Diggity Dog' },
      { name: 'Springtime Salad' },
      { name: 'Kids Power Pack' },
      { name: 'Breakfast Flop-Over (mornings)' },
      { name: 'Cheesy Garlic Pizza Bread' },
      { name: 'Daisy\'s Sundae' },
      { name: 'Fountain Drinks' },
    ]
  },
  'dl-65': {
    tier: '$$',
    items: [
      { name: 'Galactic Cheeseburger' },
      { name: 'Crispy Chicken Sandwich' },
      { name: 'Breakfast Burrito (mornings)' },
      { name: 'Plant-Based Specialty Burger' },
      { name: 'Chicken Strips & Fries' },
      { name: 'Galactic Fries with Toppings' },
      { name: 'Kids\' Hamburger Meal' },
      { name: 'Vanilla Milkshake' },
    ]
  },
  'dl-66': {
    tier: '$',
    items: [
      { name: 'Starbucks Espresso Drinks' },
      { name: 'Pastries & Muffins' },
      { name: 'Breakfast Sandwiches' },
      { name: 'Seasonal Frappuccinos' },
      { name: 'Mickey Mouse-Shaped Cinnamon Roll' },
      { name: 'Cake Pops' },
      { name: 'Egg Bites' },
      { name: 'Cold Brew & Nitro Coffee' },
    ]
  },
  'dl-67': {
    tier: '$',
    items: [
      { name: 'All-Beef Hot Dog' },
      { name: 'Chili Cheese Dog' },
      { name: 'Bacon Mac & Cheese Dog' },
      { name: 'Fresh-Made Chips' },
      { name: 'Mickey Pretzel with Cheese' },
      { name: 'Frozen Lemonade' },
      { name: 'Souvenir Sipper Sodas' },
      { name: 'Coca-Cola Floats' },
    ]
  },
  'dl-68': {
    tier: '$$',
    items: [
      { name: 'Hand-Dipped Corn Dog' },
      { name: 'Chicken Nuggets' },
      { name: 'Fish & Chips' },
      { name: 'Funnel Cake' },
      { name: 'Chicken Nugget Basket with Fries' },
      { name: 'Onion Rings' },
      { name: 'Frozen Lemonade' },
      { name: 'Seasonal Funnel Cake Flavors' },
    ]
  },
  'dl-69': {
    tier: '$$',
    items: [
      { name: 'Bratwurst in Pretzel Roll' },
      { name: 'Stuffed Baked Potato' },
      { name: 'Frozen Lemonade' },
      { name: 'Seasonal Show Treats' },
      { name: 'Garlic-Parmesan Pretzel' },
      { name: 'Mac & Cheese Baked Potato' },
      { name: 'Kids\' Turkey Sandwich' },
      { name: 'Seasonal Sundaes' },
    ]
  },
  'dl-70': {
    tier: '$$',
    items: [
      { name: 'Gumbo in a Bread Bowl' },
      { name: 'Clam Chowder in a Bread Bowl' },
      { name: 'Steak Gumbo' },
      { name: 'Fritters with Dipping Sauce' },
      { name: 'Mickey-Shaped Beignets' },
      { name: 'Vegetarian Gumbo' },
      { name: 'Iced Café au Lait' },
      { name: 'Seasonal Fritter Flavors' },
    ]
  },
  'dl-76': {
    tier: '$',
    items: [
      { name: 'English Toffee (made in-house)' },
      { name: 'Caramel Apples' },
      { name: 'Hand-Dipped Fudge' },
      { name: 'Seasonal Candy (candy canes at holidays)' },
    ]
  },
  'dl-77': {
    tier: '$',
    items: [
      { name: 'Hand-Scooped Sundaes' },
      { name: 'Fresh Waffle Cones' },
      { name: 'Firehouse Dalmatian Mint Sundae' },
      { name: 'Ice Cream Floats' },
    ]
  },
  'dl-78': {
    tier: '$',
    items: [
      { name: 'Boysen Apple Freeze' },
      { name: 'Sweet Bread Twist' },
      { name: 'Cheddar Garlic Bagel Twist' },
    ]
  },
  'dl-79': {
    tier: '$',
    items: [
      { name: 'Seasonal Snacks' },
      { name: 'Cold Drinks' },
      { name: 'Classic Churro' },
    ]
  },
  'dl-80': {
    tier: '$',
    items: [
      { name: 'Jumbo Turkey Leg' },
      { name: 'Frozen Slushes' },
      { name: 'Chimney-Style Seasonal Snacks' },
    ]
  },
  'dl-81': {
    tier: '$',
    items: [
      { name: 'Blue Milk' },
      { name: 'Green Milk' },
      { name: 'Pink Milk' },
      { name: 'Milk Floats' },
    ]
  },
  'dl-82': {
    tier: '$',
    items: [
      { name: 'Snack Cheese & Crackers' },
      { name: 'Dill Pickles' },
      { name: 'Fresh Fruit' },
      { name: 'Cookies & Packaged Treats' },
    ]
  },
  'dl-83': {
    tier: '$',
    items: [
      { name: 'Classic Popcorn' },
      { name: 'Souvenir Popcorn Buckets' },
      { name: 'Seasonal Flavored Popcorn' },
    ]
  },
  'dl-84': {
    tier: '$',
    items: [
      { name: 'Mickey-Shaped Soft Pretzel' },
      { name: 'Cream Cheese-Filled Pretzel' },
      { name: 'Jalapeño Cheese-Filled Pretzel' },
    ]
  },
  'dl-85': {
    tier: '$',
    items: [
      { name: 'Fresh Whole Fruit' },
      { name: 'Dill Pickles' },
      { name: 'Hummus & Veggie Packs' },
    ]
  },
  'dl-86': {
    tier: '$',
    items: [
      { name: 'Jumbo Turkey Leg' },
      { name: 'Chimichanga' },
      { name: 'Frozen Drinks' },
    ]
  },
  'dl-87': {
    tier: '$',
    items: [
      { name: 'Classic Churro' },
      { name: 'Cold Drinks' },
      { name: 'Seasonal Flavored Churros' },
    ]
  },
  'dl-71': {
    tier: '$',
    items: [
      { name: 'Classic Churro' },
      { name: 'Seasonal Flavored Churros' },
      { name: 'Bottled Water & Soft Drinks' },
    ]
  },
  'dl-72': {
    tier: '$',
    items: [
      { name: 'Classic Churro' },
      { name: 'Seasonal Flavored Churros' },
      { name: 'Bottled Water & Soft Drinks' },
    ]
  },
  'dl-73': {
    tier: '$',
    items: [
      { name: 'Classic Churro' },
      { name: 'Seasonal Flavored Churros' },
      { name: 'Bottled Water & Soft Drinks' },
    ]
  },
  'dl-74': {
    tier: '$',
    items: [
      { name: 'Classic Churro' },
      { name: 'Seasonal Flavored Churros' },
      { name: 'Bottled Water & Soft Drinks' },
    ]
  },
  'dl-75': {
    tier: '$',
    items: [
      { name: 'Classic Churro' },
      { name: 'Seasonal Flavored Churros' },
      { name: 'Bottled Water & Soft Drinks' },
    ]
  },
  'mk-62': {
    tier: '$$',
    items: [
      { name: 'Grog & Galleon Grub (shareable snacks)' },
      { name: 'Pirate-Themed Cocktails (21+)' },
      { name: 'Non-Alcoholic Grogs for All Ages' },
      { name: 'Crispy Pork Wings' },
      { name: 'Buccaneer Fish & Chips' },
      { name: 'Caribbean Jerk Chicken' },
      { name: 'Castaway Conch Chowder' },
      { name: 'Plantain Chips with Island Dips' },
      { name: 'Dead Man\'s Chest Chocolate Dessert' },
      { name: 'Barrel-Aged Rum Flight (21+)' },
    ]
  },
  'mk-63': {
    tier: '$',
    items: [
      { name: 'Corn Dog Nuggets' },
      { name: 'Mickey Pretzel with Cheese' },
      { name: 'Frozen Carbonated Beverages' },
      { name: 'All-Beef Hot Dog' },
      { name: 'Cheese-Stuffed Pretzel' },
      { name: 'Chips & Dips' },
      { name: 'Souvenir Sipper Drinks' },
      { name: 'Frozen Lemonade' },
    ]
  },
  'mk-64': {
    tier: '$$',
    items: [
      { name: 'Rice Bowls & Burritos (seasonal menu)' },
      { name: 'Fountain Drinks' },
      { name: 'Beef Burrito' },
      { name: 'Chicken Rice Bowl' },
      { name: 'Nachos with Queso' },
      { name: 'Chips & Salsa' },
      { name: 'Churros' },
      { name: 'Frozen Lemonade' },
    ]
  },
  'mk-65': {
    tier: '$',
    items: [
      { name: 'Cheshire Cat Tail (striped pastry)' },
      { name: 'Iced Coffee & Teas' },
      { name: 'Mad Hatter Sugar Cookie' },
    ]
  },
  'mk-66': {
    tier: '$',
    items: [
      { name: 'Peter Pan Float (key lime soft-serve)' },
      { name: 'Hot Fudge Sundae' },
      { name: 'Seasonal Soft-Serve Flavors' },
    ]
  },
  'mk-67': {
    tier: '$',
    items: [
      { name: 'Soft-Serve Cones & Sundaes' },
      { name: 'Fruit Smoothies' },
      { name: 'Floats' },
    ]
  },
  'mk-68': {
    tier: '$',
    items: [
      { name: 'Fresh Fruit' },
      { name: 'Dill Pickles' },
      { name: 'Chips & Drinks' },
    ]
  },
  'mk-69': {
    tier: '$',
    items: [
      { name: 'Handmade Fudge' },
      { name: 'Caramel Apples' },
      { name: 'Cotton Candy (made fresh)' },
      { name: 'Specialty Popcorn' },
    ]
  },
  'mk-70': {
    tier: '$',
    items: [
      { name: 'Classic Popcorn' },
      { name: 'Mickey Pretzels' },
      { name: 'Souvenir Buckets' },
    ]
  },
  'ep-72': {
    tier: '$$$',
    items: [
      { name: 'Signature Sushi Rolls' },
      { name: 'Izakaya Small Plates' },
      { name: 'Japanese Whisky & Sake' },
      { name: 'Chef\'s Nigiri Selection' },
      { name: 'Spicy Tuna Roll' },
      { name: 'Wagyu Beef Tataki' },
      { name: 'Chicken Karaage' },
      { name: 'Yakitori Skewers' },
      { name: 'Matcha Cheesecake' },
      { name: 'Japanese Craft Beer' },
    ]
  },
  'ep-73': {
    tier: '$$$$',
    items: [
      { name: 'Omakase Tasting Menu' },
      { name: 'Wagyu Beef' },
      { name: 'Premium Sake Pairings' },
      { name: 'Seasonal Kaiseki Courses' },
      { name: 'A5 Wagyu Tasting' },
      { name: 'Sashimi Selection' },
      { name: 'Chawanmushi (savory egg custard)' },
      { name: 'Tempura Course' },
      { name: 'Matcha Dessert Course' },
      { name: 'Japanese Tea Service' },
    ]
  },
  'ep-74': {
    tier: '$',
    items: [
      { name: 'Artisan Gelato (rotating flavors)' },
      { name: 'Sorbetto' },
      { name: 'Affogato' },
    ]
  },
  'ep-75': {
    tier: '$',
    items: [
      { name: 'Jumbo Turkey Leg' },
      { name: 'Frozen Slushes' },
      { name: 'Craft Beer' },
    ]
  },
  'ep-76': {
    tier: '$',
    items: [
      { name: 'Classic & Flavored Margaritas' },
      { name: 'Empanadas' },
      { name: 'Guacamole & Totopos' },
      { name: 'Nachos al Pastor' },
      { name: 'Elote (Mexican street corn)' },
      { name: 'Churros con Cajeta' },
      { name: 'Cerveza (Mexican beer)' },
      { name: 'Agua Fresca' },
    ]
  },
  'ep-77': {
    tier: '$',
    items: [
      { name: 'Classic Funnel Cake' },
      { name: 'Seasonal Topped Funnel Cakes' },
      { name: 'Soft Drinks & Bottled Water' },
    ]
  },
  'hs-39': {
    tier: '$$',
    items: [
      { name: 'Personal Pizzas' },
      { name: 'Meatball Sub' },
      { name: 'Antipasto Salad' },
      { name: 'Cheese Pizza' },
      { name: 'Pepperoni Pizza' },
      { name: 'Garden Salad' },
      { name: 'Cannoli' },
      { name: 'Rizzo\'s Tiramisu Cup' },
    ]
  },
  'hs-40': {
    tier: '$',
    items: [
      { name: 'Hand-Scooped Ice Cream' },
      { name: 'Ice Cream Sandwich' },
      { name: 'Sundaes' },
    ]
  },
  'hs-41': {
    tier: '$',
    items: [
      { name: 'Fresh Whole Fruit' },
      { name: 'Frozen Lemonade' },
      { name: 'Chips & Drinks' },
    ]
  },
  'hs-42': {
    tier: '$',
    items: [
      { name: 'Funnel Cake with Toppings' },
      { name: 'Soft-Serve' },
      { name: 'Specialty Lemonades' },
    ]
  },
  'ak-33': {
    tier: '$$$',
    items: [
      { name: 'Jungle-Themed American Fare' },
      { name: 'Volcano Dessert' },
      { name: 'Specialty Drinks' },
      { name: 'Volcano Nachos' },
      { name: 'Rasta Pasta' },
      { name: 'Mojo Bones (BBQ ribs)' },
      { name: 'Jungle Safari Soup' },
      { name: 'Coconut Shrimp' },
      { name: 'Tribal Salmon' },
      { name: 'Sparkling Volcano Smoothie' },
    ]
  },
  'ak-34': {
    tier: '$$',
    items: [
      { name: 'Pizzas & Flatbreads' },
      { name: 'Caesar Salad' },
      { name: 'Breadsticks' },
      { name: 'Pepperoni Pizza' },
      { name: 'Cheese Pizza' },
      { name: 'Meatball Sub' },
      { name: 'Kids\' Mac & Cheese' },
      { name: 'Tiramisu Cup' },
    ]
  },
  'ak-35': {
    tier: '$',
    items: [
      { name: 'Pineapple Dole Whip' },
      { name: 'Dole Whip with Rum (21+)' },
      { name: 'Simba Sunset Float' },
    ]
  },
  'ak-36': {
    tier: '$',
    items: [
      { name: 'Margaritas' },
      { name: 'Mickey Pretzel with Cheese' },
      { name: 'Chips & Drinks' },
    ]
  },
  'dca-47': {
    tier: '$$',
    items: [
      { name: 'Classic Breakfast (mornings)' },
      { name: 'Burgers & Comfort Classics' },
      { name: 'Route 66 Milkshakes' },
      { name: 'BBQ Pork Ribs Plate' },
      { name: 'Chicken Strips & Fries' },
      { name: 'Seasonal Pie' },
      { name: 'Ramone\'s Pear of Dice Soda' },
      { name: 'Kids\' Grilled Cheese' },
    ]
  },
  'dca-48': {
    tier: '$$',
    items: [
      { name: 'Smokejumper Burger' },
      { name: 'Chicken Sandwich' },
      { name: 'Onion Rings & Fries' },
      { name: 'Double Smokejumper Burger' },
      { name: 'Plant-Based Burger' },
      { name: 'Chopped Salad' },
      { name: 'Chocolate Chip Cookie' },
      { name: 'Fountain Drinks' },
    ]
  },
  'dca-49': {
    tier: '$',
    items: [
      { name: 'Cotton Candy Lemonade' },
      { name: 'House-Made Candy & Fudge' },
      { name: 'Character Candy Apples' },
    ]
  },
  'dca-50': {
    tier: '$',
    items: [
      { name: 'Milkshakes' },
      { name: 'Fruit Smoothies' },
      { name: 'Iced Coffee' },
    ]
  },
  'dca-51': {
    tier: '$',
    items: [
      { name: 'Filled Specialty Churros' },
      { name: 'Classic Churros' },
      { name: 'Churro Flights (seasonal)' },
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
  'ak-37': ['Multiple showtimes daily, check app'],
  'hs-43': ['Multiple showtimes daily, check app'],
  'dl-13': ['Varies — typically nightly, check app'],
  'dl-44': ['Multiple showtimes daily, check app'],
  'dl-15': ['Seasonal — check app for current run dates and time'],
  'dl-16': ['Varies — usually one nightly show, check app'],
  'dl-88': ['Evenings — check app for current schedule'],
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
          { id: 'mk-53', land: 'Adventureland', name: 'A Pirate\'s Adventure: Treasure of the Seven Seas', meta: 'Adventureland · all ages, interactive app-based treasure hunt', badge: 'experience' },
          { id: 'mk-55', land: 'Adventureland', name: 'Swiss Family Treehouse', meta: 'Adventureland · all ages, walk-through treehouse', badge: 'experience' },
          { id: 'mk-56', land: 'Fantasyland', name: "Enchanted Tales with Belle", meta: 'Fantasyland · all ages, interactive storytelling', badge: 'experience' },
          { id: 'mk-71', land: 'Fantasyland', name: 'Mad Tea Party', meta: 'Fantasyland · all ages, spinning teacups', badge: 'family' },
          { id: 'mk-17', land: 'Fantasyland', name: "Mickey's PhilharMagic", meta: 'Fantasyland · 4D film, all ages', badge: 'family' },
          { id: 'mk-57', land: 'Adventureland', name: "Walt Disney's Enchanted Tiki Room", meta: 'Adventureland · audio-animatronic classic, all ages', badge: 'family' },
          { id: 'mk-58', land: 'Tomorrowland', name: 'Monsters, Inc. Laugh Floor', meta: 'Tomorrowland · interactive comedy theater', badge: 'family' },
          { id: 'mk-59', land: 'Tomorrowland', name: 'Carousel of Progress', meta: 'Tomorrowland · classic rotating theater', badge: 'family' },
          { id: 'mk-60', land: 'Liberty Square', name: 'The Hall of Presidents', meta: 'Liberty Square · audio-animatronic presidential theater', badge: 'family' },
          { id: 'mk-61', land: 'Frontierland', name: 'Country Bear Musical Jamboree', meta: 'Frontierland · audio-animatronic musical', badge: 'family' },
        ]
      },
      {
        name: 'Thrills',
        items: [
          { id: 'mk-13', land: 'Tomorrowland', name: 'TRON Lightcycle / Run', meta: 'Tomorrowland · 48" min height', badge: 'thrill' },
          { id: 'mk-14', land: 'Frontierland', name: 'Tiana\'s Bayou Adventure', meta: 'Frontierland · 40" min height', badge: 'thrill' },
        ]
      },
      {
        name: 'Shows & experiences',
        items: [
          { id: 'mk-15', land: 'Main Street USA', name: 'Festival of Fantasy Parade', meta: 'Check My Disney Experience for times', badge: 'show' },
          { id: 'mk-16', land: 'Main Street USA', name: 'Wondrous Journeys with Fireworks', meta: 'Evenings — check schedule', badge: 'show' },
          { id: 'mk-18', land: 'Main Street USA', name: 'Move It! Shake It! MousekeDance It! Street Party', meta: 'Main Street USA · check times', badge: 'experience' },
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
        name: 'Table-Service Restaurants',
        items: [
          { id: 'mk-23', land: 'Fantasyland', name: 'Be Our Guest Restaurant', meta: 'Fantasyland · inside the Beast\'s castle — reservations required', badge: 'food' },
          { id: 'mk-32', land: 'Fantasyland', name: "Cinderella's Royal Table", meta: 'Inside the castle · character dining, reservations essential', badge: 'food' },
          { id: 'mk-33', land: 'Main Street USA', name: 'The Crystal Palace', meta: 'Main Street USA · Winnie the Pooh character buffet', badge: 'food' },
          { id: 'mk-30', land: 'Liberty Square', name: 'Liberty Tree Tavern', meta: 'Liberty Square · table-service American fare', badge: 'food' },
          { id: 'mk-36', land: 'Adventureland', name: 'Jungle Navigation Co. Ltd Skipper Canteen', meta: 'Adventureland · adventurous table-service menu', badge: 'food' },
          { id: 'mk-34', land: 'Main Street USA', name: "Tony's Town Square Restaurant", meta: 'Main Street USA · Lady and the Tramp Italian fare', badge: 'food' },
          { id: 'mk-35', land: 'Main Street USA', name: 'The Plaza Restaurant', meta: 'Main Street USA · table-service sandwiches & shakes', badge: 'food' },
          { id: 'mk-62', land: 'Adventureland', name: 'The Beak and Barrel', meta: 'Adventureland · Pirates-themed tavern, first MK spot with cocktails — reservations recommended', badge: 'food', status: 'new' },
          { id: 'mk-37', land: 'Frontierland', name: 'The Diamond Horseshoe', meta: "Frontierland · table service paused for Jessie's Roundup — dining returns fall 2026", badge: 'food', status: 'closed' },
        ]
      },
      {
        name: 'Quick-Service Restaurants',
        items: [
          { id: 'mk-25', land: 'Main Street USA', name: "Casey's Corner", meta: 'Main Street USA · famous ballpark hot dogs', badge: 'food' },
          { id: 'mk-38', land: 'Liberty Square', name: 'Columbia Harbour House', meta: 'Liberty Square · seafood, quiet upstairs seating', badge: 'food' },
          { id: 'mk-39', land: 'Tomorrowland', name: "Cosmic Ray's Starlight Café", meta: 'Tomorrowland · burgers & live animatronic music', badge: 'food' },
          { id: 'mk-41', land: 'Fantasyland', name: "Gaston's Tavern", meta: 'Fantasyland · cinnamon rolls & LeFou\'s Brew', badge: 'food' },
          { id: 'mk-28', land: 'Frontierland', name: 'Golden Oak Outpost', meta: 'Frontierland · quick snacks & waffle fries', badge: 'food' },
          { id: 'mk-43', land: 'Main Street USA', name: 'Main Street Bakery (Starbucks)', meta: 'Main Street USA · pastries & coffee', badge: 'food' },
          { id: 'mk-27', land: 'Frontierland', name: 'Pecos Bill Tall Tale Inn & Café', meta: 'Frontierland · Tex-Mex quick-service', badge: 'food' },
          { id: 'mk-44', land: 'Fantasyland', name: 'Pinocchio Village Haus', meta: 'Fantasyland · flatbreads & pasta', badge: 'food' },
          { id: 'mk-26', land: 'Liberty Square', name: 'Sleepy Hollow', meta: 'Liberty Square · sweet & savory waffle sandwiches', badge: 'food' },
          { id: 'mk-45', land: 'Fantasyland', name: "The Friar's Nook", meta: 'Fantasyland · loaded tots & mac and cheese', badge: 'food' },
          { id: 'mk-63', land: 'Tomorrowland', name: 'The Lunching Pad', meta: 'Tomorrowland · corn dog nuggets & Mickey pretzels', badge: 'food' },
          { id: 'mk-64', land: 'Adventureland', name: 'Tortuga Tavern', meta: 'Adventureland · seasonal quick-service, open peak days', badge: 'food' },
        ]
      },
      {
        name: 'Snacks & Treats',
        items: [
          { id: 'mk-22', land: 'Adventureland', name: 'Dole Whip at Aloha Isle', meta: 'Adventureland · classic must-eat', badge: 'food', must: true },
          { id: 'mk-67', land: 'Tomorrowland', name: "Auntie Gravity's Galactic Goodies", meta: 'Tomorrowland · soft-serve & smoothies', badge: 'food' },
          { id: 'mk-65', land: 'Fantasyland', name: 'Cheshire Café', meta: 'Fantasyland · Cheshire Cat Tails & drinks', badge: 'food' },
          { id: 'mk-31', land: 'Liberty Square', name: 'Liberty Square Market', meta: 'Liberty Square · frozen drinks & snacks', badge: 'food' },
          { id: 'mk-69', land: 'Main Street USA', name: 'Main Street Confectionery', meta: 'Main Street USA · handmade fudge, caramel apples & candy', badge: 'food' },
          { id: 'mk-40', land: 'Main Street USA', name: 'Plaza Ice Cream Parlor', meta: 'Main Street USA · classic ice cream', badge: 'food' },
          { id: 'mk-70', land: 'Main Street USA', name: 'Popcorn & Pretzel Carts', meta: 'Multiple locations · popcorn, Mickey pretzels & souvenir buckets', badge: 'food' },
          { id: 'mk-68', land: 'Fantasyland', name: "Prince Eric's Village Market", meta: 'Fantasyland · fruit, pickles & drinks', badge: 'food' },
          { id: 'mk-24', land: 'Fantasyland', name: 'Smoked turkey leg', meta: 'Carts near Fantasyland & Frontierland', badge: 'food' },
          { id: 'mk-66', land: 'Fantasyland', name: 'Storybook Treats', meta: 'Fantasyland · soft-serve & the Peter Pan Float', badge: 'food' },
          { id: 'mk-42', land: 'Adventureland', name: 'Sunshine Tree Terrace', meta: 'Adventureland · Citrus Swirl soft-serve', badge: 'food' },
          { id: 'mk-29', land: 'Frontierland', name: 'Westward Ho', meta: 'Frontierland · frozen lemonade & snacks', badge: 'food' },
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
          { id: 'hs-23', land: 'Animation Courtyard', name: 'Walt Disney Presents', meta: 'Animation Courtyard area · behind-the-scenes exhibit & film', badge: 'experience' },
          { id: 'hs-43', land: 'Sunset Blvd', name: 'Beauty and the Beast – Live on Stage', meta: 'Theater of the Stars (Sunset Blvd) · Broadway-style musical, multiple shows daily', badge: 'show' },
        ]
      },
      {
        name: "Galaxy's Edge",
        items: [
          { id: 'hs-13', land: 'Galaxy\'s Edge', name: 'Build a lightsaber at Savi\'s Workshop', meta: '~$260 · reservations required', badge: 'experience' },
          { id: 'hs-14', land: 'Galaxy\'s Edge', name: 'Build a droid at Droid Depot', meta: '~$120 · walk-up or reservations', badge: 'experience' },
        ]
      },
      {
        name: 'Table-Service Restaurants',
        items: [
          { id: 'hs-19', land: 'Echo Lake', name: "50's Prime Time Café", meta: 'Echo Lake · Mom\'s meatloaf & sitcom-set theming — reservations suggested', badge: 'food' },
          { id: 'hs-33', land: 'Grand Avenue', name: 'Baseline Tap House', meta: 'Grand Avenue · California craft beer & small bites lounge', badge: 'food' },
          { id: 'hs-25', land: 'Hollywood Blvd', name: 'The Hollywood Brown Derby', meta: 'Hollywood Blvd · signature dining, famous Cobb salad', badge: 'food' },
          { id: 'hs-28', land: 'Hollywood Blvd', name: 'Hollywood & Vine', meta: 'Hollywood Blvd · character buffet dining', badge: 'food' },
          { id: 'hs-27', land: 'Grand Avenue', name: "Mama Melrose's Ristorante Italiano", meta: 'Grand Avenue · Italian table-service', badge: 'food' },
          { id: 'hs-18', land: 'Galaxy\'s Edge', name: "Oga's Cantina", meta: "Galaxy's Edge · reservations recommended, 21+ after 9pm", badge: 'food' },
          { id: 'hs-31', land: 'Toy Story Land', name: 'Roundup Rodeo BBQ', meta: 'Toy Story Land · table-service BBQ inside Andy\'s toy set', badge: 'food' },
          { id: 'hs-26', land: 'Commissary Lane', name: 'Sci-Fi Dine-In Theater Restaurant', meta: 'Commissary Lane · eat in a car at a drive-in movie', badge: 'food' },
        ]
      },
      {
        name: 'Quick-Service Restaurants',
        items: [
          { id: 'hs-29', land: 'Commissary Lane', name: 'ABC Commissary', meta: 'Commissary Lane · burgers, bowls & mobile order', badge: 'food' },
          { id: 'hs-30', land: 'Echo Lake', name: 'Backlot Express', meta: 'Echo Lake · burgers & chicken in a prop-shop setting', badge: 'food' },
          { id: 'hs-34', land: 'Sunset Blvd', name: "Catalina Eddie's", meta: 'Sunset Blvd · pizza & salads', badge: 'food' },
          { id: 'hs-24', land: 'Galaxy\'s Edge', name: 'Docking Bay 7 Food and Cargo', meta: "Galaxy's Edge · creative quick-service", badge: 'food' },
          { id: 'hs-35', land: 'Sunset Blvd', name: 'Fairfax Fare', meta: 'Sunset Blvd · hot dogs & Fairfax salad', badge: 'food' },
          { id: 'hs-37', land: 'Echo Lake', name: "Min and Bill's Dockside Diner", meta: 'Echo Lake · loaded fries, shakes & dockside seating', badge: 'food' },
          { id: 'hs-39', land: 'Grand Avenue', name: 'PizzeRizzo', meta: 'Grand Avenue · Rizzo the Rat\'s pizza joint, often seasonal', badge: 'food' },
          { id: 'hs-16', land: 'Galaxy\'s Edge', name: 'Ronto Roasters', meta: "Galaxy's Edge · signature Ronto Wrap, must-eat", badge: 'food', must: true },
          { id: 'hs-32', land: 'Sunset Blvd', name: "Rosie's All-American Café", meta: 'Sunset Blvd · burgers & chicken nuggets', badge: 'food' },
          { id: 'hs-36', land: 'Hollywood Blvd', name: 'The Trolley Car Café (Starbucks)', meta: 'Hollywood Blvd · Starbucks coffee & pastries', badge: 'food' },
          { id: 'hs-17', land: 'Toy Story Land', name: "Woody's Lunch Box", meta: 'Toy Story Land · Totchos, grilled cheese & lunch-box tarts', badge: 'food' },
        ]
      },
      {
        name: 'Snacks & Treats',
        items: [
          { id: 'hs-41', land: 'Sunset Blvd', name: 'Anaheim Produce', meta: 'Sunset Blvd · fresh fruit & frozen lemonade', badge: 'food' },
          { id: 'hs-38', land: 'Echo Lake', name: "Dinosaur Gertie's Ice Cream of Extinction", meta: 'Echo Lake · soft-serve inside the giant dinosaur', badge: 'food' },
          { id: 'hs-42', land: 'Echo Lake', name: 'Epic Eats', meta: 'Echo Lake · funnel cakes & soft-serve', badge: 'food' },
          { id: 'hs-40', land: 'Sunset Blvd', name: 'Hollywood Scoops', meta: 'Sunset Blvd · hand-scooped ice cream', badge: 'food' },
          { id: 'hs-15', land: 'Galaxy\'s Edge', name: 'Blue or green milk at Milk Stand', meta: "Galaxy's Edge · plant-based frozen drinks", badge: 'food' },
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
          { id: 'ep-22', land: 'World Celebration', name: 'Journey of Water, Inspired by Moana', meta: 'World Celebration · all ages, interactive water trail', badge: 'experience' },
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
          { id: 'ep-78', land: 'World Showcase (United States)', name: 'United States pavilion', meta: 'The American Adventure show, Regal Eagle Smokehouse & Voices of Liberty', badge: 'food' },
          { id: 'ep-11', land: 'World Showcase (Japan)', name: 'Japan pavilion', meta: 'Mitsukoshi department store, koi ponds & sake bar', badge: 'food' },
          { id: 'ep-40', land: 'World Showcase (Morocco)', name: 'Morocco pavilion', meta: 'Intricate tilework, Spice Road Table & Jasmine meet', badge: 'food' },
          { id: 'ep-12', land: 'World Showcase (France)', name: 'France pavilion', meta: 'Remy\'s Ratatouille Adventure, Les Halles & Eiffel Tower view', badge: 'food' },
          { id: 'ep-13', land: 'World Showcase (United Kingdom)', name: 'United Kingdom pavilion', meta: 'Rose & Crown Pub, gardens & Mary Poppins meet', badge: 'food' },
          { id: 'ep-14', land: 'World Showcase (Canada)', name: 'Canada pavilion', meta: 'Le Cellier steakhouse & Canada Far and Wide film', badge: 'food' },
        ]
      },
      {
        name: 'Table-Service Restaurants',
        items: [
          { id: 'ep-47', land: 'World Showcase (Norway)', name: 'Akershus Royal Banquet Hall (Norway)', meta: 'Princess character dining in a medieval castle', badge: 'food' },
          { id: 'ep-41', land: 'World Showcase (Germany)', name: 'Biergarten Restaurant (Germany)', meta: 'Buffet-style German cuisine with live entertainment', badge: 'food' },
          { id: 'ep-65', land: 'World Showcase (France)', name: 'Chefs de France', meta: 'Classic French brasserie', badge: 'food' },
          { id: 'ep-51', land: 'World Nature', name: 'Coral Reef Restaurant', meta: 'Seafood with floor-to-ceiling aquarium views', badge: 'food' },
          { id: 'ep-52', land: 'World Nature', name: 'Garden Grill Restaurant', meta: 'Rotating restaurant, Chip & Dale character dining', badge: 'food' },
          { id: 'ep-20', land: 'World Showcase (Mexico)', name: 'La Cava del Tequila (Mexico)', meta: 'Walk-in tequila lounge, famous frozen margaritas', badge: 'food' },
          { id: 'ep-56', land: 'World Showcase (Mexico)', name: 'La Hacienda de San Angel (Mexico)', meta: 'Lagoon-side Mexican dining, great fireworks views', badge: 'food' },
          { id: 'ep-67', land: 'World Showcase (France)', name: 'La Crêperie de Paris', meta: 'Sweet & savory crepes — table service & to-go window', badge: 'food' },
          { id: 'ep-69', land: 'World Showcase (Canada)', name: 'Le Cellier Steakhouse (Canada)', meta: 'Steakhouse in a castle cellar, famous cheddar soup', badge: 'food' },
          { id: 'ep-66', land: 'World Showcase (France)', name: 'Monsieur Paul', meta: 'Upscale French fine dining', badge: 'food' },
          { id: 'ep-58', land: 'World Showcase (China)', name: 'Nine Dragons Restaurant (China)', meta: 'Table-service Chinese cuisine', badge: 'food' },
          { id: 'ep-19', land: 'World Showcase (United Kingdom)', name: 'Rose & Crown Pub (UK)', meta: 'Fish & chips & Guinness, lagoon-side patio', badge: 'food' },
          { id: 'ep-43', land: 'World Showcase (Mexico)', name: 'San Angel Inn Restaurante (Mexico)', meta: 'Dine inside the pyramid under a twilight sky', badge: 'food' },
          { id: 'ep-72', land: 'World Showcase (Japan)', name: 'Shiki-Sai: Sushi Izakaya (Japan)', meta: 'Sushi & izakaya-style plates', badge: 'food' },
          { id: 'ep-50', land: 'World Discovery', name: 'Space 220', meta: 'Dine "220 miles above Earth" — reservations tough', badge: 'food' },
          { id: 'ep-46', land: 'World Showcase (Morocco)', name: 'Spice Road Table (Morocco)', meta: 'Mediterranean small plates on the lagoon', badge: 'food' },
          { id: 'ep-73', land: 'World Showcase (Japan)', name: 'Takumi-Tei (Japan)', meta: 'Signature Japanese dining, omakase experience', badge: 'food' },
          { id: 'ep-45', land: 'World Showcase (Japan)', name: 'Teppan Edo (Japan)', meta: 'Hibachi-style teppanyaki tables', badge: 'food' },
          { id: 'ep-42', land: 'World Showcase (Italy)', name: 'Tutto Italia Ristorante (Italy)', meta: 'Classic Italian table-service', badge: 'food' },
          { id: 'ep-60', land: 'World Showcase (Italy)', name: 'Tutto Gusto Wine Cellar (Italy)', meta: 'Cozy wine cellar, small plates — walk-in friendly', badge: 'food' },
          { id: 'ep-61', land: 'World Showcase (Italy)', name: 'Via Napoli Ristorante e Pizzeria (Italy)', meta: 'Wood-fired Neapolitan pizza', badge: 'food' },
        ]
      },
      {
        name: 'Quick-Service Restaurants',
        items: [
          { id: 'ep-76', land: 'World Showcase (Mexico)', name: 'Choza de Margarita (Mexico)', meta: 'Walk-up margaritas & antojitos', badge: 'food' },
          { id: 'ep-53', land: 'World Celebration', name: 'Connections Cafe & Eatery', meta: 'Starbucks & large quick-service food hall', badge: 'food' },
          { id: 'ep-62', land: 'World Showcase (Japan)', name: 'Katsura Grill (Japan)', meta: 'Teriyaki, sushi & udon in a garden setting', badge: 'food' },
          { id: 'ep-57', land: 'World Showcase (Mexico)', name: 'La Cantina de San Angel (Mexico)', meta: 'Lagoon-side tacos & empanadas', badge: 'food' },
          { id: 'ep-17', land: 'World Showcase (France)', name: 'Les Halles Boulangerie-Pâtisserie (France)', meta: 'Pastries, sandwiches & crepes', badge: 'food' },
          { id: 'ep-59', land: 'World Showcase (China)', name: 'Lotus Blossom Café (China)', meta: 'Quick-service Chinese', badge: 'food' },
          { id: 'ep-71', land: 'World Showcase (Canada)', name: 'Refreshment Port (near Canada)', meta: 'Poutine & croissant doughnuts', badge: 'food' },
          { id: 'ep-44', land: 'World Showcase (USA)', name: 'Regal Eagle Smokehouse (USA)', meta: 'Sam Eagle\'s BBQ smokehouse', badge: 'food' },
          { id: 'ep-48', land: 'World Showcase (Germany)', name: 'Sommerfest (Germany)', meta: 'Bratwurst, pretzels & German beer', badge: 'food' },
          { id: 'ep-54', land: 'World Nature', name: 'Sunshine Seasons', meta: 'Fresh food hall in The Land pavilion', badge: 'food' },
          { id: 'ep-64', land: 'World Showcase (Morocco)', name: 'Tangierine Café (Morocco)', meta: 'Shawarma & Mediterranean quick-service', badge: 'food' },
          { id: 'ep-68', land: 'World Showcase (United Kingdom)', name: 'Yorkshire County Fish Shop (UK)', meta: 'Walk-up fish & chips', badge: 'food' },
        ]
      },
      {
        name: 'Snacks & Treats',
        items: [
          { id: 'ep-16', land: 'World Showcase (Norway)', name: 'School bread at Kringla Bakeri (Norway)', meta: 'World Showcase · a EPCOT classic', badge: 'food', must: true },
          { id: 'ep-70', land: 'World Showcase (USA)', name: 'Block & Hans (USA)', meta: 'American craft beer & pretzels', badge: 'food' },
          { id: 'ep-55', land: 'World Celebration', name: 'Club Cool', meta: 'Free international Coca-Cola tastings — try Beverly', badge: 'food' },
          { id: 'ep-18', land: 'World Showcase (Canada)', name: 'Croissant doughnut at Refreshment Port', meta: 'Near Canada pavilion · cult-favorite treat', badge: 'food' },
          { id: 'ep-75', land: 'World Showcase (USA)', name: 'Fife & Drum Tavern (USA)', meta: 'Turkey legs & frozen slushes', badge: 'food' },
          { id: 'ep-74', land: 'World Showcase (Italy)', name: 'Gelateria Toscana (Italy)', meta: 'Artisan gelato & sorbetto', badge: 'food' },
          { id: 'ep-63', land: 'World Showcase (Japan)', name: 'Kabuki Café (Japan)', meta: 'Kakigōri shave ice & sushi rolls', badge: 'food' },
          { id: 'ep-49', land: 'World Showcase (France)', name: 'L\'Artisan des Glaces (France)', meta: 'Macaron ice cream sandwiches & artisan gelato', badge: 'food' },
          { id: 'ep-77', land: 'World Showcase (USA)', name: 'Funnel Cake stand (USA)', meta: 'Fresh funnel cakes near The American Adventure', badge: 'food' },
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
          { id: 'ak-10', land: 'Africa', name: 'Gorilla Falls Exploration Trail', meta: 'Africa · walk-through, all ages', badge: 'experience' },
          { id: 'ak-11', land: 'Asia', name: 'Maharajah Jungle Trek', meta: 'Asia · tigers, bats & birds', badge: 'experience' },
          { id: 'ak-12', land: 'Discovery Island', name: 'Tree of Life Awakenings', meta: 'Discovery Island · evening projections, seasonal (mid-Nov to early March)', badge: 'show' },
          { id: 'ak-18', land: 'Discovery Island', name: "Wilderness Explorers", meta: 'Park-wide · self-guided badge-earning activity, all ages', badge: 'experience' },
          { id: 'ak-19', land: 'Africa', name: "Bluey's Wild World", meta: 'Conservation Station · opened May 26, 2026 — virtual queue required', badge: 'experience', status: 'new' },
          { id: 'ak-20', land: 'Africa', name: 'Wildlife Express Train', meta: 'Africa (Harambe Station) · only way to reach Conservation Station', badge: 'family' },
          { id: 'ak-21', land: 'Asia', name: 'Feathered Friends in Flight!', meta: 'Asia (Caravan Stage) · live bird show', badge: 'show' },
          { id: 'ak-22', land: 'Discovery Island', name: 'Adventurers Outpost', meta: 'Discovery Island · meet Mickey & Minnie', badge: 'character' },
          { id: 'ak-23', land: 'Asia', name: 'Habitat Habit!', meta: 'Asia · self-guided cotton-top tamarin exhibit', badge: 'experience' },
          { id: 'ak-24', land: 'Discovery Island', name: 'Oasis Exhibits', meta: 'Park entrance · giant anteaters, swamp wallabies & more', badge: 'experience' },
          { id: 'ak-37', land: 'DinoLand U.S.A.', name: 'Finding Nemo: The Big Blue... and Beyond!', meta: 'Theater in the Wild (DinoLand) · live puppetry musical', badge: 'show' },
        ]
      },
      {
        name: 'Table-Service Restaurants',
        items: [
          { id: 'ak-16', land: 'Discovery Island', name: 'Tiffins Restaurant', meta: 'Discovery Island · signature dining, travel-themed art', badge: 'food' },
          { id: 'ak-30', land: 'Discovery Island', name: 'Nomad Lounge', meta: 'Discovery Island · waterfront lounge, famous churros', badge: 'food' },
          { id: 'ak-27', land: 'Africa', name: 'Tusker House Restaurant', meta: 'Africa · Donald Duck safari character buffet', badge: 'food' },
          { id: 'ak-25', land: 'Asia', name: 'Yak & Yeti Restaurant', meta: 'Asia · pan-Asian table-service, famous fried wontons', badge: 'food' },
          { id: 'ak-33', land: 'Park entrance', name: 'Rainforest Cafe', meta: 'Park entrance · jungle-themed dining with animatronics', badge: 'food' },
        ]
      },
      {
        name: 'Quick-Service Restaurants',
        items: [
          { id: 'ak-13', land: 'Discovery Island', name: 'Flame Tree Barbecue', meta: 'Discovery Island · ribs & pulled pork with water views', badge: 'food', must: true },
          { id: 'ak-28', land: 'Africa', name: 'Harambe Market', meta: 'Africa · open-air African street food', badge: 'food' },
          { id: 'ak-34', land: 'Discovery Island', name: 'Pizzafari', meta: 'Discovery Island · pizza & flatbreads', badge: 'food' },
          { id: 'ak-14', land: 'Pandora', name: "Satu'li Canteen", meta: 'Pandora · healthy bowls & great theming', badge: 'food' },
          { id: 'ak-26', land: 'Asia', name: 'Yak & Yeti Local Food Cafes', meta: 'Asia · quick-service counter next to the restaurant', badge: 'food' },
        ]
      },
      {
        name: 'Snacks & Treats',
        items: [
          { id: 'ak-15', land: 'Pandora', name: 'Night Blossom at Pongu Pongu', meta: 'Pandora · glowing layered frozen drink', badge: 'food' },
          { id: 'ak-29', land: 'Pandora', name: 'Pongu Pongu', meta: 'Pandora · specialty drinks & Pongu Lumpia', badge: 'food' },
          { id: 'ak-32', land: 'Asia', name: 'Drinkwallah', meta: 'Asia · frozen drinks & snacks', badge: 'food' },
          { id: 'ak-31', land: 'Africa', name: 'Kusafiri Coffee Shop & Bakery', meta: 'Africa · pastries & coffee', badge: 'food' },
          { id: 'ak-35', land: 'Africa', name: 'Tamu Tamu Refreshments', meta: 'Africa · Dole Whip, with optional rum', badge: 'food' },
          { id: 'ak-36', land: 'Asia', name: 'Warung Outpost', meta: 'Asia · margaritas & Mickey pretzels', badge: 'food' },
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
          { id: 'dl-39', land: 'Frontierland', name: "Pirate's Lair on Tom Sawyer Island", meta: 'Frontierland · all ages, walk-through exploration island', badge: 'experience' },
          { id: 'dl-40', land: 'Bayou Country', name: "Davy Crockett's Explorer Canoes", meta: 'Bayou Country · all ages, guest-paddled canoes, seasonal hours', badge: 'experience' },
          { id: 'dl-41', land: 'Mickey\'s Toontown', name: "Mickey & Minnie's Runaway Railway", meta: 'Mickey\'s Toontown · all ages, trackless dark ride', badge: 'family' },
          { id: 'dl-42', land: 'Mickey\'s Toontown', name: "Roger Rabbit's Car Toon Spin", meta: 'Mickey\'s Toontown · all ages, spinning dark ride', badge: 'family' },
          { id: "dl-43", land: "Mickey's Toontown", name: "Chip 'n' Dale's GADGETcoaster", meta: 'Mickey\'s Toontown · 35" min height, family coaster', badge: 'family' },
        ]
      },
      {
        name: 'Shows & experiences',
        items: [
          { id: 'dl-13', land: 'Frontierland', name: 'Fantasmic!', meta: 'Rivers of America · evenings, check schedule', badge: 'show' },
          { id: 'dl-15', land: 'Main Street USA', name: 'Paint the Night Parade', meta: 'Check schedule — seasonal', badge: 'show' },
          { id: 'dl-88', land: 'Frontierland', name: 'Fire of the Rising Moons', meta: 'Rivers of America · evening spectacular, check schedule', badge: 'show', status: 'new' },
          { id: 'dl-16', land: 'Main Street USA', name: 'Disneyland Forever Fireworks', meta: 'Check schedule', badge: 'show' },
          { id: 'dl-44', land: 'Fantasyland', name: "Bluey's Best Day Ever!", meta: 'Fantasyland Theatre · opened March 22, 2026', badge: 'show', status: 'new' },
          { id: 'dl-45', land: 'Main Street USA', name: 'Great Moments with Mr. Lincoln', meta: 'Main Street USA (Disneyland Story) · animatronic theater presentation', badge: 'show' },
          { id: 'dl-46', land: 'Frontierland', name: 'Frontierland Shootin\' Exposition', meta: 'Frontierland · interactive shooting gallery, small fee', badge: 'experience' },
          { id: 'dl-47', land: 'Fantasyland', name: "Sleeping Beauty Castle Walkthrough", meta: 'Fantasyland · all ages, walk-through diorama', badge: 'experience' },
        ]
      },
      {
        name: 'Table-Service Restaurants',
        items: [
          { id: 'dl-17', land: 'New Orleans Square', name: 'Blue Bayou Restaurant', meta: 'New Orleans Square · inside Pirates of the Caribbean, famous Monte Cristo — reservations suggested', badge: 'food', must: true },
          { id: 'dl-48', land: 'New Orleans Square', name: 'Café Orleans', meta: 'New Orleans Square · table-service, less formal than Blue Bayou', badge: 'food' },
          { id: 'dl-49', land: 'Main Street USA', name: 'Carnation Café', meta: 'Main Street USA · table-service American comfort food', badge: 'food' },
          { id: 'dl-53', land: 'Main Street USA', name: 'Plaza Inn', meta: 'Main Street USA · Minnie & friends character breakfast (table-service); famous fried chicken served buffeteria-style rest of day', badge: 'food' },
          { id: 'dl-51', land: 'Frontierland', name: 'River Belle Terrace', meta: 'Frontierland · table-service Southern fare overlooking Rivers of America', badge: 'food' },
          { id: 'dl-62', land: 'Galaxy\'s Edge', name: "Oga's Cantina", meta: "Galaxy's Edge · seated themed lounge — reservations recommended", badge: 'food' },
        ]
      },
      {
        name: 'Quick-Service Restaurants',
        items: [
          { id: 'dl-63', land: 'Tomorrowland', name: 'Alien Pizza Planet', meta: 'Tomorrowland · pizza & pasta with Toy Story alien theming', badge: 'food' },
          { id: 'dl-55', land: 'Adventureland', name: 'Bengal Barbecue', meta: 'Adventureland · grilled skewers & Safari Nuggets', badge: 'food' },
          { id: 'dl-64', land: 'Mickeys Toontown', name: 'Café Daisy', meta: "Mickey's Toontown · pizza, hot dogs & salads", badge: 'food' },
          { id: 'dl-61', land: 'Galaxy\'s Edge', name: 'Docking Bay 7 Food and Cargo', meta: "Galaxy's Edge · creative galactic quick-service", badge: 'food' },
          { id: 'dl-65', land: 'Tomorrowland', name: 'Galactic Grill', meta: 'Tomorrowland · burgers, breakfast & specialty items', badge: 'food' },
          { id: 'dl-57', land: 'Frontierland', name: 'The Golden Horseshoe', meta: 'Frontierland · counter-service chicken & ice cream with live entertainment', badge: 'food' },
          { id: 'dl-59', land: 'Bayou Country', name: 'Harbour Galley', meta: 'Bayou Country · clam chowder bread bowls & lobster roll', badge: 'food' },
          { id: 'dl-58', land: 'Bayou Country', name: 'Hungry Bear Barbecue Jamboree', meta: 'Bayou Country · house-smoked BBQ with the Country Bears — reimagined 2024', badge: 'food' },
          { id: 'dl-54', land: 'Main Street USA', name: 'Jolly Holiday Bakery Café', meta: 'Main Street USA · pastries, sandwiches & coffee', badge: 'food' },
          { id: 'dl-66', land: 'Main Street USA', name: 'Market House', meta: 'Main Street USA · Starbucks coffee & baked goods', badge: 'food' },
          { id: 'dl-52', land: 'Frontierland', name: 'Rancho del Zócalo Restaurante', meta: 'Frontierland · quick-service Mexican', badge: 'food' },
          { id: 'dl-60', land: 'Fantasyland', name: 'Red Rose Taverne', meta: 'Fantasyland · Beauty and the Beast-themed burgers & poutine', badge: 'food' },
          { id: 'dl-67', land: 'Main Street USA', name: 'Refreshment Corner', meta: 'Main Street USA · hot dogs & live ragtime piano', badge: 'food' },
          { id: 'dl-22', land: 'Galaxy\'s Edge', name: 'Ronto Roasters', meta: "Galaxy's Edge · signature Ronto Wrap", badge: 'food' },
          { id: 'dl-70', land: 'New Orleans Square', name: 'Royal Street Veranda', meta: 'New Orleans Square · gumbo bread bowls & fritters', badge: 'food' },
          { id: 'dl-68', land: 'Frontierland', name: 'Stage Door Café', meta: 'Frontierland · corn dogs, chicken nuggets & funnel cake', badge: 'food' },
          { id: 'dl-50', land: 'New Orleans Square', name: "Tiana's Palace", meta: 'New Orleans Square · quick-service Creole-inspired fare', badge: 'food' },
          { id: 'dl-69', land: 'Fantasyland', name: 'Troubadour Tavern', meta: 'Fantasyland · bratwurst & stuffed baked potatoes by Fantasyland Theatre', badge: 'food' },
        ]
      },
      {
        name: 'Snacks & Treats',
        items: [
          { id: 'dl-18', land: 'Adventureland', name: 'Dole Whip at Tiki Juice Bar', meta: 'Adventureland · the original Disneyland Dole Whip', badge: 'food', must: true },
          { id: 'dl-76', land: 'Main Street USA', name: 'Candy Palace and Candy Kitchen', meta: 'Main Street USA · handmade candy, toffee & caramel apples', badge: 'food' },
          { id: 'dl-21', land: 'Main Street USA', name: 'Churro Cart (Main Street)', meta: 'Main Street USA · classic & seasonal churros', badge: 'food' },
          { id: 'dl-71', land: 'Frontierland', name: 'Churro Cart (Frontierland)', meta: 'Frontierland · classic & seasonal churros', badge: 'food' },
          { id: 'dl-72', land: 'Fantasyland', name: 'Churro Cart (Fantasyland)', meta: 'Fantasyland · classic & seasonal churros', badge: 'food' },
          { id: 'dl-73', land: 'Tomorrowland', name: 'Churro Cart (Tomorrowland)', meta: 'Tomorrowland · classic & seasonal churros', badge: 'food' },
          { id: 'dl-74', land: 'New Orleans Square', name: 'Churro Cart (New Orleans Square)', meta: 'New Orleans Square · classic & seasonal churros', badge: 'food' },
          { id: 'dl-75', land: 'Bayou Country', name: 'Churro Cart (Bayou Country)', meta: 'Bayou Country · classic & seasonal churros', badge: 'food' },
          { id: 'dl-80', land: 'Fantasyland', name: 'Edelweiss Snacks', meta: 'Fantasyland · turkey legs & frozen slushes near the Matterhorn', badge: 'food' },
          { id: 'dl-79', land: 'Fantasy Faire', name: 'Fantasy Faire Royal Theatre snack cart', meta: 'Fantasy Faire · seasonal snacks & drinks', badge: 'food' },
          { id: 'dl-77', land: 'Main Street USA', name: 'Gibson Girl Ice Cream Parlor', meta: 'Main Street USA · hand-scooped sundaes & waffle cones', badge: 'food' },
          { id: 'dl-82', land: 'Mickeys Toontown', name: 'Good Boy! Grocers', meta: "Mickey's Toontown · grab-and-go snacks, fruit & pickles", badge: 'food' },
          { id: 'dl-20', land: 'Main Street USA', name: 'Corn dog at Little Red Wagon', meta: 'Main Street USA · Disneyland institution', badge: 'food' },
          { id: 'dl-78', land: 'Fantasy Faire', name: "Maurice's Treats", meta: 'Fantasy Faire · boysen apple freeze & sweet twists', badge: 'food' },
          { id: 'dl-81', land: 'Galaxy\'s Edge', name: 'Milk Stand', meta: "Galaxy's Edge · Blue, Green & Pink Milk", badge: 'food' },
          { id: 'dl-19', land: 'New Orleans Square', name: 'Mint Julep Bar', meta: 'New Orleans Square · non-alcoholic mint juleps', badge: 'food' },
          { id: 'dl-83', land: 'Main Street USA', name: 'Popcorn Carts', meta: 'Multiple locations · fresh popcorn & souvenir buckets', badge: 'food' },
          { id: 'dl-84', land: 'Main Street USA', name: 'Pretzel Carts', meta: 'Multiple locations · Mickey pretzels & cream cheese-filled', badge: 'food' },
          { id: 'dl-85', land: 'Main Street USA', name: 'Refreshment Fruit Cart', meta: 'Main Street USA · fresh fruit, pickles & healthy snacks', badge: 'food' },
          { id: 'dl-86', land: 'Frontierland', name: 'Ship to Shore Marketplace', meta: 'Frontierland · turkey legs & chimichangas', badge: 'food' },
          { id: 'dl-87', land: 'Fantasyland', name: 'Small World Promenade Snack Cart', meta: 'Fantasyland · churros & drinks along the promenade', badge: 'food' },
          { id: 'dl-56', land: 'Adventureland', name: 'The Tropical Hideaway', meta: 'Adventureland · bao buns & Dole Whip variations', badge: 'food' },
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
          { id: 'dca-29', land: 'Grizzly Peak', name: 'Redwood Creek Challenge Trail', meta: 'Grizzly Peak · all ages, climbing & play area', badge: 'experience' },
        ]
      },
      {
        name: 'Avengers Campus',
        items: [
          { id: 'dca-12', land: 'Avengers Campus', name: 'Avengers Headquarters meet-and-greets', meta: 'Spider-Man, Black Panther & more', badge: 'character' },
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
        name: 'Table-Service Restaurants',
        items: [
          { id: 'dca-33', land: 'Buena Vista Street', name: 'Carthay Circle Restaurant', meta: 'Buena Vista Street · upscale signature dining', badge: 'food' },
          { id: 'dca-20', land: 'Pixar Pier', name: 'Lamplight Lounge', meta: 'Pixar Pier · waterfront dining, reservations suggested', badge: 'food' },
          { id: 'dca-39', land: 'Golden State', name: 'Wine Country Trattoria', meta: 'Golden State · table-service Italian & wine', badge: 'food' },
        ]
      },
      {
        name: 'Quick-Service Restaurants',
        items: [
          { id: 'dca-36', land: 'San Fransokyo Square', name: 'Aunt Cass Cafe', meta: 'San Fransokyo Square · soups & sandwiches in bread bowls', badge: 'food' },
          { id: 'dca-19', land: 'Hollywood Land', name: 'Award Wieners', meta: 'Hollywood Land · gourmet hot dogs & fries', badge: 'food' },
          { id: 'dca-42', land: 'Pixar Pier', name: 'Boardwalk Pizza & Pasta', meta: 'Pixar Pier · quick-service Italian', badge: 'food' },
          { id: 'dca-37', land: 'San Fransokyo Square', name: 'Cocina Cucamonga Mexican Grill', meta: 'San Fransokyo Square · quick-service tacos & birria', badge: 'food' },
          { id: 'dca-43', land: 'Pixar Pier', name: 'Corn Dog Castle', meta: 'Pixar Pier · classic and specialty corn dogs', badge: 'food' },
          { id: 'dca-47', land: 'Cars Land', name: "Flo's V8 Café", meta: 'Cars Land · retro diner classics with Route 66 views', badge: 'food' },
          { id: 'dca-38', land: 'San Fransokyo Square', name: 'Lucky Fortune Cookery', meta: 'San Fransokyo Square · Asian-inspired bowls & ramen', badge: 'food' },
          { id: 'dca-41', land: 'Paradise Gardens Park', name: 'Paradise Garden Grill', meta: 'Paradise Gardens Park · seasonal-rotating quick-service', badge: 'food' },
          { id: 'dca-40', land: 'Avengers Campus', name: 'Pym Test Kitchen', meta: 'Avengers Campus · "quantum-sized" Ant-Man themed food', badge: 'food' },
          { id: 'dca-48', land: 'Grizzly Peak', name: 'Smokejumpers Grill', meta: 'Grizzly Peak · burgers & fries, firefighter theming', badge: 'food' },
        ]
      },
      {
        name: 'Snacks & Treats',
        items: [
          { id: 'dca-16', land: 'Buena Vista Street', name: 'Cherry Cola Float at Carthay Circle', meta: 'Buena Vista Street', badge: 'food', must: true },
          { id: 'dca-46', land: 'Pixar Pier', name: 'Adorable Snowman Frosted Treats', meta: 'Pixar Pier · seasonal soft-serve & desserts', badge: 'food' },
          { id: 'dca-49', land: 'Pixar Pier', name: "Bing Bong's Sweet Stuff", meta: 'Pixar Pier · candy shop & Cotton Candy Lemonade', badge: 'food' },
          { id: 'dca-17', land: 'Buena Vista Street', name: 'Churro Toffee Sundae', meta: 'Available seasonally', badge: 'food' },
          { id: 'dca-45', land: 'Buena Vista Street', name: "Clarabelle's Hand-Scooped Ice Cream", meta: "Buena Vista Street · Dreyer's ice cream & sundaes", badge: 'food' },
          { id: 'dca-35', land: 'Cars Land', name: 'Cozy Cone Motel', meta: 'Cars Land · five themed snack windows in one spot', badge: 'food' },
          { id: 'dca-18', land: 'San Fransokyo Square', name: 'Ghirardelli Soda Fountain', meta: 'San Fransokyo Square · sundaes & free chocolate square', badge: 'food' },
          { id: 'dca-50', land: 'Hollywood Land', name: 'Schmoozies!', meta: 'Hollywood Land · milkshakes & smoothies', badge: 'food' },
          { id: 'dca-51', land: 'San Fransokyo Square', name: "Willie's Churros", meta: 'San Fransokyo Square · specialty filled churros', badge: 'food' },
        ]
      }
    ]
  }
];
