
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface JobPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const JobPagination: React.FC<JobPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      
      // Scroll to top of job listings
      const jobListingsElement = document.getElementById('job-listings');
      if (jobListingsElement) {
        jobListingsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    // Always include first page
    pageNumbers.push(1);
    
    // Add current page and neighbors
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (!pageNumbers.includes(i)) {
        pageNumbers.push(i);
      }
    }
    
    // Always include last page if there are more than one page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }
    
    // Sort page numbers
    return pageNumbers.sort((a, b) => a - b);
  };
  
  if (totalPages <= 1) return null;
  
  const pageNumbers = getPageNumbers();
  
  return (
    <nav aria-label="Job listings pagination" className="my-8">
      <Pagination>
        <PaginationContent className="flex-wrap justify-center gap-2">
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => handlePageChange(currentPage - 1)}
              className={`transition-all duration-300 ${currentPage === 1 ? "opacity-50 pointer-events-none" : "hover:scale-105 hover:shadow-sm hover:bg-devhope-blue/10"}`}
              aria-disabled={currentPage === 1}
              aria-label="Go to previous page"
            />
          </PaginationItem>
          
          {pageNumbers.map((page, index) => {
            // Check if we need an ellipsis
            if (index > 0 && page - pageNumbers[index - 1] > 1) {
              return (
                <React.Fragment key={`ellipsis-${index}`}>
                  <PaginationItem>
                    <PaginationEllipsis aria-hidden="true" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink 
                      isActive={currentPage === page}
                      onClick={() => handlePageChange(page)}
                      className={currentPage === page 
                        ? "bg-devhope-blue text-white hover:bg-devhope-blue/90 focus:ring-2 focus:ring-devhope-blue/50 focus:outline-none" 
                        : "hover:bg-devhope-blue/10 transition-colors duration-300 hover:scale-105 focus:ring-2 focus:ring-devhope-blue/30 focus:outline-none"}
                      aria-label={`Page ${page}`}
                      aria-current={currentPage === page ? "page" : undefined}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                </React.Fragment>
              );
            }
            
            return (
              <PaginationItem key={page}>
                <PaginationLink 
                  isActive={currentPage === page}
                  onClick={() => handlePageChange(page)}
                  className={currentPage === page 
                    ? "bg-devhope-blue text-white hover:bg-devhope-blue/90 focus:ring-2 focus:ring-devhope-blue/50 focus:outline-none" 
                    : "hover:bg-devhope-blue/10 transition-colors duration-300 hover:scale-105 focus:ring-2 focus:ring-devhope-blue/30 focus:outline-none"}
                  aria-label={`Page ${page}`}
                  aria-current={currentPage === page ? "page" : undefined}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => handlePageChange(currentPage + 1)}
              className={`transition-all duration-300 ${currentPage === totalPages ? "opacity-50 pointer-events-none" : "hover:scale-105 hover:shadow-sm hover:bg-devhope-blue/10"}`}
              aria-disabled={currentPage === totalPages}
              aria-label="Go to next page"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <div className="text-center mt-2 text-sm text-devhope-blue/60">
        Page {currentPage} of {totalPages}
      </div>
    </nav>
  );
};

export default JobPagination;
