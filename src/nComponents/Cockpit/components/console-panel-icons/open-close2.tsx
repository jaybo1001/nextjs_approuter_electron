import React from "react";
import styled from "styled-components";

const Switch = () => {
  return (
    <StyledWrapper>
      <>
        <input type="checkbox" id="checkbox" />
        <label htmlFor="checkbox" className="toggle">
          <div className="bars" id="bar1" />
          <div className="bars" id="bar2" />
          <div className="bars" id="bar3" />
        </label>
      </>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  #checkbox {
  display: none;
}

.toggle {
  position: relative;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition-duration: 0.3s;
}

.bars {
  width: 100%;
  height: 4px;
  background-color: rgb(253, 255, 243);
  border-radius: 5px;
  transition-duration: 0.3s;
}

/* #checkbox:checked + .toggle .bars {
  margin-left: 13px;
} */

#checkbox:checked + .toggle #bar2 {
  transform: translateY(14px) rotate(60deg);
  margin-left: 0;
  transform-origin: right;
  transition-duration: 0.3s;
  z-index: 2;
}

#checkbox:checked + .toggle #bar1 {
  transform: translateY(28px) rotate(-60deg);
  transition-duration: 0.3s;
  transform-origin: left;
  z-index: 1;
}

#checkbox:checked + .toggle {
  transform: rotate(90deg);
}
/* #checkbox:checked + .toggle #bar3 {
  transform: rotate(90deg);
  transition-duration: .3s;
  transform-origin:right;
} */

`;

export default Switch;
