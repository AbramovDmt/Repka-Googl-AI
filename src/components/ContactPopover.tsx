import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { getTelegramLink, MAX_LINK } from '../lib/contacts';

interface ContactPopoverProps {
  telegramText?: string;
  align?: 'left' | 'right' | 'center';
  className?: string;
  children: (props: { onClick: () => void; open: boolean }) => ReactNode;
}

export default function ContactPopover({ telegramText, align = 'left', className = 'inline-block', children }: ContactPopoverProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  const alignClass = align === 'right' ? 'right-0' : align === 'center' ? 'left-1/2 -translate-x-1/2' : 'left-0';

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {children({ onClick: () => setOpen((o) => !o), open })}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className={`absolute top-full mt-2 z-50 w-56 bg-brand-bg-white border border-brand-sand/40 rounded-lg shadow-xl overflow-hidden ${alignClass}`}
            role="menu"
          >
            <a
              href={getTelegramLink(telegramText)}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-brand-text hover:bg-brand-bg transition-colors"
            >
              <Send size={16} className="fill-current text-brand-accent" />
              <span>Написать в Telegram</span>
            </a>
            <div className="h-px bg-brand-sand/30" />
            <a
              href={MAX_LINK}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-brand-text hover:bg-brand-bg transition-colors"
            >
              <MessageCircle size={16} className="text-brand-accent" />
              <span>Написать в MAX</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
