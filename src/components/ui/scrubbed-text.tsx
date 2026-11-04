import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { isReducedMotion } from "@/lib/motion-config";

interface ScrubbedParagraphProps {
  text: string;
  className?: string;
}

interface WordSpanProps {
  word: string;
  range: [number, number];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}

const WordSpan: React.FC<WordSpanProps> = ({ word, range, progress }) => {
  const opacity = useTransform(progress, range, [0.25, 1]);
  const color = useTransform(
    progress,
    range,
    ["rgba(148, 163, 184, 0.4)", "rgba(99, 102, 241, 1)"]
  );

  return (
    <span className="relative inline-block mr-[0.3em]">
      <motion.span style={{ opacity }} className="transition-colors">
        {word}
      </motion.span>
    </span>
  );
};

export const ScrubbedParagraph: React.FC<ScrubbedParagraphProps> = ({
  text,
  className = "",
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const reducedMotion = isReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "center 45%"],
  });

  if (reducedMotion) {
    return <p className={className}>{text}</p>;
  }

  const words = text.split(" ");
  const step = 1 / words.length;

  return (
    <p
      ref={containerRef}
      className={`leading-relaxed select-none ${className}`}
      aria-label={text}
    >
      {words.map((word, idx) => {
        const start = idx * step;
        const end = Math.min(1, start + step * 1.5);
        return (
          <WordSpan
            key={`${word}-${idx}`}
            word={word}
            range={[start, end]}
            progress={scrollYProgress}
          />
        );
      })}
    </p>
  );
};

export default ScrubbedParagraph;

