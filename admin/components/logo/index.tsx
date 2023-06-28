/** @jsxRuntime classic */
/** @jsx jsx */
import Link from "next/link";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jsx, H3 } from "@keystone-ui/core";

const logo = () => {
  return (
    <H3>
      <Link href='/' passHref>
        <img
          src='/logo.png'
          css={{
            height: "66px",
            width: "auto",
            verticalAlign: "middle",
            objectFit: "contain"
          }}
        ></img>
      </Link>
    </H3>
  );
};

export default logo;
