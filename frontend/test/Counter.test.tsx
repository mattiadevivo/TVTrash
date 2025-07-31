import { test, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { Counter } from "../src/Counter";

const user = userEvent.setup();

test("increments value", async () => {
  const { getByRole } = render(() => <Counter />);
  const button = getByRole("button");
  const counter = getByRole("heading");
  expect(counter).toHaveTextContent("0");
  await user.click(button);
  expect(counter).toHaveTextContent("1");
});
