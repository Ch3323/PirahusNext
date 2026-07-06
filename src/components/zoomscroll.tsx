"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function ScrollHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        innerRef.current,
        { scale: 1 },
        {
          scale: 0.5, // zoom out smaller than normal
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "+=120%",
            scrub: 0.8,
            pin: true,
          },
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen overflow-hidden"
    >
      {/* Inner wrapper (this is what scales) */}
      <div
        ref={innerRef}
        className="relative w-full h-full"
      >
        {/* Background image */}
        <Image
          src="/images/pirahusnextimg.jpg"
          alt="Hero background"
          fill
          priority
          className="object-cover"
        />


      </div>
    </section>
  );
}
