interface ToneSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const ToneSlider = ({ value, onChange }: ToneSliderProps) => {
  const toneLabel = value <= 30 ? "Formal" : value <= 70 ? "Balanced" : "Casual";

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">Tone Control</label>
        <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-primary/15 text-primary border border-primary/20">
          {toneLabel}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-primary
            [&::-webkit-slider-thumb]:shadow-[0_0_10px_hsl(280_80%_60%/0.5)]
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:transition-shadow
            [&::-webkit-slider-thumb]:duration-200
            [&::-webkit-slider-thumb]:hover:shadow-[0_0_16px_hsl(280_80%_60%/0.7)]"
        />
        <div className="flex justify-between mt-1">
          <span className="text-xs text-muted-foreground">Formal</span>
          <span className="text-xs text-muted-foreground">Casual</span>
        </div>
      </div>
    </div>
  );
};

export default ToneSlider;
