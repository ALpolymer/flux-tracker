import type { FilterState, Wallet, Category } from "../types";

interface FilterBarProps {
    filters: FilterState;
    setNewFilters: (filters: FilterState) => void;
    wallets: Wallet[];
    categories: Category[];
    onReset: () => void;
}

const FilterBar = ({ filters, wallets, setNewFilters, categories, onReset }: FilterBarProps) => {

    const labelStyles = "block text-xs font-medium text-gray-600 mb-1";
    const selectStyles = "w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer";
    const inputStyles = "w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent";

    return (
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex flex-wrap items-end gap-4">

                {/* TYPE FILTER */}
                <div className="min-w-[140px]">
                    <label htmlFor="type" className={labelStyles}>Type</label>
                    <select
                        id="type"
                        className={selectStyles}
                        value={filters.type}
                        onChange={e => setNewFilters({
                            ...filters,
                            type: e.target.value as FilterState["type"],
                        })}
                    >
                        <option value="ALL">All types</option>
                        <option value="INCOME">Income</option>
                        <option value="EXPENSE">Expense</option>
                    </select>
                </div>

                {/* WALLET FILTER */}
                <div className="min-w-[160px]">
                    <label htmlFor="walletId" className={labelStyles}>Wallet</label>
                    <select
                        id="walletId"
                        className={selectStyles}
                        value={filters.walletId ?? ""}
                        onChange={e => setNewFilters({
                            ...filters,
                            walletId: e.target.value === "" ? null : e.target.value,
                        })}
                    >
                        <option value="">All wallets</option>
                        {wallets.map(wallet => (
                            <option key={wallet.id} value={wallet.id}>
                                {wallet.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* CATEGORY FILTER */}
                <div className="min-w-[160px]">
                    <label htmlFor="categoryId" className={labelStyles}>Category</label>
                    <select
                        id="categoryId"
                        className={selectStyles}
                        value={filters.categoryId ?? ""}
                        onChange={e => setNewFilters({
                            ...filters,
                            categoryId: e.target.value === "" ? null : e.target.value,
                        })}
                    >
                        <option value="">All categories</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* DATE FROM FILTER */}
                <div className="min-w-[150px]">
                    <label htmlFor="dateFrom" className={labelStyles}>From</label>
                    <input
                        type="date"
                        id="dateFrom"
                        className={inputStyles}
                        value={filters.dateFrom ?? ""}
                        onChange={e => setNewFilters({
                            ...filters,
                            dateFrom: e.target.value === "" ? null : e.target.value,
                        })}
                    />
                </div>

                {/* DATE TO FILTER */}
                <div className="min-w-[150px]">
                    <label htmlFor="dateTo" className={labelStyles}>To</label>
                    <input
                        type="date"
                        id="dateTo"
                        className={inputStyles}
                        value={filters.dateTo ?? ""}
                        onChange={e => setNewFilters({
                            ...filters,
                            dateTo: e.target.value === "" ? null : e.target.value,
                        })}
                    />
                </div>



                {/*SORT BY*/}
                <div className="min-w-[160px]">
                    <label htmlFor="sortBy" className={labelStyles}>SortBy</label>
                    <select
                        id="sortBy"
                        className={selectStyles}
                        value={filters.sortBy}
                        onChange={e => setNewFilters({
                            ...filters,
                            sortBy: e.target.value as FilterState["sortBy"],
                        })}
                    >
                        <option value="">None</option>
                        <option value="AMOUNT_ASC">Amount ascending</option>
                        <option value="AMOUNT_DESC">Amount descending</option>
                        <option value="DATE_ASC">Date ascending</option>
                        <option value="DATE_DESC">Date descending</option>

                    </select>
                </div>

                {/* RESET BUTTON */}
                <button
                    onClick={onReset}
                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default FilterBar;