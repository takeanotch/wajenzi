import React from "react";

const TextImageFill = ({
  text,
  image,
  fontSize = "60px",
  fontWeight = "900",
  className = "",
}) => {
  return (
    <span
      className={className}
      style={{
        fontSize,
        fontWeight,
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        display: "inline-block"
      }}
    >
      {text}
    </span>
  );
};

export default TextImageFill;
