import type { AnchorHTMLAttributes } from "react";

type ExternalLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "target" | "rel"
>;

/**
 * Link to another website, opened in a new tab.
 *
 * Always adds rel="noopener noreferrer", and callers can't remove it:
 * - noopener: the other site can't take control of this tab through
 *   `window.opener` (the "reverse tabnabbing" attack);
 * - noreferrer: the other site isn't told which page the visitor came from.
 */
export default function ExternalLink(props: ExternalLinkProps) {
  return <a {...props} target="_blank" rel="noopener noreferrer" />;
}
