import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Award } from "lucide-react";

// ── Base dimensions (the popup is designed at this fixed size) ──
const BASE_W = 420;
const BASE_H = 640;

// ── CONFIGURAÇÃO ──
const WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbznu2LV6-yVuU0URp-BrRhp5lNMrCrSak0bBuD6nUP0uIxe1DU5UjfiRBTHJAYICXd2/exec";
// Link padrão do popup = 3 garrafas (Most Popular)
const AFFILIATE_LINK =
  "https://www.advancedbionutritionals.com/DS24/Advanced-Amino/Muscle-Mass-Loss/HD.htm#aff=leonardoteodorol";

// ── Tracking helpers ──
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

function sendClickToSheets() {
  if (!WEBHOOK_URL) return;
  const payload = {
    gclid: getCookie("gclid") || "",
    gbraid: getCookie("gbraid") || "",
    wbraid: getCookie("wbraid") || "",
    visitor_id: getVisitorId(),
    product: "Exit Intent Popup CTA",
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

interface ExitIntentPopupProps {
  triggerOpen?: boolean;
}

const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({
  triggerOpen = false,
}) => {
  const [visible, setVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [scale, setScale] = useState(1);

  const visibleRef = useRef(false);
  const hasTriggeredRef = useRef(false);
  const savedScrollY = useRef(0);

  useEffect(() => {
    visibleRef.current = visible;
  }, [visible]);
  useEffect(() => {
    hasTriggeredRef.current = hasTriggered;
  }, [hasTriggered]);

  // ── Helpers de abertura e fechamento ──
  const openPopup = useCallback(() => {
    savedScrollY.current = window.scrollY;
    visibleRef.current = true; // atualiza antes do re-render
    setVisible(true);
    setHasTriggered(true);
    document.body.style.position = "fixed";
    document.body.style.top = `-${savedScrollY.current}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";
    // Defere pushState para o próximo macrotask (sai do contexto de popstate).
    // Chrome Mobile ignora silenciosamente pushState chamado dentro de handlers popstate.
    setTimeout(() => {
      try {
        window.history.pushState(
          { exitIntent: "popup-open" },
          "",
          window.location.href,
        );
      } catch {
        /* silencioso */
      }
    }, 0);
  }, []);

  const closePopup = useCallback(() => {
    visibleRef.current = false; // atualiza sincronamente (evita race no popstate)
    setVisible(false);
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.overflow = "";
    window.scrollTo(0, savedScrollY.current);
    // ⚠️ Nunca chama history.back() aqui — o popstate cuida do histórico
  }, []);

  // ── Trigger externo (prop) ──
  useEffect(() => {
    if (triggerOpen && !hasTriggeredRef.current) {
      openPopup();
    }
  }, [triggerOpen, openPopup]);

  // ── Desktop: cursor sobe em direção à barra de abas ──
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasTriggeredRef.current) {
        openPopup();
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [openPopup]);

  // ── Mobile + Desktop: intercepta botão Voltar ──
  useEffect(() => {
    let historyArmed = false;

    const armHistory = () => {
      if (historyArmed) return;
      try {
        window.history.pushState(
          { exitIntent: "guard" },
          "",
          window.location.href,
        );
        historyArmed = true;
      } catch (err) {
        /* silencioso */
      }
    };

    const timer = setTimeout(armHistory, 500);

    const interactions = [
      "touchstart",
      "touchend",
      "click",
      "scroll",
      "wheel",
      "keydown",
      "mousedown",
      "pointerdown",
    ];
    interactions.forEach((evt) =>
      window.addEventListener(evt, armHistory, { capture: true, once: true }),
    );

    const handlePopState = () => {
      if (visibleRef.current) {
        // Voltar com popup aberto → fecha igual ao X
        closePopup();
        return;
      }
      if (!hasTriggeredRef.current) {
        // Voltar pela 1ª vez sem popup → abre (openPopup já faz pushState)
        openPopup();
      }
      // else: popup já foi exibido e fechado → navegação normal
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      clearTimeout(timer);
      interactions.forEach((evt) =>
        window.removeEventListener(evt, armHistory, { capture: true }),
      );
      window.removeEventListener("popstate", handlePopState);
    };
  }, [openPopup, closePopup]);

  // ── Escala responsiva ──
  useLayoutEffect(() => {
    const computeScale = () => {
      const margin = 32;
      const sw = window.innerWidth - margin * 2;
      const sh = window.innerHeight - margin * 2;
      const scaleX = sw / BASE_W;
      const scaleY = sh / BASE_H;
      setScale(Math.min(scaleX, scaleY, 1));
    };
    computeScale();
    window.addEventListener("resize", computeScale);
    return () => window.removeEventListener("resize", computeScale);
  }, []);

  // ── CTA click: dispara pixels + redireciona ──
  const handleCTAClick = () => {
    const eventId = `${getVisitorId()}_${Date.now()}`;

    // 1. Google Ads Conversion
    if (typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "conversion", {
        send_to: "AW-16929546328/GbDSCKvnxfQbENjA0Yg_",
        value: 1.0,
        currency: "USD",
        transaction_id: eventId,
      });
    }

    // 2. DataLayer Push (GTM)
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: "add_to_cart",
      product_name: "Exit Intent Popup CTA",
      price: "0",
      currency: "USD",
      event_id: eventId,
    });

    // 3. Google Sheets
    sendClickToSheets();

    // 4. Fecha e redireciona
    closePopup();
    window.open(AFFILIATE_LINK, "_blank", "noopener,noreferrer");
  };

  // ── Mini gráfico NNU ──
  const NNUBars = () => (
    <div className="flex items-end gap-3 justify-center my-4">
      {/* Whey */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-[11px] font-bold text-fg-muted">17%</span>
        <div
          className="w-8 bg-slate-300 rounded-t"
          style={{ height: "24px" }}
        />
        <span className="text-[9px] text-fg-muted leading-tight text-center">
          Whey
        </span>
      </div>
      {/* Advanced Amino */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-[11px] font-black text-cta-accent">99%</span>
        <div
          className="w-8 bg-gradient-to-t from-orange-600 to-orange-400 rounded-t shadow-sm"
          style={{ height: "80px" }}
        />
        <span className="text-[9px] font-bold text-fg-brand leading-tight text-center">
          Amino
        </span>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(4px)",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closePopup();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              width: BASE_W,
              height: BASE_H,
              transform: `scale(${scale})`,
              transformOrigin: "center",
            }}
            className="relative bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Linha de destaque no topo */}
            <div className="h-1 w-full bg-gradient-to-r from-brand-blue via-brand-navy to-cta-accent shrink-0" />

            {/* Botão fechar */}
            <button
              onClick={() => closePopup()}
              className="absolute top-3 right-3 z-50 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
              aria-label="Close popup"
            >
              <X size={20} />
            </button>

            {/* Conteúdo com scroll */}
            <div className="flex-1 overflow-y-auto px-6 pt-4 pb-2 custom-scrollbar">
              <h2 className="font-serif font-bold text-[18px] leading-tight text-fg-brand mb-2 pr-6">
                Look, let's be completely honest for a second...
              </h2>

              <div className="w-10 h-[2px] bg-brand-navy/20 mb-2" />

              <p className="text-[12px] text-fg-secondary leading-relaxed mb-2">
                You've probably seen dozens of ads and reviews today. The
                supplement market today is in a{" "}
                <span className="font-bold text-fg-primary italic">
                  state of chaos
                </span>
                .
              </p>

              <p className="text-[12px] text-fg-secondary leading-relaxed mb-2">
                The truth is, while you're looking for reviews, there are{" "}
                <span className="text-red-600 font-bold">
                  unauthorized sellers
                </span>{" "}
                out there—people who don't care if your legs still feel heavy.
                They are just looking for a{" "}
                <span className="font-bold text-fg-primary">quick profit</span>.
              </p>

              <p className="text-[12px] text-fg-primary leading-relaxed mb-2 font-medium">
                Being 60 or 70 shouldn't mean{" "}
                <span className="italic font-bold">'heavy legs'</span> or being
                afraid to carry grocery bags. If you feel that, the problem{" "}
                <span className="font-bold text-cta-accent underline decoration-2 underline-offset-2">
                  isn't your age
                </span>
                .
              </p>

              <p className="text-[12px] text-fg-secondary leading-relaxed mb-3">
                Advanced Amino isn't a miracle; it's{" "}
                <span className="font-bold text-cta-accent">
                  liquid efficiency (99% NNU)
                </span>{" "}
                for those who want to carry grocery bags without fear. I just
                want to ensure you see the only{" "}
                <span className="font-bold text-fg-primary">
                  authorized technical proof
                </span>{" "}
                by Dr. Shallenberger.
              </p>

              <div className="w-full h-px bg-border-subtle mb-2" />

              {/* Gráfico NNU + foto Dr. */}
              <div className="flex items-center gap-4 mb-2">
                <div className="flex-1">
                  <p className="text-[9px] font-bold text-brand-navy uppercase tracking-wider text-center mb-1">
                    Net Nitrogen Utilization
                  </p>
                  <NNUBars />
                  <p className="text-[8px] text-fg-muted text-center italic">
                    Clinical Gold Standard: 99% NNU
                  </p>
                </div>
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <img
                    src="/images/dr-shallenberger.webp"
                    alt="Dr. Frank Shallenberger"
                    className="w-14 h-14 rounded-full object-cover object-top border-2 border-brand-navy/20 shadow-md bg-slate-200"
                    loading="lazy"
                    width="56"
                    height="56"
                  />
                  <span className="text-[8px] font-bold text-brand-navy uppercase tracking-wider text-center leading-tight">
                    Dr. Shallenberger
                  </span>
                </div>
              </div>
            </div>

            {/* Footer fixo com CTA */}
            <div className="px-6 pb-4 pt-1 bg-white shrink-0 z-10 shadow-[0_-5px_15px_rgba(0,0,0,0.02)]">
              <div className="w-full h-px bg-border-subtle mb-2" />

              <button
                onClick={handleCTAClick}
                className="w-full py-2.5 bg-cta-accent hover:bg-cta-accent-hover text-white rounded-lg font-bold text-[14px] uppercase tracking-wide shadow-lg hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2 mb-2"
              >
                See The Technical Proof
              </button>

              <p className="text-[10px] text-fg-muted text-center leading-snug mb-2">
                You'll be directed to Dr. Frank Shallenberger's official
                presentation.
              </p>

              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-1.5 text-[10px] text-fg-secondary font-medium">
                  <ShieldCheck size={12} className="text-brand-navy" />
                  <span>90-Day Guarantee</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-fg-secondary font-medium">
                  <Award size={12} className="text-brand-navy" />
                  <span>Doctor Formulated</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;
