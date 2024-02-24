"use client";

import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IoChevronForwardOutline } from "react-icons/io5";
import { IoChevronBackOutline } from "react-icons/io5";

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPrevPage,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "5";

  return (
    <div className="flex gap-2 items-center mt-4 pb-20">
      <button
        className="bg-orange-500 text-white p-1 rounded-lg"
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(
            `/dashboard?page=${Number(page) - 1}&per_page=${per_page}`, {scroll: false}
          );
        }}
      >
       <IoChevronBackOutline />
      </button>

      <div>
        {page} / {Math.ceil(10 / Number(per_page))}
      </div>

      <button
        className="bg-orange-500 text-white p-1 rounded-lg"
        disabled={!hasNextPage}
        onClick={() => {
          router.push(
            `/dashboard?page=${Number(page) + 1}&per_page=${per_page}`, {scroll: false}
          );
        }}
      >
      <IoChevronForwardOutline />
      </button>
    </div>
  );
};

export default PaginationControls;
