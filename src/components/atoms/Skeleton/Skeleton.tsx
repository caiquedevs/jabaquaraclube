export function SkeletonProductList() {
  return (
    <li className="skeleton box w-full mx-auto pl-2 pr-5 flex items-center justify-between bg-white border-2 border-transparent rounded-md select-none text-black">
      <figure className="flex h-full items-center gap-5">
        <div className="box w-16 h-16 rounded-md bg-slate-300 animate-pulse-intense" />

        <figcaption>
          <div className="mb-1 flex items-center gap-1">
            <span className="w-52 h-4 bg-slate-300 rounded-sm animate-pulse-intense" />
            <span className="w-24 h-4 bg-slate-300 rounded-sm animate-pulse-intense" />
          </div>

          <span className="w-20 h-4 bg-slate-300 rounded-sm animate-pulse-intense" />
        </figcaption>
      </figure>

      <div className="flex gap-3">
        <div className="box w-8 h-8 bg-slate-300 rounded-md animate-pulse-intense" />
        <div className="box w-8 h-8 bg-slate-300 rounded-md animate-pulse-intense" />
      </div>
    </li>
  );
}
