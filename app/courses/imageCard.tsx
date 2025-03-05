import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"
import { cn } from "@/lib/utils"

// Define variants for ImageCard
const imageCardVariants = cva(
  "block overflow-hidden rounded-base border-2 border-border bg-main font-base shadow-shadow transition-all transform duration-300",
  {
    variants: {
      variant: {
        default:
          "hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none",
        noShadow: "hover:translate-x-0 hover:translate-y-0",
        neutral:
          "bg-bw text-text border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none",
        reverse:
          "text-mtext bg-main border-2 border-border hover:translate-x-reverseBoxShadowX hover:translate-y-reverseBoxShadowY hover:shadow-shadow",
      },
      size: {
        default: "w-[250px]",
        sm: "w-[200px]",
        lg: "w-[300px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type Props = {
  imageUrl: string
  caption: string
  link: string // Add `link` prop for URL
} & VariantProps<typeof imageCardVariants> // Add variants for size and style

const ImageCard = ({ imageUrl, caption, link, variant, size }: Props) => {
  return (
    <a href={link} className="block">
      <figure className={cn(imageCardVariants({ variant, size }))}>
        <img className="w-full aspect-[4/3]" src={imageUrl} alt="image" />
        <figcaption className="border-t-2 text-mtext border-border p-4 flex items-center justify-center">
          {caption}
        </figcaption>
      </figure>
    </a>
  )
}

export default ImageCard
