export interface IconSettings {
    iconElement?: HTMLElement | null;
    iconHtmlElement?: HTMLElement | null;
    iconImgElement?: HTMLElement | null;
}
export default function updateIcon(iconSettings: IconSettings, containerElement: HTMLElement, append: boolean, newIconClass: string | null | undefined, newIconUrl: string | null | undefined, insertBeforeEl?: HTMLElement | null | undefined, // Should not be used with append: true — the append flag will override
newIconHtml?: string, iconLiga?: string): void;
//# sourceMappingURL=update-icon.d.ts.map