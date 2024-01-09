import React from "react";
import { PageWrapper } from "./PageWrapper";
import type { PageContext } from "./types";
import { PageContextBuiltInClientWithClientRouting } from "vike/types";
import { createRoot, hydrateRoot, Root } from "react-dom/client";


export const clientRouting = true

export const hydrationCanBeAborted = true

let root: Root
export async function render(
	pageContext: PageContextBuiltInClientWithClientRouting & PageContext,
) {
	const { Page, pageProps } = pageContext;
	// hydrateRoot(
	// 	document.getElementById("page-view")!,
	// 	<PageWrapper pageContext={pageContext}>
	// 		<Page {...pageProps} />
	// 	</PageWrapper>,
	// );

	const page = (
		<PageWrapper pageContext={pageContext}>
			<Page {...pageProps} />
		</PageWrapper>
	)

	const container = document.getElementById('page-view')!
	if (pageContext.isHydration) {
		root = hydrateRoot(container, page)
	} else {
		if (!root) {
			root = createRoot(container)
		}
		root.render(page)
	}
}
