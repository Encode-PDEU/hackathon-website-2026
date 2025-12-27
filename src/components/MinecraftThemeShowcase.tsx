import { cn } from '@/lib/utils';

/**
 * Example component demonstrating Minecraft theme usage
 * 
 * Available classes:
 * - Panels: panel, panel-dark, transparent-panel
 * - Buttons: button
 * - Slots: slot, raised-slot, raised-slot-hover, raised-slot-active
 * - Text shadows: text-shadow-xs, text-shadow-sm, text-shadow-md, text-shadow-lg, text-shadow-xl
 * - Dark overlays: bg-dark-25, bg-dark-50, bg-dark-75
 * 
 * Generated classes from images:
 * - Blocks: bg-block-dirt, bg-block-stone, bg-block-grass, etc.
 * - Items: bg-item-diamond, bg-item-apple-golden, etc.
 * - Paintings: bg-painting-* (for each painting in public/imgs/paintings/)
 * 
 * Spacing using --block-size:
 * - h-1-block, h-2-block, ..., h-99-block
 * - w-1-block, w-2-block, ..., w-99-block
 * - p-1-block, p-2-block, etc.
 * - gap-1-block, gap-2-block, etc.
 */

export function MinecraftThemeShowcase() {
  return (
    <div className="space-y-8 p-4">
      {/* Section Title */}
      <div>
        <h2 className="text-minecraft text-3xl font-bold text-shadow-lg mb-4">
          Minecraft Theme Showcase
        </h2>
        <p className="text-minecraft text-sm">
          Uses --block-size variable for all sizing. Default is 48px.
        </p>
      </div>

      {/* Panel Example */}
      <div>
        <h3 className="text-minecraft text-lg mb-2 text-shadow-md">Panels</h3>
        <div className="flex gap-4 flex-wrap">
          <div className="panel p-2-block w-6-block">
            <p className="text-minecraft text-shadow-sm text-xs">Panel</p>
          </div>
          <div className="panel-dark p-2-block w-6-block">
            <p className="text-minecraft text-shadow-sm text-xs text-gray-300">Dark</p>
          </div>
          <div className="transparent-panel p-2-block w-6-block border border-gray-400">
            <p className="text-minecraft text-shadow-sm text-xs">Transparent</p>
          </div>
        </div>
      </div>

      {/* Button Example */}
      <div>
        <h3 className="text-minecraft text-lg mb-2 text-shadow-md">Buttons</h3>
        <button className="button px-4-block py-1-block text-minecraft text-shadow-sm text-xs">
          Click Me!
        </button>
      </div>

      {/* Slot Examples */}
      <div>
        <h3 className="text-minecraft text-lg mb-2 text-shadow-md">Inventory Slots</h3>
        <div className="flex gap-1-block flex-wrap">
          <div className="slot w-2-block h-2-block" />
          <div className="raised-slot w-2-block h-2-block hover:raised-slot-hover" />
          <div className="enchanting-slot w-2-block h-2-block" />
        </div>
      </div>

      {/* Generated Block Classes */}
      <div>
        <h3 className="text-minecraft text-lg mb-2 text-shadow-md">Block Textures</h3>
        <div className="flex gap-2 flex-wrap">
          <div
            className="w-4-block h-4-block bg-block-dirt bg-cover"
            title="bg-block-dirt"
          />
          <div
            className="w-4-block h-4-block bg-block-stone bg-cover"
            title="bg-block-stone"
          />
          <div
            className="w-4-block h-4-block bg-block-grass bg-cover"
            title="bg-block-grass"
          />
        </div>
      </div>

      {/* Generated Item Classes */}
      <div>
        <h3 className="text-minecraft text-lg mb-2 text-shadow-md">Item Textures</h3>
        <div className="flex gap-2 flex-wrap">
          <div
            className="w-3-block h-3-block bg-item-diamond bg-cover"
            title="bg-item-diamond"
          />
          <div
            className="w-3-block h-3-block bg-item-apple-golden bg-cover"
            title="bg-item-apple-golden"
          />
        </div>
      </div>

      {/* Text Colors (Minecraft Chat Colors) */}
      <div>
        <h3 className="text-minecraft text-lg mb-2 text-shadow-md">Text Colors</h3>
        <div className="space-y-1 font-minecraft text-sm text-shadow">
          <p className="text-gold">Gold Text</p>
          <p className="text-diamond">Diamond Text</p>
          <p className="text-green-400">Green Text</p>
          <p className="text-red-400">Red Text</p>
          <p className="text-blue-400">Blue Text</p>
        </div>
      </div>
    </div>
  );
}

export default MinecraftThemeShowcase;
