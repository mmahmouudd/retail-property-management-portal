import { useMemo, useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  Eye,
  EyeOff,
  Heart,
  LockKeyhole,
  MapPin,
  Menu,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  X,
} from "lucide-react";

const heroImage =
  "https://images.pexels.com/photos/16140814/pexels-photo-16140814.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=2200";

const properties = [
  {
    id: 1,
    name: "Alder Commons",
    location: "South Congress, Austin",
    image:
      "https://images.pexels.com/photos/30648770/pexels-photo-30648770.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    size: "18,400 SF",
    price: "$4.8M",
    yield: "6.8% cap",
    type: "Neighborhood retail",
    tag: "For sale",
  },
  {
    id: 2,
    name: "Westline Market",
    location: "Highland Park, Dallas",
    image:
      "https://images.pexels.com/photos/16155275/pexels-photo-16155275.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    size: "9,850 SF",
    price: "$38 / SF",
    yield: "92% leased",
    type: "Street retail",
    tag: "For lease",
  },
  {
    id: 3,
    name: "Canopy Row",
    location: "Design District, Miami",
    image:
      "https://images.pexels.com/photos/9328756/pexels-photo-9328756.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    size: "12,200 SF",
    price: "$6.2M",
    yield: "7.1% cap",
    type: "Luxury retail",
    tag: "Managed",
  },
  {
    id: 4,
    name: "The Mercer",
    location: "Old Fourth Ward, Atlanta",
    image:
      "https://images.pexels.com/photos/28821621/pexels-photo-28821621.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    size: "7,600 SF",
    price: "$42 / SF",
    yield: "4 suites",
    type: "Urban storefront",
    tag: "For lease",
  },
  {
    id: 5,
    name: "North Loop Retail",
    location: "North Loop, Minneapolis",
    image:
      "https://images.pexels.com/photos/27452443/pexels-photo-27452443.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    size: "24,100 SF",
    price: "$8.9M",
    yield: "6.4% cap",
    type: "Retail center",
    tag: "For sale",
  },
  {
    id: 6,
    name: "Juniper Hall",
    location: "Arts District, Los Angeles",
    image:
      "https://images.pexels.com/photos/3709404/pexels-photo-3709404.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    size: "15,700 SF",
    price: "$7.4M",
    yield: "6.9% cap",
    type: "Mixed-use retail",
    tag: "Managed",
  },
];

const mapPins = [
  { id: 1, x: 27, y: 36, label: "$4.8M", property: properties[0] },
  { id: 2, x: 56, y: 28, label: "$38/SF", property: properties[1] },
  { id: 3, x: 71, y: 57, label: "$6.2M", property: properties[2] },
  { id: 4, x: 43, y: 68, label: "$42/SF", property: properties[3] },
];

const managementRows = [
  {
    number: "01",
    title: "Lease administration",
    text: "Critical dates, recoveries, renewals, and documents kept in one accountable system.",
  },
  {
    number: "02",
    title: "Property operations",
    text: "Work orders, vendors, inspections, and tenant communication managed without the noise.",
  },
  {
    number: "03",
    title: "Owner reporting",
    text: "Live performance, variance reporting, and monthly packages ready when decisions are made.",
  },
];

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function App() {
  const reduceMotion = useReducedMotion();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePin, setActivePin] = useState(mapPins[0]);
  const [saved, setSaved] = useState<number[]>([]);
  const [location, setLocation] = useState("Austin, TX");
  const [spaceType, setSpaceType] = useState("All retail");
  const [searchMessage, setSearchMessage] = useState(
    "24 spaces match your current search",
  );

  const [purchasePrice, setPurchasePrice] = useState(2850000);
  const [downPayment, setDownPayment] = useState(30);
  const [interestRate, setInterestRate] = useState(6.4);
  const [annualNoi, setAnnualNoi] = useState(228000);
  const [showPassword, setShowPassword] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  const roi = useMemo(() => {
    const loanAmount = purchasePrice * (1 - downPayment / 100);
    const monthlyRate = interestRate / 100 / 12;
    const payments = 20 * 12;
    const monthlyDebt =
      monthlyRate === 0
        ? loanAmount / payments
        : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, payments)) /
          (Math.pow(1 + monthlyRate, payments) - 1);
    const annualDebt = monthlyDebt * 12;
    const cashInvested = purchasePrice * (downPayment / 100);

    return {
      capRate: (annualNoi / purchasePrice) * 100,
      cashOnCash: ((annualNoi - annualDebt) / cashInvested) * 100,
      monthlyCashFlow: (annualNoi - annualDebt) / 12,
      loanAmount,
    };
  }, [annualNoi, downPayment, interestRate, purchasePrice]);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearchMessage(
      `${spaceType === "All retail" ? "24" : "8"} spaces found near ${location || "your market"}`,
    );
  }

  function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginMessage("Secure demo access requested. Check your inbox to continue.");
  }

  function toggleSaved(id: number) {
    setSaved((current) =>
      current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id],
    );
  }

  const reveal = {
    initial: { opacity: 0, y: reduceMotion ? 0 : 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: reduceMotion ? 0 : 0.65, ease: "easeOut" as const },
  };

  return (
    <div className="min-h-screen bg-[#f4f2eb] text-[#16241e]">
      <header className="absolute inset-x-0 top-0 z-50 border-b border-white/25 text-white">
        <nav
          className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-12"
          aria-label="Main navigation"
        >
          <a className="brand-mark" href="#top" aria-label="Storefront home">
            STOREFRONT<span>.</span>
          </a>

          <div className="hidden items-center gap-8 text-sm font-medium lg:flex">
            <a className="nav-link" href="#search">
              Find a property
            </a>
            <a className="nav-link" href="#portfolio">
              Portfolio
            </a>
            <a className="nav-link" href="#management">
              Management
            </a>
            <a className="nav-link" href="#calculator">
              ROI tools
            </a>
          </div>

          <div className="hidden items-center gap-5 lg:flex">
            <a className="text-sm font-semibold" href="#client-login">
              Client login
            </a>
            <a className="nav-cta" href="#search">
              Explore spaces <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>

          <button
            className="grid h-11 w-11 place-items-center border border-white/40 lg:hidden"
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={21} /> : <Menu size={22} />}
          </button>
        </nav>

        {mobileMenuOpen && (
          <motion.div
            className="mx-4 border border-white/20 bg-[#16241e] p-6 shadow-2xl lg:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col gap-5 text-base font-medium">
              <a href="#search" onClick={() => setMobileMenuOpen(false)}>
                Find a property
              </a>
              <a href="#portfolio" onClick={() => setMobileMenuOpen(false)}>
                Portfolio
              </a>
              <a href="#management" onClick={() => setMobileMenuOpen(false)}>
                Management
              </a>
              <a href="#calculator" onClick={() => setMobileMenuOpen(false)}>
                ROI tools
              </a>
              <a href="#client-login" onClick={() => setMobileMenuOpen(false)}>
                Client login
              </a>
            </div>
          </motion.div>
        )}
      </header>

      <main>
        <section
          id="top"
          className="relative flex min-h-[760px] items-end overflow-hidden text-white lg:min-h-screen"
          aria-labelledby="hero-title"
        >
          <motion.img
            className="absolute inset-0 h-full w-full object-cover"
            src={heroImage}
            alt="Contemporary open-air retail arcade with glass storefronts"
            initial={{ scale: reduceMotion ? 1 : 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: reduceMotion ? 0 : 1.8, ease: "easeOut" }}
          />
          <div className="hero-overlay absolute inset-0" />

          <motion.div
            className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-16 pt-36 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.25, duration: 0.85 }}
          >
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.26em] text-[#e7f66d]">
              Retail real estate, re-centered
            </p>
            <h1 id="hero-title" className="hero-brand">
              STOREFRONT<span>.</span>
            </h1>
            <div className="mt-7 flex max-w-3xl flex-col gap-8 sm:mt-9 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-xl text-xl leading-relaxed text-white/85 sm:text-2xl">
                Find, operate, and grow exceptional retail spaces from one clear point of view.
              </p>
              <div className="flex shrink-0 flex-wrap gap-3">
                <a className="button-primary" href="#search">
                  Search properties <ArrowRight size={18} />
                </a>
                <a className="button-ghost" href="#management">
                  Our approach
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="search" className="section-shell scroll-mt-8 py-20 sm:py-28">
          <motion.div {...reveal}>
            <div className="section-heading">
              <div>
                <p className="eyebrow">Property search</p>
                <h2>Find the right corner.</h2>
              </div>
              <p>
                Search curated retail opportunities by market, format, and investment profile.
              </p>
            </div>

            <form className="search-bar" onSubmit={submitSearch}>
              <label className="search-field search-field-wide">
                <span>Market or address</span>
                <div>
                  <MapPin size={19} aria-hidden="true" />
                  <input
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    placeholder="City, neighborhood, or address"
                  />
                </div>
              </label>
              <label className="search-field">
                <span>Space type</span>
                <div>
                  <Building2 size={19} aria-hidden="true" />
                  <select
                    value={spaceType}
                    onChange={(event) => setSpaceType(event.target.value)}
                  >
                    <option>All retail</option>
                    <option>Street retail</option>
                    <option>Shopping center</option>
                    <option>Restaurant</option>
                    <option>Luxury retail</option>
                  </select>
                  <ChevronDown className="ml-auto" size={17} aria-hidden="true" />
                </div>
              </label>
              <label className="search-field">
                <span>Minimum size</span>
                <div>
                  <SlidersHorizontal size={19} aria-hidden="true" />
                  <select defaultValue="Any size">
                    <option>Any size</option>
                    <option>2,500+ SF</option>
                    <option>5,000+ SF</option>
                    <option>10,000+ SF</option>
                  </select>
                  <ChevronDown className="ml-auto" size={17} aria-hidden="true" />
                </div>
              </label>
              <button className="search-submit" type="submit">
                <Search size={19} aria-hidden="true" /> Search
              </button>
            </form>
          </motion.div>

          <motion.div className="map-search" {...reveal}>
            <div className="map-results">
              <div className="mb-7 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-[#6e7772]">Showing near</p>
                  <h3 className="mt-1 text-2xl font-semibold">{location || "Your market"}</h3>
                </div>
                <button className="filter-button" type="button">
                  <SlidersHorizontal size={16} /> Filters
                </button>
              </div>
              <p className="mb-5 border-y border-[#d6d5ce] py-3 text-sm text-[#4c5751]" role="status">
                {searchMessage}
              </p>

              <div className="space-y-1">
                {mapPins.slice(0, 3).map((pin) => (
                  <button
                    key={pin.id}
                    className={`result-row ${activePin.id === pin.id ? "is-active" : ""}`}
                    type="button"
                    onClick={() => setActivePin(pin)}
                  >
                    <img src={pin.property.image} alt="" />
                    <span>
                      <strong>{pin.property.name}</strong>
                      <small>{pin.property.location}</small>
                    </span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                ))}
              </div>

              <a className="mt-6 inline-flex items-center gap-2 text-sm font-bold" href="#portfolio">
                View all search results <ArrowRight size={16} />
              </a>
            </div>

            <div
              className="map-canvas"
              role="group"
              aria-label="Interactive property map preview"
            >
              <svg
                className="map-lines"
                viewBox="0 0 900 620"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path className="map-block" d="M30 40h210v130H30zM290 30h180v100H290zM535 28h320v145H535zM20 225h150v160H20zM220 220h260v110H220zM545 225h280v120H545zM45 445h250v135H45zM350 400h190v180H350zM600 410h240v165H600z" />
                <path className="map-road-major" d="M-20 190C170 170 275 185 425 195s310-5 500-38M190-20c42 140 45 300 25 660M500-20c-28 160-8 320 70 660" />
                <path className="map-road" d="M-30 420c180-45 320-30 475 12s310 42 485-20M320-20c8 115 18 215 42 310s40 195 15 350M760-20c10 155-30 280-4 425s38 180 25 230" />
                <path className="map-water" d="M-10 535c155-60 267-44 372-9 142 48 278 53 550-31v145H-10z" />
              </svg>

              <div className="map-label map-label-one">SOUTH CONGRESS</div>
              <div className="map-label map-label-two">EAST AUSTIN</div>
              <div className="map-label map-label-three">DOWNTOWN</div>

              {mapPins.map((pin) => (
                <motion.button
                  key={pin.id}
                  className={`map-pin ${activePin.id === pin.id ? "is-active" : ""}`}
                  style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                  type="button"
                  onClick={() => setActivePin(pin)}
                  aria-label={`View ${pin.property.name}, ${pin.label}`}
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  animate={
                    activePin.id === pin.id && !reduceMotion
                      ? { scale: [1, 1.08, 1] }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.35 }}
                >
                  {pin.label}
                </motion.button>
              ))}

              <motion.div
                key={activePin.id}
                className="map-detail"
                initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <img src={activePin.property.image} alt="" />
                <div>
                  <p>{activePin.property.tag}</p>
                  <strong>{activePin.property.name}</strong>
                  <span>
                    {activePin.property.size} / {activePin.property.price}
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section id="portfolio" className="bg-[#faf9f5] py-20 sm:py-28">
          <div className="section-shell">
            <motion.div className="section-heading" {...reveal}>
              <div>
                <p className="eyebrow">Selected opportunities</p>
                <h2>Retail with relevance.</h2>
              </div>
              <p>
                High-performing spaces in walkable districts, growth markets, and proven retail corridors.
              </p>
            </motion.div>

            <div className="property-grid">
              {properties.map((property, index) => (
                <motion.article
                  className="property-item group"
                  key={property.id}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.55, delay: reduceMotion ? 0 : (index % 3) * 0.08 }}
                >
                  <div className="property-image-wrap">
                    <img
                      src={property.image}
                      alt={`${property.name}, ${property.type} in ${property.location}`}
                      loading="lazy"
                    />
                    <span className="property-tag">{property.tag}</span>
                    <button
                      className={`save-button ${saved.includes(property.id) ? "is-saved" : ""}`}
                      type="button"
                      onClick={() => toggleSaved(property.id)}
                      aria-label={
                        saved.includes(property.id)
                          ? `Remove ${property.name} from saved properties`
                          : `Save ${property.name}`
                      }
                    >
                      <Heart
                        size={19}
                        fill={saved.includes(property.id) ? "currentColor" : "none"}
                      />
                    </button>
                  </div>
                  <div className="property-copy">
                    <div>
                      <p>{property.location}</p>
                      <h3>{property.name}</h3>
                    </div>
                    <ArrowRight className="property-arrow" size={21} aria-hidden="true" />
                  </div>
                  <div className="property-meta">
                    <span>{property.type}</span>
                    <span>{property.size}</span>
                    <strong>{property.price}</strong>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="management" className="management-section scroll-mt-8">
          <motion.div
            className="management-image"
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.025 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://images.pexels.com/photos/16140813/pexels-photo-16140813.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1400"
              alt="Modern retail complex managed by Storefront"
              loading="lazy"
            />
          </motion.div>
          <motion.div className="management-copy" {...reveal}>
            <p className="eyebrow eyebrow-light">Property management</p>
            <h2>Run the asset.<br />Strengthen the place.</h2>
            <p className="management-intro">
              Thoughtful retail management protects income and improves every tenant and customer touchpoint.
            </p>
            <div className="management-list">
              {managementRows.map((row) => (
                <div className="management-row" key={row.number}>
                  <span>{row.number}</span>
                  <div>
                    <h3>{row.title}</h3>
                    <p>{row.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <a className="text-link-light" href="#client-login">
              See the owner experience <ArrowRight size={17} />
            </a>
          </motion.div>
        </section>

        <section id="calculator" className="section-shell scroll-mt-8 py-20 sm:py-28">
          <motion.div className="section-heading" {...reveal}>
            <div>
              <p className="eyebrow">Investment modeler</p>
              <h2>Pressure-test the return.</h2>
            </div>
            <p>
              Model a retail acquisition in seconds. Adjust assumptions and see the capital picture update live.
            </p>
          </motion.div>

          <motion.div className="roi-layout" {...reveal}>
            <div className="roi-controls">
              <CalculatorInput
                id="purchase-price"
                label="Purchase price"
                value={purchasePrice}
                prefix="$"
                min={500000}
                max={10000000}
                step={50000}
                onChange={setPurchasePrice}
              />
              <CalculatorInput
                id="down-payment"
                label="Down payment"
                value={downPayment}
                suffix="%"
                min={10}
                max={60}
                step={1}
                onChange={setDownPayment}
              />
              <CalculatorInput
                id="interest-rate"
                label="Interest rate"
                value={interestRate}
                suffix="%"
                min={2}
                max={12}
                step={0.1}
                onChange={setInterestRate}
              />
              <CalculatorInput
                id="annual-noi"
                label="Annual NOI"
                value={annualNoi}
                prefix="$"
                min={50000}
                max={1000000}
                step={5000}
                onChange={setAnnualNoi}
              />
            </div>

            <div className="roi-results" aria-live="polite">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#aeb8b2]">
                Estimated performance
              </p>
              <div className="roi-primary">
                <span>Cash-on-cash return</span>
                <strong>{roi.cashOnCash.toFixed(2)}%</strong>
              </div>
              <div className="roi-result-row">
                <span>Going-in cap rate</span>
                <strong>{roi.capRate.toFixed(2)}%</strong>
              </div>
              <div className="roi-result-row">
                <span>Monthly cash flow</span>
                <strong>{currency.format(roi.monthlyCashFlow)}</strong>
              </div>
              <div className="roi-result-row">
                <span>Estimated loan</span>
                <strong>{currency.format(roi.loanAmount)}</strong>
              </div>
              <p className="roi-note">
                Estimates assume a 20-year amortization and exclude closing costs, reserves, and taxes. For planning only.
              </p>
            </div>
          </motion.div>
        </section>

        <section id="client-login" className="login-section scroll-mt-8">
          <div className="section-shell login-layout">
            <motion.div className="login-copy" {...reveal}>
              <div className="login-icon" aria-hidden="true">
                <ShieldCheck size={25} />
              </div>
              <p className="eyebrow eyebrow-light">Client portal</p>
              <h2>Your portfolio,<br />always current.</h2>
              <p>
                Secure access to performance reports, work orders, lease documents, and tenant activity across every asset.
              </p>
              <div className="security-note">
                <LockKeyhole size={18} aria-hidden="true" />
                <span>Encrypted access with optional multi-factor authentication.</span>
              </div>
            </motion.div>

            <motion.form className="login-form" onSubmit={submitLogin} {...reveal}>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6a746e]">
                  Secure sign in
                </p>
                <h3>Welcome back.</h3>
              </div>
              <label>
                <span>Email address</span>
                <input type="email" placeholder="name@company.com" autoComplete="email" required />
              </label>
              <label>
                <span>Password</span>
                <div className="password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((shown) => !shown)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </label>
              <div className="login-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span>Keep me signed in</span>
                </label>
                <a href="mailto:support@storefront.example">Forgot password?</a>
              </div>
              <button className="login-submit" type="submit">
                Access client portal <ArrowRight size={17} />
              </button>
              {loginMessage && (
                <p className="login-message" role="status">
                  <Check size={16} /> {loginMessage}
                </p>
              )}
            </motion.form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="section-shell">
          <div className="footer-top">
            <div>
              <a className="brand-mark text-[#16241e]" href="#top">
                STOREFRONT<span>.</span>
              </a>
              <p>Retail property, made more valuable.</p>
            </div>
            <div className="footer-links">
              <a href="#search">Properties</a>
              <a href="#management">Management</a>
              <a href="#calculator">Investor tools</a>
              <a href="mailto:hello@storefront.example">Contact</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>Copyright 2026 Storefront Property Partners. All rights reserved.</p>
            <div>
              <a href="#top">Privacy</a>
              <a href="#top">Accessibility</a>
              <a href="#top">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

type CalculatorInputProps = {
  id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
};

function CalculatorInput({
  id,
  label,
  value,
  prefix,
  suffix,
  min,
  max,
  step,
  onChange,
}: CalculatorInputProps) {
  const displayValue = prefix ? currency.format(value) : `${value}${suffix ?? ""}`;

  return (
    <div className="calculator-input">
      <div className="flex items-end justify-between gap-4">
        <label htmlFor={id}>{label}</label>
        <output htmlFor={id}>{displayValue}</output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <div className="range-scale" aria-hidden="true">
        <span>{prefix ? currency.format(min) : `${min}${suffix ?? ""}`}</span>
        <span>{prefix ? currency.format(max) : `${max}${suffix ?? ""}`}</span>
      </div>
    </div>
  );
}

export default App;