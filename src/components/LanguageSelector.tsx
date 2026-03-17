import { useState } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Language {
  id: string;
  name: string;
  native: string;
}

const defaultLanguages: Language[] = [
  { id: "en", name: "English", native: "English" },
  { id: "zh", name: "Chinese", native: "简体中文" },
  { id: "ja", name: "Japanese", native: "日本語" },
  { id: "ko", name: "Korean", native: "한국어" },
  { id: "fr", name: "French", native: "Français" },
  { id: "de", name: "German", native: "Deutsch" },
  { id: "es", name: "Spanish", native: "Español" },
  { id: "it", name: "Italian", native: "Italiano" },
  { id: "ru", name: "Russian", native: "Русский" },
  { id: "pt", name: "Portuguese", native: "Português" },
  { id: "nl", name: "Dutch", native: "Nederlands" },
  { id: "tr", name: "Turkish", native: "Türkçe" },
  { id: "ar", name: "Arabic", native: "العربية" },
  { id: "vi", name: "Vietnamese", native: "Tiếng Việt" },
  { id: "th", name: "Thai", native: "ไทย" },
];

const LanguageSelector = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>("en");

  const selectedLang = defaultLanguages.find((l) => l.id === selected);

  const handleSelect = (id: string) => {
    setSelected(id);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="gradient"
          size="lg"
          className="rounded-lg px-6 py-4 text-base font-semibold min-w-[220px] justify-between"
        >
          <span className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            {selectedLang?.native ?? "Select Language"}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[280px] p-1 rounded-xl glass-card max-h-[320px] overflow-y-auto"
        align="center"
        sideOffset={8}
      >
        {defaultLanguages.map((lang) => (
          <button
            key={lang.id}
            onClick={() => handleSelect(lang.id)}
            className={cn(
              "flex items-center justify-between w-full px-3 py-2.5 rounded-lg",
              "hover:bg-accent cursor-pointer transition-all duration-200 text-left",
              selected === lang.id && "bg-primary/10"
            )}
          >
            <div className="flex flex-col">
              <span
                className={cn(
                  "text-sm font-medium",
                  selected === lang.id ? "text-primary" : "text-foreground"
                )}
              >
                {lang.native}
              </span>
              <span className="text-xs text-muted-foreground">{lang.name}</span>
            </div>
            {selected === lang.id && (
              <Check className="h-4 w-4 text-primary shrink-0" />
            )}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSelector;
