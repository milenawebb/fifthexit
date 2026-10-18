export const compactNavigation = (scrollY: number) => scrollY > 80;
export const mvpProgress = (index: number) => Math.max(0.25, Math.min(1, (index + 1) / 4));
export const scrollProgress = (distance: number, range: number) => Math.max(0, Math.min(1, distance / Math.max(1, range)));