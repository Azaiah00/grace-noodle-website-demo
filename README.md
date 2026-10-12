# Grace Noodle: spec website (Couture House Co.)

A spec site for Grace Noodle (Grace Japanese Noodle and Restaurant), 1823 E Main St, Richmond, VA 23223, in Shockoe Bottom. Grace Noodle has no working website: the gracenoodle.com link on its Instagram is dead, and its Google listing is unclaimed with no website. It has no online ordering of its own.

## What it does
- **Bowl showcase (home):** twelve signature bowls (tonkotsu, shoyu, tan tan, miso, cha shu, gyoza, sea food, hiyashi chuka, tako yaki, yaki soba, curry rice, mabo tofu don) spin slowly on a warm, dark noodle-shop stage with rising steam. Scroll and the next bowl rolls in. Hover (or tap "Show ingredients") and each bowl labels what's in it, using only the menu's own wording. "Add to order" flies the bowl into the cart. Pork/chicken choices appear where the menu offers them.
- **Ramen 101:** a broth guide (shoyu, shio, miso, tonkotsu, tan tan) for diners new to ramen, with an add button on each.
- **Owner story:** chef Gaw Phaw's ten years in a Japanese noodle shop, the 2014 opening with his wife Ma Lay, and noodles made fresh in house.
- **Real photos:** the dining room and four diner photos from Google.
- **Full menu with ordering:** all 41 menu items with prices, spicy items marked with a chili icon, and an add button.
- **Pickup checkout:** the cart is saved in the browser. The order page offers real pickup times inside Grace Noodle's hours (America/New_York), from 25 minutes out. Orders submit as a Netlify Form ("pickup-order"): the restaurant gets the items, subtotal, name, phone and pickup time, calls to confirm, and the customer pays at the counter. There is no online payment.
- Live open/closed status, hours, directions, an FAQ, a Quick facts block, JSON-LD (Restaurant + Menu + FAQ), llms.txt and a 1200x630 share preview.

## Preview locally
Run `python3 -m http.server 8000` in this folder, then open http://localhost:8000

## Deploy
Push to GitHub and connect the repo in Netlify (publish directory: repo root). Turn on Netlify Forms email notifications for the "pickup-order" form so orders reach the restaurant (Site settings > Forms > Form notifications).

## Domain
Live at https://grace-noodle-website-demo.netlify.app/ (GitHub: https://github.com/Azaiah00/grace-noodle-website-demo). Every canonical, og:url, og:image, JSON-LD, sitemap, robots and llms.txt URL points to that domain, so shared links and text-message previews always open it. If a custom domain is added later, replace it in all of those places.
