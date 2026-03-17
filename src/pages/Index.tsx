import ThemeToggle from "@/components/ThemeToggle";
import LanguageSelector from "@/components/LanguageSelector";

const Index = () => {
  return (
    <div className="min-h-svh flex flex-col items-center justify-center p-6 relative">
      <ThemeToggle />

      <main className="text-center space-y-8 max-w-lg w-full">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Select Language
          </h1>
          <p className="text-muted-foreground text-sm">
            Choose your preferred interface language to continue.
          </p>
        </div>

        <LanguageSelector />
      </main>
    </div>
  );
};

export default Index;
