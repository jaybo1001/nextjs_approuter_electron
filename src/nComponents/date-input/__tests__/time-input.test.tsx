/* eslint-disable jsx-a11y/no-autofocus */
import * as React from "react";
import {act, fireEvent, render} from "@testing-library/react";
import {Time, ZonedDateTime} from "@internationalized/date";
import {TimeValue} from "@react-types/datepicker";
import {pointerMap, triggerPress} from "@nextui-org/test-utils";
import userEvent from "@testing-library/user-event";

import {TimeInput as TimeInputBase, TimeInputProps} from "../src";

/**
 * Custom date-input to disable animations and avoid issues with react-motion and jest
 */
const TimeInput = React.forwardRef((props: TimeInputProps, ref: React.Ref<HTMLDivElement>) => {
  return <TimeInputBase {...props} ref={ref} disableAnimation shouldForceLeadingZeros={false} />;
});

TimeInput.displayName = "TimeInput";

describe("TimeInput", () => {
  let user;

  beforeAll(() => {
    user = userEvent.setup({delay: null, pointerMap});
    jest.useFakeTimers();
  });

  describe("Basics", () => {
    it("should render correctly", () => {
      const wrapper = render(<TimeInput label="Time" />);

      expect(() => wrapper.unmount()).not.toThrow();
    });

    it("ref should be forwarded", () => {
      const ref = React.createRef<HTMLDivElement>();

      render(<TimeInput ref={ref} label="Time" />);
      expect(ref.current).not.toBeNull();
    });

    it("should support autoFocus", function () {
      const {getAllByRole} = render(<TimeInput autoFocus label="Time" />);

      expect(document.activeElement).toBe(getAllByRole("spinbutton")[0]);
    });

    it("should pass through data attributes", function () {
      const {getByTestId} = render(<TimeInput data-testid="foo" label="Time" />);

      const input = getByTestId("foo");

      expect(input).toHaveAttribute("role", "group");
    });

    it("should include a selected value description", function () {
      const {getByRole, getAllByRole} = render(<TimeInput label="Time" value={new Time(8, 45)} />);

      const group = getByRole("group");

      expect(group).toHaveAttribute("aria-describedby");

      // @ts-ignore
      const description = group
        .getAttribute("aria-describedby")
        .split(" ")
        // @ts-ignore
        .map((d) => document.getElementById(d).textContent)
        .join(" ");

      expect(description).toBe("Selected Time: 8:45 AM");

      const segments = getAllByRole("spinbutton");

      expect(segments[0]).toHaveAttribute(
        "aria-describedby",
        group.getAttribute("aria-describedby"),
      );

      for (const segment of segments.slice(1)) {
        expect(segment).not.toHaveAttribute("aria-describedby");
      }
    });
  });

  describe("Labelling", () => {
    it("should support labeling", function () {
      const {getAllByRole, getByText} = render(<TimeInput label="Time" />);

      const label = getByText("Time");

      const combobox = getAllByRole("group")[0];

      expect(combobox).toHaveAttribute("aria-labelledby", label.id);

      const segments = getAllByRole("spinbutton");

      for (const segment of segments) {
        expect(segment).toHaveAttribute("id");
        const segmentId = segment.getAttribute("id");

        expect(segment).toHaveAttribute("aria-labelledby", `${segmentId} ${label.id}`);
      }
    });

    it("should support labeling with aria-label", function () {
      const {getByRole} = render(<TimeInput aria-label="Event time" />);

      const field = getByRole("group");

      expect(field).toHaveAttribute("aria-label", "Event time");
      expect(field).toHaveAttribute("id");
    });

    it("should support labeling with aria-labelledby", function () {
      const {getByRole, getAllByRole} = render(<TimeInput aria-labelledby="foo" />);

      const combobox = getByRole("group");

      expect(combobox).not.toHaveAttribute("aria-label");
      expect(combobox).toHaveAttribute("aria-labelledby", "foo");

      const segments = getAllByRole("spinbutton");

      for (const segment of segments) {
        expect(segment).toHaveAttribute("id");
        const segmentId = segment.getAttribute("id");

        expect(segment).toHaveAttribute("aria-labelledby", `${segmentId} foo`);
      }
    });

    it("should support help text description", function () {
      const {getByRole, getAllByRole} = render(<TimeInput description="Help text" label="Time" />);

      const group = getByRole("group");

      expect(group).toHaveAttribute("aria-describedby");

      const descById = group.getAttribute("aria-describedby");

      const description = descById && document.getElementById(descById);

      expect(description).toHaveTextContent("Help text");

      const segments = getAllByRole("spinbutton");

      expect(segments[0]).toHaveAttribute(
        "aria-describedby",
        group.getAttribute("aria-describedby"),
      );

      for (const segment of segments.slice(1)) {
        expect(segment).not.toHaveAttribute("aria-describedby");
      }
    });

    it("should support error message", function () {
      const {getByRole, getAllByRole} = render(
        <TimeInput errorMessage="Error message" label="Time" validationState="invalid" />,
      );

      const group = getByRole("group");

      expect(group).toHaveAttribute("aria-describedby");

      if (group) {
        const descById = group.getAttribute("aria-describedby");
        const description = descById && document.getElementById(descById);

        expect(description).toHaveTextContent("Error message");

        const segments = getAllByRole("spinbutton");

        for (const segment of segments) {
          expect(segment).toHaveAttribute(
            "aria-describedby",
            group.getAttribute("aria-describedby"),
          );
        }
      }
    });

    it("should support error message (with isInvalid)", function () {
      const {getAllByRole, getByRole} = render(
        <TimeInput isInvalid errorMessage="Error message" label="Time" />,
      );

      const group = getByRole("group");

      expect(group).toHaveAttribute("aria-describedby");

      if (group) {
        const descById = group.getAttribute("aria-describedby");
        const description = descById && document.getElementById(descById);

        expect(description).toHaveTextContent("Error message");

        const segments = getAllByRole("spinbutton");

        for (const segment of segments) {
          expect(segment).toHaveAttribute(
            "aria-describedby",
            group.getAttribute("aria-describedby"),
          );
        }
      }
    });
  });

  describe("Events", function () {
    const onBlurSpy = jest.fn();
    const onFocusChangeSpy = jest.fn();
    const onFocusSpy = jest.fn();
    const onKeyDownSpy = jest.fn();
    const onKeyUpSpy = jest.fn();

    afterEach(() => {
      onBlurSpy.mockClear();
      onFocusChangeSpy.mockClear();
      onFocusSpy.mockClear();
      onKeyDownSpy.mockClear();
      onKeyUpSpy.mockClear();
    });

    it("should focus field and switching segments via tab does not change focus", async function () {
      const {getAllByRole} = render(
        <TimeInput
          label="Time"
          onBlur={onBlurSpy}
          onFocus={onFocusSpy}
          onFocusChange={onFocusChangeSpy}
        />,
      );
      const segments = getAllByRole("spinbutton");

      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).not.toHaveBeenCalled();
      expect(onFocusSpy).not.toHaveBeenCalled();
      await act(async () => {
        await user.tab();
      });
      expect(segments[0]).toHaveFocus();

      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).toHaveBeenCalledTimes(1);
      expect(onFocusSpy).toHaveBeenCalledTimes(1);
      await act(async () => {
        await user.tab();
      });
      expect(segments[1]).toHaveFocus();
      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).toHaveBeenCalledTimes(1);
      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });

    it("should call blur when focus leaves", async function () {
      const {getAllByRole} = render(
        <TimeInput
          label="Time"
          onBlur={onBlurSpy}
          onFocus={onFocusSpy}
          onFocusChange={onFocusChangeSpy}
        />,
      );
      const segments = getAllByRole("spinbutton");

      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).not.toHaveBeenCalled();
      expect(onFocusSpy).not.toHaveBeenCalled();
      await act(async () => {
        await user.tab();
      });
      expect(segments[0]).toHaveFocus();
      await act(async () => {
        await user.tab();
      });
      expect(segments[1]).toHaveFocus();
      await act(async () => {
        await user.tab();
      });
      expect(segments[2]).toHaveFocus();
      expect(onBlurSpy).toHaveBeenCalledTimes(0);
      await act(async () => {
        await user.tab();
      });
      expect(onBlurSpy).toHaveBeenCalledTimes(1);
      expect(onFocusChangeSpy).toHaveBeenCalledTimes(2);
      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });

    it("should trigger right arrow key event for segment navigation", async function () {
      const {getAllByRole} = render(
        <TimeInput label="Time" onKeyDown={onKeyDownSpy} onKeyUp={onKeyUpSpy} />,
      );
      const segments = getAllByRole("spinbutton");

      expect(onKeyDownSpy).not.toHaveBeenCalled();
      expect(onKeyUpSpy).not.toHaveBeenCalled();

      await act(() => {
        user.tab();
      });

      expect(segments[0]).toHaveFocus();
      expect(onKeyDownSpy).not.toHaveBeenCalled();
      expect(onKeyUpSpy).toHaveBeenCalledTimes(1);

      if (document.activeElement) {
        fireEvent.keyDown(document.activeElement, {key: "ArrowRight"});
        fireEvent.keyUp(document.activeElement, {key: "ArrowRight"});
      }
      expect(segments[1]).toHaveFocus();
      expect(onKeyDownSpy).toHaveBeenCalledTimes(1);
      expect(onKeyUpSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe("Forms", () => {
    it("supports form values", () => {
      const {rerender} = render(<TimeInput label="Time" name="time" value={new Time(8, 30)} />);
      const input = document.querySelector("input[name=time]");

      expect(input).toHaveValue("08:30:00");

      rerender(<TimeInput label="Time" name="time" value={new Time(12, 24, 45)} />);
      expect(input).toHaveValue("12:24:45");

      rerender(
        <TimeInput
          label="Time"
          name="time"
          value={new ZonedDateTime(2020, 2, 3, "America/Los_Angeles", -28800000, 12, 24, 45)}
        />,
      );

      expect(input).toHaveValue("12:24:45");
    });

    it("supports form reset", async () => {
      function Test() {
        const [value, setValue] = React.useState<TimeValue>(new Time(8, 30));

        return (
          <form>
            <TimeInput label="Value" name="time" value={value} onChange={setValue} />
            <input data-testid="reset" type="reset" />
          </form>
        );
      }

      const {getByTestId, getByRole, getAllByRole} = render(<Test />);
      const group = getByRole("group");
      const input = document.querySelector("input[name=time]");
      const segments = getAllByRole("spinbutton");

      const getDescription = () =>
        // @ts-ignore
        group
          .getAttribute("aria-describedby")
          .split(" ")
          // @ts-ignore
          .map((d) => document.getElementById(d).textContent)
          .join(" ");

      expect(getDescription()).toBe("Selected Time: 8:30 AM");

      expect(input).toHaveValue("08:30:00");
      expect(input).toHaveAttribute("name", "time");
      fireEvent.keyDown(segments[0], {key: "ArrowUp"});
      fireEvent.keyUp(segments[0], {key: "ArrowUp"});
      expect(getDescription()).toBe("Selected Time: 9:30 AM");
      expect(input).toHaveValue("09:30:00");

      const button = getByTestId("reset");

      triggerPress(button);

      expect(getDescription()).toBe("Selected Time: 8:30 AM");
      expect(input).toHaveValue("08:30:00");
    });
  });

  describe(`Validation (validationBehavior="aria")`, () => {
    it("should display errorMessage when timeValue is less than the minimum (controlled)", () => {
      render(<TimeInput label="Time" minValue={new Time(9)} value={new Time(8)} />);

      expect(document.querySelector("[data-slot=error-message]")).toBeVisible();
    });

    it("should display errorMessage when timeValue is less than the minimum (uncontrolled)", async () => {
      const {getAllByRole} = render(
        <TimeInput defaultValue={new Time(9)} label="Time" minValue={new Time(9)} name="time" />,
      );

      const input = document.querySelector("input[name=time]");
      const segments = getAllByRole("spinbutton");

      await user.tab();
      expect(input).toHaveValue("09:00:00");
      expect(segments[0]).toHaveFocus();
      expect(document.querySelector("[data-slot=error-message]")).toBeNull();

      await user.keyboard("[ArrowDown]");
      expect(input).toHaveValue("08:00:00");
      expect(document.querySelector("[data-slot=error-message]")).toBeVisible();
    });

    it("should display errorMessage when timeValue is greater than the maximum (controlled)", () => {
      render(<TimeInput label="Time" maxValue={new Time(17)} value={new Time(18)} />);

      expect(document.querySelector("[data-slot=error-message]")).toBeVisible();
    });

    it("should display errorMessage when timeValue is greater than the maximum (uncontrolled)", async () => {
      const {getAllByRole} = render(
        <TimeInput defaultValue={new Time(17)} label="Time" maxValue={new Time(17)} name="time" />,
      );

      const input = document.querySelector("input[name=time]");
      const segments = getAllByRole("spinbutton");

      await user.tab();
      expect(input).toHaveValue("17:00:00");
      expect(segments[0]).toHaveFocus();
      expect(document.querySelector("[data-slot=error-message]")).toBeNull();

      await user.keyboard("[ArrowUp]");
      expect(input).toHaveValue("18:00:00");
      expect(document.querySelector("[data-slot=error-message]")).toBeVisible();
    });
  });
});
