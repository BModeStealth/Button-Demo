import React from "react";
import Head from "next/head";
import { useState } from "react";
import { Button, ButtonType } from "../Button";
import IconHome from "../Icon=Home.svg";
import IconSettings from "../Icon=Settings.svg";
import IconArrowRight from "../Icon=Arrow-Right.svg";
import IconEdit from "../Icon=Edit.svg";
import IconSearch from "../Icon=Search.svg";
import tokensJson from "../tokens.json";

const types: ButtonType[] = ["primary", "positive", "destructive", "secondary"];
const iconOptions = [
  { label: "Home", value: "home" },
  { label: "Settings", value: "settings" },
  { label: "Arrow Right", value: "arrow-right" },
  { label: "Edit", value: "edit" },
  { label: "Search", value: "search" },
];

// Helper to resolve token references
const tokens: Record<string, { value: string; type: string }> = {
  ...tokensJson.base,
  ...tokensJson.semantic.button,
  ...tokensJson.semantic.state,
};
function resolveToken(tokenName: string): string {
  const token = tokens[tokenName.replace(/[{}]/g, "")];
  if (!token) return tokenName;
  if (token.value.startsWith("{")) {
    return resolveToken(token.value);
  }
  return token.value;
}

const iconColorByType = {
  primary: resolveToken("Button Primary Content"),
  positive: resolveToken("Button Positive Content"),
  destructive: resolveToken("Button Destructive Content"),
  secondary: resolveToken("Button Secondary Content"),
};

const icons = {
  home: <IconHome style={{ width: 16, height: 16 }} />,
  settings: <IconSettings style={{ width: 16, height: 16 }} />,
  "arrow-right": <IconArrowRight style={{ width: 16, height: 16 }} />,
  edit: <IconEdit style={{ width: 16, height: 16 }} />,
  search: <IconSearch style={{ width: 16, height: 16 }} />,
};

export default function Home() {
  const [buttonType, setButtonType] = useState<ButtonType>("primary");
  const [disabled, setDisabled] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(iconOptions[0].value);
  const [title, setTitle] = useState("Button Component");

  const iconColor = iconColorByType[buttonType];
  const iconMap: Record<string, React.ReactNode> = icons;

  return (
    <>
      <Head>
        <title>Button Demo</title>
        <meta name="description" content="Button component demo with tokens" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div style={{ 
        minHeight: "100vh", 
        display: "flex", 
        background: resolveToken("Blue 100"),
        fontFamily: 'Arial, sans-serif' 
      }}>
        {/* Controls Panel */}
        <div style={{ 
          width: "300px", 
          padding: "24px", 
          background: "white", 
          borderRight: `1px solid ${resolveToken("Grey Alpha 100")}`,
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          color: resolveToken("Grey 800")
        }}>
          <h2 style={{ margin: "0 0 16px 0" }}>Controls</h2>
          
          <label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            Type:
            <select value={buttonType} onChange={e => setButtonType(e.target.value as ButtonType)} style={{ 
              color: resolveToken("Grey 800"), 
              background: "white",
              border: `1px solid ${resolveToken("Grey Alpha 100")}`,
              borderRadius: `${resolveToken("Radius-XS")}px`,
              padding: `${resolveToken("Spacing-XS")}px`,
              fontSize: "14px",
              WebkitAppearance: "none",
              MozAppearance: "none",
              appearance: "none",
              backgroundImage: "none"
            }}>
              {types.map(t => (
                <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
              ))}
            </select>
          </label>
          
          <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input type="checkbox" checked={disabled} onChange={e => setDisabled(e.target.checked)} />
            Disabled
          </label>
          
          <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input type="checkbox" checked={showIcon} onChange={e => setShowIcon(e.target.checked)} />
            Show Icon
          </label>
          
          {showIcon && (
            <label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              Icon:
              <select value={selectedIcon} onChange={e => setSelectedIcon(e.target.value)} style={{ 
                color: resolveToken("Grey 800"), 
                background: "white",
                border: `1px solid ${resolveToken("Grey Alpha 100")}`,
                borderRadius: `${resolveToken("Radius-XS")}px`,
                padding: `${resolveToken("Spacing-XS")}px`,
                fontSize: "14px",
                WebkitAppearance: "none",
                MozAppearance: "none",
                appearance: "none",
                backgroundImage: "none"
              }}>
                {iconOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </label>
          )}
          
          <label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            Title:
            <input 
              type="text" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              style={{ 
                color: resolveToken("Grey 800"), 
                background: "white",
                border: `1px solid ${resolveToken("Grey Alpha 100")}`,
                borderRadius: `${resolveToken("Radius-XS")}px`,
                padding: `${resolveToken("Spacing-XS")}px`,
                fontSize: "14px"
              }}
            />
          </label>
        </div>

        {/* Main Content */}
        <div style={{ 
          flex: 1, 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          justifyContent: "center",
          padding: "24px"
        }}>
          <h1 style={{ marginBottom: "32px", color: resolveToken("Grey 800") }}>Button Component Demo</h1>
          <Button
            buttonType={buttonType}
            disabled={disabled}
            icon={showIcon ? iconMap[selectedIcon] : undefined}
            title={title}
          />
        </div>
      </div>
    </>
  );
}
