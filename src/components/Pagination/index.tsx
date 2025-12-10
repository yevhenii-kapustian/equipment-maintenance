import { ChevronLeft, ChevronRight } from "lucide-react"

type PaginationProps = {
    currentPage: number,
    totalPages: number,
    onPageChange: (page: number) => void
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    const VISIBLE_PAGES = 3

    const getVisiblePages = () => {
        if (totalPages <= VISIBLE_PAGES) {
            return Array.from({ length: totalPages }, (_, i) => i + 1)
        }
        let start = currentPage - Math.floor(VISIBLE_PAGES / 2)
        start = Math.max(1, Math.min(start, totalPages - VISIBLE_PAGES + 1))
        return Array.from({ length: VISIBLE_PAGES }, (_, i) => start + i)
    }

    const visiblePages = getVisiblePages()
    const showLeftDots = visiblePages[0] > 1
    const showRightDots = visiblePages[visiblePages.length - 1] < totalPages

    return (
        <div className="mt-10 flex justify-center gap-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 bg-[#00000011] rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-default hover:bg-[#00000022] transition-colors disabled:hover:bg-[#00000011]"
            >
                <ChevronLeft size={20} />
            </button>

            {showLeftDots && (
                <>
                    <button
                        onClick={() => onPageChange(1)}
                        className="px-3 py-2 rounded-lg opacity-50 hover:opacity-75 transition-opacity cursor-pointer"
                    >
                        1
                    </button>
                    <span className="px-2 py-2 opacity-50">...</span>
                </>
            )}

            {visiblePages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-2 rounded-lg transition-all cursor-pointer ${
                        currentPage === page
                            ? "font-semibold opacity-100 bg-(--color-army-green) text-white"
                            : "opacity-50 hover:opacity-75"
                    }`}
                >
                    {page}
                </button>
            ))}

            {showRightDots && (
                <>
                    <span className="px-2 py-2 opacity-50">...</span>
                    <button
                        onClick={() => onPageChange(totalPages)}
                        className="px-3 py-2 rounded-lg opacity-50 hover:opacity-75 transition-opacity cursor-pointer"
                    >
                        {totalPages}
                    </button>
                </>
            )}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 bg-[#00000011] rounded-xl cursor-pointer hover:bg-[#00000022] transition-colors disabled:opacity-50 disabled:cursor-default disabled:hover:bg-[#00000011]"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    )
}

export default Pagination