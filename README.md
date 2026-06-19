# NEL WINSTON HOTEL Website
## Part 3: Enhancing Functionality and SEO

**Student Information**
- Name: Pfuneko Chauke
- Student ID: ST10520226
- Date: 2026-06-19


Changes (Part 3 Additions) (2026-06-19)

#### 1. JavaScript Enhancements
- **Lightbox Gallery**: Click any gallery image to view enlarged version with caption. Press Escape or click outside to close.
- **Accordion Pricing**: Room pricing section uses interactive accordion panels that expand/collapse on click.
- **Services Search**: Real-time search filter on Services page to filter and sort services by keyword.
- **Form Validation (Booking)**: Client-side JavaScript validation for booking form with error messages for:
  - Full name (min 2 characters)
  - Email format validation
  - Phone number format (min 10 digits)
  - Check-in date (cannot be in past)
  - Check-out date (must be after check-in)
  - Room type selection
  - Guest count (1-6)
- **Form Validation (Contact)**: Client-side validation for contact form with message type selection and textarea validation.
- **AJAX-style Submission**: Forms display success messages without page reload, simulating async submission.
- **Interactive Map**: Leaflet.js + OpenStreetMap embedded on Contact page showing hotel location (no API key required).
- **Smooth Scroll**: Anchor links scroll smoothly to target sections.
- **Navbar Scroll Effect**: Header shadow intensifies on scroll.

#### 2. SEO Optimisation
- **On-Page SEO**:
  - Unique, keyword-rich meta descriptions on every page
  - Relevant meta keywords for each page
  - Canonical URLs on all pages
  - Proper heading hierarchy (H1, H2, H3)
  - Descriptive alt text for all images
  - Clean URL structure
  - Internal linking between all pages
  - Mobile-friendly responsive design
- **Off-Page SEO**:
  - Open Graph meta tags for social sharing
  - Twitter Card meta tags
- **Additional SEO Files**:
  - `robots.txt`: Allows all crawlers, points to sitemap
  - `sitemap.xml`: Complete XML sitemap with priorities and change frequencies
  - `privacy.html`: Privacy policy page for trust signals

#### 3. Form Functionality
- **Booking Form** (`booknow.html`):
  - All required fields with HTML5 validation attributes
  - JavaScript validation with real-time error messages
  - Date picker with minimum date set to today
  - Dynamic check-out minimum date based on check-in
  - Success confirmation with booking details
  - Room selection from accordion auto-populates form
- **Contact Form** (`contact.html`):
  - Message type dropdown (General, Complaint, Feedback, Partnership)
  - Phone number pattern validation
  - Textarea with min/max length validation
  - Success message on valid submission

#### 4. Security Measures
- All external links use `rel="noopener noreferrer"`
- Form inputs sanitized via validation
- Privacy policy page added
- No inline JavaScript (all in external JS file)

#### 5. Responsive Design (Maintained from Part 2)
- Breakpoints: 1024px (tablet), 768px (mobile), 480px (small mobile)
- Flexbox and CSS Grid layouts
- Relative units (rem, em) throughout
- Images with max-width: 100%
- Print styles included

---

## File Structure
```
/
├── index.html
├── about.html
├── services.html
├── gallery.html
├── contact.html
├── booknow.html
├── privacy.html
├── sitemap.xml
├── robots.txt
├── CSS/
│   └── style.css
├── JS/
│   └── main.js
└── README.md

## Deployment
- Platform: Netlify (free hosting)
- URL: https://nelwinstonhotel.netlify.app/
- Connected to GitHub repository for continuous deployment

---

## References
- MDN Web Docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript
- W3Schools JavaScript Tutorial: https://www.w3schools.com/js/
- Leaflet.js Documentation: https://leafletjs.com/
- OpenStreetMap: https://www.openstreetmap.org/
- Google SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Netlify Documentation: https://docs.netlify.com/

---

## GitHub Repository
https://github.com/PFunekoChauke17/PART-1---PC.git
https://github.com/PFunekoChauke17/NEL WINSTON HOTEL Part3.git
