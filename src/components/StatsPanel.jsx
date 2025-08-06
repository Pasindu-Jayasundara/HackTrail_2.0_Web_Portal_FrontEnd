import Counter from "./Counter";

export default function StatsPanel() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <Counter number={105} title="Posts" />
      <Counter number={5175} title="Followers" />
      <Counter number={468} title="Following" />
    </div>
  );
}
