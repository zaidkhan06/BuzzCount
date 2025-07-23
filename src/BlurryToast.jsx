export default function BlurryToast({ message }) {
  return (
    <div className="max-w-[90vw] min-w-[250px] mx-auto 
                    rounded-xl border border-white/20 
                    backdrop-blur-md bg-white/10 
                    text-white text-center shadow-lg px-4 py-2">
      {message}
    </div>
  );
}
