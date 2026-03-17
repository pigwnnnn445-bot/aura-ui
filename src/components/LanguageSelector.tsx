import { useState } from "react";
import { Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
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

const LanguageList = ({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) => (
  <div className="px-4 pb-4 pt-2 flex flex-col gap-1">
    {defaultLanguages.map((lang) => (
      <button
        key={lang.id}
        onClick={() => onSelect(lang.id)}
        className={cn(
          "flex items-center justify-between w-full px-3 py-3 rounded-lg",
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
  </div>
);

const LanguageSelector = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>("en");
  const isMobile = useIsMobile();

  const selectedLang = defaultLanguages.find((l) => l.id === selected);

  const handleSelect = (id: string) => {
    setSelected(id);
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="gradient"
        size="lg"
        onClick={() => setOpen(true)}
        className="rounded-lg px-8 py-4 text-base font-semibold"
      >
        <Globe className="h-5 w-5 mr-2" />
        {selectedLang?.native ?? "Change Language"}
      </Button>

      {isMobile ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent className="max-h-[85vh]">
            <DrawerHeader className="text-left">
              <DrawerTitle className="text-xl font-semibold tracking-tight">
                Select Language
              </DrawerTitle>
              <DrawerDescription>
                Choose your preferred interface language.
              </DrawerDescription>
            </DrawerHeader>
            <ScrollArea className="max-h-[60vh] overflow-y-auto">
              <LanguageList selected={selected} onSelect={handleSelect} />
            </ScrollArea>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-sm max-h-[80vh] overflow-hidden rounded-xl glass-card p-0">
            <DialogHeader className="p-6 pb-0">
              <DialogTitle className="text-xl font-semibold tracking-tight">
                Select Language
              </DialogTitle>
              <DialogDescription>
                Choose your preferred interface language.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[400px]">
              <LanguageList selected={selected} onSelect={handleSelect} />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default LanguageSelector;
