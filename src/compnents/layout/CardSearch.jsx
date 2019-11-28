import React from "react";
import { ReactComponent as SearchIcon } from "../../Icons/search.svg";
import { Input, InputGroup, InputGroupAddon, InputGroupText, Form } from "reactstrap";
const CardSearch = ({ title = "", onSearchResult }) => {
  return (
    <Form onSubmit={(e)=>{e.preventDefault()}}>
      <InputGroup className="table_card_search ">
        <InputGroupAddon
          addonType="prepend"
          className="d-flex align-items-center"
        >
          <InputGroupText>
            <SearchIcon />
          </InputGroupText>
        </InputGroupAddon>
        <Input type="text" placeholder={"Search " + title} onChange={onSearchResult}/>
      </InputGroup>
    </Form>
  );
};

export default CardSearch;
