"use client";

import { cn } from "../../lib/utils";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import {
  DisclosurePanel as AccordionContentPrimitive,
  Heading as AccordionHeaderPrimitive,
  Disclosure as AccordionItemPrimitive,
  DisclosureGroup as AccordionPrimitive,
  Button as AccordionTriggerPrimitive,
} from "react-aria-components";

/**
 * Shadcn UI Accordion Component (React Aria)
 *
 * Requirements:
 * 1. Built on react-aria-components.
 * 2. Allows only one open item by default (allowsMultipleExpanded = false).
 *    If user opens second item, the first auto-closes.
 * 3. Supports id and value props on AccordionItem.
 */
function Accordion({
  className,
  type = "single",
  allowsMultipleExpanded = false,
  ...props
}) {
  const allowMultiple =
    type === "multiple" ? true : allowsMultipleExpanded;

  return (
    <AccordionPrimitive
      data-slot="accordion"
      allowsMultipleExpanded={allowMultiple}
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  );
}

function AccordionItem({ className, id, value, ...props }) {
  return (
    <AccordionItemPrimitive
      id={id ?? value}
      data-slot="accordion-item"
      className={cn("border-b border-[#e8e8e8]", className)}
      {...props}
    />
  );
}

function AccordionTrigger({ className, children, ...props }) {
  return (
    <AccordionHeaderPrimitive className="flex">
      <AccordionTriggerPrimitive
        slot="trigger"
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-center justify-between py-4 sm:py-5 text-left font-sans text-sm sm:text-[15px] md:text-base font-normal text-brand-dark transition-colors duration-200 hover:text-brand-green outline-none cursor-pointer select-none",
          className
        )}
        {...props}
      >
        <span className="pr-4 leading-normal">{children}</span>

        <ChevronDownIcon
          data-slot="accordion-trigger-icon"
          className="h-4 w-4 shrink-0 text-[#828787] pointer-events-none transition-transform duration-200 group-aria-expanded/accordion-trigger:hidden group-hover/accordion-trigger:text-brand-green"
          aria-hidden="true"
        />

        <ChevronUpIcon
          data-slot="accordion-trigger-icon"
          className="h-4 w-4 shrink-0 text-[#828787] pointer-events-none hidden group-aria-expanded/accordion-trigger:inline group-hover/accordion-trigger:text-brand-green"
          aria-hidden="true"
        />
      </AccordionTriggerPrimitive>
    </AccordionHeaderPrimitive>
  );
}

function AccordionContent({ className, children, ...props }) {
  return (
    <AccordionContentPrimitive
      data-slot="accordion-content"
      className="overflow-hidden font-sans text-[13.5px] sm:text-sm md:text-[14.5px] text-brand-muted leading-relaxed transition-all"
      {...props}
    >
      <div className={cn("pt-0 pb-5 text-left", className)}>
        {children}
      </div>
    </AccordionContentPrimitive>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
export default Accordion;
