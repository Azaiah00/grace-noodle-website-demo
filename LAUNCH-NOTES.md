# Launch notes: Grace Noodle

## Confirm with the owner before launch
- **Prices.** Most prices come from a Yelp menu photo labeled "updated menu prices as of 6/24/23". The Turkey Bacon Roll, the three noodle salads, and the Shoyu and Shio ramen use a newer menu photo on Google. Prices have probably gone up since 2023, so confirm every price. The site says "Prices are confirmed when Grace Noodle calls you back."
- **Menu items.** The menu is built from the restaurant's printed menu (41 items, numbered 1–40). Confirm nothing has been added or dropped, and whether drinks (diners mention a pineapple smoothie) should be added.
- **Hours.** From Google: Mon–Sat 11 AM–9 PM, closed Sunday. Confirm.
- **Story and names.** From Richmond BizSense (June 18, 2014): owners Gaw Phaw and Ma Lay; Phaw worked ten years in a noodle shop in Japan; noodles are made fresh daily; the name "Grace" refers to the divine help he called on. Confirm the owners are happy to be named, and whether they want the story told differently.
- **Google rating.** 4.6 from 364 reviews (October 2026). Update at launch.
- **Online ordering process.** Orders arrive by Netlify Forms email. Agree who watches for orders, how fast they call back, and whether to add online payment later (Square or Toast online ordering can replace the form).
- **Pickup lead time.** Set at 25 minutes. Confirm.
- **Vegetarian broth.** The FAQ points to Yasai Ramen and Yasai Cha Han and tells diners to ask about broths. Confirm whether the Yasai Ramen broth is vegetable-based, then update the FAQ.

## Things found while researching (useful in the pitch)
- **gracenoodle.com is dead.** It's still linked from @gracenoodlerva on Instagram, which hasn't posted in a long time.
- **The Google listing is unclaimed** and has no website. Claiming it and adding this site is a quick win.
- **Uber Eats listing.** An Uber Eats listing under "Grace Noodle" shows Chinese dishes that aren't on Grace's menu. Ask the owner whether it's theirs. If not, they may want it reported or corrected, and this site gives them their own commission-free ordering.

## Images
- **The twelve showcase bowls are AI-generated illustrations** (Kie.ai, nano-banana) of Grace's real menu items, shot top-down. The footer and menu say the bowl photos are illustrative. Before launch, replace them with photos of Grace's real bowls. A short overhead photo shoot is the recommended upsell. Cutouts are at assets/img/plates/{name}-160/480/900.webp.
- **Dining-room and food photos** (assets/img/grace-noodle-dining-room*.webp, diner-*.webp) come from diners' photos on the Google listing and are labeled "Photos shared by diners on Google." Replace them with the owner's own photos, or get permission, before launch.
- **Logo.** No logo was found, so the site uses a naruto-swirl mark with a "GRACE NOODLE" wordmark (inline SVG plus assets/img/grace-noodle-logo.svg). Ask whether they have artwork.

## Ingredient labels
The labels on the showcase bowls use only the printed menu's descriptions. If a photo is replaced, re-check the label positions (x and y percentages in assets/js/menu-data.js).

## Domain
- The canonical URL is a placeholder: https://grace-noodle.netlify.app. Replace it in every file with the real Netlify link or a custom domain.
- gracenoodle.com may be expired. Check whether it can be re-registered for the owner.

## Credits
- Site concept: Couture House Co.
- The interaction concept was inspired by a "spinning plates" restaurant site reel (instagram.com/viznfr).
