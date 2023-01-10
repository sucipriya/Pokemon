import styled from "styled-components/macro";
import Dropdown from "../../components/Select/";

export const MainWrapper = styled.div`
  .pkm-type {
    font-size: 15px;

    font-family: "Trebuchet MS";
    font-weight: bold;
    width: 5em;
    text-align: center;
    display: inline-block;
    border: 0.1em solid transparent;
    padding: 0.1em 0.2em 0.2em;
    margin: 0.1em 0.015em;
    border-radius: 0.4em;
    span {
      text-transform: uppercase;
      font-size: 0.8em;
      color: white;
      text-shadow: 0em 0em 0.2em black;
    }

    &.normal {
      background-color: #a8a878;
      border-top-color: lighten(#a8a878, 15%);
      border-bottom-color: darken(#a8a878, 15%);
    }
    &.fire {
      background-color: #78c850;
      border-top-color: lighten(#78c850, 15%);
      border-bottom-color: darken(#78c850, 15%);
    }
    &.fighting {
      background-color: #c03028;
      border-top-color: lighten(#c03028, 15%);
      border-bottom-color: darken(#c03028, 15%);
    }
    &.water {
      background-color: #6890f0;
      border-top-color: lighten(#6890f0, 15%);
      border-bottom-color: darken(#6890f0, 15%);
    }
    &.poison {
      background-color: #a040a0;
      border-top-color: lighten(#a040a0, 15%);
      border-bottom-color: darken(#a040a0, 15%);
    }
    &.electrik {
      background-color: #f8d030;
      border-top-color: lighten(#f8d030, 15%);
      border-bottom-color: darken(#f8d030, 15%);
    }
    &.ground {
      background-color: #e0c068;
      border-top-color: lighten(#e0c068, 15%);
      border-bottom-color: darken(#e0c068, 15%);
    }
    &.grass {
      background-color: #78c850;
      border-top-color: lighten(#78c850, 15%);
      border-bottom-color: darken(#78c850, 15%);
    }
    &.flying {
      background-color: #a890f0;
      border-top-color: lighten(#a890f0, 15%);
      border-bottom-color: darken(#a890f0, 15%);
    }
    &.ice {
      background-color: #98d8d8;
      border-top-color: lighten(#98d8d8, 15%);
      border-bottom-color: darken(#98d8d8, 15%);
    }
    &.bug {
      background-color: #a8b820;
      border-top-color: lighten(#a8b820, 15%);
      border-bottom-color: darken(#a8b820, 15%);
    }
    &.psychic {
      background-color: #f85888;
      border-top-color: lighten(#f85888, 15%);
      border-bottom-color: darken(#f85888, 15%);
    }
    &.rock {
      background-color: #b8a038;
      border-top-color: lighten(#b8a038, 15%);
      border-bottom-color: darken(#b8a038, 15%);
    }
    &.dragon {
      background-color: #7038f8;
      border-top-color: lighten(#7038f8, 15%);
      border-bottom-color: darken(#7038f8, 15%);
    }
    &.ghost {
      background-color: #705898;
      border-top-color: lighten(#705898, 15%);
      border-bottom-color: darken(#705898, 15%);
    }
    &.dark {
      background-color: #705848;
      border-top-color: lighten(#705848, 15%);
      border-bottom-color: darken(#705848, 15%);
    }
    &.steel {
      background-color: #b8b8d0;
      border-top-color: lighten(#b8b8d0, 15%);
      border-bottom-color: darken(#b8b8d0, 15%);
    }
    &.fairy {
      background-color: #ffb7fa;
      border-top-color: lighten(#ffb7fa, 15%);
      border-bottom-color: darken(#ffb7fa, 15%);
    }
  }
`;

export const TitleOfApp = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: teal;
  font-size: 3.5rem;
  font-family: cursive;
  margin-top: 20px;
`;

export const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  padding: 50px;
  padding-top: 25px;
  position: sticky;
  top: 0px;
  z-index: 999;
  background: #f0f8ffde;
`;

export const StyledDebouceInput = styled.div`
  width: 35%;
  margin-right: 20px;

  input {
    border-radius: 7px;
    height: 38px;
    padding-left: 7px;
    height: 35px;
    width: 100%;
    border: 1px solid teal;
    color: teal;
    /* margin-right: 20px; */
  }

  input:hover {
    border: 1px solid teal;
  }
  input:focus {
    border: 1px solid teal;
  }
  input:active {
    border: 1px solid teal;
  }
  input:visited {
    border: 1px solid teal;
  }
  /* input::focus-visible: {
    border: 1px solid teal;
  } */
  input:focus-visible {
    outline: 1px solid teal;
    border-radius: 3px;
  }
`;

// export const StyledDropdown = styled(Dropdown)`
//   div[class*="-ValueContainer"] {
//     width: 150px;
//   }
// `;

export const NoPokemon = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

export const StyledDropdown = styled(Dropdown)`
  div[class*="-control"] {
    width: 450px;
    margin-bottom: 10px;
  }
  div[class*="-menu"] {
    width: 450px;
  }
  border-radius: 5px;

  div[class*="-ValueContainer"] {
    min-height: 15px;
    max-height: 90px;
    overflow: auto;
  }
`;
