import React, { useState, useEffect, useMemo } from 'react';

const TypewriterHTML = ({ html, speed = 50 }) => {
  const [displayedHTML, setDisplayedHTML] = useState('');

  // Compute tokens once using useMemo so they don't change on every render.
  const tokens = useMemo(() => {
    const t = [];
    const regex = /(<[^>]+>)|([^<]+)/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
      if (match[1]) {
        // HTML tag – add immediately.
        t.push({ type: 'tag', value: match[1] });
      } else if (match[2]) {
        // Plain text – animate character-by-character.
        t.push({ type: 'text', value: match[2] });
      }
    }
    return t;
  }, [html]);

  useEffect(() => {
    let tokenIndex = 0;
    let charIndex = 0;
    let currentOutput = '';
    const interval = setInterval(() => {
      if (tokenIndex >= tokens.length) {
        clearInterval(interval);
        return;
      }
      const token = tokens[tokenIndex];
      if (token.type === 'tag') {
        // Immediately append the entire tag.
        currentOutput += token.value;
        tokenIndex++;
        setDisplayedHTML(currentOutput);
      } else {
        // Append one character at a time.
        if (charIndex < token.value.length) {
          currentOutput += token.value.charAt(charIndex);
          charIndex++;
          setDisplayedHTML(currentOutput);
        } else {
          tokenIndex++;
          charIndex = 0;
        }
      }
    }, speed);

    return () => clearInterval(interval);
  }, [html, speed, tokens]);

  return <div dangerouslySetInnerHTML={{ __html: displayedHTML }} />;
};

export default TypewriterHTML;
