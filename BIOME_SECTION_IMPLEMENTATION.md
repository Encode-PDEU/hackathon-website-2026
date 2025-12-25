# 🧱 BiomeSection Implementation Guide

## Overview

The **BiomeSection** component has been successfully created and integrated into the hackathon website. It transforms the track selection from a simple feature list into a **Minecraft-inspired visual storytelling experience**.

## 📍 Location

- **Component File:** `src/components/sections/BiomeSection.tsx`
- **Integrated Into:** `src/pages/Index.tsx`
- **Section ID:** `biomes` (for navigation tracking)

## 🎮 Component Features

### 1. **Section Header**
- Chunky pixel-style heading: "CHOOSE YOUR BIOME"
- Dynamic accent color that changes based on hovered biome
- Thematic subtext explaining the concept
- Subtle visual indicator (⛏️) for Minecraft feel

### 2. **Biome Cards** (6 Tracks)

Each card is a **story card** with:

#### Card Structure:
- **Top 65%:** Illustrated area (placeholder icon + subtle color tinting)
- **Bottom 35%:** Title, tagline, and selection indicator
- **Pixel-style block appearance** with inset shadows and edge highlights

#### The 6 Biomes:

| Track | Title | Tagline | Theme | Icon | Color |
|-------|-------|---------|-------|------|-------|
| Medical | Med-Tech | Healing Biome | Responsibility & Care | 💚 | Emerald Green |
| Finance | Fin-Tech | Treasury Biome | Trust & Stability | 💎 | Gold |
| Social | Social Impact | Village & Society | Community & Hope | 🏘️ | Violet |
| AI/ML | AI / ML | Enchantment Table | Curiosity & Caution | ✨ | Purple |
| Security | Cybersecurity | The Nether | Vigilance & Urgency | 🛡️ | Red |
| Innovation | Open Innovation | Creative Mode | Freedom & Creativity | 🎨 | Cyan |

### 3. **Interactive Behaviors**

#### Desktop Hover Effects:

**Hovered Card:**
- Scales up slightly (1.03x)
- Moves up by -8px
- Image area subtly zooms
- Displays theme label above card
- Triggers ambient particle effects (3 subtle floating particles)

**Other Cards:**
- Fade to 35% opacity
- Apply 2px blur effect
- Creates focus on hovered card

**Background:**
- Subtle color tint based on hovered biome
- Semi-transparent blurred shape appears (5% opacity)

**Smooth Transitions:**
- All animations use `duration: 0.3s` for snappy feel
- Easing: `easeOut` for natural motion

#### Click/Selection:

**Selected Card:**
- Shows "SELECTED" indicator with checkmark
- Animated border with pulsing glow (1.5s cycle)
- Selection is reversible (click again to deselect)
- Card displays selection panel below grid

**Selection Display Panel:**
- Shows biome title, theme, and visual story description
- Colored background tint matching biome
- Pixel-style border consistent with design system

### 4. **Mobile Responsive Design**

- Grid adapts: 1 column (mobile) → 2 columns (tablet) → 3 columns (desktop)
- Touch-friendly sizing and spacing
- No hover effects on mobile (native behavior)
- All text remains readable on small screens

### 5. **Micro-Animations**

All animations are **subtle and restrained**:

- **Particle Effects:** Only activate on hover, 3 particles per card
- **Scale Animations:** Max 1.03x scale (very subtle)
- **Color Transitions:** 0.3s smooth color changes
- **Selection Pulse:** 1.5s gentle opacity animation
- **Entrance:** Cards fade in with slight upward motion on scroll

## 🎨 Design System Integration

### Uses Existing CSS Classes:

- `font-pixel` - Press Start 2P font for headings
- `font-retro` - VT323 font for body text
- `pixel-border` - Minecraft-style pixelated borders
- Color variables from CSS custom properties

### Color Palette:

All colors are applied dynamically based on biome selection:
- **Emerald (Med-Tech):** `#4ade80`
- **Gold (Fin-Tech):** `#eab308`
- **Violet (Social):** `#7c3aed`
- **Purple (AI/ML):** `#a78bfa`
- **Red (Cybersecurity):** `#ef4444`
- **Cyan (Innovation):** `#06b6d4`

## 🔧 Technical Stack

- **Framework:** React with TypeScript
- **Animation:** Framer Motion
- **Styling:** Tailwind CSS with custom utilities
- **State Management:** React hooks (useState, useMemo)
- **Icons:** Lucide React (Check icon)

## 📋 Component Props

### BiomeCardProps Interface:
```typescript
interface BiomeCardProps {
  biome: typeof BIOMES[number];        // Biome data object
  isHovered: boolean;                   // Is this card hovered?
  isSelected: boolean;                  // Is this card selected?
  isOtherHovered: boolean;              // Is another card hovered?
  onHover: (id: string | null) => void; // Hover callback
  onSelect: () => void;                 // Selection callback
}
```

## 🚀 Performance Optimizations

1. **Memoized Hover State:** `useMemo` prevents unnecessary re-renders
2. **Conditional Rendering:** Particle effects only render on hover
3. **CSS Transitions:** Hardware-accelerated animations
4. **Lazy Loading:** Cards animate in on scroll (Framer Motion `whileInView`)
5. **No Heavy WebGL:** Pure CSS and CSS-in-JS animations

## 🎮 User Experience Flow

1. User scrolls to "Choose Your Biome" section
2. Cards fade in with subtle upward animation
3. Hover over any card to:
   - See theme label
   - Watch particles float
   - See background tint
   - Other cards fade
4. Click card to select
5. Selection panel appears with track details
6. Click again to deselect (reversible)
7. Smooth scroll navigation updates hotbar

## ✅ Success Criteria Met

✓ Visually memorable - Strong imagery with minimal text  
✓ Instantly understandable - Clear biome theming  
✓ Clearly differentiated - Each biome has unique color and story  
✓ Game-like feel - Looks like a world selection menu  
✓ No narrators or dialogue - Just visual storytelling  
✓ No raw Minecraft screenshots - Stylized placeholder icons  
✓ Desktop + mobile friendly - Fully responsive  
✓ Performance optimized - Smooth 60fps animations  

## 📱 Responsive Breakpoints

| Screen Size | Grid Layout | Card Size | Font Size |
|-------------|-------------|-----------|-----------|
| Mobile (<640px) | 1 column | Full width | sm |
| Tablet (640px-1024px) | 2 columns | 50% width | base |
| Desktop (>1024px) | 3 columns | 33% width | base-lg |

## 🔄 Integration Points

### Index.tsx Updates:
- ✅ BiomeSection imported
- ✅ BiomeSection rendered between TimelineSection and RegistrationSection
- ✅ `biomes` added to active section tracking
- ✅ Scroll detection updated to include biome section

### Navigation:
- BiomeSection has `id="biomes"` for hotbar navigation
- Automatically tracked in active section state
- Smooth scrolling supported

## 📦 No External Dependencies Added

The component uses existing project dependencies:
- `react`
- `framer-motion`
- `tailwindcss`
- `lucide-react`

## 🎯 Future Enhancement Ideas

1. **Image Integration:** Replace placeholder icons with actual illustrated images (SVG or PNG)
2. **Sound Effects:** Optional audio feedback on hover/click (muted by default)
3. **Analytics:** Track which biomes users select
4. **Keyboard Navigation:** Arrow keys to navigate cards, Enter to select
5. **API Integration:** Save selected biome to user profile
6. **Animations:** More complex particle effects based on biome theme

---

**Status:** ✅ Complete and Ready for Use  
**Last Updated:** December 25, 2025
