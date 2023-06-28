/** @jsxRuntime classic */
/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jsx, css } from "@keystone-ui/core";
import { CellContainer } from "@keystone-6/core/admin-ui/components";
import { isNotNullNorUndefined } from "../../../utils/bool";

const thStyles = css`
  border-width: 0;
  border-style: solid;
  border-color: #e1e5e9;
  background-color: white;
  border-bottom: 2px solid #e1e5e9;
  color: #6b7280;
  font-size: 1rem;
  font-weight: 500;
  padding: 8px;
  text-align: left;
  position: sticky;
  top: 0;
`;

const tdStyles = css`
  border-width: 0;
  border-style: solid;
  border-color: #e1e5e9;
  border-bottom: 1px solid #e1e5e9;
  font-size: 1rem;
  border-bottom-width: 0;
`;

export type EnquiryCell = {
  value: string;
  link?: string;
  element?: JSX.Element;
};

export type EnquiryRow = { enquiryId: string; cells: EnquiryCell[] };

export default function ListTable({ headers, rows }: { headers: string[]; rows: EnquiryRow[] }) {
  return (
    <div
      css={css`
        -webkit-text-size-adjust: 100%;
        color: #374151;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.4;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        border-width: 0;
        border-style: solid;
        border-color: #e1e5e9;
        padding-bottom: 24px;
        box-sizing: border-box;
      `}
    >
      <table
        css={css`
          -webkit-border-horizontal-spacing: 0px;
          -webkit-border-vertical-spacing: 0px;
          border-width: 0;
          border-style: solid;
          border-color: #e1e5e9;
          min-width: 100%;
          table-layout: fixed;
        `}
      >
        {/* <colgroup>
          <col
            css={css`
              width: 30;
            `}
          />
          <col
            css={css`
              width: 30;
            `}
          />
          <col />
          <col />
          <col />
          <col />
          <col />
          <col />
        </colgroup> */}
        <thead
          css={css`
            border-width: 0;
            border-style: solid;
            border-color: #e1e5e9;
          `}
        >
          <tr
            css={css`
              border-width: 0;
              border-style: solid;
              border-color: #e1e5e9;
            `}
          >
            {headers.map((header) => (
              <th css={thStyles}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr>
              {row.cells.map((cell) => (
                <td css={tdStyles}>
                  <CellContainer>
                    {cell.element ? (
                      cell.element
                    ) : isNotNullNorUndefined(cell.link) ? (
                      <a
                        css={css`
                          text-decoration: none;
                          color: #6b7280;
                          :hover {
                            text-decoration: underline;
                          }
                        `}
                        href={cell.link}
                      >
                        {cell.value}
                      </a>
                    ) : (
                      cell.value
                    )}
                  </CellContainer>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
