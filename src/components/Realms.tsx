import { Container, Button, Table } from "nes-react";
import { FC, useState } from "react";
import {
  metadata,
  findFortressNumber,
  calculateYear,
  FortressData,
  displayName,
} from "../metadata";

export const Realms: FC<{
  ownerHashes: string[];
  fortressData: FortressData | null | undefined;
  handleSelectTile: (x: string, y: string) => void;
}> = ({ ownerHashes, fortressData, handleSelectTile }) => {
  const [showOwned, setShowOwned] = useState(true);
  const [show2017, setShow2017] = useState(true);
  const [show2018, setShow2018] = useState(false);
  const [show2019, setShow2019] = useState(false);

  return (
    <Container rounded title="Realms">
      {ownerHashes.length > 0 && (
        <Button
          primary
          // @ts-ignore
          onClick={() => setShowOwned((value) => !value)}
        >
          Owned
        </Button>
      )}
      <Button
        success
        // @ts-ignore
        onClick={() => setShow2017((value) => !value)}
      >
        2017
      </Button>
      <Button
        warning
        // @ts-ignore
        onClick={() => setShow2018((value) => !value)}
      >
        2018
      </Button>
      <Button
        error
        // @ts-ignore
        onClick={() => setShow2019((value) => !value)}
      >
        2019
      </Button>
      <Table bordered>
        <tbody>
          {rows.map((y) => {
            return (
              <tr key={y}>
                {columns.map((x) => {
                  const fortress = metadata.find(
                    (f) => f.x === x.toString() && f.y === y.toString()
                  );

                  return (
                    <td
                      className="tooltip"
                      data-text={
                        fortress != null
                          ? `index: ${findFortressNumber(x, y)}
name: ${displayName(fortress.name)}
position: x: ${fortress.x} y: ${fortress.y}
`
                          : x === "0" && y === "0"
                          ? "Ether"
                          : "Emptiness"
                      }
                      style={{
                        width: 35,
                        height: 35,
                        textAlign: "center",
                        backgroundColor: getColor(
                          fortressData,
                          ownerHashes,
                          fortress,
                          showOwned,
                          show2017,
                          show2018,
                          show2019
                        ),
                      }}
                      key={x}
                    >
                      {x === "0" && y === "0" ? (
                        <span style={{ position: "relative", top: 2, left: 2 }}>
                          Ξ
                        </span>
                      ) : metadata.find(
                          (f) => f.x === x.toString() && f.y === y.toString()
                        ) != null ? (
                        <button
                          style={{
                            margin: 0,
                            border: 0,
                            backgroundColor: "transparent",
                            outline: "none",
                            padding: "7px 11px",
                            width: 35,
                            height: 35,
                          }}
                          onClick={() => handleSelectTile(x, y)}
                        >
                          F
                        </button>
                      ) : (
                        "x"
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

const getColor = (
  searchResult: FortressData | undefined | null,
  ownerFortressHashes: string[],
  fortress: FortressData | undefined,
  showOwned: boolean,
  show2017: boolean,
  show2018: boolean,
  show2019: boolean
) => {
  if (fortress != null) {
    if (
      searchResult != null &&
      searchResult.x === fortress.x &&
      searchResult.y === fortress.y
    ) {
      return "#FEADCC";
    } else if (showOwned && ownerFortressHashes.includes(fortress.hash)) {
      return "#2B9EEB";
    } else if (show2017 && calculateYear(fortress.blockNumber) === 2017) {
      return "#94CB4B";
    } else if (show2018 && calculateYear(fortress.blockNumber) === 2018) {
      return "#F6D439";
    } else if (show2019 && calculateYear(fortress.blockNumber) === 2019) {
      return "#E56F5A";
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};

const columns = [
  "-12",
  "-11",
  "-10",
  "-9",
  "-8",
  "-7",
  "-6",
  "-5",
  "-4",
  "-3",
  "-2",
  "-1",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];

const rows = [...columns].reverse();
