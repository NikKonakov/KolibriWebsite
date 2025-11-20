import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";

export default function WelcomeBanner() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="w-full max-w-[345px] lg:max-w-4xl mx-auto p-4 flex flex-col items-center gap-4 rounded-xl border border-black/25 bg-white shadow-sm">
        <h2 className="text-xl md:text-3xl text-brand-dark text-center font-semibold">
          Добро пожаловать в Школу &quot;Колибри&quot;
        </h2>
        <p className="text-sm md:text-lg text-brand-dark text-center font-normal leading-relaxed">
          Мы создаём пространство, где обучение русскому языку становится не
          только полезным, но и увлекательным путешествием в мир знаний,
          культуры и творчества.
        </p>
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 bg-brand-orange rounded-md text-white text-base md:text-lg font-medium hover:bg-brand-orange/90 transition-colors"
        >
          Запишитесь на пробный урок!
        </button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md border-2 border-brand-orange/20">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl text-brand-dark font-semibold pb-2">
              Контактные Данные
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-5 py-2">
            {/* Social Media Row */}
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=100023570652523"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
                aria-label="Facebook"
              >
                <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
                  <Facebook className="w-8 h-8 text-white" />
                </div>
              </a>
              <a
                href="https://wa.me/14036140284"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
                aria-label="WhatsApp"
              >
                <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
                  <Phone className="w-8 h-8 text-white" />
                </div>
              </a>
            </div>

            {/* Phone Number */}
            <div className="text-center">
              <a
                href="tel:+14036140284"
                className="text-lg font-medium text-brand-dark hover:text-brand-orange transition-colors inline-block"
              >
                +1 (403) 614-0284
              </a>
            </div>

            <div className="w-full h-px bg-gray-200"></div>

            {/* Social Media Row 2 */}
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
                aria-label="Instagram"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
                  <Instagram className="w-8 h-8 text-white" />
                </div>
              </a>
              <a
                href="mailto:kolibrischool1@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
                aria-label="Email"
              >
                <div className="w-14 h-14 rounded-full bg-brand-orange flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
                  <Mail className="w-8 h-8 text-white" />
                </div>
              </a>
            </div>

            {/* Email */}
            <div className="text-center">
              <a
                href="mailto:kolibrischool1@gmail.com"
                className="text-lg font-medium text-brand-dark hover:text-brand-orange transition-colors inline-block"
              >
                kolibrischool1@gmail.com
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
