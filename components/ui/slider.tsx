import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { cn } from "cn";

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: SliderPrimitive.Root.Props) {
  const _values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [min, max];

  return (
    <SliderPrimitive.Root
      className={cn("data-horizontal:w-full data-vertical:h-full", className)}
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment="center"
      {...props}
    >
      <SliderPrimitive.Control className="relative flex w-full touch-none items-center select-none data-disabled:opacity-100 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col">
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="relative grow overflow-hidden rounded-md bg-gray-200 select-none data-horizontal:h-1 data-horizontal:w-full data-vertical:h-full data-vertical:w-1.5"
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className="bg-[#52B788] select-none data-horizontal:h-full data-vertical:w-full"
          />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            className="outline-none select-none"
          >
            <div className="relative flex size-8 shrink-0 -translate-y-7 items-center justify-center rounded-full border-2 border-gray-300 bg-white text-[12px] font-medium text-[#2D3748] transition-all select-none after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:border-x-4 after:border-t-4 after:border-x-transparent after:border-t-gray-300 after:content-[''] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50">
              You
            </div>

            <div className="absolute top-6 left-1.5 text-[11px] font-semibold whitespace-nowrap text-[#2B3674]">
              {_values[index]}%
            </div>
          </SliderPrimitive.Thumb>
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

export { Slider };

// function Slider({ className, defaultValue, value, min = 0, max = 100, ...props }: SliderPrimitive.Root.Props) {
//   const _values = Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max];

//   return (
//     <SliderPrimitive.Root className={cn('data-horizontal:w-full data-vertical:h-full', className)} data-slot="slider" defaultValue={defaultValue} value={value} min={min} max={max} thumbAlignment="edge" {...props}>
//       <SliderPrimitive.Control className="relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col">
//         <SliderPrimitive.Track data-slot="slider-track" className="relative grow overflow-hidden rounded-md bg-chart-1 select-none data-horizontal:h-1 data-horizontal:w-full data-vertical:h-full data-vertical:w-1">
//           <SliderPrimitive.Indicator data-slot="slider-range" className="bg-[#41B67D] select-none data-horizontal:h-full data-vertical:w-full" />
//         </SliderPrimitive.Track>
//         {Array.from({ length: _values.length }, (_, index) => (
// <SliderPrimitive.Thumb data-slot="slider-thumb" key={index} className="outline-none select-none">
//             {/* الحاوية الداخلية المرفوعة مع السهم */}
//             <div className="relative flex size-8 -translate-y-7 items-center justify-center rounded-full border-2 border-gray-300 bg-white text-[12px] font-medium text-[#2B3674] shadow-xs after:absolute after:-bottom-1.5 after:left-1/2 after:-translate-x-1/2 after:border-x-[5px] after:border-x-transparent after:border-t-[6px] after:border-t-gray-300">You</div>
//           </SliderPrimitive.Thumb>
//         ))}
//       </SliderPrimitive.Control>
//     </SliderPrimitive.Root>
//   );
// }

// export { Slider };
