"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";

/**
 * Link with prefetch disabled. Required for static export (output: "export"):
 * prefetch requests RSC payload URLs that don't exist on a static host, causing 404s and console errors in PageSpeed.
 */
function Link(props: ComponentProps<typeof NextLink>) {
  return <NextLink prefetch={false} {...props} />;
}

export { Link };
export default Link;
