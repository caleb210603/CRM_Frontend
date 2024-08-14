import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

type FontPreference = "lato" | "roboto" | "inter";

type FontProviderProps = {
  children: React.ReactNode;
  defaultFont?: FontPreference;
  storageKey?: string;
};

type FontProviderState = {
  font: FontPreference;
  setFont: (font: FontPreference) => void;
};

const initialState: FontProviderState = {
  font: "inter",
  setFont: () => null,
};

const FontProviderContext = createContext<FontProviderState>(initialState);

export function FontProvider({
  children,
  defaultFont = "lato",
  storageKey = "font-preference",
  ...props
}: FontProviderProps) {
  const [font, setFont] = useState<FontPreference>(
    () => (localStorage.getItem(storageKey) as FontPreference) || defaultFont
  );

  useEffect(() => {
    const root = window.document.body;

    root.classList.remove("font-lato", "font-inter","font-roboto");


    
    root.classList.add(`font-${font}`);

  }, [font]);

  const value = {
    font,
    setFont: (font: FontPreference) => {
      localStorage.setItem(storageKey, font);
      setFont(font);
    },
  };

  return (
    <FontProviderContext.Provider {...props} value={value}>
      {children}
    </FontProviderContext.Provider>
  );
}

export const useFont = () => {
  const context = useContext(FontProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a fontProvider");

  return context;
};
