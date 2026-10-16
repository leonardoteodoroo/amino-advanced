import React, { useEffect } from "react";
import { X } from "lucide-react";

const AFFILIATE_LINK =
  "https://www.checkout-ds24.com/redir/472942/leonardoteodorol";

const WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbznu2LV6-yVuU0URp-BrRhp5lNMrCrSak0bBuD6nUP0uIxe1DU5UjfiRBTHJAYICXd2/exec";

// ── Tracking helpers copiados do ExitIntentPopup ──
function getCookie(name: string): string {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : "";
}

function getVisitorId(): string {
  let vid = getCookie("_vid");
  if (!vid) {
    vid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
    document.cookie = `_vid=${encodeURIComponent(vid)}; max-age=${90 * 24 * 60 * 60}; path=/; SameSite=Lax`;
  }
  return vid;
}

function sendClickToSheets(source: string) {
  if (!WEBHOOK_URL) return;
  const payload = {
    gclid: getCookie("gclid") || "",
    gbraid: getCookie("gbraid") || "",
    wbraid: getCookie("wbraid") || "",
    visitor_id: getVisitorId(),
    product: source,
    price: "0",
    currency: "USD",
    timestamp: new Date().toISOString(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language,
    screen: `${screen.width}x${screen.height}`,
    user_agent: navigator.userAgent,
  };
  fetch(WEBHOOK_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {});
}

export const CookieLander: React.FC = () => {
  // Pré-carrega as imagens de fundo para evitar piscar em conexões mais lentas
  useEffect(() => {
    const imgDesktop = new Image();
    const imgMobile = new Image();
    imgDesktop.src = "/images/bg-desktop.webp";
    imgMobile.src = "/images/bg-mobile.webp";
  }, []);

  const handleRedirect = (source: string = "Cookie Popup CTA") => {
    
    // Dispara webhook igual ao ExitIntent
    sendClickToSheets(source);

    // Redireciona para a página do produtor com nosso link de afiliado
    window.location.href = AFFILIATE_LINK;
  };

  return (
    <div 
      className="relative min-h-screen w-full bg-slate-900 overflow-hidden cursor-pointer"
      onClick={handleRedirect}
    >
      {/* Imagem de Fundo Desktop (Apenas telas md e maiores) */}
      <div 
        className="hidden md:block absolute inset-0 bg-no-repeat bg-top bg-cover opacity-50 transition-opacity duration-1000"
        style={{
          backgroundImage: `url('/images/bg-desktop.webp')`,
        }}
      />
      
      {/* Imagem de Fundo Mobile (Apenas telas menores que md) */}
      <div 
        className="block md:hidden absolute inset-0 bg-no-repeat opacity-60 pointer-events-none transition-opacity duration-1000" 
        style={{
          backgroundImage: `url('/images/bg-mobile.webp')`,
          backgroundSize: '100% auto',
          backgroundPosition: 'top center'
        }}
      />

      {/* Pop-up Overlay Container (centralizado mas ligeiramente deslocado p/ baixo) */}
      <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
        
        {/* Caixa de Cookies */}
        <div 
          className="relative w-full max-w-[320px] md:max-w-[400px] mt-16 md:mt-0 bg-white rounded-[20px] shadow-xl p-4 md:p-6 flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out z-20"
          onClick={(e) => {
            // Se o usuário clicar DENTRO do box, também redireciona.
            // Para não disparar 2 eventos, paramos a propagação, mas chamamos a mesma função de qualquer forma.
            e.stopPropagation();
            handleRedirect("Cookie Popup Background");
          }}
        >
          {/* Símbolo ilustrativo ou Header */}
          <div className="flex items-center gap-2">
             <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
               <span className="text-base">🍪</span>
             </div>
             <div>
               <h2 className="font-bold text-gray-900 text-[15px]">We value your privacy</h2>
             </div>
          </div>

          <p className="text-[12px] text-gray-600 leading-[1.4] font-medium">
            We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By clicking "Accept All", you consent to our use of cookies according to our Privacy Policy.
          </p>

          <div className="flex flex-row gap-2 mt-1">
            <button 
              className="w-full flex-1 py-2 px-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-[12px] transition-colors text-center"
              onClick={(e) => {
                e.stopPropagation();
                handleRedirect("Cookie Popup Reject");
              }}
            >
              Reject All
            </button>
            <button 
              className="w-full flex-1 py-2 px-2 rounded-lg bg-[#2563eb] hover:bg-blue-700 text-white font-bold text-[12px] shadow-sm transition-all focus:ring-4 focus:ring-blue-100 text-center"
              onClick={(e) => {
                e.stopPropagation();
                handleRedirect("Cookie Popup Accept");
              }}
            >
              Accept All
            </button>
          </div>
          
          <div className="text-center">
            <span 
              className="text-[10px] text-gray-400 underline decoration-gray-300 underline-offset-2 hover:text-gray-600 font-medium transition-colors cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleRedirect("Cookie Popup Manage Preferences");
              }}
            >
              Manage Preferences
            </span>
          </div>

          {/* Botão X para fechar (também redireciona) */}
          <button 
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors p-1"
            aria-label="Close"
            onClick={(e) => {
              e.stopPropagation();
              handleRedirect("Cookie Popup Close X");
            }}
          >
            <X size={16} />
          </button>
          
        </div>
      </div>
    </div>
  );
};
