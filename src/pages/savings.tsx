
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import Chart from "chart.js/auto";
import Getuser from "./getuser";

interface Savings {
    namePlan: string;
    target: number;
    dailySave: number;
    saved: number;
}

class SavePlan implements Savings {
    namePlan: string;
    target: number;
    dailySave: number;
    saved: number;

    constructor(
        namePlan: string,
        target: number,
        dailySave: number,
        saved: number = 0
    ) {
        this.namePlan = namePlan;
        this.target = target;
        this.dailySave = dailySave;
        this.saved = saved;
    }
}

export default function Savings() {
    const user = Getuser();

    const [showSave, setShowSave] = useState(false);
    const [plan, setPlan] = useState<SavePlan | null>(null);

    const [showDeposit, setShowDeposit] = useState(false);
    const [showWithdraw, setShowWithdraw] = useState(false);

    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);

    // Create Savings Plan
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const namePlan = formData.get("namePlan") as string;
        const target = Number(formData.get("target"));
        const dailySave = Number(formData.get("dailySave"));

        const newPlan = new SavePlan(
            namePlan,
            target,
            dailySave
        );

        setPlan(newPlan);
        setShowSave(false);

        event.currentTarget.reset();
    }

    // Deposit
    function handleDeposit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const amount = Number(formData.get("amount"));

        if (!plan || amount <= 0) return;

        const newSaved = Math.min(
            plan.saved + amount,
            plan.target
        );

        const updatedPlan = new SavePlan(
            plan.namePlan,
            plan.target,
            plan.dailySave,
            newSaved
        );

        setPlan(updatedPlan);
        setShowDeposit(false);

        event.currentTarget.reset();
    }

    // Withdraw
    function handleWithdraw(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const amount = Number(formData.get("amount"));

        if (!plan || amount <= 0) return;

        const newSaved = Math.max(
            plan.saved - amount,
            0
        );

        const updatedPlan = new SavePlan(
            plan.namePlan,
            plan.target,
            plan.dailySave,
            newSaved
        );

        setPlan(updatedPlan);
        setShowWithdraw(false);

        event.currentTarget.reset();
    }

    // Circular progress chart
    useEffect(() => {
        if (!plan || !chartRef.current) return;

        const percentage = Math.min(
            (plan.saved / plan.target) * 100,
            100
        );

        const remaining = Math.max(
            plan.target - plan.saved,
            0
        );

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const context = chartRef.current.getContext("2d");

        if (!context) return;

        chartInstance.current = new Chart(context, {
            type: "doughnut",

            data: {
                labels: ["Saved", "Remaining"],

                datasets: [
                    {
                        data: [plan.saved, remaining],

                        backgroundColor: [
                            "#F5C842",
                            "rgba(255,255,255,0.10)"
                        ],

                        borderWidth: 0,
                        hoverOffset: 0
                    }
                ]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,

                cutout: "75%",

                plugins: {
                    legend: {
                        display: false
                    },

                    tooltip: {
                        enabled: false
                    }
                }
            }
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, [plan]);

    return (
        <main className="min-h-screen bg-[#FFFDF5] px-4 py-5 sm:px-6 sm:py-8 lg:px-10">

            {/* Main responsive container */}
            <div className="mx-auto w-full max-w-6xl">

                {/* Welcome */}
                <section className="mb-6 sm:mb-8">
                    <p className="text-sm text-gray-500 sm:text-base">
                        Welcome back 👋
                    </p>

                    <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                        {user?.username || "User"}
                    </h1>
                </section>


                {/* Header */}
                <section className="mb-6 sm:mb-8">
                    <h2 className="text-3xl font-bold sm:text-4xl">
                        Savings
                    </h2>

                    <p className="mt-2 max-w-xl text-sm text-gray-500 sm:text-base">
                        Create a plan and work towards your savings goal.
                    </p>
                </section>


                {/* Create plan area */}
                <div className="mx-auto max-w-3xl">

                    <button
                        onClick={() => setShowSave(!showSave)}
                        className="w-full rounded-2xl bg-[#F5C842] px-5 py-4 text-sm font-semibold text-black shadow-sm transition hover:brightness-95 sm:text-base"
                    >
                        {showSave
                            ? "Cancel"
                            : "+ Create Savings Plan"}
                    </button>


                    {/* Create plan form */}
                    {showSave && (
                        <form
                            onSubmit={handleSubmit}
                            className="mt-5 rounded-3xl bg-white p-5 shadow-sm sm:p-7"
                        >
                            <h3 className="mb-5 text-lg font-bold sm:text-xl">
                                Create your plan
                            </h3>


                            {/* Plan name */}
                            <div className="mb-4">
                                <label
                                    htmlFor="namePlan"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Savings Plan
                                </label>

                                <input
                                    type="text"
                                    id="namePlan"
                                    name="namePlan"
                                    placeholder="e.g. New Phone"
                                    required
                                    className="w-full rounded-2xl border border-gray-200 bg-[#FFFDF5] px-4 py-3 text-sm outline-none focus:border-[#F5C842] sm:text-base"
                                />
                            </div>


                            {/* Target */}
                            <div className="mb-4">
                                <label
                                    htmlFor="target"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Target Amount
                                </label>

                                <input
                                    type="number"
                                    id="target"
                                    name="target"
                                    placeholder="₦1,000,000"
                                    min="1"
                                    required
                                    className="w-full rounded-2xl border border-gray-200 bg-[#FFFDF5] px-4 py-3 text-sm outline-none focus:border-[#F5C842] sm:text-base"
                                />
                            </div>


                            {/* Daily saving */}
                            <div className="mb-5">
                                <label
                                    htmlFor="dailySave"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Daily Savings
                                </label>

                                <input
                                    type="number"
                                    id="dailySave"
                                    name="dailySave"
                                    placeholder="₦500"
                                    min="1"
                                    required
                                    className="w-full rounded-2xl border border-gray-200 bg-[#FFFDF5] px-4 py-3 text-sm outline-none focus:border-[#F5C842] sm:text-base"
                                />
                            </div>


                            <button
                                type="submit"
                                className="w-full rounded-2xl bg-black py-3 text-sm font-semibold text-white transition hover:bg-gray-800 sm:text-base"
                            >
                                Save Plan
                            </button>
                        </form>
                    )}

                </div>


                {/* Saved plan */}
                {plan && (
                    <section className="mx-auto mt-7 max-w-4xl rounded-3xl bg-black p-5 text-white shadow-lg sm:mt-10 sm:p-7 lg:p-8">

                        {/* Plan heading */}
                        <div className="flex items-start justify-between gap-4">

                            <div className="min-w-0">
                                <p className="text-sm text-gray-400">
                                    Savings Plan
                                </p>

                                <h2 className="mt-1 break-words text-2xl font-bold sm:text-3xl">
                                    {plan.namePlan}
                                </h2>
                            </div>

                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F5C842] text-lg font-bold text-black sm:h-12 sm:w-12">
                                ₦
                            </span>

                        </div>


                        {/* Target + Daily savings */}
                        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

                            <div className="rounded-2xl bg-white/5 p-4">
                                <p className="text-sm text-gray-400">
                                    Target
                                </p>

                                <p className="mt-1 break-words text-xl font-bold sm:text-2xl">
                                    ₦{plan.target.toLocaleString()}
                                </p>
                            </div>


                            <div className="rounded-2xl bg-white/5 p-4">
                                <p className="text-sm text-gray-400">
                                    Daily savings
                                </p>

                                <p className="mt-1 text-lg font-semibold sm:text-xl">
                                    ₦{plan.dailySave.toLocaleString()}
                                </p>
                            </div>

                        </div>


                        {/* Circular Progress */}
                        <div className="mt-8 flex justify-center">

                            <div className="relative h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64">

                                <canvas ref={chartRef}></canvas>

                                <div className="absolute inset-0 flex flex-col items-center justify-center">

                                    <p className="text-3xl font-bold sm:text-4xl md:text-5xl">

                                        {Math.round(
                                            Math.min(
                                                (plan.saved / plan.target) * 100,
                                                100
                                            )
                                        )}
                                        %

                                    </p>

                                    <p className="text-xs text-gray-400 sm:text-sm">
                                        saved
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* Saved amount */}
                        <div className="mt-5 text-center">

                            <p className="text-sm text-gray-400">
                                Amount saved
                            </p>

                            <p className="mt-1 text-2xl font-bold sm:text-3xl">
                                ₦{plan.saved.toLocaleString()}
                            </p>

                        </div>


                        {/* Deposit and Withdraw */}
                        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">

                            <button
                                onClick={() => {
                                    setShowDeposit(!showDeposit);
                                    setShowWithdraw(false);
                                }}
                                className="rounded-2xl bg-[#F5C842] py-3 text-sm font-semibold text-black transition hover:brightness-95 sm:text-base"
                            >
                                {showDeposit
                                    ? "Cancel"
                                    : "Deposit"}
                            </button>


                            <button
                                onClick={() => {
                                    setShowWithdraw(!showWithdraw);
                                    setShowDeposit(false);
                                }}
                                className="rounded-2xl bg-white/10 py-3 text-sm font-semibold text-white transition hover:bg-white/20 sm:text-base"
                            >
                                {showWithdraw
                                    ? "Cancel"
                                    : "Withdraw"}
                            </button>

                        </div>


                        {/* Deposit form */}
                        {showDeposit && (
                            <form
                                onSubmit={handleDeposit}
                                className="mt-4 rounded-2xl bg-white p-4 text-black sm:p-5"
                            >

                                <label
                                    htmlFor="depositAmount"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Deposit Amount
                                </label>

                                <input
                                    type="number"
                                    id="depositAmount"
                                    name="amount"
                                    placeholder="₦100,000"
                                    min="1"
                                    required
                                    className="w-full rounded-2xl border border-gray-200 bg-[#FFFDF5] px-4 py-3 text-sm outline-none focus:border-[#F5C842] sm:text-base"
                                />

                                <button
                                    type="submit"
                                    className="mt-3 w-full rounded-2xl bg-black py-3 text-sm font-semibold text-white sm:text-base"
                                >
                                    Add to Savings
                                </button>

                            </form>
                        )}


                        {/* Withdraw form */}
                        {showWithdraw && (
                            <form
                                onSubmit={handleWithdraw}
                                className="mt-4 rounded-2xl bg-white p-4 text-black sm:p-5"
                            >

                                <label
                                    htmlFor="withdrawAmount"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Withdraw Amount
                                </label>

                                <input
                                    type="number"
                                    id="withdrawAmount"
                                    name="amount"
                                    placeholder="₦10,000"
                                    min="1"
                                    required
                                    className="w-full rounded-2xl border border-gray-200 bg-[#FFFDF5] px-4 py-3 text-sm outline-none focus:border-[#F5C842] sm:text-base"
                                />

                                <button
                                    type="submit"
                                    className="mt-3 w-full rounded-2xl bg-black py-3 text-sm font-semibold text-white sm:text-base"
                                >
                                    Withdraw from Savings
                                </button>

                            </form>
                        )}

                    </section>
                )}

            </div>

        </main>
    );
}

