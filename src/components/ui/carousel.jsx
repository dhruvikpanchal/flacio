import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

const CarouselContext = React.createContext(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

export function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((emblaApi) => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = React.useCallback(
    (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;

    api.on("reInit", onSelect);
    api.on("select", onSelect);

    // Sync initial state asynchronously to avoid cascading synchronous render in effect body
    queueMicrotask(() => {
      onSelect(api);
    });

    return () => {
      api?.off("select", onSelect);
      api?.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

export function CarouselContent({ className, ...props }) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden w-full">
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-3 sm:-ml-4 lg:-ml-5" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  );
}

export function CarouselItem({ className, ...props }) {
  const { orientation } = useCarousel();

  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0",
        orientation === "horizontal" ? "pl-3 sm:pl-4 lg:pl-5" : "pt-4",
        className
      )}
      {...props}
    />
  );
}

export function CarouselPrevious({ className, ...props }) {
  const { scrollPrev, canScrollPrev } = useCarousel();

  return (
    <button
      type="button"
      onClick={scrollPrev}
      disabled={!canScrollPrev}
      className={cn(
        "shrink-0 w-8 sm:w-9 md:w-10 self-stretch bg-[#f5f5f5] hover:bg-brand-green border border-[#e0e0e0] hover:border-brand-green shadow-xs flex items-center justify-center text-[#222222] hover:text-white transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed select-none",
        className
      )}
      aria-label="Previous slide"
      {...props}
    >
      <ChevronLeft className="w-5 h-5 stroke-[1.75]" />
    </button>
  );
}

export function CarouselNext({ className, ...props }) {
  const { scrollNext, canScrollNext } = useCarousel();

  return (
    <button
      type="button"
      onClick={scrollNext}
      disabled={!canScrollNext}
      className={cn(
        "shrink-0 w-8 sm:w-9 md:w-10 self-stretch bg-[#f5f5f5] hover:bg-brand-green border border-[#e0e0e0] hover:border-brand-green shadow-xs flex items-center justify-center text-[#222222] hover:text-white transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed select-none",
        className
      )}
      aria-label="Next slide"
      {...props}
    >
      <ChevronRight className="w-5 h-5 stroke-[1.75]" />
    </button>
  );
}
