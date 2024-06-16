"use client";

import { AppProgressBar as NProgressBar } from "next-nprogress-bar";

export default function ProgressBar() {
  return (
    <NProgressBar
      height="5.5px"
      color="#747FFF"
      options={{ showSpinner: true }}
      shallowRouting
    />
  );
}
