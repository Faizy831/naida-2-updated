import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { ReactComponent as RightArrow } from "../../Icons/right.svg";
import { ReactComponent as LeftArrow } from "../../Icons/left.svg";

const CardPagination = () => {
  return (
    <Pagination>
      <PaginationItem disabled>
        <PaginationLink href="#">
          <LeftArrow />
        </PaginationLink>
      </PaginationItem>
      <PaginationItem active>
        <PaginationLink href="#">1</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">2</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">3</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">4</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">5</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink next href="#">
          <RightArrow />
        </PaginationLink>
      </PaginationItem>
    </Pagination>
  );
};

export default CardPagination;
