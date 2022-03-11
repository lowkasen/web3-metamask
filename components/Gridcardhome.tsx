export default function Gridcardhome(props: { heading: string; text: string }) {
  return (
    <div className="flex flex-col flex-wrap justify-center border border-zinc-500 rounded-xl px-4 py-7">
      <h2 className="text-xl font-semibold">{props.heading}</h2>
      <p className="text-3xl font-semibold mt-2">{props.text}</p>
    </div>
  );
}
