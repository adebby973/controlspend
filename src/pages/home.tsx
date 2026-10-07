
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Getuser from "./getuser";

interface Transaction {
    id: number;
    type: "Deposit" | "Withdraw";
    amount: number;
}

export default function Home() {
    const user = Getuser();
    const navigate = useNavigate();

    const [balance, setBalance] = useState<number>(20000);

    const [showDeposit, setShowDeposit] = useState<boolean>(false);
    const [showWithdraw, setShowWithdraw] = useState<boolean>(false);

    const [amount, setAmount] = useState<string>("");

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    // Deposit
    const handleDeposit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const depositAmount = Number(amount);

        if (depositAmount <= 0) {
            return;
        }

        setBalance((previousBalance) => previousBalance + depositAmount);

        setTransactions((previousTransactions) => [
            {
                id: Date.now(),
                type: "Deposit",
                amount: depositAmount,
            },
            ...previousTransactions,
        ]);

        setAmount("");
        setShowDeposit(false);
    };

    // Withdraw
    const handleWithdraw = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const withdrawAmount = Number(amount);

        if (withdrawAmount <= 0 || withdrawAmount > balance) {
            return;
        }

        setBalance((previousBalance) => previousBalance - withdrawAmount);

        setTransactions((previousTransactions) => [
            {
                id: Date.now(),
                type: "Withdraw",
                amount: withdrawAmount,
            },
            ...previousTransactions,
        ]);

        setAmount("");
        setShowWithdraw(false);
    };

    return (
        <main className="min-h-screen bg-[#FFFDF5] px-5 py-6 text-gray-900">

            {/* HEADER */}
            <section className="mb-7 flex items-center justify-between">

                <div>
                    <p className="text-sm text-gray-500">
                        Welcome back 👋
                    </p>

                    <h1 className="text-2xl font-bold">
                        {user?.username || "User"}
                    </h1>
                </div>

                {/* Profile icon */}
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F5C842] font-bold">
                    {user?.username?.charAt(0).toUpperCase() || "U"}
                </div>

            </section>


            {/* BALANCE CARD */}
            <section className="rounded-3xl bg-black p-6 text-white shadow-lg">

                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">
                        Total Balance
                    </p>

                    <span className="text-xl">
                        ₦
                    </span>
                </div>

                <h2 className="mt-3 text-4xl font-bold">
                    ₦{balance.toLocaleString()}
                </h2>

                <p className="mt-2 text-xs text-gray-400">
                    Available balance
                </p>


                {/* MAIN ACTIONS */}
                <div className="mt-7 grid grid-cols-3 gap-3">

                    <button
                        onClick={() => {
                            setShowDeposit(!showDeposit);
                            setShowWithdraw(false);
                        }}
                        className="rounded-2xl bg-[#F5C842] px-3 py-3 text-sm font-semibold text-black transition hover:bg-[#E8B82F]"
                    >
                        + Deposit
                    </button>

                    <button
                        onClick={() => {
                            setShowWithdraw(!showWithdraw);
                            setShowDeposit(false);
                        }}
                        className="rounded-2xl bg-white/10 px-3 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                    >
                        − Withdraw
                    </button>

                    <button
                        onClick={() => navigate("/savings")}
                        className="rounded-2xl bg-white/10 px-3 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                    >
                        Save
                    </button>

                </div>

            </section>


            {/* DEPOSIT FORM */}
            {showDeposit && (
                <form
                    onSubmit={handleDeposit}
                    className="mt-4 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm"
                >

                    <div className="mb-4">
                        <h2 className="font-bold">
                            Deposit money
                        </h2>

                        <p className="text-sm text-gray-500">
                            Enter the amount you want to add.
                        </p>
                    </div>

                    <div className="flex gap-2">

                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="₦ Amount"
                            className="w-full rounded-2xl border border-gray-200 bg-[#FFFDF5] px-4 py-3 outline-none focus:border-[#F5C842]"
                        />

                        <button
                            type="submit"
                            className="rounded-2xl bg-[#F5C842] px-5 font-semibold"
                        >
                            Add
                        </button>

                    </div>

                </form>
            )}


            {/* WITHDRAW FORM */}
            {showWithdraw && (
                <form
                    onSubmit={handleWithdraw}
                    className="mt-4 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm"
                >

                    <div className="mb-4">
                        <h2 className="font-bold">
                            Withdraw money
                        </h2>

                        <p className="text-sm text-gray-500">
                            Enter the amount you want to withdraw.
                        </p>
                    </div>

                    <div className="flex gap-2">

                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="₦ Amount"
                            className="w-full rounded-2xl border border-gray-200 bg-[#FFFDF5] px-4 py-3 outline-none focus:border-[#F5C842]"
                        />

                        <button
                            type="submit"
                            className="rounded-2xl bg-black px-5 font-semibold text-white"
                        >
                            Withdraw
                        </button>

                    </div>

                </form>
            )}


            {/* QUICK ACTIONS */}
            <section className="mt-7">

                <h2 className="mb-4 text-lg font-bold">
                    Quick actions
                </h2>

                <div className="grid grid-cols-4 gap-3">

                    {/* Deposit */}
                    <button
                        onClick={() => {
                            setShowDeposit(true);
                            setShowWithdraw(false);
                        }}
                        className="flex flex-col items-center gap-2 rounded-2xl bg-white p-4 shadow-sm"
                    >
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF3C4] text-xl">
                            ↓
                        </span>

                        <span className="text-xs font-medium">
                            Deposit
                        </span>
                    </button>


                    {/* Withdraw */}
                    <button
                        onClick={() => {
                            setShowWithdraw(true);
                            setShowDeposit(false);
                        }}
                        className="flex flex-col items-center gap-2 rounded-2xl bg-white p-4 shadow-sm"
                    >
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF3C4] text-xl">
                            ↑
                        </span>

                        <span className="text-xs font-medium">
                            Withdraw
                        </span>
                    </button>


                    {/* Savings */}
                    <button
                        onClick={() => navigate("/savings")}
                        className="flex flex-col items-center gap-2 rounded-2xl bg-white p-4 shadow-sm"
                    >
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF3C4] text-xl">
                            $
                        </span>

                        <span className="text-xs font-medium">
                            Savings
                        </span>
                    </button>


                    {/* Expenses */}
                    <button
                        onClick={() => navigate("/expense")}
                        className="flex flex-col items-center gap-2 rounded-2xl bg-white p-4 shadow-sm"
                    >
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF3C4] text-xl">
                            ≡
                        </span>

                        <span className="text-xs font-medium">
                            Expenses
                        </span>
                    </button>

                </div>

            </section>


            {/* TRANSACTIONS */}
            <section className="mt-8">

                <div className="mb-4 flex items-center justify-between">

                    <h2 className="text-lg font-bold">
                        Recent transactions
                    </h2>

                    {transactions.length > 0 && (
                        <span className="text-sm text-gray-400">
                            {transactions.length}
                        </span>
                    )}

                </div>


                {transactions.length === 0 ? (

                    <div className="rounded-3xl bg-white p-7 text-center shadow-sm">

                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF3C4]">
                            ₦
                        </div>

                        <p className="font-medium">
                            No transactions yet
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                            Your deposits and withdrawals will appear here.
                        </p>

                    </div>

                ) : (

                    <div className="space-y-3">

                        {transactions.map((transaction) => (

                            <div
                                key={transaction.id}
                                className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm"
                            >

                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF3C4]">
                                        {transaction.type === "Deposit"
                                            ? "↓"
                                            : "↑"}
                                    </div>

                                    <div>
                                        <p className="font-medium">
                                            {transaction.type}
                                        </p>

                                        <p className="text-xs text-gray-400">
                                            Just now
                                        </p>
                                    </div>

                                </div>


                                <p
                                    className={
                                        transaction.type === "Deposit"
                                            ? "font-semibold text-green-600"
                                            : "font-semibold text-red-500"
                                    }
                                >
                                    {transaction.type === "Deposit"
                                        ? "+"
                                        : "-"}
                                    ₦{transaction.amount.toLocaleString()}
                                </p>

                            </div>

                        ))}

                    </div>

                )}

            </section>

        </main>
    );
}
