"use client";

export default function ContactClient() {
  return (
    <section className="w-full flex flex-col items-center justify-center min-h-[60vh] py-16 sm:py-24 md:py-32 px-2">
      <div className="max-w-xl w-full mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-widest mb-6 uppercase" style={{ letterSpacing: '0.12em' }}>Contact</h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-10 sm:mb-12 font-normal max-w-lg mx-auto" style={{ letterSpacing: '0.04em' }}>
          Open to Web3 engineering, security research, and serious collaborations.
        </p>
        <nav className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 mt-2 w-full">
          <a
            href="mailto:komarivenkataramana4@gmail.com"
            className="contact-link text-white/90 uppercase font-medium tracking-wider text-base sm:text-base md:text-lg relative transition-all duration-200"
            style={{ textDecoration: 'none' }}
          >
            <span className="inline-block pb-1 border-b border-transparent hover:border-white/80 transition-all duration-200">Email</span>
          </a>
          <span className="hidden sm:inline text-gray-600 select-none">·</span>
          <a
            href="https://github.com/Venkat5599" target="_blank" rel="noopener noreferrer"
            className="contact-link text-white/90 uppercase font-medium tracking-wider text-base sm:text-base md:text-lg relative transition-all duration-200"
            style={{ textDecoration: 'none' }}
          >
            <span className="inline-block pb-1 border-b border-transparent hover:border-white/80 transition-all duration-200">GitHub</span>
          </a>
          <span className="hidden sm:inline text-gray-600 select-none">·</span>
          <a
            href="https://x.com/Archuser__" target="_blank" rel="noopener noreferrer"
            className="contact-link text-white/90 uppercase font-medium tracking-wider text-base sm:text-base md:text-lg relative transition-all duration-200"
            style={{ textDecoration: 'none' }}
          >
            <span className="inline-block pb-1 border-b border-transparent hover:border-white/80 transition-all duration-200">X</span>
          </a>
          <span className="hidden sm:inline text-gray-600 select-none">·</span>
          <a
            href="https://www.instagram.com/venkatsunny56/" target="_blank" rel="noopener noreferrer"
            className="contact-link text-white/90 uppercase font-medium tracking-wider text-base sm:text-base md:text-lg relative transition-all duration-200"
            style={{ textDecoration: 'none' }}
          >
            <span className="inline-block pb-1 border-b border-transparent hover:border-white/80 transition-all duration-200">Instagram</span>
          </a>
          <span className="hidden sm:inline text-gray-600 select-none">·</span>
          <a
            href="https://www.linkedin.com/in/venkata-ramana-komari-402058316/" target="_blank" rel="noopener noreferrer"
            className="contact-link text-white/90 uppercase font-medium tracking-wider text-base sm:text-base md:text-lg relative transition-all duration-200"
            style={{ textDecoration: 'none' }}
          >
            <span className="inline-block pb-1 border-b border-transparent hover:border-white/80 transition-all duration-200">LinkedIn</span>
          </a>
        </nav>
      </div>
    </section>
  );
}
