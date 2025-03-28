import Image from "next/image"
import { cn } from "@/lib/utils"
import { useSidebar } from "./sidebar"

interface SidebarLogoProps extends React.ComponentProps<"div"> {
  src: string
  alt: string
}

export function SidebarLogo({ src, alt, className, ...props }: SidebarLogoProps) {
  const { state } = useSidebar()

  return (
    <div
      className={cn(
        "flex items-center justify-center w-full h-12 transition-all duration-200",
        "group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:justify-center",
        className
      )}
      {...props}
    >
      <div className={cn(
        "relative transition-all duration-200",
        "group-data-[collapsible=icon]:w-6 group-data-[collapsible=icon]:h-6",
        "group-data-[state=expanded]:w-[100px] group-data-[state=expanded]:h-[40px]"
      )}>
        <Image
          src={src}
          alt={alt}
          fill
          className={cn(
            "object-contain transition-all duration-200",
            "group-data-[collapsible=icon]:p-0.5"
          )}
          sizes="(max-width: 768px) 24px, 100px"
          priority
        />
      </div>
    </div>
  )
} 