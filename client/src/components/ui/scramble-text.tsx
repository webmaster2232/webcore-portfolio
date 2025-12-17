import { useEffect, useState } from "react";

interface ScrambleTextProps {
  text: string;
  className?: string;
  characters?: string;
  speed?: number;
}

export function ScrambleText({ 
  text, 
  className, 
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+",
  speed = 50 
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    let iteration = 0;
    
    const interval = setInterval(() => {
      setDisplayText(prev => 
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );
      
      if (iteration >= text.length) {
        clearInterval(interval);
      }
      
      iteration += 1/3;
    }, speed);
    
    return () => clearInterval(interval);
  }, [text, speed, characters]);

  return <span className={className}>{displayText}</span>;
}
