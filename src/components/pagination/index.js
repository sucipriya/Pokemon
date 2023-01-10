import React from "react";
// import { Button } from "reactstrap";
import styled from "styled-components";

const PageButton = styled.button`
  cursor: pointer;
  background-color: teal;
  border: none;
  color: #fff ;
  padding: 5px 20px;
  border-radius: 5px;
  margin-right: 5px;
`;

const Pages = ({ pokemonData, setOffset }) => {
  return (
    <div className="page_nav">
      <PageButton color="primary" onClick={() => setOffset("")}>
        {`<< First`}
      </PageButton>{" "}
      <PageButton
        color="primary"
        onClick={() =>
          pokemonData.previous
            ? setOffset(
                pokemonData.previous.slice(pokemonData.previous.indexOf("?"))
              )
            : null
        }
      >
        {`< Prev`}
      </PageButton>{" "}
      <PageButton
        color="primary"
        onClick={() =>
          pokemonData.next
            ? setOffset(pokemonData.next.slice(pokemonData.next.indexOf("?")))
            : null
        }
      >
        {`Next >`}
      </PageButton>{" "}
      <PageButton
        color="primary"
        onClick={() => setOffset(`?offset=${pokemonData.count - 20}&limit=20`)}
      >
        {`Last >>`}
      </PageButton>
    </div>
  );
};

export default Pages;
