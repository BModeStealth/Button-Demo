import React from 'react';
import tokensJson from './tokens.json';

// Merge base, semantic.button, and semantic.state tokens for lookup
const tokens: Record<string, { value: string; type: string }> = {
  ...tokensJson.base,
  ...tokensJson.semantic.button,
  ...tokensJson.semantic.state,
};

// Helper to resolve token references (e.g., {Blue 600})
function resolveToken(tokenName: string): string {
  const token = tokens[tokenName.replace(/[{}]/g, '')];
  if (!token) return tokenName;
  if (token.value.startsWith('{')) {
    return resolveToken(token.value);
  }
  return token.value;
}

export type ButtonType = 'primary' | 'positive' | 'destructive' | 'secondary';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: ButtonType;
  disabled?: boolean;
  icon?: React.ReactNode;
  title: string;
}

const typeStyles = {
  primary: {
    background: resolveToken('Button Primary'),
    color: resolveToken('Button Primary Content'),
    border: 'none',
    hoverOverlay: resolveToken('Button Hover Overlay'),
    activeOverlay: resolveToken('Button Click Overlay'),
  },
  positive: {
    background: resolveToken('Button Positive'),
    color: resolveToken('Button Positive Content'),
    border: 'none',
    hoverOverlay: resolveToken('Button Hover Overlay'),
    activeOverlay: resolveToken('Button Click Overlay'),
  },
  destructive: {
    background: resolveToken('Button Destructive'),
    color: resolveToken('Button Destructive Content'),
    border: 'none',
    hoverOverlay: resolveToken('Button Hover Overlay'),
    activeOverlay: resolveToken('Button Click Overlay'),
  },
  secondary: {
    background: 'transparent',
    color: resolveToken('Button Secondary Content'),
    border: `solid ${resolveToken('Border-S')}px ${resolveToken('Button Secondary Border')}`,
    hoverOverlay: resolveToken('Button Secondary Hover Overlay'),
    activeOverlay: resolveToken('Button Secondary Click Overlay'),
  },
};

export const Button: React.FC<ButtonProps> = ({
  buttonType = 'primary',
  disabled = false,
  icon,
  title,
  ...rest
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  const style = {
    ...typeStyles[buttonType],
    background: typeStyles[buttonType].background,
    color: typeStyles[buttonType].color,
    border: typeStyles[buttonType].border,
    borderRadius: `${resolveToken('Radius-XS')}px`,
    opacity: disabled ? Number(resolveToken('Disabled')) / 100 : Number(resolveToken('Enabled')) / 100,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background 0.2s, color 0.2s, opacity 0.2s',
    font: resolveToken('Button Font'),
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    position: 'relative',
    overflow: 'hidden',
  } as React.CSSProperties;

  // Overlay for hover/active
  const overlayColor = disabled
    ? undefined
    : isActive
    ? typeStyles[buttonType].activeOverlay
    : isHovered
    ? typeStyles[buttonType].hoverOverlay
    : undefined;

  return (
    <button
      style={style}
      disabled={disabled}
      aria-label={title}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsActive(false); }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      {...rest}
    >
      {/* Overlay for hover/active */}
      {overlayColor && (
        <span
          style={{
            position: 'absolute',
            inset: 0,
            background: overlayColor,
            pointerEvents: 'none',
            borderRadius: `${resolveToken('Radius-XS')}px`,
            zIndex: 1,
          }}
        />
      )}
      <span style={{ display: 'inline-flex', alignItems: 'center', zIndex: 2 }}>
        {icon && <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: '8px', color: typeStyles[buttonType].color }}>{icon}</span>}
        <span>{title}</span>
      </span>
    </button>
  );
}; 