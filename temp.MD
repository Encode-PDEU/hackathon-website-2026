You are updating **ONLY the “Choose Your Biome” section** of an existing hackathon website.
Do **NOT** change global layout, navbar, fonts, or other sections.

### GOAL

Transform this section from a simple card grid into a **high-impact, Minecraft-inspired visual storytelling experience**, where **each biome card conveys its theme through a single strong image and subtle interaction**, without narrators or text-heavy explanations.

The section must feel like a **game menu**, not a SaaS feature list.

---

## 🧱 CORE DESIGN RULES

* No narrator (no Alex, no dialogue)
* No 3D or heavy WebGL
* No raw Minecraft screenshots
* No copyrighted assets
* Use **stylized Minecraft-inspired illustrations**
* Maintain readability and performance
* Desktop + mobile friendly

---

## 🧩 SECTION STRUCTURE

### Section Title

**“Choose Your Biome”**

* Chunky pixel-style heading
* Subtext:
  *Every adventurer must choose their path. Each biome represents a different kind of challenge.*

---

## 🟩 BIOME CARD DESIGN (VERY IMPORTANT)

Each biome is a **story card**, not just a UI card.

### Card Layout

* Top 60–65% → **Illustrated biome image**
* Bottom 35–40% → Title + short tagline
* Entire card should feel like a **solid Minecraft block**:

  * Inset shadow
  * Edge highlights
  * Slight depth

### Interaction Behavior

**On Hover (Desktop):**

* Hovered card:

  * Scales slightly (≈1.03)
  * Moves up (-5 to -8px)
  * Image subtly zooms in
* Other cards:

  * Fade to ~35% opacity
  * Optional 1–2px blur
* Background:

  * Subtle color tint based on hovered biome

**On Click:**

* Card shows:

  * “Biome Selected” indicator
  * Pixel-style outline animation
* Selection is reversible

---

## 🌍 BIOME STORY DEFINITIONS (IMAGES MUST FOLLOW THIS)

Each image must visually answer:

> “What kind of problems will I face here?”

### 🧪 Med-Tech — *Healing Biome*

**Visual Story:**

* A character healing an injured villager
* Glowing green potion particles
* Calm, hopeful lighting
* No combat focus

**Emotion:** Responsibility, care
**Palette:** Soft greens, whites

---

### 💰 Fin-Tech — *Treasury Biome*

**IMPORTANT:** Do NOT use redstone as money.

**Visual Story:**

* Secure vault or chest filled with **diamonds, emeralds, gold**
* Floating ledger/book representing transactions
* Villagers trading in background
* One character safeguarding or auditing assets

**Emotion:** Trust, stability
**Palette:** Gold, emerald, warm neutrals

---

### 🌱 Social Impact — *Village & Society*

**Visual Story:**

* Village transitioning from broken → thriving
* Character placing the final block
* Villagers collaborating
* Bright daylight

**Emotion:** Community, hope
**Palette:** Earthy greens, warm tones

---

### 🤖 AI / ML — *Enchantment Table*

**Visual Story:**

* Enchantment table glowing with runes
* Floating symbols/data glyphs
* Character hesitating before enchanting
* Slight mystery, controlled power

**Emotion:** Curiosity, caution
**Palette:** Purples, blues

---

### 🔐 Cybersecurity — *The Nether*

**Visual Story:**

* Character defending against hostile mobs (hoglins, blazes, ghasts)
* Shield or barrier resembling a firewall
* Lava, chaos, pressure

**Emotion:** Vigilance, urgency
**Palette:** Reds, dark tones

---

### 🧠 Open Innovation — *Creative Mode*

**Visual Story:**

* Character floating freely
* Blocks assembling mid-air
* Mixed biomes merging
* No danger, no limits

**Emotion:** Freedom, creativity
**Palette:** Balanced multi-color, not neon

---

## 🎮 MICRO-DETAILS (SUBTLE ONLY)

* Ambient particle effects activate **only on hover**
* Slight vignette over images for text readability
* No sound effects
* No narration
* Animations must be smooth and restrained

---

## 🚫 DO NOT

* Add text inside images
* Over-animate all cards at once
* Use raw Minecraft screenshots
* Add unrelated icons or emojis
* Turn this into a carousel

---

## ✅ SUCCESS CRITERIA

This section should make users pause and think:

> “This feels like choosing a world, not a category.”

It should be:

* Visually memorable
* Instantly understandable
* Clearly differentiated per biome