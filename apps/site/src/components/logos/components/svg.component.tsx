export function Svg({ viewBox, width, height, 'aria-label': ariaLabel, ...props }) {
  return (
    <svg
      aria-label={ariaLabel}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={width}
      height={height}
      role="img"
      focusable="false"
      className="inline-block"
      {...props}
    />
  );
}
