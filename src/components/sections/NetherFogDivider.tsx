
export function NetherFogDivider() {
    return (
        <div className="relative w-full h-24 -mt-24 pointer-events-none z-20">
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `
            linear-gradient(45deg, hsl(var(--background)) 25%, transparent 25%), 
            linear-gradient(-45deg, hsl(var(--background)) 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, hsl(var(--background)) 75%), 
            linear-gradient(-45deg, transparent 75%, hsl(var(--background)) 75%)
          `,
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                    maskImage: 'linear-gradient(to bottom, transparent 70%, black 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 70%, black 100%)'
                }}
            />
        </div>
    );
}
