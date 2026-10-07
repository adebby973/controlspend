
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Getuser from "./getuser";

interface ExpenseData {
  expense: number;
  rent: number;
  food: number;
  health: number;
  insurance: number;
  outing: number;
  miscellaneous: number;
}

class Tracker implements ExpenseData {
  expense: number;
  rent: number;
  food: number;
  health: number;
  insurance: number;
  outing: number;
  miscellaneous: number;

  constructor(
    expense: number,
    rent: number,
    food: number,
    health: number,
    insurance: number,
    outing: number,
    miscellaneous: number,
  ) {
    this.expense = expense;
    this.rent = rent;
    this.food = food;
    this.health = health;
    this.insurance = insurance;
    this.outing = outing;
    this.miscellaneous = miscellaneous;
  }
}

export default function Expense() {
  const [expenseData, setExpenseData] = useState<ExpenseData | null>(null);

  const user = Getuser();

  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  // Get previously saved data
  useEffect(() => {
    const savedData = localStorage.getItem("expenseData");

    if (savedData) {
      setExpenseData(JSON.parse(savedData));
    }
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    const expense = Number(
      (form.elements.namedItem("income") as HTMLInputElement).value,
    );

    const rent = Number(
      (form.elements.namedItem("rent") as HTMLInputElement).value,
    );

    const food = Number(
      (form.elements.namedItem("food") as HTMLInputElement).value,
    );

    const health = Number(
      (form.elements.namedItem("health") as HTMLInputElement).value,
    );

    const insurance = Number(
      (form.elements.namedItem("insurance") as HTMLInputElement).value,
    );

    const outing = Number(
      (form.elements.namedItem("outing") as HTMLInputElement).value,
    );

    const miscellaneous = Number(
      (form.elements.namedItem("miscellaneous") as HTMLInputElement).value,
    );

    const expentrac = new Tracker(
      expense,
      rent,
      food,
      health,
      insurance,
      outing,
      miscellaneous,
    );

    localStorage.setItem(
      "expenseData",
      JSON.stringify(expentrac),
    );

    setExpenseData(expentrac);
  }

  // Calculate balance
  const balance = expenseData
    ? expenseData.expense -
      (expenseData.rent +
        expenseData.food +
        expenseData.health +
        expenseData.insurance +
        expenseData.outing +
        expenseData.miscellaneous)
    : 0;

  // Create chart
  useEffect(() => {
    if (!expenseData || !chartRef.current) {
      return;
    }

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartRef.current, {
      type: "pie",

      data: {
        labels: [
          "Rent",
          "Food",
          "Health",
          "Insurance",
          "Outing",
          "Miscellaneous",
          "Balance",
        ],

        datasets: [
          {
            data: [
              expenseData.rent,
              expenseData.food,
              expenseData.health,
              expenseData.insurance,
              expenseData.outing,
              expenseData.miscellaneous,
              balance,
            ],
          },
        ],
      },

      plugins: [ChartDataLabels],

      options: {
        responsive: true,
        maintainAspectRatio: true,

        plugins: {
          legend: {
            position: "bottom",

            labels: {
              padding: 15,
              boxWidth: 12,
              font: {
                size: 12,
              },
            },
          },

          datalabels: {
            formatter: (value, context) => {
              const values = context.chart.data.datasets[0]
                .data as number[];

              const total = values.reduce(
                (sum, value) => sum + Number(value),
                0,
              );

              if (total === 0) {
                return "0%";
              }

              const percentage = (Number(value) / total) * 100;

              return percentage.toFixed(1) + "%";
            },

            font: {
              size: 11,
              weight: "bold",
            },
          },
        },
      },
    });

    return () => {
      chartInstance.current?.destroy();
    };
  }, [expenseData, balance]);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12">

      {/* PAGE INTRO */}
      <div className="mb-7 sm:mb-9">

        <p className="roboto-serif text-xs font-medium tracking-wide text-amber-400 sm:text-sm">
          EXPENSE TRACKER
        </p>

        <p className="lora mt-2 text-base font-semibold text-neutral-600 sm:text-lg">
          Welcome, {user?.name || "User"}
        </p>

        <h1 className="lora mt-1 text-2xl font-bold text-neutral-800 sm:text-3xl md:text-4xl">
          Manage Your Expenses
        </h1>

        <p className="roboto-serif mt-2 max-w-xl text-sm leading-6 text-neutral-500 sm:text-base">
          Organize your income, expenses, and remaining balance.
        </p>

      </div>


      {/* WELCOME CARD */}
      <div className="mb-7 overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-md sm:mb-9">

        <div className="flex flex-col items-center justify-between gap-6 p-5 sm:p-7 md:flex-row md:p-8">

          <div className="max-w-2xl text-center md:text-left">

            <h2 className="lora text-xl font-bold text-neutral-800 sm:text-2xl md:text-3xl">
              Spend wisely. Save intentionally.
            </h2>

            <p className="roboto-serif mt-3 text-sm leading-6 text-neutral-600 sm:text-base">
              Welcome to Control Spend, where you can organize your income,
              track your expenses, and see how much money you have left.
            </p>

            <p className="roboto-serif mt-2 text-sm text-neutral-500">
              Say no to impulsive buying and start saving!
            </p>

          </div>


          <img
            src="/save.svg"
            alt="Saving money illustration"
            className="w-24 shrink-0 sm:w-32 md:w-36"
          />

        </div>

      </div>


      {/* FORM */}
      <div className="rounded-3xl border border-amber-100 bg-white p-5 shadow-md sm:p-7 md:p-8">

        <div className="mb-6">

          <h2 className="lora text-xl font-bold text-neutral-800 sm:text-2xl">
            Enter your information
          </h2>

          <p className="roboto-serif mt-2 text-sm text-neutral-500 sm:text-base">
            Enter your income and planned spending.
          </p>

        </div>


        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2"
        >

          {/* INCOME */}
          <div>
            <label
              htmlFor="income"
              className="roboto-serif mb-2 block text-sm font-medium text-neutral-700"
            >
              Income
            </label>

            <input
              type="number"
              id="income"
              name="income"
              placeholder="50000"
              min="0"
              required
              className="roboto-serif w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none transition focus:border-amber-400 focus:bg-white sm:text-base"
            />
          </div>


          {/* RENT */}
          <div>
            <label
              htmlFor="rent"
              className="roboto-serif mb-2 block text-sm font-medium text-neutral-700"
            >
              Rent
            </label>

            <input
              type="number"
              id="rent"
              name="rent"
              placeholder="1000"
              min="0"
              required
              className="roboto-serif w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none transition focus:border-amber-400 focus:bg-white sm:text-base"
            />
          </div>


          {/* FOOD */}
          <div>
            <label
              htmlFor="food"
              className="roboto-serif mb-2 block text-sm font-medium text-neutral-700"
            >
              Food
            </label>

            <input
              type="number"
              id="food"
              name="food"
              placeholder="1000"
              min="0"
              required
              className="roboto-serif w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none transition focus:border-amber-400 focus:bg-white sm:text-base"
            />
          </div>


          {/* HEALTH */}
          <div>
            <label
              htmlFor="health"
              className="roboto-serif mb-2 block text-sm font-medium text-neutral-700"
            >
              Health
            </label>

            <input
              type="number"
              id="health"
              name="health"
              placeholder="1000"
              min="0"
              required
              className="roboto-serif w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none transition focus:border-amber-400 focus:bg-white sm:text-base"
            />
          </div>


          {/* INSURANCE */}
          <div>
            <label
              htmlFor="insurance"
              className="roboto-serif mb-2 block text-sm font-medium text-neutral-700"
            >
              Insurance
            </label>

            <input
              type="number"
              id="insurance"
              name="insurance"
              placeholder="100"
              min="0"
              required
              className="roboto-serif w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none transition focus:border-amber-400 focus:bg-white sm:text-base"
            />
          </div>


          {/* OUTING */}
          <div>
            <label
              htmlFor="outing"
              className="roboto-serif mb-2 block text-sm font-medium text-neutral-700"
            >
              Outing
            </label>

            <input
              type="number"
              id="outing"
              name="outing"
              placeholder="100"
              min="0"
              required
              className="roboto-serif w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none transition focus:border-amber-400 focus:bg-white sm:text-base"
            />
          </div>


          {/* MISCELLANEOUS */}
          <div className="sm:col-span-2">
            <label
              htmlFor="miscellaneous"
              className="roboto-serif mb-2 block text-sm font-medium text-neutral-700"
            >
              Miscellaneous
            </label>

            <input
              type="number"
              id="miscellaneous"
              name="miscellaneous"
              placeholder="100"
              min="0"
              required
              className="roboto-serif w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none transition focus:border-amber-400 focus:bg-white sm:text-base"
            />
          </div>


          {/* BUTTON */}
          <div className="sm:col-span-2">

            <button
              type="submit"
              className="roboto-serif w-full rounded-xl bg-amber-400 px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-amber-500 active:scale-[0.98] sm:text-base"
            >
              Calculate Expenses
            </button>

          </div>

        </form>

      </div>


      {/* EXPENSE SUMMARY */}
      {expenseData && (
        <div className="mt-7 grid grid-cols-1 gap-7 sm:mt-9 lg:grid-cols-2">

          {/* TABLE */}
          <div className="min-w-0 rounded-3xl border border-amber-100 bg-white p-5 shadow-md sm:p-7 md:p-8">

            <h2 className="lora mb-6 text-xl font-bold text-neutral-800 sm:text-2xl">
              Expense Summary
            </h2>


            <div className="overflow-hidden rounded-2xl border border-neutral-100">

              {/* Income */}
              <div className="flex items-center justify-between gap-4 border-b border-neutral-100 bg-neutral-50 px-3 py-4 sm:px-4">

                <span className="roboto-serif text-sm text-neutral-600">
                  Income
                </span>

                <span className="roboto-serif text-right text-sm font-semibold text-neutral-800 sm:text-base">
                  ₦{expenseData.expense.toLocaleString()}
                </span>

              </div>


              {/* Rent */}
              <div className="flex items-center justify-between gap-4 border-b border-neutral-100 px-3 py-4 sm:px-4">

                <span className="roboto-serif text-sm text-neutral-600">
                  Rent
                </span>

                <span className="roboto-serif text-right text-sm font-semibold text-neutral-800 sm:text-base">
                  ₦{expenseData.rent.toLocaleString()}
                </span>

              </div>


              {/* Food */}
              <div className="flex items-center justify-between gap-4 border-b border-neutral-100 px-3 py-4 sm:px-4">

                <span className="roboto-serif text-sm text-neutral-600">
                  Food
                </span>

                <span className="roboto-serif text-right text-sm font-semibold text-neutral-800 sm:text-base">
                  ₦{expenseData.food.toLocaleString()}
                </span>

              </div>


              {/* Health */}
              <div className="flex items-center justify-between gap-4 border-b border-neutral-100 px-3 py-4 sm:px-4">

                <span className="roboto-serif text-sm text-neutral-600">
                  Health
                </span>

                <span className="roboto-serif text-right text-sm font-semibold text-neutral-800 sm:text-base">
                  ₦{expenseData.health.toLocaleString()}
                </span>

              </div>


              {/* Insurance */}
              <div className="flex items-center justify-between gap-4 border-b border-neutral-100 px-3 py-4 sm:px-4">

                <span className="roboto-serif text-sm text-neutral-600">
                  Insurance
                </span>

                <span className="roboto-serif text-right text-sm font-semibold text-neutral-800 sm:text-base">
                  ₦{expenseData.insurance.toLocaleString()}
                </span>

              </div>


              {/* Outing */}
              <div className="flex items-center justify-between gap-4 border-b border-neutral-100 px-3 py-4 sm:px-4">

                <span className="roboto-serif text-sm text-neutral-600">
                  Outing
                </span>

                <span className="roboto-serif text-right text-sm font-semibold text-neutral-800 sm:text-base">
                  ₦{expenseData.outing.toLocaleString()}
                </span>

              </div>


              {/* Miscellaneous */}
              <div className="flex items-center justify-between gap-4 border-b border-neutral-100 px-3 py-4 sm:px-4">

                <span className="roboto-serif text-sm text-neutral-600">
                  Miscellaneous
                </span>

                <span className="roboto-serif text-right text-sm font-semibold text-neutral-800 sm:text-base">
                  ₦{expenseData.miscellaneous.toLocaleString()}
                </span>

              </div>


              {/* Balance */}
              <div className="flex items-center justify-between gap-4 bg-amber-50 px-3 py-5 sm:px-4">

                <span className="lora font-semibold text-neutral-800">
                  Balance
                </span>

                <span className="lora text-right text-lg font-bold text-amber-600 sm:text-xl">
                  ₦{balance.toLocaleString()}
                </span>

              </div>

            </div>

          </div>


          {/* CHART */}
          <div className="min-w-0 rounded-3xl border border-amber-100 bg-white p-5 shadow-md sm:p-7 md:p-8">

            <h2 className="lora mb-6 text-center text-xl font-bold text-neutral-800 sm:text-2xl">
              Expense Breakdown
            </h2>

            <div className="mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md">
              <canvas ref={chartRef}></canvas>
            </div>

          </div>

        </div>
      )}

    </section>
  );
}

