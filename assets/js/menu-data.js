/* Grace Noodle: menu data.
   Sources: the restaurant's in-house menu as photographed by diners (Yelp, "updated menu prices as of 6/24/23")
   and a newer menu photo on Google (items 5 and 7-11 use those newer prices). Every price must be confirmed with the owners before launch.
   spicy: true marks dishes the menu prints in red (spicy). options = protein choice printed on the menu. */
window.AKIDA_MENU = [
  { id: 'appetizers', name: 'Appetizers', jp: '前菜',
    items: [
      { id: 'N1', name: 'Spicy Wanton Shrimp', price: 5.99, spicy: true },
      { id: 'N2', name: 'Grilled Dumplings (6 pcs)', desc: 'Pan-grilled gyoza', price: 5.99 },
      { id: 'N2S', name: 'Grilled Dumplings (4 pcs)', price: 3.99 },
      { id: 'N3', name: 'Dumpling Soup', price: 5.99 },
      { id: 'N4', name: 'Tako Yaki (4 pcs)', desc: 'Octopus and vegetables in a fried dough ball', price: 4.99 },
      { id: 'N5', name: 'Turkey Bacon Roll', desc: 'Sliced cucumber, lettuce, green onion. Can be ordered vegan.', price: 6.99, options: ['Regular', 'Vegan'] }
    ] },
  { id: 'salad', name: 'Noodle Salad', jp: '冷やし麺',
    items: [
      { id: 'N7', name: 'Tan Tan Noodle Salad', desc: 'Ground pork with spicy garlic sauce, sliced cucumber, bean sprout', price: 12.99, spicy: true },
      { id: 'N8', name: 'Shrimp Noodle Salad', desc: 'Shrimp with garlic sauce, sliced cucumber, bean sprout', price: 13.99, spicy: true },
      { id: 'N9', name: 'Hiyashi Chuka (cold noodles)', desc: 'Sliced pork, tomato, cucumber, fried egg, crab meat, seaweed, all on top', price: 12.99 }
    ] },
  { id: 'ramen', name: 'Ramen', jp: 'ラーメン', note: 'Noodles made fresh in house.',
    items: [
      { id: 'N10', name: 'Shoyu Ramen', desc: 'Soy taste. Roast pork or chicken, green onion, bamboo shoot, naruto, seaweed, half of boiled egg', price: 11.99, options: ['Roast pork', 'Chicken'] },
      { id: 'N11', name: 'Shio Ramen', desc: 'Salt taste. Pork or chicken, green onion, bamboo shoot, naruto, seaweed, half of boiled egg', price: 11.99, options: ['Pork', 'Chicken'] },
      { id: 'N12', name: 'Miso Ramen', desc: 'Miso taste. Pork or chicken, carrot, cabbage, napa, bean sprout, green onion', price: 10.99, options: ['Pork', 'Chicken'] },
      { id: 'N13', name: 'Kimchi Ramen', desc: 'Kimchi, pork or chicken, veggies, green onion', price: 10.99, spicy: true, options: ['Pork', 'Chicken'] },
      { id: 'N14', name: 'Cha Shu Ramen', desc: '6 pieces roast pork, bamboo shoot, onion, seaweed', price: 13.99 },
      { id: 'N15', name: 'Wantan Ramen', desc: 'Roast pork or chicken, bamboo shoot, green onion, seaweed, half of boiled egg', price: 11.99, options: ['Roast pork', 'Chicken'] },
      { id: 'N16', name: 'Tan Tan Ramen (very spicy)', desc: 'Vegetables, ground pork or ground chicken, green onion', price: 11.50, spicy: true, options: ['Ground pork', 'Ground chicken'] },
      { id: 'N17', name: 'Yasai Ramen (vegetable)', desc: 'Napa, carrots, onions, bean sprout, bamboo shoots, scallions, tofu', price: 10.99 },
      { id: 'N18', name: 'Gomoku Ramen', desc: 'Pork or chicken, napa, carrot, cabbage, green onion, shrimp, bamboo shoots, quail eggs', price: 11.99, options: ['Pork', 'Chicken'] },
      { id: 'N19', name: 'Tonkotsu Ramen (pork bone soup)', desc: 'Roast pork, green onion, seaweed, half boiled egg, naruto, bamboo shoot, pickled ginger', price: 11.50 },
      { id: 'N20', name: 'Stamina Ramen', desc: 'Ground pork, leeks, scallion, garlic, chili sauce, green onion', price: 10.99, spicy: true },
      { id: 'N21', name: 'Sea Food Ramen', desc: 'Squid, shrimp, octopus, crab meat, fish meatball, green onion, carrots, cabbage', price: 13.99 },
      { id: 'N22', name: 'Spicy Shrimp Garlic Sauce Ramen', price: 13.99, spicy: true }
    ] },
  { id: 'fried-noodle', name: 'Fried Noodle', jp: '焼きそば',
    items: [
      { id: 'N23', name: 'Sauce Yaki Soba', desc: 'Japanese noodle sauce, pork or chicken, green onion, carrots, cabbage, egg', price: 9.50, options: ['Pork', 'Chicken'] },
      { id: 'N24A', name: 'Yaki Soba', desc: 'Egg, pork or chicken, veggies', price: 9.50, options: ['Pork', 'Chicken'] },
      { id: 'N24B', name: 'Shrimp Yaki Soba', price: 10.99 },
      { id: 'N25', name: 'Gomoku Yaki Soba', desc: 'Grilled noodle, veggie, quail egg, shrimp, pork or chicken', price: 11.99, options: ['Pork', 'Chicken'] }
    ] },
  { id: 'fried-rice', name: 'Fried Rice', jp: 'チャーハン',
    items: [
      { id: 'N26', name: 'Cha Han', desc: 'Veggie, pork or chicken, egg', price: 8.99, options: ['Pork', 'Chicken'] },
      { id: 'N27', name: 'Yasai Cha Han (vegetable fried rice)', price: 7.99 },
      { id: 'N28', name: 'Kimchi Fried Rice', desc: 'Kimchi, veggies, pork or chicken, green onion, egg', price: 9.99, spicy: true, options: ['Pork', 'Chicken'] },
      { id: 'N29', name: 'Shrimp Fried Rice', desc: 'Shrimp, veggies, egg', price: 9.99 }
    ] },
  { id: 'plates', name: 'Plates', jp: '一品料理',
    items: [
      { id: 'N30', name: 'Mabo Tofu', desc: 'Tofu, ground pork or chicken, green onion with spicy mabo sauce', price: 9.50, spicy: true, options: ['Ground pork', 'Ground chicken'] },
      { id: 'N31', name: 'Mabo Nasu', desc: 'Eggplant, ground pork or chicken with mabo sauce', price: 9.99, spicy: true, options: ['Ground pork', 'Ground chicken'] },
      { id: 'N32', name: 'Kung Pao Chicken', desc: 'Onion, dried chili, chicken, green onion on top', price: 9.99 },
      { id: 'N33', name: 'Shrimp with Spicy Garlic Sauce', price: 11.50, spicy: true },
      { id: 'N34', name: 'Shoga Yaki', desc: 'Pork or chicken with ginger sauce', price: 9.99, options: ['Pork', 'Chicken'] },
      { id: 'N35', name: 'Niku Yasai Itame', desc: 'Pork or chicken, egg, veggies', price: 9.99, options: ['Pork', 'Chicken'] }
    ] },
  { id: 'rice', name: 'Rice Dishes', jp: '丼', note: 'Rice dishes come with soup.',
    items: [
      { id: 'N36', name: 'Stamina Don', desc: 'Rice on side, ground pork or chicken with spicy garlic sauce, leeks', price: 9.50, spicy: true, options: ['Ground pork', 'Ground chicken'] },
      { id: 'N37', name: 'Curry Rice', desc: 'Japanese curry with chicken, rice on side', price: 9.50 },
      { id: 'N38', name: 'Chuka Don', desc: 'Pork or chicken, veggies on top', price: 9.50, options: ['Pork', 'Chicken'] },
      { id: 'N39', name: 'Mabo Tofu Don', desc: 'Mabo tofu with rice on side', price: 8.99, spicy: true },
      { id: 'N40', name: 'Rice', price: 1.25 }
    ] }
];

/* Bowls on the home-page showcase. Labels use only the menu's own wording. x / y are % of the bowl image, unrotated. */
window.AKIDA_PLATES = [
  { item: 'N19', img: 'tonkotsu', title: 'Tonkotsu Ramen', jp: '豚骨ラーメン', kicker: 'No. 19 · Pork bone soup', line: 'Roast pork, green onion, seaweed, half boiled egg, naruto, bamboo shoot and pickled ginger in pork bone soup.', labels: [['Roast pork', 30, 66], ['Naruto', 66, 36], ['Half boiled egg', 60, 54], ['Seaweed', 80, 20], ['Pickled ginger', 82, 63]] },
  { item: 'N10', img: 'shoyu', title: 'Shoyu Ramen', jp: '醤油ラーメン', kicker: 'No. 10 · Soy taste', line: 'Roast pork or chicken, green onion, bamboo shoot, naruto, seaweed and half a boiled egg.', labels: [['Roast pork or chicken', 36, 62], ['Naruto', 48, 38], ['Half of boiled egg', 74, 57], ['Bamboo shoot', 30, 30], ['Seaweed', 80, 20]] },
  { item: 'N16', img: 'tantan', title: 'Tan Tan Ramen', jp: '担々麺', kicker: 'No. 16 · Very spicy', line: 'Vegetables, ground pork or ground chicken and green onion. The menu calls it very spicy.', labels: [['Ground pork or chicken', 52, 46], ['Green onion', 68, 38], ['Vegetables', 30, 40]] },
  { item: 'N12', img: 'miso', title: 'Miso Ramen', jp: '味噌ラーメン', kicker: 'No. 12 · Miso taste', line: 'Pork or chicken, carrot, cabbage, napa, bean sprout and green onion.', labels: [['Pork or chicken', 38, 62], ['Carrot', 52, 22], ['Cabbage & napa', 30, 36], ['Bean sprout', 58, 40], ['Green onion', 78, 58]] },
  { item: 'N14', img: 'chashu', title: 'Cha Shu Ramen', jp: 'チャーシュー麺', kicker: 'No. 14', line: 'Six pieces of roast pork with bamboo shoot, onion and seaweed.', labels: [['6 pieces roast pork', 66, 30], ['Onion', 48, 50], ['Bamboo shoot', 25, 36], ['Seaweed', 9, 42]] },
  { item: 'N2', img: 'gyoza', title: 'Grilled Dumplings', jp: '餃子', kicker: 'No. 2 · 6 pcs', line: 'Pan-grilled dumplings, six to an order. Four-piece orders on the menu too.', labels: [['Grilled dumplings, 6 pcs', 30, 40]] },
  { item: 'N21', img: 'seafood', title: 'Sea Food Ramen', jp: '海鮮ラーメン', kicker: 'No. 21', line: 'Squid, shrimp, octopus, crab meat, fish meatball, green onion, carrots and cabbage.', labels: [['Squid', 22, 48], ['Octopus', 40, 28], ['Crab meat', 68, 32], ['Shrimp', 55, 58], ['Fish meatball', 72, 62]] },
  { item: 'N9', img: 'hiyashi', title: 'Hiyashi Chuka', jp: '冷やし中華', kicker: 'No. 9 · Cold noodles', line: 'Sliced pork, tomato, cucumber, fried egg, crab meat and seaweed, all on top.', labels: [['Sliced pork', 80, 62], ['Tomato', 34, 30], ['Cucumber', 62, 24], ['Fried egg', 26, 62], ['Crab meat', 56, 80]] },
  { item: 'N4', img: 'takoyaki', title: 'Tako Yaki', jp: 'たこ焼き', kicker: 'No. 4 · 4 pcs', line: 'Octopus and vegetables in a fried dough ball.', labels: [['Octopus & vegetables in a fried dough ball', 35, 40]] },
  { item: 'N24A', img: 'yakisoba', title: 'Yaki Soba', jp: '焼きそば', kicker: 'No. 24', line: 'Fried noodles with egg, pork or chicken and veggies.', labels: [['Pork or chicken', 58, 55], ['Veggies', 34, 46]] },
  { item: 'N37', img: 'curry', title: 'Curry Rice', jp: 'カレーライス', kicker: 'No. 37 · Comes with soup', line: 'Japanese curry with chicken, rice on the side.', labels: [['Japanese curry with chicken', 25, 45], ['Rice on the side', 66, 40]] },
  { item: 'N39', img: 'mabo', title: 'Mabo Tofu Don', jp: '麻婆豆腐丼', kicker: 'No. 39 · Spicy', line: 'Mabo tofu with rice on the side.', labels: [['Mabo tofu', 30, 52], ['Rice on the side', 76, 45]] }
];

/* Hours (America/New_York). 0 = Sunday. */
window.AKIDA_HOURS = {
  0: [],
  1: [['11:00', '21:00']], 2: [['11:00', '21:00']], 3: [['11:00', '21:00']],
  4: [['11:00', '21:00']], 5: [['11:00', '21:00']], 6: [['11:00', '21:00']]
};
