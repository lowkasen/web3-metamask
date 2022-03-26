export default function Gridcardhome(props: { heading: string; text: string }) {
  return (
    <div className="flex flex-col flex-wrap justify-center rounded-xl px-4 py-7 bg-blue-200 text-blue-900 shadow-lg shadow-blue-900">
      <h2 className="text-xl font-semibold">{props.heading}</h2>
      <p className="text-3xl font-semibold mt-2">{props.text}</p>
    </div>
  );
}
