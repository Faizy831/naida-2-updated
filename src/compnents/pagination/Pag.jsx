import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

class PaginationRe extends React.PureComponent {
  


  render() {
    const {currentPage,pagesCount,handleClick}=this.props;

    return (
    
      <React.Fragment>
    
        <div className="pagination-wrapper">
          
          <Pagination aria-label="Page navigation example">
            
            <PaginationItem disabled={currentPage <= 0}>
            
              <PaginationLink
                onClick={e => handleClick(e, currentPage - 1)}
                previous
                href="#"
              />
              
            </PaginationItem>

            {[...Array(pagesCount)].map((page, i) => 
              <PaginationItem active={i === currentPage} key={i}>
                <PaginationLink onClick={e => handleClick(e, i)} href="#">
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem disabled={currentPage >= pagesCount - 1}>
              
              <PaginationLink
                onClick={e => handleClick(e, currentPage + 1)}
                next
                href="#"
              />
              
            </PaginationItem>
            
          </Pagination>
          
        </div>

         

      </React.Fragment>
    
    );
  
  }
  
}


export default PaginationRe;