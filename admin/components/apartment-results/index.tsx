/** @jsxRuntime classic */
/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jsx, css } from "@keystone-ui/core";
import { Apartment } from "../../../gql/generated/sdk";
import { money } from "../../../utils/money";

// create a card grid component
// card has a photo and description

const ApartmentResults = ({
  allApartments,
  selectedApartments,
  selectApartment
}: {
  allApartments: Apartment[];
  selectedApartments: Map<string, boolean>;
  selectApartment: (id: string) => void;
}) => {
  if (allApartments.length === 0) {
    return <div>No apartments found</div>;
  }
  return (
    <div>
      <h4>Apartment Results</h4>
      <section
        css={css`
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          column-gap: 1rem;
        `}
      >
        {allApartments.map((apartment) => {
          const isSelected = selectedApartments.get(apartment.id);
          return (
            <div
              key={apartment.id}
              css={css`
                display: flex;
                flex-direction: column;
                // align-items: center;
                justify-content: center;
                width: 100%;
                margin: 1rem;
                border: 1px solid #ccc;
                box-shadow: ${isSelected ? "0 0 1rem rgba(0, 0, 0, 0.4)" : "0 0 1rem rgba(0, 0, 0, 0.2)"};
                border: ${isSelected ? "1px solid #000" : "1px solid #ccc"};

                :hover {
                  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.4);
                  cursor: pointer;
                }
              `}
              onClick={() => {
                selectApartment(apartment.id);
              }}
            >
              <img
                src={apartment.images?.[0]?.cloudinaryImage?.publicUrlTransformed ?? apartment.images?.[0]?.url ?? ""}
                alt={apartment.name ?? ""}
                style={{
                  // (min-width: 1248px) 25vw, (min-width: 933px) 33.33vw, 100vw
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
              />
              <div
                style={{
                  padding: "1rem"
                }}
              >
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold"
                  }}
                >
                  {apartment.name}
                </div>
                {apartment.area}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "1rem"
                  }}
                >
                  {apartment.minPrice && apartment.minPrice > 0 && (
                    <span>
                      {money(apartment.minPrice)}
                      <sup>+</sup>
                    </span>
                  )}

                  {/* {(!apartment.minPrice || apartment.minPrice === 0) && (
                  <span
                    style={{
                      fontStyle: "italic"
                    }}
                  >
                    -NA-
                  </span>
                )} */}

                  <span>
                    {apartment.unitsCount ? apartment.unitsCount : "No available"}
                    &nbsp;units
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default ApartmentResults;
