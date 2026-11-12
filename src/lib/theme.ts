export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';

/**
 * Se ejecuta en <head> antes de pintar: aplica el tema guardado o el del
 * sistema, evitando el parpadeo de color. También marca <html> con `.js`
 * para que las animaciones de entrada solo se activen si hay JavaScript.
 */
export const themeInitScript = `(function(){try{var d=document.documentElement;d.classList.add('js');var s=localStorage.getItem('${THEME_STORAGE_KEY}');var t=s==='light'||s==='dark'?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');d.dataset.theme=t;d.style.colorScheme=t;}catch(e){}})();`;
