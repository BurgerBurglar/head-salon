import { type TooltipContentProps } from "@radix-ui/react-tooltip";
import { Copy } from "lucide-react";
import { type ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface Prop {
  side: TooltipContentProps["side"];
  content: ReactNode;
  children: ReactNode;
}

export const TooltipWrapper: React.FC<Prop> = ({ side, content, children }) => (
  <TooltipProvider delayDuration={200}>
    <Tooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent side={side}>{content}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export const CopyTooltipContent: React.FC = () => {
  return (
    <div className="flex gap-2 text-sm">
      <Copy width="1rem" />
      点击复制
    </div>
  );
};
