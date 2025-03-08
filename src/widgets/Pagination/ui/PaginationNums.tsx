"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/shared/lib/css";

import { getPageNumbers } from "../lib/getPageNumbers";

type PaginationNumsProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const PaginationNums = ({
  currentPage,
  onPageChange,
  totalPages,
}: PaginationNumsProps) => {
  //Массив, который отображаем в зависимости от кол-ва страниц
  const pageNumbers = getPageNumbers(totalPages, currentPage);

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={cn(
          "p-1 cursor-pointer rounded-md  disabled:opacity-50 transition-colors duration-300 ease-out",
          currentPage === 1 ? "cursor-no-drop" : "hover:bg-foreground",
        )}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pageNumbers.map((page, index) => {
        if (page === "ellipsis-start" || page === "ellipsis-end") {
          return (
            <span key={`ellipsis-${index}`} className="px-2">
              <MoreHorizontal className="h-4 w-4" />
            </span>
          );
        }

        return (
          <button
            key={index}
            onClick={() => onPageChange(Number(page))}
            className={cn(
              "min-w-[28px] h-7 px-2 rounded-md cursor-pointer font-bold transition-colors duration-300 ease-out",
              currentPage === page
                ? "bg-primary-foreground text-background"
                : "hover:bg-foreground",
            )}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={cn(
          "p-1 cursor-pointer rounded-md  disabled:opacity-50 transition-colors duration-300 ease-out",
          currentPage === totalPages ? "cursor-no-drop" : "hover:bg-foreground",
        )}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};
