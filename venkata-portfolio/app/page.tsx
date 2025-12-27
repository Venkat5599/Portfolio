'use client';


import dynamic from 'next/dynamic';
import { Hero } from '@/components/Hero/Hero';


import FlowingMenu from '@/components/FlowingMenu/FlowingMenu';
import { VariableProximity } from '@/components/VariableProximity';
import { TextType } from '@/components/Hero/TextType';

const SmoothScroll = dynamic(
  () => import('@/components/SmoothScroll/SmoothScroll').then((mod) => ({ default: mod.SmoothScroll })),
  { ssr: false }
);

const DynamicKineticText = dynamic(() => import('@/components/KineticText/KineticText').then(mod => mod.KineticText), { ssr: false });

export default function Home() {
  const items = [
    {
      text: "Token Launchpad",
      link: "https://create-token-erya.vercel.app",
      image: "/token-launchpad.png",
      description: (
        <>
          Launch custom Solana tokens in seconds.
          <br />
          Built with Web3, Solana, and smart contract tooling.
          <br />
          Designed for speed, simplicity, and real-world deployment.
        </>
      )
    }
  ];
  return (
    <SmoothScroll>
      <main className="container w-full overflow-x-hidden">
        {/* Hero Section */}
        <Hero />



        {/* About Me is now in the Hero section */}

        {/* My Work Section */}
        <section id="my-work" className="container w-full pt-24 pb-24">
          <div className="flex flex-col items-start">
            <h2 className="text-white text-4xl md:text-6xl font-extrabold uppercase tracking-tight text-left mb-12">My Work</h2>
            <div className="mt-3 w-full text-2xl md:text-3xl">
              <FlowingMenu items={items} />
            </div>
          </div>
        </section>

        {/* Footer section */}
        <section
          className="container w-full flex flex-col items-center justify-center"
          style={{ minHeight: '60vh' }}
        >
          <div className="text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-white mb-8">komarivenkataramana4@gmail.com</p>
            <p className="text-sm text-white/60 max-w-md mx-auto leading-relaxed">
              Designer and developer crafting experimental digital experiences.
              Focused on precision, innovation, and creative expression.
            </p>
          </div>
        </section>
      </main>
    </SmoothScroll>
  );
}
