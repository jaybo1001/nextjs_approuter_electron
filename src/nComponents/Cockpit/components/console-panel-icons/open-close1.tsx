import React from "react";
import styled from "styled-components";

const Switch = () => {
  return (
    <StyledWrapper>
      <>
        <input id="checkbox2" type="checkbox" />
        <label className="toggle toggle2" htmlFor="checkbox2">
          <div id="bar4" className="bars" />
          <div id="bar5" className="bars" />
          <div id="bar6" className="bars" />
        </label>
      </>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  #checkbox2 {
  display: none;
}

.toggle2 {
  position: relative;
  width: 60px;
  height: 60px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition-duration: .5s;
}

.bars {
  width: 100%;
  height: 6px;
  background-color: rgb(92, 176, 255);
  border-radius: 6px;
}

#bar5 {
  transition-duration: .8s;
}

#bar4,#bar6 {
  width: 80%;
}

#checkbox2:checked + .toggle2 .bars {
  position: absolute;
  transition-duration: .5s;
}

#checkbox2:checked + .toggle2 #bar5 {
  transform: scaleX(0);
  transition-duration: .5s;
}

#checkbox2:checked + .toggle2 #bar4 {
  width: 100%;
  transform: rotate(45deg);
  transition-duration: .5s;
}

#checkbox2:checked + .toggle2 #bar6 {
  width: 100%;
  transform: rotate(-45deg);
  transition-duration: .5s;
}

#checkbox2:checked + .toggle2 {
  transition-duration: .5s;
  transform: rotate(180deg);
}
`;

export default Switch;
