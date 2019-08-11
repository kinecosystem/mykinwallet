/**
 * @function grid
 * @param gap - grid-gap
 * @param justifyContent - justify-content
 * @param alignItems - align-items
 * @param templateCols - grid-template-columns
 * @param templateRows - grid-template-rows
 * @param areas - grid-areas
 */
export const grid = (
	gap: string | number,
	justifyContent: string,
	alignItems: string,
	templateCols: string,
	templateRows: string,
	areas?: string
) =>
	`
   display:grid;
   grid-gap:${gap};
   justify-content:${justifyContent}
   align-items:${alignItems};
   grid-template-columns:${templateCols};   
   grid-template-rows:${templateRows};
   ${areas ? `grid-area: ${areas}` : ''}
`;

export const flexRow = (justifyContent: string, alignItems: string) =>
	`
   display:flex;
   flex-direction:row;
   justify-content:${justifyContent};
   align-items:${alignItems};
`;
export const flexColumn = (justifyContent: string, alignItems: string) =>
	`
   display:flex;
   flex-direction:column;
   justify-content:${justifyContent};
   align-items:${alignItems};
`;
